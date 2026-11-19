# DMSA Local SEO Expansion: Audit and Implementation Prompts

Prepared November 19, 2026. Source data: the Screaming Frog crawl exports in `pest-control-competitors/` for **Entom, JTO, Lapitan, Melman, Rentokil and DMSA**, plus the live checks from the previous audit (`SEO-ACTION-PLAN.md`).

**How to use this file.** Part 1 is the audit. Part 2 is the honest picture of what ranking "top 1" for "pest control near me" requires. Part 3 has the prompts: paste them into Claude Code **one at a time, in order**, and check each result before moving on. Part 4 is what only the owner can do. Part 5 is the list of every city and municipality in the target provinces.

---

## Part 1. Audit results

### 1.1 Competitor comparison (indexable HTML pages only)

| | DMSA | Rentokil (PH section) | JTO | Entom | Melman | Lapitan |
|---|---|---|---|---|---|---|
| Indexable pages | 30 | 163 under `/ph` (274 site-wide in the crawl) | 89 (about 40 are thin date/category archives) | 19 | 3 | 3 (Wix subdomain) |
| Location pages | 3 towns + 2 provinces | 4 branch pages (Manila, Cebu, Davao, Pampanga), 950–1,170 words | 3 region categories (Metro Manila, Calabarzon, Central Luzon), thin archives | none | none | none |
| Pest-specific pages | none (pests sit inside 4 service pages) | ~25 pests, each a silo: hub, species, signs, how to get rid, prevention, FAQ | 8 pest pages, two with the wrong title ("Mosquito" on bee page, "Fleas" on spiders page) | 1 pest library page (2,145 words) | none | none |
| Industry pages | 1 (commercial) | 14 (hotels, restaurants, food processing, schools, offices, hospitals, etc.) | none | 1 article | none | none |
| Blog / guides | 6 guides, 439–566 words | ~10 blog posts | ~40 posts, about one a month, 800–1,700 words | 5 posts | none | none |
| Price page | no | yes ("Pest Control Price", 889 words) | no | no | no | no |
| Missing meta descriptions | 0 | 1 | **89 of 89** | **19 of 19** | 0 | 3 of 3 |
| Titles over 60 chars | 0 | 29 | 19 | 4 | 0 | 0 |
| Duplicate H1s | 2 | 42 | 0 | 0 (5 missing) | 0 | 0 (1 missing) |
| Missing canonical | 0 | 0 | 53 | 2 | 0 | 0 |
| Open Graph image | all pages | 27 missing | all missing | all missing | all missing | all missing |
| Broken links | 0 | 2 internal, 8 external | 18 external | 1 internal | 1 internal | 3 external |
| Average response time | 564 ms | 617 ms | 796 ms | 1,079 ms | 93 ms | 181 ms |
| Language tag | en-PH | en-PH (plus ~60 country variants) | en-US | en-US | en-US | en |

**What this shows**

- **DMSA already has the cleanest technical SEO of the six.** No broken links, no missing tags, no duplicate titles, correct canonicals, Open Graph and X (Twitter) cards everywhere, and the only en-PH language tag among the small competitors.
- **DMSA loses on size and coverage, not quality.** Rentokil wins on authority (a global brand domain) and on depth: a full content silo for every pest. JTO wins on volume of fresh posts.
- **Nobody owns the town-level searches.** Rentokil has only four PH city pages, none in Laguna, Batangas, Cavite, Rizal, Quezon or Bicol. JTO's "Calabarzon" page is a thin category archive. Searches like "pest control Calamba", "anay treatment Naga" or "termite control Dasmariñas" are an open gap that DMSA can fill.
- **What to copy from Rentokil:** pest silos, industry pages, branch pages over 900 words, a price-factors page, and termite inspection, warranty and FAQ pages.
- **What to copy from JTO:** a steady publishing rhythm.
- **What to avoid from JTO:** indexed date and category archives, missing meta descriptions, and mislabelled pages.

### 1.2 Issues the crawl found on DMSA

| # | Issue | Pages | Fix (prompt) |
|---|---|---|---|
| 1 | Duplicate H1: "Residential Termite Control and Soil Poisoning" | `/gallery/marymount-…` and `/gallery/langkiwa-binan-…` | P1 |
| 2 | Meta description over 155 characters, the length Screaming Frog flags as cut off | `/services/commercial-pest-control` (156), `/contact` (156), `/guides/soil-poisoning-before-construction` (158) | P1 |
| 3 | Thin pages under 300 words (Screaming Frog counts body text only) | `/request-quote` 181, `/contact` 190, `/gallery/*` 225–261, `/guides` 270, `/about` 281 | P1 and P6 |
| 4 | Guides and gallery jobs get few internal links: 5–11 unique inlinks, against 36 for pages in the menu | all `/guides/*`, `/gallery/*` | P1 and P2 |
| 5 | The largest image variant served is 3840px wide (200–300 KB JPEG). There is no AVIF or WebP setting. | homepage slides and gallery photos | P1 |
| 6 | Five `/request-quote?service=…` URLs are crawlable. Each correctly points its canonical to `/request-quote`, so this is low priority. | quote links | P1 (optional) |
| 7 | The homepage reads as "HARD" (Flesch 45) | `/` | P1 |
| 8 | Only 5 location pages, against the 273 cities and municipalities you want to cover | `/pest-control/*`, `/service-areas/*` | P2 |
| 9 | No pest-specific pages for ipis, daga, langgam, langaw or gamu-gamo searches | none exist | P3 |
| 10 | No price-factors, inspection, warranty or licence/trust pages | none exist | P4 |
| 11 | Guides are 439–566 words; competitors' posts are 800–1,700 | `/guides/*` | P5 |

