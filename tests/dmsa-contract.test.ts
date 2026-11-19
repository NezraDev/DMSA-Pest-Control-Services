import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { quoteSchema } from "../lib/forms.ts";
import { isValidLngLat } from "../lib/map-coordinates.ts";
import { formOptions } from "../data/form-options-data.js";
import { galleryItems } from "../data/gallery-data.js";
import { guides } from "../data/guides-data.js";
import { services } from "../data/services-data.js";
import { guideDrafts } from "../data/guide-drafts.js";
import { industries } from "../data/industries-data.js";
import { officeTowns } from "../data/locations/provinces.js";
import { psgcProvinces } from "../data/locations/psgc-data.js";
import { townNotes } from "../data/locations/town-notes.js";
import { pests } from "../data/pests-data.js";
import { siteConfig, trustFacts } from "../data/site-data.js";
import { provinceContent, townContent } from "../lib/location-content.ts";
import { maxSimilarity, minNoteWords, minUniqueWords, townQualityReport } from "../lib/location-quality.ts";
import { allTowns, launchedLocationProvinces, launchedTowns, locationProvinces, townByKey, townJobs } from "../lib/locations.ts";

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
  referralSource: "Facebook Page",
  referralSourceOther: "",
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

test("Other options are still checked while consent is unticked, as on the early form steps", () => {
  const result = quoteSchema.safeParse({ ...baseQuote, service: "Other", serviceOther: "", consent: false });
  assert.equal(result.success, false);
  const paths = result.error.issues.map((issue) => issue.path[0]);
  assert.ok(paths.includes("serviceOther"));
  assert.ok(paths.includes("consent"));
});

test("quotation requests must say how the client heard about DMSA", () => {
  const { referralSource, ...withoutSource } = baseQuote;
  assert.equal(referralSource, "Facebook Page");
  assert.equal(quoteSchema.safeParse(withoutSource).success, false);
  assert.equal(quoteSchema.safeParse({ ...baseQuote, referralSource: "" }).success, false);
  for (const source of formOptions.referralSource.slice(0, -1)) {
    assert.equal(quoteSchema.safeParse({ ...baseQuote, referralSource: source }).success, true, source);
  }
});

test("every selected Other option requires its specification", () => {
  for (const [choice, detail] of [
    ["preferredContact", "preferredContactOther"],
    ["customerType", "customerTypeOther"],
    ["service", "serviceOther"],
    ["pest", "pestOther"],
    ["propertyType", "propertyTypeOther"],
    ["referralSource", "referralSourceOther"],
  ]) {
    const invalid = quoteSchema.safeParse({ ...baseQuote, [choice]: "Other", [detail]: "" });
    assert.equal(invalid.success, false, `${detail} should be required`);
    const valid = quoteSchema.safeParse({ ...baseQuote, [choice]: "Other", [detail]: "Specified value" });
    assert.equal(valid.success, true, `${detail} should be included`);
  }
});

test("every applicable option list keeps Other at the end", () => {
  for (const key of ["preferredContact", "customerType", "service", "pest", "propertyType", "referralSource"] as const) {
    assert.equal(formOptions[key].at(-1), "Other", `${key} must keep Other last`);
  }
});

test("public location records have unique slugs and generalized locations", () => {
  assert.ok(galleryItems.length > 0);
  assert.equal(new Set(galleryItems.map((item) => item.slug)).size, galleryItems.length);
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
  assert.match(css, /\.brand-crop img\s*\{[^}]*top:\s*50%;[^}]*width:\s*calc\(100% \+ 4px\);[^}]*height:\s*auto;[^}]*transform:\s*translate\(-50%, -50%\);/s);
  assert.doesNotMatch(css, /\.brand-crop\s*\{[^}]*background:\s*#970000;/s);
  assert.doesNotMatch(css, /\.brand-crop img\s*\{[^}]*(?:height:\s*370%|top:\s*-135%);/s);
  assert.match(layout, /siteConfig\.logos\.pageIcon/);
  assert.match(manifest, /siteConfig\.logos\.pageIcon/);
});

