# DMSA SEO Action Plan

Audited **November 19, 2026** against the live site, https://dmsapestcontrolservices.netlify.app, and the Total Mobile Install site (https://totalmobileinstall.com), which is the blueprint.

This file lists everything that needs to change for DMSA to rank as high as possible on Google. Section 4 covers the work only the owner can do. Section 5 covers website changes, each with a prompt you can paste into Claude Code.

## Implementation status (updated November 19, 2026)

**Done on the website:**
- **0.1 Deploy:** Privacy Policy, Terms of Service, the "How did you hear about DMSA?" field and the Biñan job.
- **1.1 Titles:** short `| DMSA Pest Control` suffix, keyword-first homepage title, and a test that keeps every title at 60 characters or fewer and unique.
- **1.2 Headings:** About H1 names the service area, and service pages have keyword headings.
- **1.3 FAQ markup:** on the homepage, service, area, town and FAQ pages. FAQ answers are now in the page HTML; before, they only loaded when someone opened them.
- **1.4 Business markup (partly):**
  - Done: the Los Baños branch as its own business entry, towns served, `knowsAbout`, WebPage + breadcrumbs on every page, and photo markup on gallery jobs.
  - Waiting on O.1 and O.7: `hasMap` and postal codes.
- **1.5 Address details:** main office and branch are separate everywhere. The wrong "Headquarters" labels are fixed.
- **1.6 Speed (partly):**
  - Done: gallery photos converted from PNG to JPG, 32.7 MB down to 3.6 MB.
  - Still to do: the 34 MB video, which needs HandBrake. It doesn't block page load, because it only loads its details until played.
- **2.1 Service pages:** now 740–960 words, with inspection, preparation, topic and other-services sections.
- **2.2 Gallery jobs:** a caption for every photo, plus links to the service and town pages. Problem, steps and duration fields wait on details from DMSA.
- **3.1 Service-areas hub:** `/service-areas`.
- **3.2 Town pages:** `/pest-control/los-banos`, `/pest-control/binan` and `/pest-control/san-fernando-camarines-sur`, the towns where DMSA has an office or a documented job. More towns wait on O.7.
- **3.3 Footer:** service-area links. Internal links are now 22–29 per page.
- **4.1 Guides:** 6 guides at `/guides` with Article markup.
- **4.2 FAQ page:** `/faq`.
- **4.3 Filipino search words:** anay, ipis, langgam and daga used in guides and FAQs.

**Still to do:**
- **Owner tasks:** O.1–O.7.
- **Domain move (0.2):** after O.3.
- **Reviews (5.1):** after O.2.
- **More town pages:** once O.7 confirms the towns.
- **Video compression:** see 1.6.

---

## 1. Read this first: what "Top 1 on Google" really takes

No one can guarantee the #1 spot. Google decides, and the results change with where the searcher is standing. For a local business like DMSA, there are two places to win:

1. **The map pack.** These are the 3 businesses shown with a map for searches like "pest control Los Baños" or "anay treatment near me". Google ranks them by:
   - **Proximity:** how close the business is to the person searching.
   - **Relevance:** how well the Google Business Profile and website match the search.
   - **Prominence:** reviews, ratings, links and mentions across the web.

   **This is DMSA's best chance to reach the top, and it depends mostly on the Google Business Profile and reviews, not the website.**
2. **The regular results below the map.** These depend on the website: useful, detailed pages for each service and town, a technically clean site, and other sites linking to it.

Big national companies (Rentokil, Mapecon and others) will usually win broad searches like "pest control Philippines". DMSA can realistically win **service + town** searches where it actually works:
- "pest control Los Baños"
- "termite control Calamba"
- "anay treatment Biñan"
- "soil poisoning Laguna"
- "pest control Naga City"
- "pest control San Fernando Camarines Sur"

Everything below is aimed at those.

---

## 2. Current SEO status (verified)

### What is already good ✅