**Crawl settings to fix before the next audit.** Every site, Rentokil included, shows **0 structured data** and empty PageSpeed and accessibility columns. Rentokil certainly has structured data, so this means those features were switched off in Screaming Frog, not that the sites lack markup. For the next crawl:

- Turn on Configuration → Spider → Extraction → **JSON-LD, Microdata, RDFa**, plus **Schema.org and Google Rich Result validation**.
- Connect the **PageSpeed Insights API** (Configuration → API Access).
- Turn on **JavaScript rendering**.

DMSA's JSON-LD was already checked separately: valid, with no broken references.

---

## Part 2. What "top 1 for pest control near me" requires

1. **"Near me" searches are mostly decided by the Google Maps results**, the map box at the top. Those results rank Google Business Profiles by **distance from the searcher, relevance and prominence** (mostly reviews). The website helps with relevance, but it cannot put DMSA in the map box in Batangas or Cavite when the nearest DMSA address is in Los Baños or San Fernando. **Never create a fake or virtual office address.** That breaks Google's rules, and the profile gets suspended.
2. **The website can rank in the normal results** for "pest control [town]", "anay treatment [town]" and "termite control [province]" in every town DMSA serves. That is what the location pages in P2 are for.
3. **273 near-identical town pages would hurt the whole site.** Google's spam policies name "doorway pages" and "scaled content abuse", meaning pages made only to rank for each town name with swapped words. A penalty would pull down the pages that already rank. P2 therefore:
   - puts **every** city and municipality on the site, through province pages plus one page per town;
   - gives each town page real data that differs from town to town (its barangays, the distance and which DMSA office serves it, nearby jobs, neighbouring towns, local questions);
   - runs an **automatic quality gate**: a town page that is still too similar to the others stays visible to visitors but is marked `noindex, follow` and left out of the sitemap until it has more local content. As jobs, reviews and owner notes are added, pages are promoted automatically.
4. **Nobody can guarantee position 1.** The plan raises DMSA's chances as far as the website can. The remaining gap versus Rentokil is links and reviews (Part 4), not code.

---

## Part 3. Implementation prompts (run in order)

> **Rules for every prompt. Paste these with each one.**
> - Do **not** modify `app/api/contact/route.ts`: no changes to its sending code, transports, recipients or environment variables.
> - Never commit, print or repeat `.env.local`.
> - Do not invent facts: no prices, years, licence numbers, warranties, chemical brands, jobs, reviews or awards that are not already in the repo or supplied by the owner. Where a fact is missing, leave a `TODO(owner)` comment and hide that block. Never publish a placeholder.
> - Keep the current design system and components (`app/globals.css`, `components/site/*`). Check desktop (1366px) and mobile (390px) in light and dark mode, with no horizontal scroll.
> - Before finishing: `npm test`, `npm run lint` and `npm run build` all pass. Run the verification script from P7 against `npm start`.
> - Do not commit or deploy until I say so.

---

### P1. Fix the crawl issues

