// next/image loader that serves the pre-built WebP photos in public/opt/ instead of an image
// CDN. Static files carry the site's security headers and have fixed, small sizes.
// Build the files with `node scripts/optimize-images.mjs` whenever a photo is added.
import { imageWidths } from "./image-widths.js";

type LoaderProps = { src: string; width: number; quality?: number };

export default function imageLoader({ src, width }: LoaderProps) {
  // Only local JPEG photos have pre-built versions; anything else is served as it is.
  if (!src.startsWith("/") || !/\.jpe?g$/i.test(src)) return src;
  const target = imageWidths.find((size) => size >= width) ?? imageWidths[imageWidths.length - 1];
  return `/opt${src.replace(/\.jpe?g$/i, "")}-${target}.webp`;
}
