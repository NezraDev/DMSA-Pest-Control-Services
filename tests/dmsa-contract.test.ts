import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { quoteSchema } from "../lib/forms.ts";
import { isValidLngLat } from "../lib/map-coordinates.ts";
import { formOptions } from "../data/form-options-data.js";
import { galleryItems } from "../data/gallery-data.js";

const baseQuote = {
  type: "quote",
  fullName: "Sample Sender",
  mobile: "09171234567",
  email: "sender@example.com",
  preferredContact: "Viber",
  preferredContactOther: "",
  customerType: "Residential",
  customerTypeOther: "",
  service: "Unsure",
  serviceOther: "",
  pest: "Unsure",
  pestOther: "",
  propertyType: "House",
  propertyTypeOther: "",
  address: "Naga City, Camarines Sur",
  latitude: 13.62,
  longitude: 123.18,
  preferredDate: "2026-09-20",
  details: "Recurring activity near the kitchen area.",
  consent: true,
  website: "",
  startedAt: Date.now() - 5000,
};

test("quotation schema accepts a complete standard request", () => {
  assert.equal(quoteSchema.safeParse(baseQuote).success, true);
});

test("map coordinates reject values that would crash the quotation form", () => {
  assert.equal(isValidLngLat([123.18, 13.62]), true);
  assert.equal(isValidLngLat([Number.NaN, 13.62]), false);
  assert.equal(isValidLngLat([123.18, Number.NaN]), false);
  assert.equal(isValidLngLat([13.62, 123.18]), false, "longitude and latitude must stay in that order");
  assert.equal(isValidLngLat([181, 13.62]), false);
  assert.equal(isValidLngLat([123.18, 91]), false);
});

test("free ocular inspection is included in quotation instead of a separate request type", () => {
  assert.equal("requestType" in formOptions, false);
});

test("every selected Other option requires its specification", () => {
  for (const [choice, detail] of [
    ["preferredContact", "preferredContactOther"],
    ["customerType", "customerTypeOther"],
    ["service", "serviceOther"],
    ["pest", "pestOther"],
    ["propertyType", "propertyTypeOther"],
  ]) {
    const invalid = quoteSchema.safeParse({ ...baseQuote, [choice]: "Other", [detail]: "" });
    assert.equal(invalid.success, false, `${detail} should be required`);
    const valid = quoteSchema.safeParse({ ...baseQuote, [choice]: "Other", [detail]: "Specified value" });
    assert.equal(valid.success, true, `${detail} should be included`);
  }
});

test("every applicable option list keeps Other at the end", () => {
  for (const key of ["preferredContact", "customerType", "service", "pest", "propertyType"] as const) {
    assert.equal(formOptions[key].at(-1), "Other", `${key} must keep Other last`);
  }
});

test("public location records remain explicit sample data with unique slugs", () => {
  assert.ok(galleryItems.length > 0);
  assert.equal(new Set(galleryItems.map((item) => item.slug)).size, galleryItems.length);
  assert.equal(galleryItems.every((item) => item.isSample === true), true);
  assert.equal(galleryItems.every((item) => !/zone|street|house no\.?/i.test(item.generalLocation)), true);
  assert.equal(
    galleryItems.every((item) =>
      "imagePaths" in item &&
      Array.isArray(item.imagePaths) &&
      item.imagePaths.length > 0 &&
      "beforeImage" in item &&
      "afterImage" in item &&
      "customerFeedback" in item),
    true,
  );
});

test("gallery before and after images stay paired and resolve to public assets", async () => {
  const item = galleryItems[0];
  assert.ok(item);
  assert.ok(item.imagePaths.length > 0);
  assert.equal(
    galleryItems.every(({ beforeImage, afterImage }) => Boolean(beforeImage) === Boolean(afterImage)),
    true,
  );

  const comparisonPaths = typeof item.beforeImage === "string" && typeof item.afterImage === "string"
    ? [item.beforeImage, item.afterImage]
    : [];
  for (const imagePath of [...item.imagePaths, ...comparisonPaths]) {
    const file = await readFile(new URL(`../public${imagePath}`, import.meta.url));
    assert.ok(file.byteLength > 0);
  }

  const detail = await readFile(new URL("../app/gallery/[slug]/page.tsx", import.meta.url), "utf8");
  assert.match(detail, /location\.beforeImage/);
  assert.match(detail, /location\.afterImage/);
  assert.match(detail, />Before image</);
  assert.match(detail, />After image</);
  assert.match(detail, /const comparisonImages/);
  assert.match(detail, /images=\{treatmentImages\}/);
  assert.match(detail, /<ProofCarousel/);

  const contentTypes = await readFile(new URL("../lib/content-types.ts", import.meta.url), "utf8");
  assert.match(contentTypes, /beforeImage:\s*string \| false/);
  assert.match(contentTypes, /afterImage:\s*string \| false/);
});