```
Fix the issues the Screaming Frog crawl found on the DMSA site. Follow the rules block above.

1. Duplicate H1. The gallery jobs "marymount-village-anos-los-banos-termite-control-soil-poisoning" and
   "langkiwa-binan-termite-control-soil-poisoning" share the H1 "Residential Termite Control and Soil Poisoning".
   Make each gallery H1 include the place, e.g. "Termite Control and Soil Poisoning in Marymount Village, Los Baños".
   Use the data in data/gallery-data.js and add a contract test that all H1s across sitemap pages are unique.

2. Meta descriptions. Shorten these to 120–155 characters without losing the town, service or free-inspection hook:
   /services/commercial-pest-control (156), /contact (156), /guides/soil-poisoning-before-construction (158).
   Change the description-length test in tests/dmsa-contract.test.ts from 120–160 to 120–155.

3. Thin pages (Screaming Frog body-text words in brackets). Add useful content, not padding:
   - /request-quote (181): a short "What happens after you send this" list (review, call or Viber, free ocular inspection,
     written quotation), which services can be quoted, the service areas served and links to the FAQ. Keep the form first.
   - /contact (190): office hours ONLY if they are in data/site-data.js (otherwise TODO(owner)), both addresses with
     the provinces each office covers, how fast DMSA replies (only if stated in the repo), and links to the request-quote,
     service-area and FAQ pages.
   - /guides (270): a one-paragraph intro per guide category and an "Ask us" block linking to /faq.
   - /about (281): expand using only facts in the repo (offices, services, areas, completed jobs). Add TODO(owner)
     slots for founding year, team size, FPA licence number and certifications, and hide each slot until it is filled.
   Gallery job pages are handled in P6.

4. Internal links to guides. Every guide must have at least 12 unique internal links pointing to it.
   - Add a "Related guides" block (2–3 guides chosen by topic) to the service, town and province pages and to /faq.
   - Add a test that counts inlinks to each guide from the built pages.

5. Images. In next.config.ts:
   - set images.formats to ["image/avif", "image/webp"];
   - set images.deviceSizes to [640, 750, 828, 1080, 1200, 1920] (the source photos are 1920px wide, so 2048 and 3840 add nothing).
   Check that every next/image has a correct `sizes` prop. Re-check LCP on / and /gallery with the CDP script
   from the earlier audit and report before/after.

6. Optional. The links to /request-quote?service=… are fine: each points its canonical to /request-quote.
   Leave them unless the change is trivial.

7. Homepage readability. Rewrite the longest sentences in the homepage copy (data/page-content-data.js) into
   sentences under 20 words. Keep every keyword phrase.

Report each change with file:line, plus the test output.
```

---

### P2. Location pages for every city and municipality (the main project)