| Check | Result |
|---|---|
| Pages load | All 15 pages in the sitemap return 200. Unknown pages return a real 404. |
| `robots.txt` | Allows everything except `/api/` and points to the sitemap. |
| `sitemap.xml` | 15 URLs, including each gallery job with its date. |
| Titles and descriptions | Every page has its own. Descriptions are 120–156 characters. |
| Canonical URLs | Correct on every page. |
| Share previews | `og:image` and `summary_large_image` Twitter cards on every page. |
| Main heading | Exactly one H1 per page. |
| Structured data | The business entry (`LocalBusiness`) has address, phone, opening hours, areas served, service list, social links and the Los Baños branch. Service and area pages add `Service` and `BreadcrumbList`. The homepage adds `VideoObject`. |
| Google indexing settings | `max-image-preview: large` is set for Googlebot. |
| Language | `lang="en-PH"`, with "anay" used in titles and headings. |
| HTTPS | HTTP redirects to HTTPS, with HSTS. |
| Search Console | Verification file `google442ac4af1083691f.html` is live. |
| Image alt text | Present on all content images. |
| Low-value page | `/testimonials` is kept out of Google until real reviews exist. |

### What is missing or weak ❌

| # | Problem | Evidence | Impact |
|---|---|---|---|
| 1 | **Google barely knows the site yet** | A web search for "DMSA Pest Control" and `site:` found no DMSA pages. That tool is not Google, so confirm in Search Console → Pages. | Very high |
| 2 | **No Google Business Profile linked**, and no reviews anywhere | No `hasMap` link in structured data. The testimonials page is empty. | Very high (map pack) |
| 3 | **Site is on a `netlify.app` subdomain** | `dmsapestcontrolservices.netlify.app` | High. Links and trust build up on a domain DMSA doesn't own, and moving later costs rankings. |
| 4 | **Pages are thin** | Words per page: `/services/termite-control` 429, `/services/general-pest-control` 384, `/service-areas/laguna` 386, `/service-areas/bicol-camarines-sur` 329, gallery job 334. Total Mobile Install's equivalents: 842–891. | High |
| 5 | **Only 2 area pages** for 7 listed regions, and no town-level pages | Only `/service-areas/laguna` and `/service-areas/bicol-camarines-sur` exist. Total Mobile Install has a service-areas hub plus one page per city. | High |
| 6 | **No Guides section** answering what customers search for | No `/guides` pages. Total Mobile Install has 4 guides with `Article` markup. | High |
| 7 | **No FAQ page, and existing FAQs aren't marked up** | The homepage has 8 FAQs and each service page has FAQs, but there is no `FAQPage` structured data. Total Mobile Install marks up FAQs on service, city and FAQ pages. | Medium |
| 8 | **Conflicting address details** | `siteConfig.address` runs both locations into one string. "Headquarters" appears twice on About (`app/about/page.tsx:102`, `:116`) and once on Contact (`app/contact/page.tsx:33`). | Medium. Google matches the name, address and phone (NAP) on the site against Google Business Profile. |
| 9 | **Two titles are too long** and get cut off | `/service-areas/laguna` has 72 characters and `/service-areas/bicol-camarines-sur` has 68. The ` \| DMSA Pest Control Services` suffix alone uses 29. | Medium |
| 10 | **Some headings don't contain the keyword** | About's H1 is "A pest control company guided by practical responsibility." The homepage title starts with the brand rather than the service and place. | Medium |
| 11 | **Heavy media** | Homepage video is 34 MB (`public/brand/video/dmsa-video.mp4`). Gallery PNGs are 0.9–4.5 MB each. | Medium (speed is a ranking factor) |
| 12 | **Few internal links** | 12–16 per page, against Total Mobile Install's 21–25. There are no "local service" links to town pages in the footer. | Medium |
| 13 | **Business details incomplete** | No postal codes, no Google Maps link (`hasMap`), and no separate map coordinates for the Los Baños branch. | Low–medium |
| 14 | **Speed not measured** | Google's PageSpeed tool was over its daily limit (error 429) during this audit. | Unknown, so measure it |
| 15 | **Finished work not live yet** | Privacy Policy, Terms of Service, the "How did you hear about DMSA?" field and the Biñan gallery job are built but uncommitted. | Low, but deploy them first |

