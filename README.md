# DMSA Pest Control Services website

A production-oriented, mobile-first React website for DMSA Pest Control Services. It uses Next.js, Tailwind CSS 3.4, MapLibre GL JS and a Vercel-compatible email endpoint. Tailwind 3 is intentionally used to avoid the Tailwind 4 Oxide native-binary error that can occur on Windows.

Version 2 uses a compact field-service layout, Poppins headings, Inter body text, indexed service rows, responsive maps, light/dark themes and a clear quotation flow with a free ocular inspection included.

## Quick start

Requirements: 64-bit Node.js 22.13 or newer and npm.

### Windows PowerShell

Do not extract this corrected package over the earlier project folder. Delete or rename the old extracted folder first so its broken `node_modules` and `.next` directories cannot be reused. Then extract the new ZIP and open PowerShell inside the inner `dmsa` folder—the folder containing `package.json`.

```powershell
node -p "process.platform + ' ' + process.arch"
npm install
Copy-Item .env.example .env.local
npm run dev
```

The first command should show `win32 x64` or `win32 arm64`, not `win32 ia32`. Open `http://localhost:3000` after the development server starts.

### macOS or Linux

```bash
npm install
cp .env.example .env.local
npm run dev
```

### Confirm the repaired dependencies

```powershell
npm ls tailwindcss maplibre-gl
```

The result should include `tailwindcss@3.4.17` and `maplibre-gl@6.7.0` (or a compatible 6.7.x release).

If you accidentally reused the old folder, stop the server and run this in that project folder before installing again:

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm cache verify
npm install
```

## Vercel deployment

1. Push the project to GitHub, GitLab or Bitbucket.
2. Import it into Vercel.
3. Vercel reads `vercel.json` and runs `npm run build:vercel`.
4. Add the environment variables from `.env.example` in Project Settings → Environment Variables.
5. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS address and redeploy so canonical URLs and the sitemap use it.

The site does not need a database. The quotation and contact forms send email only. The free ocular inspection is part of the quotation process, not a separate request type.

## Free email delivery with Resend

The secure server endpoint is `app/api/contact/route.ts`. It validates and sanitizes input, checks a honeypot and submission timing, applies a best-effort rate limit, and reports success only after Resend returns a message ID.

1. Create a free Resend account and API key.
2. Add `RESEND_API_KEY` and `CONTACT_RECIPIENT_EMAIL` to Vercel.
3. Add `NEXT_PUBLIC_CONTACT_EMAIL` only when a verified public email should appear on the contact page and footer.
4. During initial testing, `DMSA Website <onboarding@resend.dev>` can be used as the sender, subject to Resend account restrictions.
5. For production, verify a sending domain with Resend and set `CONTACT_FROM_EMAIL`, for example `DMSA Website <website@your-domain.example>`.

If email variables are missing or delivery is not confirmed, the forms show a useful error with DMSA’s phone/Viber alternatives. They never show a fake success state.

## Maps

MapLibre GL JS powers:

- the draggable quotation pin and “Use my location” action;
- the pitched treated-locations map with clustering, filters, hover/click details and an accessible list;
- the headquarters map on the contact page.

MapLibre GL JS renders the maps with CARTO Voyager as the default basemap. The attribution remains visible for MapLibre, CARTO and OpenStreetMap contributors.

For production use, request a free CARTO basemap key at `https://carto.com/basemaps/apikey/`, then add it locally and in Vercel:

```env
NEXT_PUBLIC_CARTO_BASEMAP_KEY=your_carto_key
```

You may still supply a complete custom MapLibre style URL through `NEXT_PUBLIC_MAP_STYLE_URL`; it overrides the CARTO default. The location picker continues to support manual address and coordinates when tiles or geolocation are unavailable. No geocoder is required.

## Edit business content

Version 2 keeps frequently edited content in the `data` directory. The pages render these JavaScript objects dynamically, so a local edit appears after the next build or Vercel redeployment.

- `data/site-data.js`: phone numbers, address, hours, coverage, process, trust points and logo paths.
- `data/navigation-data.js`: header and footer links.
- `data/services-data.js`: service descriptions, signs, process and prevention details.
- `data/gallery-data.js`: gallery cards, detail pages, feedback fields, local image paths and map coordinates.
- `data/faq-data.js`: frequently asked questions.
- `data/form-options-data.js`: quotation and contact form selection options.
- `data/testimonials-data.js`: permission-cleared feedback only; it is intentionally empty initially.

### Use separate website and page logos

Place both image files in `public/brand`, then edit only the `logos` object in `data/site-data.js`:

```js
logos: {
  website: "/brand/header-logo.png",
  pageIcon: "/brand/page-icon.png",
},
```

`website` controls the reusable DMSA logo in the header and footer. `pageIcon` controls the browser tab icon and web-app manifest icon. A square PNG is recommended for `pageIcon`. Both settings currently use the supplied DMSA logo until the second file is added.

Keep “Other” as the final applicable form option because its conditional field and server-side validation are already wired.

## Real content versus placeholders

Ready with supplied/verified information:

- company name, location, phone/Viber numbers and operating hours;
- general pest and termite service descriptions;
- Bicol Region, Cavite, Laguna, Batangas, Rizal, Quezon and Metro Manila coverage;
- supplied DMSA logo.

Clearly marked sample or placeholder content:

- all treated-location pins and treatment records;
- all treatment image panels (“Add approved local photo”);
- all customer-feedback fields, which are empty until approved text is supplied.

Before launch, replace these items only with approved DMSA records, generalized coordinates, permission-cleared photos and consented feedback. Do not publish exact customer addresses or unverified ratings, certifications, guarantees, prices or treatment outcomes.

## Privacy and spam protection

- Form payloads are validated in the browser and again on the server.
- Form data is emailed and is not stored by this project.
- Exact customer addresses are not shown on public maps.
- `CONTACT_ALLOWED_ORIGIN` can restrict production form requests to one origin.
- The in-memory rate limiter is deliberately lightweight. For higher traffic, add Vercel WAF/rate limiting or a managed edge rate limiter.
- Cloudflare Turnstile can be added later; keep verification server-side and never expose its secret key.

## Quality checks

```bash
npm run lint
npm run build:vercel
npm test
```

The automated tests cover DMSA form rules, required “Other” details, the sample-data privacy contract and the Windows-safe Tailwind dependency contract.
