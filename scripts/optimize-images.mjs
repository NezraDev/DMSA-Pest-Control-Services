// Pre-builds the WebP versions of every site photo into public/opt/, at the widths the custom
// image loader (lib/image-loader.ts) serves. Serving these as plain static files means:
//   - every image response gets the site's security headers (Netlify's image CDN drops them);
//   - sizes are fixed and predictable (every variant stays well under 100 KB).
// Run after adding or changing a photo in public/slide or public/brand/<job>:
//   node scripts/optimize-images.mjs
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

import { imageWidths } from "../lib/image-widths.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
const quality = 70;
const sources = ["slide", "brand/anos", "brand/marymount", "brand/binan"];

const files = sources.flatMap((folder) =>
  readdirSync(join(root, folder)).filter((name) => /\.jpe?g$/i.test(name)).map((name) => `${folder}/${name}`));

let largest = 0;
let written = 0;
for (const file of files) {
  const input = join(root, file);
  for (const width of imageWidths) {
    const output = join(root, "opt", `${file.replace(/\.jpe?g$/i, "")}-${width}.webp`);
    if (existsSync(output) && statSync(output).mtimeMs > statSync(input).mtimeMs) {
      largest = Math.max(largest, statSync(output).size);
      continue;
    }
    mkdirSync(dirname(output), { recursive: true });
    const buffer = await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality, effort: 6 }).toBuffer();
    writeFileSync(output, buffer);
    largest = Math.max(largest, buffer.length);
    written++;
  }
}
console.log(`${files.length} photos, ${written} variants written, largest ${Math.round(largest / 1024)} KB.`);
if (largest > 100 * 1024) {
  console.error("A variant is over 100 KB. Lower the quality or denoise the source photo.");
  process.exitCode = 1;
}