```
Build location pages for every city and municipality in the provinces DMSA serves: Laguna, Batangas, Cavite,
Rizal, Quezon, Metro Manila (NCR) and Bicol (Albay, Camarines Norte, Camarines Sur, Catanduanes, Masbate,
Sorsogon). That is 273 cities and municipalities in all. Follow the rules block above. Read the current
implementation first: data/towns-data.js, data/service-areas-data.js, app/pest-control/[town]/page.tsx,
app/service-areas/*, lib/seo.ts, lib/content-types.ts, app/sitemap.ts and tests/dmsa-contract.test.ts.

A. DATA (official sources only)
1. Download the latest PSGC publication from the Philippine Statistics Authority (psa.gov.ph/classification/psgc).
   Write a one-off script in scripts/ that extracts, for the 12 provinces/NCR above:
   province, city/municipality (name, PSGC code, city or municipality) and its barangays.
   Save it as data/locations/psgc.json. Cross-check the result against the list in SEO-EXPANSION-PROMPT.md Part 5
   and report every difference. Do not guess.
2. Coordinates: for each city/municipality, get the town-centre coordinates from OpenStreetMap Nominatim.
   Send at most 1 request per second, use a generic User-Agent ("dmsa-site-build") and no personal details,
   and cache the results to data/locations/coordinates.json.
   Flag any point more than 40 km from its province's other towns for manual review.
3. data/locations/provinces.js: one entry per province (and NCR as "Metro Manila") with:
   slug, name, region, servedFrom ("main" | "branch"), an intro of 2–3 sentences, and FAQs.
   Default servedFrom: Bicol provinces → main (San Fernando, Camarines Sur); all others → branch (Los Baños).
   Mark it TODO(owner) to confirm, and allow a per-town override for border towns
   (e.g. eastern Quezon: Tagkawayan, Calauag, Guinayangan).
   Island provinces (Catanduanes, Masbate) and island municipalities (e.g. Tingloy, Jomalig, Polillo, Rapu-Rapu,
   Burdeos, Panukulan, Patnanungan) get an `access` note slot that stays hidden until the owner confirms how they are served.
4. data/locations/town-notes.js: an optional, owner-supplied enrichment file keyed by PSGC code:
   { barangaysServed?: string[], localNotes?: string[], faqs?: Faq[] }. It is empty for now.
   Existing town content in data/towns-data.js (Los Baños, Biñan, San Fernando) moves here, so nothing is lost.

B. URLS AND REDIRECTS
- Province hub:  /pest-control/[province]          e.g. /pest-control/laguna, /pest-control/metro-manila
- Town page:     /pest-control/[province]/[town]   e.g. /pest-control/laguna/calamba, /pest-control/camarines-sur/naga
  The province is part of the URL because many town names repeat across provinces
  (San Fernando, Rosario, San Jose, San Juan, Talisay, Bato, Baras, San Pascual, Magallanes, San Andres).
- Slugs: lowercase ASCII with ñ→n ("las-pinas", "paranaque", "binan", "dasmarinas"). Cities whose official name
  includes "City" drop it unless needed to tell them apart ("batangas-city", "cavite-city", "quezon-city",
  "masbate-city", "sorsogon-city" keep it).
- Permanent redirects in next.config.ts:
  /pest-control/los-banos → /pest-control/laguna/los-banos
  /pest-control/binan → /pest-control/laguna/binan
  /pest-control/san-fernando-camarines-sur → /pest-control/camarines-sur/san-fernando
  /service-areas/laguna → /pest-control/laguna
  /service-areas/bicol-camarines-sur → /pest-control/camarines-sur
- Keep /service-areas as the hub of hubs, grouped by region (Calabarzon, Metro Manila, Bicol), with every province
  linked and every city/municipality listed under its province.
- Update every internal link, the footer "Service areas" column, the sitemap, the schema areaServed lists and the tests
  to the new URLs. No internal link may hit a redirect.

C. TOWN PAGE CONTENT (each block must be built from that town's own data)
1. H1: "Pest control and termite (anay) treatment in {Town}, {Province}".
   Title: "Pest Control in {Town}, {Province} | DMSA Pest Control". When that is over 60 characters,
   use "Pest Control in {Town}, {Province} | DMSA", then "Pest Control in {Town} | DMSA". A test enforces ≤60.
   Meta description: 120–155 characters naming the town, anay/termite and general pest control, the serving
   office and the free ocular inspection. It must be unique.
2. Who serves the town: which DMSA office covers it, and the straight-line distance in km (say "straight-line
   distance", not travel time). Use the per-town access note when confirmed.
3. Barangays: "DMSA serves homes and businesses across {Town}'s {N} barangays, including …". Show the full list in a
   collapsible block. If barangaysServed is set in town-notes, list those first as "areas we have served".
4. Jobs: DMSA jobs in the town first, then the nearest jobs in the same province, each with distance in km,
   using the existing ProjectCard. No job within 60 km → hide the block.
5. Services: the 4 services with one line each, written for this context: residential, plus commercial when the town
   is a city, and pre-construction soil poisoning.
6. Neighbouring towns: the 6 nearest towns in any served province, linked. This is the main internal-linking mesh.
7. Local FAQ (4–5 questions) built from the town's data: Do you serve {Town}? Which office serves {Town}?
   How do I book an inspection in {Town}? Do you treat termites before construction in {Town}?
   Plus any FAQs from town-notes.
   Use the existing FaqSection, which outputs FAQPage markup that matches the visible text.
8. Owner notes (localNotes), shown only when present.
9. Request-quote call to action, with the town pre-filled in the form only if this works without touching the API
   route. The form already sends its fields as-is, so add nothing new to the API.
10. Related guides (2–3) and the province hub link.
Schema: pageSchema (WebPage + BreadcrumbList: Home › Service areas › {Province} › {Town}), plus a Service node
with provider = the serving office's @id, areaServed = { "@type": "City" (or "AdministrativeArea" for
municipalities), name, containedInPlace: { "@type": "AdministrativeArea", name: province } }.
Do NOT add a LocalBusiness node with an address for towns where DMSA has no office.

D. PROVINCE HUB CONTENT
H1 "Pest control and termite (anay) treatment in {Province}". The hub has:
- the serving office and how scheduling works;
- every city and municipality, linked and grouped as cities then municipalities;
- DMSA jobs in the province;
- the services;
- a province FAQ (FaqSection);
- related guides.
Target: 600+ words of body text. Schema: WebPage + BreadcrumbList + ItemList of the town pages.

E. QUALITY GATE (protects the whole site from doorway/thin-content signals)
1. lib/location-quality.ts: for each town page, render the main body text with the town, province and barangay names
   replaced by placeholder tokens. Compute 5-word shingles, then the Jaccard similarity against every other town page.
2. A town page is "indexable" when EITHER:
   (a) it has an office, a DMSA job in the town, or owner notes of 120 words or more; OR
   (b) its highest similarity to any other town page is below 0.55 AND it has at least 450 words of body text.
3. Non-indexable town pages still render and are linked from their province hub, but get
   robots: { index: false, follow: true } and are left out of sitemap.xml. Province hubs are always indexable.
4. Add `npm run seo:locations`, which prints a table: town, words, max similarity (and to which page), indexable,
   and the reason. Add a contract test that fails when an indexable town page breaks the rule in E.2.
5. Report how many pages are indexable after the build, per province.
   Do NOT pad pages with generic text to pass the gate: the fix for a non-indexable page is real local content.

F. ROLLOUT ORDER (so Google sees a steady build-up, not 273 pages at once)
Add a `launchWave` field per province and only include provinces whose wave has launched (a constant in
data/locations/provinces.js):
  Wave 1: Laguna, Camarines Sur
  Wave 2: Batangas, Cavite, Rizal, Metro Manila
  Wave 3: Quezon, Albay, Camarines Norte, Sorsogon
  Wave 4: Catanduanes, Masbate
Ship wave 1 now. Leave a note in SEO-EXPANSION-PROMPT.md on how to launch the next wave
(change one constant, run the tests, deploy).

G. TESTS (add to tests/dmsa-contract.test.ts)
- Every PSGC city/municipality in a launched province has exactly one page, and its slug is unique within the province.
- Titles ≤60 characters and unique. Descriptions 120–155 characters and unique. H1s unique.
- Every town page links to its province hub and to at least 6 neighbouring towns.
- No internal link points at a redirected URL.
- The sitemap holds exactly the indexable pages, and no noindex page appears in it.
- No LocalBusiness address on any town page without an office.
Finally run the P7 verification and report.
```

