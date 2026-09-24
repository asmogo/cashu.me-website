// Run with `node scripts/optimize-images.mjs` after updating the PNG masters.
// Sharp is provided by Next.js. Keep the masters for reproducible regeneration.
import sharp from "sharp";
import { readdir } from "node:fs/promises";

const directory = new URL("../public/images/clouds/", import.meta.url);
for (const name of (await readdir(directory)).filter((name) =>
  name.endsWith(".png"),
)) {
  const input = new URL(name, directory);
  const { width } = await sharp(input.pathname).metadata();
  for (const size of [128, 256, 384, 512, width].filter(
    (size, index, all) => size <= width && all.indexOf(size) === index,
  )) {
    await sharp(input.pathname)
      .resize({ width: size })
      .webp({ lossless: true, effort: 6 })
      .toFile(
        new URL(name.replace(".png", `-${size}.webp`), directory).pathname,
      );
  }
}

await sharp(
  new URL("../public/images/cashu-logo.png", import.meta.url).pathname,
)
  .resize({ width: 108, kernel: "nearest" })
  .png({ palette: true, quality: 100, effort: 10 })
  .toFile(
    new URL("../public/images/cashu-logo-108.png", import.meta.url).pathname,
  );
