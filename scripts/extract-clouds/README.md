# Cloud extraction pipeline

Historical: the clouds currently shipping in `public/images/clouds/` are
pre-cut PNGs from a Resource Boy cloud texture pack, not this pipeline's
output. Kept for reference in case a future pass needs to key clouds out of
raw sky photography again.

Produces cutouts from source sky photos (expected in `~/Downloads`, see paths
in `extract_clouds.py`) via difference-keying.

```sh
python3 -m venv venv && ./venv/bin/pip install pillow numpy scipy
./venv/bin/python extract_clouds.py   # masters -> clouds_out/ + debug sheets
./venv/bin/python contact_sheet.py    # review sheet on the sky gradient
cp clouds_out/cloud-*.png ../../public/images/clouds/
```

Per-cloud knobs (crop box, alpha knee lo/hi, alpha_gamma, whiten, desat,
fades, cut_poly, morph) are documented inline in extract_clouds.py.