---

### P3. Pest pages (the content silo Rentokil uses)

```
Add pest-specific pages. Follow the rules block above.
First list for me which pests DMSA actually treats, based on data/services-data.js. Do not create a page for a pest
the services data does not cover. For mosquitoes (lamok) and bed bugs (surot), ask me before building.

Route: /pests and /pests/[slug]. Each page targets the English and Filipino name:
- /pests/termites-anay: also covers "gamu-gamo" (the flying swarmers seen at the start of the rainy season).
  This page is about identifying the pest. /services/termite-control stays the page that sells the service, and the two
  must not compete for the same keyword. Link each to the other.
- /pests/cockroaches-ipis, /pests/ants-langgam, /pests/rodents-daga, /pests/flies-langaw
For each page (800+ words of body text):
- what it is and the species common in Philippine homes (general, well-established facts only);
- signs of infestation;
- why it matters (health or property risk, stated carefully);
- prevention a homeowner can do;
- how DMSA treats it, taken ONLY from the services data;
- when to call a professional;
- FAQ (5) using FaqSection;
- related guides, the related service page and the "Find your town" link to /service-areas.
Schema: pageSchema + FAQPage (via FaqSection). Add /pests to the header or footer navigation and the sitemap.
Keyword map: add a table to SEO-EXPANSION-PROMPT.md listing each target phrase and the one URL that owns it,
so no two pages compete for the same phrase.
Tests: titles, descriptions, word count ≥ 800 (Screaming Frog-style body text) and FAQ visibility.
```

---

### P4. Trust and money pages

```
Add trust and decision pages that competitors use to win clicks. Follow the rules block above.
Never invent a number, licence, warranty term or certification. Each page shows only what the repo or
the owner has confirmed. Mark missing items TODO(owner) and hide them.

1. /pest-control-price: "What affects the cost of pest control and termite treatment in the Philippines".
   Explain the factors (property size, type of treatment, extent of infestation, pre- vs post-construction,
   one-time vs scheduled service, distance), and that DMSA gives a written quotation after a free ocular
   inspection. Include a price-range table ONLY if I supply ranges. Link /guides/what-affects-termite-treatment-cost
   (merge or cross-link so the two pages do not compete for the same keyword) and /request-quote.
2. /termite-inspection: what the free ocular inspection covers, how to prepare, what you get afterwards.
   Use only facts already in the services data and FAQs.
3. Trust block component: FPA licence number, years in operation, number of jobs, warranty/re-treatment
   policy and the chemical classes used. Each item renders only when filled in data/site-data.js. Show the block on
   the home, about, service and town pages. Add the same facts to the Organization schema once filled
   (e.g. hasCredential for the FPA licence).
4. /pest-control/industries (only for sectors already named in the services data: offices, shops,
   warehouses, buildings under construction; ask me before adding restaurants, schools, hotels or condominiums).
   Each sector page is 600+ words with a sector FAQ.
Add them to the sitemap, navigation and tests.
```

---

### P5. Longer guides and a publishing rhythm

```
Strengthen the guides and set up a publishing rhythm. Follow the rules block above.
1. Expand the 6 existing guides to 900–1,300 words each. Add:
   - a "Quick answer" paragraph at the top (helps AI Overviews and featured snippets);
   - one table or checklist;
   - a "When to call a professional" section;
   - 3 FAQs via FaqSection;
   - links to the related pest, service and province pages.
   No new factual claims beyond common, well-established knowledge. Keep the Article schema and add dateModified.
2. Draft (do not publish) 12 new guide outlines as data entries with `draft: true`, excluded from the build.
   Each is a question people search in the Philippines, e.g.:
   - "What are gamu-gamo and do they mean I have anay?"
   - "When is termite swarming season in Luzon?"
   - "Is pest control safe for kids and pets?"
   - "How long after pest control can we go back inside?"
   - "Daga sa kisame: how to tell rats from mice"
   - "Soil poisoning vs termite baiting"
   - "How often should a restaurant have pest control?"
   - "Anay in wooden cabinets: what to do"
   - "Termite inspection before buying a house"
   - "Why ants keep coming back after spraying"
   - "Cockroaches in condos: where they come from"
   - "Rainy season pest checklist for homes"
   For each outline give: target keyword, the one URL it supports, an H2 outline and the facts the owner must confirm.
3. Add a GUIDE-CALENDAR.md that schedules 2 guides per month. Each guide is finished, owner-checked, then published.
Never index thin archive pages: no date or category archives like JTO's.
```

---

### P6. Gallery jobs as case studies