test("main gallery carousel is sourced from gallery data", async () => {
  const galleryPage = await readFile(new URL("../app/gallery/page.tsx", import.meta.url), "utf8");
  const carousel = await readFile(new URL("../components/site/proof-carousel.tsx", import.meta.url), "utf8");

  assert.match(galleryPage, /galleryItems\.flatMap/);
  assert.match(galleryPage, /item\.imagePaths\.map/);
  assert.match(galleryPage, /<ProofCarousel images=\{galleryProofImages\}/);
  assert.doesNotMatch(carousel, /defaultProofImages/);
});

test("Windows package uses Tailwind 3 without the Oxide native binding", async () => {
  const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  const lockfile = await readFile(new URL("../package-lock.json", import.meta.url), "utf8");
  assert.equal(packageJson.devDependencies.tailwindcss, "3.4.17");
  assert.equal(packageJson.dependencies["maplibre-gl"], "^6.7.0");
  assert.doesNotMatch(lockfile, /@tailwindcss\/oxide/);
  assert.equal(packageJson.scripts.dev, "next dev");
  assert.equal(packageJson.scripts.build, "next build");
  assert.equal(packageJson.scripts.start, "next start");
});

test("light components use white while charcoal is reserved for dark mode", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /--strong-surface: #ffffff;/);
  assert.match(css, /\.dark[\s\S]*--strong-surface: #273239;/);
  assert.doesNotMatch(css, /background:\s*(?:var\(--brand-charcoal\)|#273239|#11191d)/);
});

test("icons placed on red brand surfaces use white foregrounds", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.hq-icon\s*\{[^}]*background:\s*var\(--brand-red\);[^}]*color:\s*#fff;/s);
});

test("component layouts keep deliberate spacing instead of fused one-pixel grids", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.doesNotMatch(css, /gap:\s*1px/);
  assert.match(css, /\.project-grid\s*\{[^}]*gap:\s*20px;/s);
  assert.match(css, /\.contact-methods\s*\{[^}]*gap:\s*14px;/s);
  assert.match(css, /\.form-grid\s*\{[^}]*row-gap:\s*20px;/s);
  assert.match(css, /\.section-heading\s*>\s*p:not\(\.eyebrow\)\s*\{[^}]*margin:\s*16px 0 0;/s);
  assert.match(css, /\.treatment-overview\s*\{[^}]*gap:\s*18px;/s);
  assert.match(css, /\.form-section-heading p\s*\{[^}]*margin:\s*12px 0 0;/s);
  assert.match(css, /\.service-card h3 \+ p\s*\{[^}]*margin:\s*12px 0 0;/s);
});

test("icon and text rows use deliberate single-line and multi-line alignment", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.treated-map-popup-link,[\s\S]*\[data-slot="button"\][\s\S]*> svg\s*\{[^}]*align-self:\s*center;/s);
  assert.match(css, /\.location-line,[\s\S]*\.contact-methods > a,[\s\S]*\.footer-contact p[\s\S]*> svg\s*\{[^}]*align-self:\s*flex-start;[^}]*margin-top:\s*0\.2em;/s);
  assert.match(css, /\.location-line svg\s*\{(?=[^}]*width:\s*15px;)(?=[^}]*height:\s*15px;)[^}]*\}/s);
  assert.match(css, /\.privacy-note svg,\s*\.field-hint svg\s*\{[^}]*width:\s*16px;[^}]*height:\s*16px;/s);
});

