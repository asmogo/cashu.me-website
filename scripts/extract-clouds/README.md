# Cloud extraction pipeline

Produces the cutouts in `public/images/clouds/` from the source sky photos
(expected in `~/Downloads`, see paths in `extract_clouds.py`).

```sh
python3 -m venv venv && ./venv/bin/pip install pillow numpy scipy
./venv/bin/python extract_clouds.py   # masters -> clouds_out/ + debug sheets
./venv/bin/python contact_sheet.py    # review sheet on the sky gradient
cp clouds_out/cloud-*.png ../../public/images/clouds/
```

Per-cloud knobs (crop box, alpha knee lo/hi, alpha_gamma, whiten, desat,
fades, cut_poly, morph) are documented inline in extract_clouds.py.