---

## 3. The blueprint: Total Mobile Install vs DMSA

What Total Mobile Install does for SEO, and where DMSA stands:

| Blueprint element (Total Mobile Install) | Example | DMSA today | Action |
|---|---|---|---|
| Title pattern **"Service in City \| Short Brand"**, ≤ 60 characters | `Windshield Replacement in New Orleans \| Total Mobile Install` | Mostly ok. Long brand suffix, and two titles too long. | Task 1.1 |
| H1 = service + place | `Auto Glass Repair in Metairie, LA` | Mixed | Task 1.2 |
| Business structured data with map link, postal code, geo, hours, service list, areas served (each city) | `AutomotiveBusiness` + `hasMap` + `areaServed: City[]` | Has most of it. Missing `hasMap`, postal codes, branch geo, and town-level areas. | Task 1.4 |
| `FAQPage` markup on service, city and FAQ pages | Service page has 7 marked-up Q&As | None | Task 1.3 |
| `Article` markup on guides | Each guide | No guides | Task 4.1 |
| `WebSite` + `WebPage` + `BreadcrumbList` on every page | Every page | `WebSite` yes. `WebPage` missing. Breadcrumbs only on some pages. | Task 1.4 |
| Service pages ~850 words, with set sections: *what to expect, getting it right, how long it takes, insurance help, commercial, explore other services, questions* | `/services/windshield-replacement` | 380–430 words | Task 2.1 |
| **Service-areas hub** + **one page per city**, URL = keyword + city | `/service-areas`, `/auto-glass-repair/metairie` | 2 region pages, no hub, no town pages | Tasks 3.1, 3.2 |
| City pages ~850 words: *service across City, how it works in City, services in City, common questions in City, book in City* | `/auto-glass-repair/kenner` | — | Task 3.2 |
| **Guides** section: plain-language answers to real customer questions | `/guides/cracked-windshield-what-to-do` | None | Task 4.1 |
| Standalone **FAQ page** | `/faq` | None | Task 4.2 |
| **Our Work** with matched before-and-after photos | `/our-work` | Gallery exists and is good | Task 2.2 |
| Footer links to every city page ("Local service") on every page | Footer | Footer has services only | Task 3.3 |
| Privacy Policy + Terms | `/privacy-policy`, `/terms-of-use` | Built locally, not live | Task 0.1 |
| Own domain | `totalmobileinstall.com` | `netlify.app` subdomain | Task O.3 |

---

## 4. Work only the owner can do (off the website)

These have the biggest effect on the map pack, and no code can do them.

### O.1 Google Business Profile (most important)
- [ ] Create or claim a profile at https://business.google.com for **San Fernando, Camarines Sur**, and a **separate** one for the **Los Baños, Laguna** branch.
- [ ] Use exactly the same business name, address and phone number as the website (see Task 1.5).
- [ ] Primary category: **Pest Control Service**. Add **Termite Control Service** if it is offered.
- [ ] Fill in:
  - [ ] the service areas (towns, not whole regions);
  - [ ] the hours, Monday–Sunday, 8:00 AM–5:00 PM;
  - [ ] the website link: the town page once it exists, otherwise the homepage;
  - [ ] the services list;
  - [ ] a description that uses "pest control", "termite (anay) control" and the town names.
- [ ] Upload at least 10 real job photos per profile, and keep adding new ones.
- [ ] Post on the profile at least twice a month, for example a finished job or a termite season reminder.
- [ ] Send me each profile's Google Maps link, so I can add it to the website's structured data (`hasMap`).

### O.2 Reviews (second most important)
- [ ] After every job, send the customer a direct review link from Google Business Profile → "Ask for reviews".
- [ ] Goal: **10+ reviews per location in the first 2 months**, then keep a steady flow.
- [ ] Reply to every review.
- [ ] Never buy reviews or offer anything in exchange for one. Google removes them and can suspend the profile.
- [ ] Once there are real reviews and the customers have agreed, tell me and I'll publish them on `/testimonials` and allow Google to index it.