test("website logo and page icon are independently configurable", async () => {
  const siteData = await readFile(new URL("../data/site-data.js", import.meta.url), "utf8");
  const brandLogo = await readFile(new URL("../components/site/brand-logo.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const manifest = await readFile(new URL("../app/manifest.ts", import.meta.url), "utf8");

  assert.match(siteData, /logos:\s*\{[\s\S]*website:/);
  assert.match(siteData, /pageIcon:/);
  assert.match(brandLogo, /siteConfig\.logos\.website/);
  assert.match(brandLogo, /width=\{2048\}/);
  assert.match(brandLogo, /height=\{1152\}/);
  assert.match(css, /\.brand-crop\s*\{[^}]*background:\s*transparent;/s);
  assert.match(css, /\.brand-crop\s*\{[^}]*padding:\s*0;[^}]*overflow:\s*hidden;/s);
  assert.match(css, /\.brand-crop img\s*\{[^}]*top:\s*50%;[^}]*width:\s*calc\(100% \+ 60px\);[^}]*height:\s*auto;[^}]*transform:\s*translate\(-50%, -50%\);/s);
  assert.doesNotMatch(css, /\.brand-crop\s*\{[^}]*background:\s*#970000;/s);
  assert.doesNotMatch(css, /\.brand-crop img\s*\{[^}]*(?:height:\s*370%|top:\s*-135%);/s);
  assert.match(layout, /siteConfig\.logos\.pageIcon/);
  assert.match(manifest, /siteConfig\.logos\.pageIcon/);
});

test("route titles use the DMSA Pest Control Services title template", async () => {
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const about = await readFile(new URL("../app/about/page.tsx", import.meta.url), "utf8");
  assert.match(layout, /template:\s*"%s \| DMSA Pest Control Services"/);
  assert.match(about, /title:\s*"About DMSA"/);
});

test("SEO metadata uses production-aware canonical URLs and business schema", async () => {
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const robots = await readFile(new URL("../app/robots.ts", import.meta.url), "utf8");
  const sitemap = await readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8");
  const siteUrl = await readFile(new URL("../lib/site-url.ts", import.meta.url), "utf8");
  const envExample = await readFile(new URL("../.env.example", import.meta.url), "utf8");

  assert.match(layout, /"@type": "WebSite"/);
  assert.match(layout, /"@type": "LocalBusiness"/);
  assert.match(layout, /GOOGLE_SITE_VERIFICATION/);
  assert.match(robots, /absoluteUrl\("\/sitemap\.xml"\)/);
  assert.match(sitemap, /absoluteUrl/);
  assert.match(siteUrl, /process\.env\.URL/);
  assert.match(siteUrl, /your-domain\\\.example/);
  assert.match(siteUrl, /\.netlify\.app/);
  assert.match(envExample, /RESEND_API_KEY=re_your_resend_api_key/);
});

test("treated-map popups do not steal focus or scroll the page", async () => {
  const map = await readFile(new URL("../components/maps/map-canvas.tsx", import.meta.url), "utf8");
  assert.equal(map.match(/focusAfterOpen:\s*false/g)?.length, 2);
  assert.match(map, /focus\(\{ preventScroll: true \}\)/);
});

test("device location provides secure, accessible fallback handling", async () => {
  const map = await readFile(new URL("../components/maps/map-canvas.tsx", import.meta.url), "utf8");

  assert.match(map, /window\.isSecureContext/);
  assert.match(map, /enableHighAccuracy:\s*true/);
  assert.match(map, /enableHighAccuracy:\s*false/);
  assert.match(map, /isValidLngLat\(next\)/);
  assert.match(map, /error\.PERMISSION_DENIED/);
  assert.match(map, /role="status" aria-live="polite"/);
  assert.match(map, /status === "loading"/);
});

test("MapLibre uses the CARTO Voyager basemap with complete attribution", async () => {
  const map = await readFile(new URL("../components/maps/map-canvas.tsx", import.meta.url), "utf8");
  const envExample = await readFile(new URL("../.env.example", import.meta.url), "utf8");

  assert.match(map, /basemaps\.cartocdn\.com\/rastertiles\/voyager/);
  assert.match(map, /NEXT_PUBLIC_CARTO_BASEMAP_KEY/);
  assert.match(map, /© CARTO/);
  assert.match(map, /© OpenStreetMap contributors/);
  assert.doesNotMatch(map, /tile\.openstreetmap\.org/);
  assert.match(envExample, /NEXT_PUBLIC_CARTO_BASEMAP_KEY=/);
});
