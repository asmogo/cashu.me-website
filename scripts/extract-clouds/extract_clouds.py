#!/usr/bin/env python3
"""Cloud cutout extraction via blue-sky difference keying + color unmixing.

Pipeline per configured crop:
  1. estimate local sky color: per-channel linear plane fitted to
     blue-dominant pixels in the crop's border ring
  2. alpha matte from blueness distance (B - R) normalized against local sky,
     gaussian pre-blur on the blueness field to suppress JPEG chroma blocks
  3. keep only the largest connected alpha component (drops debris from
     neighboring clouds at crop edges)
  4. 12px alpha ramp at crop borders (kills straight-chop artifacts)
  5. unmix true cloud color: C = (P - (1-a)*S) / a
  6. treatment: slight desaturation + white-point lift
  7. trim to alpha bbox, downscale to master width, light unsharp on RGB
"""

import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage

SRC = "/Users/erik/Downloads"
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "clouds_out")
DBG = os.path.join(OUT, "debug")
os.makedirs(OUT, exist_ok=True)
os.makedirs(DBG, exist_ok=True)

SWARGA = f"{SRC}/pexels-andrew-swarga-87684510-11487210.jpg"
HIRCH = f"{SRC}/pexels-mia-hirchberg-1522484668-28170029.jpg"
ZEYNEP = f"{SRC}/pexels-zeynepcapraz-36339619.jpg"

# Per-cloud knobs: lo/hi alpha knee, alpha_gamma (<1 solidifies hazy cores),
# fades (l,t,r,b px ramps for edges that cut through material — such assets
# are for viewport-edge placement with the faded side offscreen),
# desat/lift_cap overrides, morph=False to skip haze-bridge disconnection
CLOUDS = [
    dict(name="cloud-01", src=SWARGA, box=(400, 1150, 2140, 2592),    # central cumulus (signature)
         morph_thresh=0.25, morph_iters=12,
         # the chain cloud to the right merges into the dome with no clean gap —
         # cut along the shadow trough between the masses, wide soft fade so the
         # seam reads as natural thinning
         cut_poly=[(0.655, 0.0), (0.685, 0.06), (0.70, 0.13), (0.73, 0.22),
                   (0.78, 0.32), (0.85, 0.42), (0.92, 0.52), (1.0, 0.60),
                   (1.0, 0.0)]),
    dict(name="cloud-03", src=SWARGA, box=(2530, 1630, 3080, 2230),   # bottom-right lobe group
         whiten=0.22, desat=0.25),
    dict(name="cloud-04", src=SWARGA, box=(500, 855, 870, 1130),      # small left puff
         alpha_gamma=0.55, lift_cap=1.25, desat=0.35, whiten=0.32),
    dict(name="cloud-07", src=HIRCH, box=(920, 3400, 2070, 3980),
         fades=(12, 12, 12, 70), alpha_gamma=0.85, desat=0.30),       # soft distant puff
    dict(name="cloud-08", src=ZEYNEP, box=(700, 450, 2750, 1700),     # cirrus streak segment
         fades=(250, 30, 250, 30), alpha_gamma=0.6, hi=0.35, desat=0.40,
         whiten=0.28, morph=False),
]

MASTER_MAX_W = 800
ALPHA_LO = 0.06
ALPHA_HI = 0.72
RING = 14
DESAT = 0.12
BORDER_FADE = 12
SKY_PREVIEW = (206, 228, 246)


def fit_sky_plane(img, ring_mask):
    h, w, _ = img.shape
    yy, xx = np.mgrid[0:h, 0:w]
    d = img[:, :, 2].astype(np.float64) - img[:, :, 0].astype(np.float64)
    ring_d = d[ring_mask]
    thresh = np.percentile(ring_d, 50)
    sky_sel = ring_mask & (d >= max(thresh, 15))
    n = sky_sel.sum()
    if n < 200:
        raise ValueError(f"too few sky pixels in ring ({n}) — crop border touches cloud")
    A = np.stack([np.ones(n), xx[sky_sel], yy[sky_sel]], axis=1)
    planes = []
    for c in range(3):
        coef, *_ = np.linalg.lstsq(A, img[:, :, c][sky_sel].astype(np.float64), rcond=None)
        planes.append(coef[0] + coef[1] * xx + coef[2] * yy)
    return np.stack(planes, axis=-1)