test("route titles use the short DMSA Pest Control title template", async () => {
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const about = await readFile(new URL("../app/about/page.tsx", import.meta.url), "utf8");
  assert.match(layout, /template:\s*"%s \| DMSA Pest Control"/);
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
  assert.match(map, /role="status"\s+aria-live="polite"/);
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

// Titles rendered through the layout template get this suffix.
const titleSuffix = " | DMSA Pest Control";

const launchedTownContent = launchedTowns.map((town) => ({ town, content: townContent(town) }));
const launchedProvinceContent = launchedLocationProvinces.map((province) => ({ province, content: provinceContent(province) }));

const words = (...texts: (string | undefined)[]) => texts.filter(Boolean).join(" ").split(/\s+/).filter(Boolean).length;
const sectionWords = (sections: { heading: string; paragraphs?: string[]; list?: string[]; after?: string[]; table?: { caption: string; head: string[]; rows: string[][] } }[]) =>
  words(...sections.flatMap((section) => [section.heading, ...(section.paragraphs ?? []), ...(section.list ?? []), ...(section.after ?? []), ...(section.table ? [section.table.caption, ...section.table.head, ...section.table.rows.flat()] : [])]));

test("data-driven page titles fit in 60 characters and are unique", () => {
  const titles = [
    ...services.map((service) => service.metaTitle + titleSuffix),
    ...launchedProvinceContent.map(({ content }) => content.title.full),
    ...launchedTownContent.map(({ content }) => content.title.full),
    ...guides.map((guide) => guide.metaTitle + titleSuffix),
    ...pests.map((pest) => pest.metaTitle + titleSuffix),
    ...industries.map((industry) => industry.metaTitle + titleSuffix),
    ...galleryItems.map((item) => item.metaTitle),
  ];
  for (const title of titles) assert.ok(title.length <= 60, `${title} is ${title.length} characters`);
  assert.equal(new Set(titles).size, titles.length, "titles must be unique");
});

test("every town title fits in 60 characters, launched or not", () => {
  for (const town of allTowns) {
    const { title } = townContent(town);
    assert.ok(title.full.length <= 60, `${town.key}: ${title.full}`);
  }
  for (const province of locationProvinces) assert.ok(province.metaTitle.length + titleSuffix.length <= 60, province.metaTitle);
});

test("data-driven meta descriptions are 120 to 155 characters and unique", () => {
  const descriptions = [
    ...services.map((service) => service.metaDescription),
    ...locationProvinces.map((province) => province.metaDescription),
    ...allTowns.map((town) => townContent(town).metaDescription),
    ...guides.map((guide) => guide.metaDescription),
    ...pests.map((pest) => pest.metaDescription),
    ...industries.map((industry) => industry.metaDescription),
  ];
  for (const description of descriptions) {
    assert.ok(description.length >= 120 && description.length <= 155, `${description.length}: ${description}`);
  }
  assert.equal(new Set(descriptions).size, descriptions.length, "descriptions must be unique");
});

test("page H1s are unique across the site", () => {
  const headings = [
    ...services.map((service) => service.heading),
    ...launchedProvinceContent.map(({ content }) => content.heading),
    ...launchedTownContent.map(({ content }) => content.heading),
    ...guides.map((guide) => guide.title),
    ...pests.map((pest) => pest.title),
    ...industries.map((industry) => industry.title),
    ...galleryItems.map((item) => item.heading),
  ].map((heading) => heading.toLowerCase());
  assert.equal(new Set(headings).size, headings.length, "H1s must be unique");
});

test("every PSGC city and municipality has exactly one town page", () => {
  assert.equal(psgcProvinces.length, 12);
  assert.equal(allTowns.length, psgcProvinces.reduce((sum, province) => sum + province.towns.length, 0));
  assert.equal(allTowns.length, 273, "Laguna, Batangas, Cavite, Rizal, Quezon, NCR and six Bicol provinces have 273 LGUs");
  for (const province of locationProvinces) {
    const slugs = province.towns.map((town) => town.slug);
    assert.equal(new Set(slugs).size, slugs.length, `${province.slug} town slugs must be unique`);
    for (const town of province.towns) {
      assert.match(town.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, town.key);
      assert.ok(town.coordinates, `${town.key} needs coordinates (scripts/fetch-coordinates.mjs)`);
      assert.ok(town.barangays.length > 0, `${town.key} needs barangays`);
    }
  }
  assert.ok(launchedTowns.length > 0, "at least one province must be launched");
});

test("town notes, gallery jobs and office towns point to real town pages", () => {
  for (const key of Object.keys(townNotes)) assert.ok(townByKey(key), `town-notes.js key ${key} has no town`);
  for (const item of galleryItems) {
    if (item.town) assert.ok(townByKey(item.town), `${item.slug} links to unknown town ${item.town}`);
  }
  for (const office of officeTowns) {
    const town = allTowns.find((item) => item.path === office.path);
    assert.ok(town?.hasOffice, `${office.path} must be an office town`);
    assert.ok(town.province.launched, `${office.path} must be in a launched province`);
  }
});

test("every launched town page links to its province hub and at least 6 nearby towns", async () => {
  const page = await readFile(new URL("../app/pest-control/[province]/[town]/page.tsx", import.meta.url), "utf8");
  assert.match(page, /href=\{province\.path\}/);
  for (const { town, content } of launchedTownContent) {
    assert.ok(content.neighbours.length >= 6, `${town.key} has ${content.neighbours.length} neighbours`);
    for (const neighbour of content.neighbours) assert.ok(launchedTowns.some((item) => item.path === neighbour.path), `${town.key} links to unlaunched ${neighbour.path}`);
    assert.ok(content.faqs.length >= 4, `${town.key} needs at least 4 FAQs`);
  }
});

test("only town pages with real local content are indexable", () => {
  const report = townQualityReport();
  for (const town of allTowns) {
    const quality = report.get(town.key);
    assert.ok(quality, town.key);
    if (!quality.indexable) continue;
    const content = townContent(town);
    const local = town.hasOffice || townJobs(town).length > 0 || content.noteWords >= minNoteWords;
    const unique = quality.similarity < maxSimilarity && quality.words >= minUniqueWords;
    assert.ok(local || unique, `${town.key} is indexable without local or unique content`);
  }
  for (const office of officeTowns) assert.ok(report.get(office.path.replace("/pest-control/", ""))?.indexable, `${office.path} must be indexable`);
});

test("noindex town pages stay out of the sitemap, and town pages never claim a local address", async () => {
  const sitemap = await readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8");
  assert.match(sitemap, /launchedTowns\.filter\(isTownIndexable\)/);
  const page = await readFile(new URL("../app/pest-control/[province]/[town]/page.tsx", import.meta.url), "utf8");
  assert.match(page, /noindex: !isTownIndexable\(town\)/);
  assert.doesNotMatch(page, /LocalBusiness|PostalAddress/);
});

test("no internal link points at a redirected URL", async () => {
  const config = await readFile(new URL("../next.config.ts", import.meta.url), "utf8");
  const redirected = [...config.matchAll(/source: "([^"]+)"/g)].map((match) => match[1]);
  assert.ok(redirected.length >= 5);
  const files = [
    "app/layout.tsx", "app/page.tsx", "app/sitemap.ts", "app/about/page.tsx", "app/contact/page.tsx", "app/faq/page.tsx",
    "app/service-areas/page.tsx", "app/treated-locations/page.tsx", "app/gallery/[slug]/page.tsx", "app/services/[slug]/page.tsx",
    "app/guides/[slug]/page.tsx", "components/site/site-chrome.tsx", "data/locations/provinces.js", "data/chatbot-knowledge.ts",
  ];
  for (const file of files) {
    const source = await readFile(new URL(`../${file}`, import.meta.url), "utf8");
    for (const path of redirected) assert.ok(!source.includes(`"${path}"`) && !source.includes(`\`${path}\``), `${file} links to redirected ${path}`);
  }
});

test("every gallery photo has a caption", () => {
  for (const item of galleryItems) {
    assert.equal(item.imageCaptions?.length, item.imagePaths.length, `${item.slug} needs one caption per photo`);
    if (item.beforeImage && item.afterImage) assert.equal(item.comparisonCaptions?.length, 2, `${item.slug} needs before and after captions`);
  }
});

test("gallery case studies reach 500 words once three sections are filled", () => {
  for (const item of galleryItems) {
    const study = item.caseStudy ?? {};
    const filled = [study.problem, study.findings, study.treatment, study.areaTreated, study.aftercare].filter((value) => (Array.isArray(value) ? value.length > 0 : Boolean(value)));
    if (filled.length < 3) continue;
    const total = words(item.description, ...(study.problem ?? []), ...(study.findings ?? []), ...(study.treatment ?? []), study.areaTreated, ...(study.aftercare ?? []));
    assert.ok(total >= 500, `${item.slug} case study has ${total} words`);
  }
});

test("guides link to real services, pests and guides, and end with a call to action", () => {
  for (const guide of guides) {
    assert.ok(services.some((service) => service.slug === guide.relatedService), `${guide.slug} relatedService`);
    assert.ok(pests.some((pest) => pest.slug === guide.relatedPest), `${guide.slug} relatedPest`);
    for (const slug of guide.related) assert.ok(guides.some((item) => item.slug === slug && slug !== guide.slug), `${guide.slug} related ${slug}`);
    assert.equal(guide.sections.at(-1)?.id, "when-to-call");
    assert.ok(guide.sections.some((section) => section.table || (section.list?.length ?? 0) >= 4), `${guide.slug} needs a table or checklist`);
    assert.equal(guide.faqs.length, 3, `${guide.slug} needs 3 FAQs`);
    assert.match(guide.dateModified, /^\d{4}-\d{2}-\d{2}$/);
    const total = words(guide.summary, ...guide.faqs.flatMap((faq) => [faq.question, faq.answer])) + sectionWords(guide.sections);
    assert.ok(total >= 750, `${guide.slug} has ${total} words of guide content`);
  }
});

test("every guide is linked from the location pages", () => {
  for (const guide of guides) {
    const links = launchedTownContent.filter(({ content }) => content.guides.some((item) => item.slug === guide.slug)).length
      + launchedProvinceContent.filter(({ content }) => content.guides.some((item) => item.slug === guide.slug)).length;
    assert.ok(links >= 12, `${guide.slug} is linked from only ${links} location pages`);
  }
});

test("pest and industry pages are substantial and link to real pages", () => {
  for (const pest of pests) {
    assert.ok(services.some((service) => service.slug === pest.relatedService), `${pest.slug} relatedService`);
    for (const slug of pest.relatedGuides) assert.ok(guides.some((guide) => guide.slug === slug), `${pest.slug} guide ${slug}`);
    assert.ok(pest.faqs.length >= 5, `${pest.slug} needs 5 FAQs`);
    const total = words(pest.summary, ...pest.faqs.flatMap((faq) => [faq.question, faq.answer])) + sectionWords(pest.sections);
    assert.ok(total >= 800, `${pest.slug} has ${total} words`);
  }
  for (const industry of industries) {
    for (const slug of industry.relatedPests) assert.ok(pests.some((pest) => pest.slug === slug), `${industry.slug} pest ${slug}`);
    for (const slug of industry.relatedGuides) assert.ok(guides.some((guide) => guide.slug === slug), `${industry.slug} guide ${slug}`);
    const total = words(industry.summary, ...industry.faqs.flatMap((faq) => [faq.question, faq.answer])) + sectionWords(industry.sections);
    assert.ok(total >= 600, `${industry.slug} has ${total} words`);
  }
});

test("guide drafts are never built into pages", async () => {
  assert.ok(guideDrafts.length >= 12);
  for (const draft of guideDrafts) assert.ok(draft.ownerToConfirm.length > 0, draft.title);
  for (const file of ["app/sitemap.ts", "app/guides/page.tsx", "app/guides/[slug]/page.tsx"]) {
    const source = await readFile(new URL(`../${file}`, import.meta.url), "utf8");
    assert.doesNotMatch(source, /guide-drafts/, `${file} must not import drafts`);
  }
});

test("trust facts stay hidden until DMSA fills them in", async () => {
  const component = await readFile(new URL("../components/site/trust-facts.tsx", import.meta.url), "utf8");
  assert.match(component, /if \(items\.length === 0\) return null;/);
  for (const value of Object.values(trustFacts)) assert.equal(typeof value, "string");
});

test("sitemap lists the hubs, towns, pests, industries, guides and money pages", async () => {
  const sitemap = await readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8");
  for (const route of ['"/service-areas"', "launchedLocationProvinces", "isTownIndexable", '"/pests"', "`/pests/${slug}`", '"/industries"', "`/industries/${slug}`", '"/pest-control-price"', '"/termite-inspection"', '"/guides"', "`/guides/${guide.slug}`", '"/faq"']) {
    assert.ok(sitemap.includes(route), `sitemap is missing ${route}`);
  }
});

test("the main office and branch addresses are kept separate", () => {
  assert.doesNotMatch(siteConfig.address, /Los Baños/);
  assert.match(siteConfig.additionalLocation, /Los Baños/);
});