### O.3 Get a custom domain
- [ ] Buy a domain, for example `dmsapestcontrol.com`, `dmsapestcontrol.ph` or `dmsapestcontrol.com.ph`.
- [ ] Do it **now**: the longer the site stays on `netlify.app`, the more is lost in the move later.
- [ ] Then follow Task 0.2.

### O.4 Search Console
- [ ] At https://search.google.com/search-console, submit `/sitemap.xml`. Resubmit it after the domain change.
- [ ] Use URL Inspection → "Request indexing" for the homepage, each service page, each area page and each new page.
- [ ] Check **Pages** (indexed vs not indexed) and **Performance** (the searches people used) every month.
- [ ] Also add the site to **Bing Webmaster Tools** (https://www.bing.com/webmasters), which can import from Search Console.

### O.5 Directory listings (citations)
Create listings with the **same name, address and phone number** as the website:
- [ ] Facebook page: add the website link, address, hours and services.
- [ ] Instagram and TikTok bios: add the website link.
- [ ] Apple Business Connect (https://businessconnect.apple.com).
- [ ] Bing Places (https://www.bingplaces.com).
- [ ] Philippine business directories, such as Yellow Pages PH and local town or province business listings.
- [ ] Waze, through the Google Business Profile address.

### O.6 Links from other sites
- [ ] Ask partners to link to the site:
  - [ ] construction contractors and architects, since soil poisoning happens before construction;
  - [ ] subdivision and homeowners' associations where DMSA has worked;
  - [ ] hardware stores and suppliers.
- [ ] Get listed by local chambers of commerce or business groups.
- [ ] Share every new gallery job and guide on the Facebook page, with a link back to the site.

### O.7 Facts I need before writing more content
The site must not publish claims that aren't true. Please answer these before Tasks 2–4:
- [ ] Postal codes for both locations.
- [ ] Is the Los Baños location a **branch**? The site calls San Fernando the "Headquarters".
- [ ] An FPA (Fertilizer and Pesticide Authority) license or accreditation number, if you have one and want it shown.
- [ ] Year DMSA started, and roughly how many jobs it has done.
- [ ] Which **towns** each location serves, for example Laguna: Los Baños, Calamba, Bay, Biñan, Santa Rosa, Cabuyao, San Pablo; Camarines Sur: San Fernando, Naga City, Pili, Iriga.
- [ ] Typical treatment times, for example soil poisoning for a house takes about X hours.
- [ ] Re-entry and safety guidance you give customers: when people, children and pets can go back in.
- [ ] Any follow-up or warranty policy, only if one really exists.
- [ ] Whether price ranges may be shown (optional; the site shows no prices today).

---

## 5. Website tasks, with ready-to-paste prompts

### How to use the prompts
1. Open Claude Code in `C:\Users\Nezra\Downloads\dmsa\dmsa`.
2. Paste **the shared rules below first**, then one task prompt.
3. Do the tasks **in order** (Phase 0 → 5). Deploy and request indexing after each phase.

#### Shared rules (paste before every prompt)
```text
Project rules for this task:
- This is the DMSA Pest Control Services website (Next.js App Router). Read PRODUCT.md, DESIGN.md and lib/seo.ts first.
- Do NOT edit the email sending in app/api/contact/route.ts (Resend, Gmail, recipients, env vars).
- Never commit .env.local or print any secret.
- Do not invent facts: no prices, guarantees, certifications, licence numbers, review counts, years in business or customer names unless they are already in the data files or I give them to you. If a section needs a fact you don't have, leave it out and list the question for me at the end.
- Use real DMSA photos only. Customer locations stay generalized (village/barangay/town), never exact addresses.
- Follow DESIGN.md (no eyebrow labels above headings, --primary-text for red text, existing components and CSS patterns).
- Titles are max 60 characters; meta descriptions 140–155 characters; one H1 per page that names the service and place.
- Every new page must use pageMetadata() from lib/seo.ts, appear in app/sitemap.ts, and be linked from at least 2 other pages.
- When done: run npm run lint, npm test and npm run build; check new pages at 1366px and 390px in light and dark mode; confirm with a script that each new URL returns 200 with the right <title>, canonical, one H1 and valid JSON-LD. Do not commit or deploy unless I say so; tell me what changed and what you couldn't verify.
```

---

### Phase 0: Deploy and domain

#### Task 0.1: Deploy the finished local work
```text
Commit and deploy the finished local changes that are not live yet: Privacy Policy, Terms of Service, the "How did you hear about DMSA?" quotation field, and the Biñan gallery job (public/brand/binan). Review the full diff first and confirm app/api/contact/route.ts only changes the two email content lines. After the deploy, check on the live site that /privacy-policy, /terms-of-service and /gallery/langkiwa-binan-termite-control-soil-poisoning return 200 and appear in /sitemap.xml.
```

#### Task 0.2: Move to the custom domain (after O.3)
```text
I bought the domain <PASTE DOMAIN>. Prepare the site to move to it:
1. Tell me exactly what to set in Netlify (add the domain, make it primary, DNS records, HTTPS) and that NEXT_PUBLIC_SITE_URL must be set to https://<domain> in Netlify's environment variables. Don't change .env.local secrets.
2. Make sure every canonical, og:url, sitemap URL, robots.txt sitemap line and JSON-LD @id/url use the new domain via lib/site-url.ts. Search the code for any hard-coded "netlify.app" and replace it.
3. Confirm that the old netlify.app URLs will 301 redirect to the same path on the new domain (Netlify does this when the custom domain is primary). After it's live, test 5 old URLs with curl and show the redirect.
4. Give me the Search Console steps: add the new property, submit the sitemap, and use the Change of Address tool if Search Console offers it for this property.
```

---

### Phase 1: Technical fixes (quick wins)

#### Task 1.1: Titles in the "Service in Place | DMSA" pattern
```text
Rework page titles to match the Total Mobile Install pattern "Service in Place | Short Brand", max 60 characters:
- Change the title template in app/layout.tsx from "%s | DMSA Pest Control Services" to "%s | DMSA Pest Control".
- Homepage title: lead with service and places, e.g. "Pest Control & Anay Treatment in Laguna & Bicol | DMSA" (keep it ≤ 60).
- Fix /service-areas/laguna (currently 72 chars) and /service-areas/bicol-camarines-sur (68 chars).
- List every route's final title with its character count in a table, and confirm none exceeds 60 and none is duplicated.
Keep descriptions unique, 140–155 characters, each naming the service, the place and "free ocular inspection".
```

#### Task 1.2: Headings that name the service and place
```text
Review every page's H1 and H2s. Each H1 must name the service and the place in customers' words, including "anay" where it fits (DESIGN.md "Search Words Rule"). Fix the About H1 ("A pest control company guided by practical responsibility.") to something like "About DMSA Pest Control Services in Camarines Sur and Laguna". Make sure H2s on service and area pages contain keyword variations (e.g. "Termite control in Laguna", "How anay treatment works") rather than generic labels like "About this service". Show me a before/after list.
```

#### Task 1.3: FAQ structured data
```text
Add FAQPage JSON-LD (like totalmobileinstall.com service pages) wherever questions and answers are already visible on the page:
- Homepage FAQ section (data/faq-data.js).
- Each service page's FAQ (service.faqs in data/services-data.js).
- Each service-area page, if it has FAQs (add 4–6 area-specific FAQs to data/service-areas-data.js using only facts already in the data).
Add a faqSchema() helper to lib/seo.ts and render it with components/site/json-ld.tsx. The JSON-LD questions and answers must match the visible text exactly. Validate the output with a script that parses every JSON-LD block on each page.
Note for me: Google now shows FAQ rich results mainly for government and health sites, so this is for Google's understanding and AI answers, not guaranteed rich snippets.
```

#### Task 1.4: Complete the business structured data
```text
Improve the structured data in app/layout.tsx and lib/seo.ts to match the Total Mobile Install blueprint:
- Keep the LocalBusiness type (schema.org has no specific pest-control type). Make the business description and "knowsAbout" (["Pest control", "Termite control", "Anay treatment", "Soil poisoning", ...]) name the services clearly.
- Make the Los Baños branch its own LocalBusiness node with its own address, geo (from data), telephone and url, linked with "parentOrganization" / "department".
- Add "hasMap" for each location using these Google Business Profile links: <PASTE LINKS FROM O.1>, and postalCode: <PASTE POSTAL CODES FROM O.7>. Skip any value I haven't given you.
- Change areaServed to list towns (City) under each region, using only towns I confirmed in O.7.
- Add a WebPage node on every page (name, url, isPartOf the WebSite, about the business, breadcrumb).
- Add BreadcrumbList to the pages that lack it (/services, /gallery, /treated-locations, /about, /contact, /request-quote).
- Add ImageObject entries (contentUrl, caption, contentLocation = generalized location) to each gallery job page.
Validate every page's JSON-LD parses and that @id references resolve.
```

#### Task 1.5: Consistent name, address and phone
```text
Fix the name, address and phone (NAP) so they match the Google Business Profiles exactly:
- Split siteConfig.address in data/site-data.js into two separate addresses: the San Fernando, Camarines Sur office and the Los Baños, Laguna branch (I confirmed Los Baños is <BRANCH / OTHER>).
- Update every place that shows the address: footer (components/site/site-chrome.tsx), About (app/about/page.tsx — both "Headquarters" labels at lines ~102 and ~116), Contact (app/contact/page.tsx line ~33 and the map caption), map labels in components/maps/map-canvas.tsx, the chatbot location answer in data/chatbot-knowledge.ts, and the JSON-LD.
- Use one phone format everywhere (0955 562 9226 / 0918 299 5218 on screen, +63 format in tel: links and JSON-LD).
Show me every changed string.
```

#### Task 1.6: Speed (Core Web Vitals)
```text
Improve loading speed:
- The homepage video public/brand/video/dmsa-video.mp4 is 34 MB. Tell me the exact HandBrake settings to make a ~1080p H.264 version under 6 MB (and a smaller 720p version), then update app/page.tsx (width/height, preload="none" or metadata, poster) and the VideoObject schema. Make sure the video never blocks the first screen from loading.
- Gallery images in public/brand/* are PNGs of 0.9–4.5 MB. Convert them to high-quality WebP (or JPG) at 1920px max with sharp, keep the same file names apart from the extension, update data/gallery-data.js, and confirm every image still loads. Show the size savings.
- Run Lighthouse (or PageSpeed Insights if not rate-limited) on mobile for /, /services/termite-control and /gallery, and report LCP, CLS, INP/TBT and the top 3 fixes.
```

---

### Phase 2: Deeper service and gallery pages

#### Task 2.1: Expand each service page to ~850 words
```text
Expand each service page (data/services-data.js + app/services/[slug]/page.tsx) to about 800–900 words, following the section pattern of https://totalmobileinstall.com/services/windshield-replacement:
1. What this service is (in plain words, using "anay" for termites)
2. Signs you need it
3. What to expect during the ocular inspection and treatment visit
4. How long it takes (only if I've given you times in O.7)
5. Preparing your home or business before treatment
6. Safety and re-entry (only the guidance I gave you in O.7)
7. Residential vs commercial / construction-stage notes (e.g. soil poisoning before construction)
8. Completed jobs (link the related gallery jobs)
9. Where this service is available (link the area and town pages)
10. Explore our other services
11. Questions about <service> (FAQ, with FAQPage schema from Task 1.3)
Write in plain, friendly English for Filipino homeowners and business owners. Don't stuff keywords; use each main phrase naturally 2–4 times. Do not invent facts; list missing facts as questions for me.
```

#### Task 2.2: Richer gallery job pages
```text
Make each gallery job page (app/gallery/[slug]/page.tsx, data/gallery-data.js) a stronger local page, like totalmobileinstall.com/our-work:
- Add optional fields to GalleryItem: "problem" (what was found), "treatmentSteps" (string[]), "duration", and "areaPage" (link to the matching town/area page). Fill them only from details I provide; leave them empty otherwise and hide empty sections.
- Give each photo a specific alt text and caption describing what it shows (e.g. "Technician drilling injection holes along an interior wall, South Langkiwa, Biñan"), stored per image in the data instead of "photo 1, photo 2".
- Add links from each job page to its service page and its area/town page.
- Title pattern: "<Service> in <Village/Town>, <Province> | DMSA".
```

---

### Phase 3: Area hub and town pages (the biggest blueprint gap)

#### Task 3.1: Service-areas hub page
```text
Create /service-areas (like https://totalmobileinstall.com/service-areas):
- H1: "Pest and Termite Control Service Areas in Luzon".
- Sections: the two DMSA locations (San Fernando, Camarines Sur and Los Baños, Laguna) with their towns; a list of every region and town page; the treated-locations map link; how service outside these areas works (ask DMSA).
- BreadcrumbList + WebPage JSON-LD, add to the sitemap, link it from the main navigation or footer, the homepage, /treated-locations and every service page.
Keep /treated-locations as the map page and link the two pages to each other.
```

#### Task 3.2: One page per town, URL = keyword + town
```text
Create town landing pages under /pest-control/<town> for these towns I confirmed DMSA serves: <PASTE TOWN LIST FROM O.7, e.g. los-banos, calamba, bay, binan, santa-rosa, cabuyao, san-pablo, san-fernando-camarines-sur, naga-city, pili>.
Follow https://totalmobileinstall.com/auto-glass-repair/metairie (about 850 words each):
- Title: "Pest Control in <Town>, <Province> | DMSA" (≤ 60 chars). H1: "Pest Control and Termite (Anay) Treatment in <Town>".
- Sections: pest and termite service across <Town>; how service works in <Town> (which DMSA location serves it, ocular inspection, scheduling); services available in <Town> (link each service page); completed jobs in or near <Town> (from gallery data, by distance); common pest questions in <Town> (FAQPage); request a quotation in <Town> (CTA to /request-quote).
- Each page must be genuinely different: real nearby jobs, the serving location, the barangays/villages DMSA has worked in, local notes I provide. If a town has nothing unique to say, don't create a near-copy page; tell me instead (Google penalizes copy-paste "doorway" pages).
- Store town data in a new data/towns-data.js; generate pages with generateStaticParams; LocalBusiness areaServed and Service schema per page; add all to the sitemap.
- Keep /service-areas/laguna and /service-areas/bicol-camarines-sur as province pages and link down to their towns.
```

#### Task 3.3: "Local service" links on every page
```text
Add a "Service areas" column to the footer (components/site/site-chrome.tsx) linking the service-areas hub and every town page, like the "Local service" column on totalmobileinstall.com. Also add "Nearby areas" links between neighbouring town pages, and link each gallery job to its town page. Afterwards report the number of internal links on 5 sample pages (target 20+).
```

---

### Phase 4: Guides and FAQ (content that answers searches)

#### Task 4.1: Guides section
```text
Create a /guides section like https://totalmobileinstall.com/guides with an index page and these articles (about 800–1,000 words each, plain English, with "anay" where natural):
1. /guides/signs-of-anay-termites-in-your-house: signs of termites (anay) and what to do first
2. /guides/soil-poisoning-before-construction: what anti-termite soil treatment is and when to schedule it
3. /guides/anay-vs-ants-how-to-tell: telling termites from ants (swarmers, mud tubes, wings)
4. /guides/how-to-prepare-for-pest-control-treatment: preparation checklist for homes and businesses
5. /guides/how-to-keep-cockroaches-and-ants-out: prevention tips for Philippine homes
6. /guides/what-affects-termite-treatment-cost: the factors that affect a quotation (no prices unless I give them)
For each guide: H1 = the question, a short direct answer in the first paragraph, sections with H2s, a "When to call DMSA" section linking the matching service page and /request-quote, links to 2 other guides, Article JSON-LD (headline, datePublished, dateModified, author/publisher = DMSA, image), BreadcrumbList, and sitemap entries. Only state pest facts that are generally accepted. Avoid medical or safety claims beyond the guidance I provided in O.7. Add the guides to the footer and link each one from its related service page.
```

#### Task 4.2: Standalone FAQ page
```text
Create /faq like https://totalmobileinstall.com/faq: group the existing FAQs (data/faq-data.js and each service's FAQs) under headings (Ocular inspection & quotation, Termite/anay control, General pest control, Service areas, Scheduling & preparation), add FAQPage JSON-LD matching the visible text, links to related services and guides, and add it to the footer, chatbot answers and sitemap. Don't duplicate an answer word for word in two places on the same page.
```

#### Task 4.3: Filipino search words
```text
Check the site copy for the Filipino words customers actually search and use them naturally where they fit: "anay", "pang-anay", "pest control near me", "termite treatment", "soil poisoning", "fumigation" (only if DMSA offers it), "ipis" (cockroach), "langgam" (ant), "daga" (rodent). Add them to alt text, FAQ questions and guide text where they read naturally — never as keyword lists. Show me each sentence you changed.
```

---

### Phase 5: Reviews on the site (after O.2)

#### Task 5.1: Publish real reviews
```text
I've collected real customer reviews with permission: <PASTE REVIEWS: name or initials, town, service, text, date>.
Add them to data/testimonials-data.js, show them on /testimonials (remove noindex, add it to the sitemap) and on the homepage and related service and town pages, and link to the Google Business Profile reviews. Do NOT add AggregateRating or Review structured data for reviews about DMSA itself (Google ignores self-serving review markup for LocalBusiness). Keep the reviews word for word.
```

---

## 6. Keywords to target (check in Search Console after 2–3 months)

| Area | Main searches | Page that should rank |
|---|---|---|
| Laguna | pest control Los Baños; termite control Laguna; anay treatment Laguna; soil poisoning Laguna | `/pest-control/los-banos`, `/service-areas/laguna`, `/services/termite-control` |
| Laguna towns | pest control Calamba; pest control Biñan; anay treatment Santa Rosa; pest control San Pablo | the matching `/pest-control/<town>` page |
| Camarines Sur | pest control Naga City; pest control Camarines Sur; termite control Bicol; anay treatment Pili | `/pest-control/naga-city`, `/service-areas/bicol-camarines-sur` |
| Services | cockroach control; rodent control; commercial pest control Laguna; residential pest control | `/services/*` |
| Questions | signs of anay; soil poisoning before construction; how to get rid of anay | `/guides/*` |
| Brand | DMSA pest control; DMSA pest control services | homepage, Google Business Profile |

---

## 7. Monthly checklist

- [ ] Add every new job to the gallery: real photos, generalized location, linked to its town page.
- [ ] Post the job on the Google Business Profile and Facebook, with a link to the gallery page.
- [ ] Ask every customer for a Google review and reply to every review.
- [ ] Search Console: check Pages for errors, Performance for new searches (write pages for searches with impressions but few clicks), and request indexing for new pages.
- [ ] Every 3 months, update one guide and one service page with new photos or answers.

---

## 8. Order of work at a glance

| Order | Task | Who | Effect |
|---|---|---|---|
| 1 | O.1 Google Business Profile (2 locations) | Owner | ★★★★★ |
| 2 | O.2 Reviews | Owner | ★★★★★ |
| 3 | 0.1 Deploy finished work, O.4 Search Console | Claude + owner | ★★★★ |
| 4 | O.3 + 0.2 Custom domain | Owner + Claude | ★★★★ |
| 5 | 1.1–1.6 Technical fixes | Claude | ★★★ |
| 6 | O.7 Answer the facts questions | Owner | needed for 2–4 |
| 7 | 3.1–3.3 Area hub and town pages | Claude | ★★★★ |
| 8 | 2.1–2.2 Deeper service and gallery pages | Claude | ★★★ |
| 9 | 4.1–4.3 Guides, FAQ, Filipino words | Claude | ★★★ |
| 10 | O.5–O.6 Directory listings and links | Owner | ★★★ |
| 11 | 5.1 Reviews on the site | Claude | ★★ |

Expect the first movement in 4–8 weeks after Google Business Profile, reviews and indexing are in place. Stronger rankings usually take 3–6 months of steady jobs, reviews and content.
