#!/usr/bin/env python3
"""Contact sheet: every cloud master at 160/80/40px wide (plus a flipped 80px)
on the planned sky gradient, labeled. This simulates real display sizes."""
import os
from PIL import Image, ImageDraw

OUT = "clouds_out"
NAMES = ["cloud-01", "cloud-03", "cloud-04", "cloud-07", "cloud-08"]
SIZES = [160, 80, 40]

TOP = (201, 226, 245)   # #C9E2F5
BOT = (214, 233, 248)   # #D6E9F8

ROW_H = 190
PAD = 24
COL_W = [220, 140, 100, 160]  # 160 / 80 / 40 / flipped-80
W = PAD * 2 + sum(COL_W)
H = 60 + ROW_H * len(NAMES)

sheet = Image.new("RGB", (W, H))
for y in range(H):
    t = y / H
    sheet.paste(
        Image.new("RGB", (W, 1), tuple(round(a + (b - a) * t) for a, b in zip(TOP, BOT))),
        (0, y),
    )
dr = ImageDraw.Draw(sheet)
dr.text((PAD, 16), "cloud library — masters rendered at display sizes on sky gradient #C9E2F5 -> #D6E9F8",
        fill=(30, 40, 60))
dr.text((PAD, 32), "columns: 160px | 80px | 40px | 80px flipped", fill=(30, 40, 60))

for row, name in enumerate(NAMES):
    img = Image.open(f"{OUT}/{name}.png")
    y0 = 60 + row * ROW_H
    x = PAD
    variants = [(SIZES[0], False), (SIZES[1], False), (SIZES[2], False), (SIZES[1], True)]
    for col, (target_w, flip) in enumerate(variants):
        v = img.resize((target_w, round(img.height * target_w / img.width)), Image.LANCZOS)
        if flip:
            v = v.transpose(Image.FLIP_LEFT_RIGHT)
        vy = y0 + (ROW_H - 20 - v.height) // 2
        sheet.paste(v, (x + (COL_W[col] - v.width) // 2, max(vy, y0)), v)
        x += COL_W[col]
    dr.text((PAD, y0 + ROW_H - 24), f"{name}  ({img.width}x{img.height} master)", fill=(30, 40, 60))

sheet.save(f"{OUT}/contact-sheet.png")
print("contact sheet:", sheet.size)