```
Turn each gallery job into a case study of 500+ words without inventing details. Follow the rules block above.
For each job in data/gallery-data.js, add optional fields:
  problem (what the client saw), findings (inspection results), treatment steps, area treated,
  follow-up/after-care, client quote (only with permission).
Render each section only when filled. Add TODO(owner) prompts listing the questions I need to answer per job.
Link each job to its town page, province hub, the service it used and the matching pest page.
Add a case-study test: once a job has 3+ filled sections, it must reach 500+ words of body text.
```

---

### P7. Verification (run after every prompt)

```
Verify the site after the changes. Do not change code in this step unless a check fails; if one does, report it first.
1. npm test, npm run lint, npm run build — all pass.
2. Start the production server (npm start). Run an SEO check script over every URL in /sitemap.xml:
   - status 200; exactly 1 H1; title ≤60 characters and unique; description 120–155 characters and unique;
   - canonical equals the URL; valid JSON-LD; every @id reference resolves; at most one FAQPage per page;
   - every FAQ question and answer appears in the visible text;
   - body word count; unique internal inlinks per page.
3. Check that the redirects return 308/301 to the right target, that noindex town pages are not in the sitemap,
   and that unknown URLs return 404.
4. Run `npm run seo:locations` and report indexable vs. non-indexable town pages per province.
5. Measure LCP and CLS on /, one province hub, one town page, one pest page and /gallery with the CDP script
   (412px mobile, 4× CPU throttle, 1.6 Mbps download). Targets: LCP ≤ 2.5s, CLS ≤ 0.1.
6. Screenshots at 1366px and 390px, in light and dark mode, of one province hub, one town page and one pest page.
   Check for horizontal scroll.
Give me a pass/fail table.
```

---

## Part 4. Owner tasks (these decide the map results and "near me")

| # | Task | Why | Notes |
|---|---|---|---|
| O1 | **Google Business Profile for both offices** (San Fernando main office; Los Baños branch) | The map box at the top of "near me" searches comes only from Business Profiles | Primary category "Pest control service". Same name, address and phone as the website. Add up to **20 service areas per profile** (see below). Then send me both Maps links for the `hasMap` schema. |
| O2 | **Reviews** | Reviews are the strongest lever on map ranking you control | Ask every finished client. A review that names the town and service ("anay treatment in Calamba") helps most. Reply to every review. Then publish them on /testimonials. |
| O3 | **Photos and posts on the profiles** | Shows Google the profile is active | Before-and-after photos from every job; one post a week. |
| O4 | **Custom domain** (e.g. dmsapestcontrol.ph or .com) | A `netlify.app` subdomain is weaker and harder to earn links for | Tell me the domain and I will move canonicals, the sitemap and redirects. |
| O5 | **Business listings** | Consistent name/address/phone across the web | Facebook Page (same details), Bing Places, Apple Business Connect, Waze, and Philippine business directories. |
| O6 | **Links from other sites** | The main reason Rentokil outranks small sites | Pest control association membership (if real), suppliers, subdivisions and homeowners' associations you have served, construction contractors (soil poisoning), local news or community pages. |
| O7 | **Facts for the site** | Needed by P1, P2, P4 and P6 | FPA licence number, founding year, team size, office hours, warranty/re-treatment policy, pests treated (mosquito? bed bugs?), sectors served, how island towns are served, barangays served per town, answers for each gallery job. |
| O8 | **Search Console** | Measures progress | After each wave: submit the sitemap, then check Pages → "Crawled – currently not indexed". Use Performance with a town-name filter to see which towns are gaining. |

**Suggested Business Profile service areas** (20 each, highest population and closest first; adjust to where you actually get jobs):

- **Los Baños branch:** Los Baños, Calamba, Santa Rosa, Biñan, San Pedro, Cabuyao, San Pablo, Bay, Calauan, Santa Cruz, Tanauan, Santo Tomas, Lipa, Batangas City, Dasmariñas, Bacoor, Imus, General Trias, Muntinlupa, Lucena.
- **San Fernando main office:** San Fernando, Naga, Pili, Iriga, Libmanan, Calabanga, Nabua, Goa, Legazpi, Daraga, Tabaco, Ligao, Polangui, Daet, Labo, Sorsogon City, Virac, Masbate City, Sipocot, Ragay.

Remember: a profile shows in the map box mainly for searchers near its address. Batangas, Cavite, Rizal, NCR and far-Bicol searches will lean on the **website** pages from P2 until DMSA has a real office or staff base there.

---

## Part 5. Cities and municipalities to cover (273)

Cross-check against the latest PSA PSGC publication before building (P2 step A1). Cities are marked **(c)**.

**Laguna (30):** Biñan (c), Cabuyao (c), Calamba (c), San Pablo (c), San Pedro (c), Santa Rosa (c), Alaminos, Bay, Calauan, Cavinti, Famy, Kalayaan, Liliw, Los Baños, Luisiana, Lumban, Mabitac, Magdalena, Majayjay, Nagcarlan, Paete, Pagsanjan, Pakil, Pangil, Pila, Rizal, Santa Cruz, Santa Maria, Siniloan, Victoria.