def smoothstep(t):
    t = np.clip(t, 0.0, 1.0)
    return t * t * (3 - 2 * t)


def largest_component(alpha, morph=True, thresh=0.10, iters=5):
    """Keep the heaviest alpha component; optionally sever thin haze bridges
    (binary opening) so neighboring clouds connected by faint wisps drop out."""
    mask = alpha > 0.04
    if morph:
        solid = ndimage.binary_opening(alpha > thresh, iterations=iters)
        labels, n = ndimage.label(solid)
        if n < 1:
            return alpha
        sums = ndimage.sum_labels(alpha, labels, index=range(1, n + 1))
        keep = labels == (1 + int(np.argmax(sums)))
        # regrow to recover the kept cloud's own soft fringe, then soften cut
        region = ndimage.binary_dilation(keep, iterations=14) & mask
        soft = ndimage.gaussian_filter(region.astype(np.float64), sigma=4)
        return alpha * np.clip(soft * 1.6, 0, 1)
    labels, n = ndimage.label(mask)
    if n <= 1:
        return alpha
    sums = ndimage.sum_labels(alpha, labels, index=range(1, n + 1))
    keep = 1 + int(np.argmax(sums))
    out = alpha.copy()
    out[(labels != keep) & mask] = 0.0
    return out


def extract(spec):
    img = Image.open(spec["src"]).convert("RGB")
    crop = img.crop(spec["box"])
    a = np.asarray(crop).astype(np.float64)
    h, w, _ = a.shape

    ring = np.zeros((h, w), dtype=bool)
    ring[:RING, :] = ring[-RING:, :] = True
    ring[:, :RING] = ring[:, -RING:] = True

    sky = fit_sky_plane(a, ring)

    d_pix = a[:, :, 2] - a[:, :, 0]
    d_pix = ndimage.gaussian_filter(d_pix, sigma=1.2)  # suppress JPEG chroma blocks
    d_sky = np.maximum(sky[:, :, 2] - sky[:, :, 0], 8.0)
    cloudness = 1.0 - np.clip(d_pix / d_sky, 0.0, 1.2)

    poly = spec.get("cut_poly")
    if poly:
        # fade CLOUDNESS (not alpha) toward the cut so the knee below re-breaks
        # the seam along the cloud's own texture — ragged, not a smooth arc.
        # Hard zero inside guarantees the neighbor field disconnects.
        pmask = Image.new("L", (w, h), 0)
        ImageDraw.Draw(pmask).polygon([(x * w, y * h) for x, y in poly], fill=255)
        pm = np.asarray(pmask) > 0
        soft = ndimage.gaussian_filter((~pm).astype(np.float64), sigma=30)
        # multi-octave noise warps the fade so the seam breaks into puffs
        rng = np.random.default_rng(42)
        noise = sum(
            ndimage.gaussian_filter(rng.standard_normal((h, w)), s) * s
            for s in (8, 24, 60)
        )
        noise /= max(np.abs(noise).max(), 1e-9)
        cloudness *= np.clip(soft * 1.15 + noise * 0.35, 0, 1)
        cloudness[pm] = 0.0

    lo = spec.get("lo", ALPHA_LO)
    hi = spec.get("hi", ALPHA_HI)
    alpha = smoothstep((cloudness - lo) / (hi - lo))
    alpha = alpha ** spec.get("alpha_gamma", 1.0)

    alpha = largest_component(
        alpha,
        morph=spec.get("morph", True),
        thresh=spec.get("morph_thresh", 0.10),
        iters=spec.get("morph_iters", 5),
    )

    # border ramps: (left, top, right, bottom) widths
    fl, ft, fr, fb = spec.get("fades", (BORDER_FADE,) * 4)
    ramp = np.ones((h, w))
    ramp[:ft, :] *= np.linspace(0, 1, ft)[:, None]
    ramp[-fb:, :] *= np.linspace(1, 0, fb)[:, None]
    ramp[:, :fl] *= np.linspace(0, 1, fl)[None, :]
    ramp[:, -fr:] *= np.linspace(1, 0, fr)[None, :]
    alpha *= ramp

    alpha = ndimage.gaussian_filter(alpha, sigma=0.8)  # smooth stair-steps

    af = alpha[..., None]
    safe = np.maximum(af, 0.02)
    C = (a - (1.0 - af) * sky) / safe
    C = np.clip(C, 0, 255)
    C[alpha < 0.02] = 255.0

    desat = spec.get("desat", DESAT)
    luma = (0.2126 * C[:, :, 0] + 0.7152 * C[:, :, 1] + 0.0722 * C[:, :, 2])[..., None]
    C = C * (1 - desat) + luma * desat
    # whiten: compress shadow depth toward white — rescues unlit/hazy shapes
    # that otherwise read as gray smudges at small display sizes
    whiten = spec.get("whiten", 0.0)
    if whiten:
        C = C + (255.0 - C) * whiten
    core = alpha > 0.5
    if core.sum() > 50:
        p99 = np.percentile((0.2126 * C[:, :, 0] + 0.7152 * C[:, :, 1] + 0.0722 * C[:, :, 2])[core], 99)
        lift = np.clip(250.0 / max(p99, 1.0), 1.0, spec.get("lift_cap", 1.10))
        C = np.clip(C * lift, 0, 255)

    a8 = np.clip(alpha * 255, 0, 255).astype(np.uint8)
    rgba = np.dstack([C.astype(np.uint8), a8])

    ys, xs = np.where(a8 > 5)
    if len(ys) == 0:
        raise ValueError("empty matte")
    pad = 4
    t0, b0 = max(ys.min() - pad, 0), min(ys.max() + pad, h - 1)
    l0, r0 = max(xs.min() - pad, 0), min(xs.max() + pad, w - 1)
    rgba = rgba[t0 : b0 + 1, l0 : r0 + 1]

    out = Image.fromarray(rgba, "RGBA")
    if out.width > MASTER_MAX_W:
        nh = round(out.height * MASTER_MAX_W / out.width)
        out = out.resize((MASTER_MAX_W, nh), Image.LANCZOS)
    rgb = out.convert("RGB").filter(ImageFilter.UnsharpMask(radius=1.2, percent=60, threshold=2))
    out = Image.merge("RGBA", (*rgb.split(), out.split()[3]))
    return out