**Batangas (34):** Batangas City (c), Calaca (c), Lipa (c), Santo Tomas (c), Tanauan (c), Agoncillo, Alitagtag, Balayan, Balete, Bauan, Calatagan, Cuenca, Ibaan, Laurel, Lemery, Lian, Lobo, Mabini, Malvar, Mataasnakahoy, Nasugbu, Padre Garcia, Rosario, San Jose, San Juan, San Luis, San Nicolas, San Pascual, Santa Teresita, Taal, Talisay, Taysan, Tingloy, Tuy.

**Cavite (23):** Bacoor (c), Carmona (c), Cavite City (c), Dasmariñas (c), General Trias (c), Imus (c), Tagaytay (c), Trece Martires (c), Alfonso, Amadeo, General Emilio Aguinaldo, General Mariano Alvarez, Indang, Kawit, Magallanes, Maragondon, Mendez, Naic, Noveleta, Rosario, Silang, Tanza, Ternate.

**Rizal (14):** Antipolo (c), Angono, Baras, Binangonan, Cainta, Cardona, Jalajala, Morong, Pililla, Rodriguez (Montalban), San Mateo, Tanay, Taytay, Teresa.

**Quezon (41):** Lucena (c), Tayabas (c), Agdangan, Alabat, Atimonan, Buenavista, Burdeos, Calauag, Candelaria, Catanauan, Dolores, General Luna, General Nakar, Guinayangan, Gumaca, Infanta, Jomalig, Lopez, Lucban, Macalelon, Mauban, Mulanay, Padre Burgos, Pagbilao, Panukulan, Patnanungan, Perez, Pitogo, Plaridel, Polillo, Quezon, Real, Sampaloc, San Andres, San Antonio, San Francisco, San Narciso, Sariaya, Tagkawayan, Tiaong, Unisan.

**Metro Manila / NCR (17):** Caloocan (c), Las Piñas (c), Makati (c), Malabon (c), Mandaluyong (c), Manila (c), Marikina (c), Muntinlupa (c), Navotas (c), Parañaque (c), Pasay (c), Pasig (c), Quezon City (c), San Juan (c), Taguig (c), Valenzuela (c), Pateros.

**Albay (18):** Legazpi (c), Ligao (c), Tabaco (c), Bacacay, Camalig, Daraga, Guinobatan, Jovellar, Libon, Malilipot, Malinao, Manito, Oas, Pio Duran, Polangui, Rapu-Rapu, Santo Domingo, Tiwi.

**Camarines Norte (12):** Basud, Capalonga, Daet, Jose Panganiban, Labo, Mercedes, Paracale, San Lorenzo Ruiz, San Vicente, Santa Elena, Talisay, Vinzons.

**Camarines Sur (37):** Iriga (c), Naga (c), Baao, Balatan, Bato, Bombon, Buhi, Bula, Cabusao, Calabanga, Camaligan, Canaman, Caramoan, Del Gallego, Gainza, Garchitorena, Goa, Lagonoy, Libmanan, Lupi, Magarao, Milaor, Minalabac, Nabua, Ocampo, Pamplona, Pasacao, Pili, Presentacion, Ragay, Sagñay, San Fernando, San Jose, Sipocot, Siruma, Tigaon, Tinambac.

**Catanduanes (11):** Bagamanoc, Baras, Bato, Caramoran, Gigmoto, Pandan, Panganiban, San Andres, San Miguel, Viga, Virac.

**Masbate (21):** Masbate City (c), Aroroy, Baleno, Balud, Batuan, Cataingan, Cawayan, Claveria, Dimasalang, Esperanza, Mandaon, Milagros, Mobo, Monreal, Palanas, Pio V. Corpuz, Placer, San Fernando, San Jacinto, San Pascual, Uson.

**Sorsogon (15):** Sorsogon City (c), Barcelona, Bulan, Bulusan, Casiguran, Castilla, Donsol, Gubat, Irosin, Juban, Magallanes, Matnog, Pilar, Prieto Diaz, Santa Magdalena.

**Total: 273** (Laguna 30 + Batangas 34 + Cavite 23 + Rizal 14 + Quezon 41 + NCR 17 + Albay 18 + Camarines Norte 12 + Camarines Sur 37 + Catanduanes 11 + Masbate 21 + Sorsogon 15).

---

## Part 6. Implementation status (updated November 19, 2026)

P1–P7 are implemented, but not committed or deployed. `npm test` (40 tests), `npm run lint` and `npm run build` (114 pages) all pass. The P7 check of the production build found **0 problems** across 43 sitemap URLs and 64 noindex town pages.

### What was built

| Prompt | Result |
|---|---|
| **P1 crawl fixes** | Every gallery H1 is unique and names its place. All meta descriptions are 120–155 characters (enforced by a test). The thin pages were expanded (body words, before → after): `/request-quote` 181 → 418, `/contact` 190 → 369, `/guides` 270 → 378, `/about` 281 → 522. Each guide now has 36–75 internal links. Images are served as AVIF/WebP with a 1920px cap. The homepage copy uses shorter sentences. |
| **P2 locations** | All 273 cities and municipalities come from the PSA PSGC list via `scripts/fetch-psgc.mjs`. Calaca and Carmona are corrected to cities, because the source predates their cityhood laws. Town-centre coordinates come from OpenStreetMap. Each province has a hub page, each town has a page, and permanent redirects cover the old URLs. The quality gate lives in `lib/location-quality.ts`, with a report from `npm run seo:locations`. **Wave 1 (Laguna and Camarines Sur) is live**: 2 hubs and 67 town pages. Of these, 3 are indexable: Los Baños, Biñan and San Fernando. |
| **P3 pests** | `/pests` plus five pest pages: anay/gamu-gamo, ipis, langgam, daga and langaw. Each is 985–1,254 words with a table and 5 FAQs. Mosquitoes and bed bugs were not built, because they are not in the services data. |
| **P4 money and trust pages** | `/pest-control-price` and `/termite-inspection`. Four industry pages under `/industries`: offices, retail shops, warehouses and construction sites. A trust block and business schema facts that stay hidden until `trustFacts` in `data/site-data.js` is filled. |
| **P5 guides** | The 6 guides are now 974–1,157 words. Each has a quick answer, a table, three FAQs and a "When to call a professional" ending. 12 outlines are in `data/guide-drafts.js` (never built into pages), and the schedule is in `GUIDE-CALENDAR.md`. |
| **P6 case studies** | Optional `caseStudy` sections on gallery jobs, shown only when filled. The questions to answer are at the top of `data/gallery-data.js`. |
| **P7 checks** | No horizontal scroll at 390px or 1366px, in light or dark mode. Tables with 3+ columns stack on phones. Lab readings (4× CPU, throttled mobile network): LCP 1.0–1.3 s, CLS 0. |

### How to launch the next wave

1. In `data/locations/provinces.js`, change `launchedWave = 1` to `2`. Wave 2 is Batangas, Cavite, Rizal and Metro Manila.
2. Run `npm test` and `npm run seo:locations`.
3. Deploy, then resubmit `/sitemap.xml` in Search Console.

Wait until most wave-1 pages show as indexed in Search Console → Pages before launching the next wave.

### How a town page gets into Google

Add a completed job to `data/gallery-data.js` (with `town: "province/town"`), or add at least 120 words of `localNotes` for that town in `data/locations/town-notes.js`. Then rebuild. The page becomes indexable and is added to the sitemap automatically.

### Owner items still open

- **`data/site-data.js` → `trustFacts` (optional):** founding year, completed jobs, warranty policy and products. Also `priceRanges`. The owner chose not to show an FPA licence, so that item was removed.
- **`data/locations/provinces.js`:** confirm which office serves each province, and how island provinces and towns are reached (`accessNote`).
- **`data/locations/town-notes.js`:** local notes for priority towns, starting with Calamba, Santa Rosa, Cabuyao, San Pedro, Naga, Pili and Iriga. Also `servedFrom` for the Quezon border towns.
- **`data/gallery-data.js`:** case-study answers for each job.
- **`data/industries-data.js`:** confirm before adding restaurants, schools, hotels or condominiums.
- **Part 4 owner tasks:** Business Profiles, reviews, domain, listings and links.

### Keyword map (one URL per search)

| Search intent | URL that owns it |
|---|---|
| pest control [town] / anay treatment [town] | `/pest-control/<province>/<town>` |
| pest control [province] | `/pest-control/<province>` |
| pest control service areas, near me | `/service-areas` |
| termite control, anay treatment (service) | `/services/termite-control` |
| ant / cockroach / rodent control (service) | `/services/general-pest-control` |
| home pest control, condo pest control | `/services/residential-pest-control` |
| commercial pest control | `/services/commercial-pest-control` |
| anay, gamu-gamo, types of termites | `/pests/termites-anay` |
| ipis, cockroach infestation | `/pests/cockroaches-ipis` |
| langgam, ants keep coming back | `/pests/ants-langgam` |
| daga, rats in ceiling | `/pests/rodents-daga` |
| langaw, where flies come from | `/pests/flies-langaw` |
| pest control price Philippines | `/pest-control-price` |
| termite treatment cost | `/guides/what-affects-termite-treatment-cost` |
| free termite inspection | `/termite-inspection` |
| signs of termites at home | `/guides/signs-of-anay-termites-in-your-house` |
| soil poisoning before construction (homeowner guide) | `/guides/soil-poisoning-before-construction` |
| pre-construction termite treatment (contractors, builders) | `/industries/construction-sites` |
| termites vs ants, white ants | `/guides/anay-vs-ants-how-to-tell` |
| how to prepare for pest control | `/guides/how-to-prepare-for-pest-control-treatment` |
| keep cockroaches and ants out | `/guides/how-to-keep-cockroaches-and-ants-out` |
| office / shop / warehouse pest control | `/industries/<slug>` |