def debug_sheet(name, cloud):
    tile_w, gap = 340, 12
    scale_w = min(320, cloud.width)
    sc = cloud.resize((scale_w, round(cloud.height * scale_w / cloud.width)), Image.LANCZOS)
    th = sc.height + 2 * gap
    sheet = Image.new("RGB", (tile_w * 3 + gap * 4, th + 40), (40, 40, 40))
    dr = ImageDraw.Draw(sheet)
    for i, bg in enumerate([SKY_PREVIEW, (255, 255, 255), None]):
        tile = Image.new("RGB", (tile_w, th), bg if bg else (0, 0, 0))
        if bg is None:
            tile.paste(sc.split()[3].convert("RGB"), ((tile_w - sc.width) // 2, gap))
        else:
            tile.paste(sc, ((tile_w - sc.width) // 2, gap), sc)
        sheet.paste(tile, (gap + i * (tile_w + gap), 30))
    dr.text((gap, 8), f"{name}  {cloud.width}x{cloud.height}  [sky | white | alpha]", fill=(255, 255, 255))
    sheet.save(f"{DBG}/{name}-debug.png")


def overviews():
    by_src = {}
    for c in CLOUDS:
        by_src.setdefault(c["src"], []).append(c)
    for src, specs in by_src.items():
        img = Image.open(src).convert("RGB")
        scale = 1400 / img.width
        ov = img.resize((1400, round(img.height * scale)), Image.LANCZOS)
        dr = ImageDraw.Draw(ov)
        for s in specs:
            l, t, r, b = [v * scale for v in s["box"]]
            dr.rectangle([l, t, r, b], outline=(255, 60, 60), width=3)
            dr.text((l + 4, t + 4), s["name"], fill=(255, 60, 60))
        base = os.path.basename(src).split("-")[1]
        ov.save(f"{DBG}/overview-{base}.jpg", quality=88)


if __name__ == "__main__":
    overviews()
    for spec in CLOUDS:
        try:
            cloud = extract(spec)
            cloud.save(f"{OUT}/{spec['name']}.png")
            debug_sheet(spec["name"], cloud)
            print(f"{spec['name']}: {cloud.width}x{cloud.height} ok")
        except Exception as e:
            print(f"{spec['name']}: FAILED — {e}")
