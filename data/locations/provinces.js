// Provinces DMSA serves, with the page copy for each province hub at /pest-control/<slug>.
// Every city and municipality comes from psgc-data.js, so nothing here lists towns by hand.
//
// HOW TO LAUNCH THE NEXT WAVE
//   1. Raise `launchedWave` below by one (waves are set per province with `launchWave`).
//   2. Run `npm test` and `npm run seo:locations`.
//   3. Build, deploy, then submit /sitemap.xml again in Google Search Console.
// Launching in waves lets Google crawl and judge the pages steadily instead of all at once.

/** Highest wave that is live. 1 = Laguna and Camarines Sur. */
export const launchedWave = 1;

// TODO(owner): confirm which office serves each province (servedFrom). Defaults: Bicol
// provinces from the San Fernando main office, everything else from the Los Baños branch.
// Border towns, such as Tagkawayan, Calauag and Guinayangan in Quezon, can be switched in
// town-notes.js with `servedFrom`.

/** @type {import("../../lib/content-types").Province[]} */
export const provinces = [
  {
    slug: "laguna",
    name: "Laguna",
    region: "Calabarzon",
    galleryRegion: "Laguna",
    servedFrom: "branch",
    launchWave: 1,
    metaTitle: "Pest & Termite Control in Laguna",
    metaDescription: "Pest control and termite (anay) treatment in all 30 Laguna towns and cities, from DMSA's Los Baños branch. Completed jobs in Los Baños and Biñan.",
    intro: [
      "DMSA Pest Control Services has a branch in San Antonio, Los Baños, and provides termite (anay) treatment and general pest control for homes and businesses across Laguna.",
      "Completed work in the province includes residential termite control in Anos, Los Baños; termite control with chemical injection and soil poisoning in Marymount Village, Los Baños; and the same treatment in San Antonio, South Langkiwa, Biñan. The jobs are shown below with photos.",
    ],
    faqs: [
      { question: "Does DMSA have a branch in Laguna?", answer: "Yes. DMSA's Laguna branch is in San Antonio, Los Baños. Call 0955 562 9226 or message 0918 299 5218 on Viber." },
      { question: "Which towns in Laguna does DMSA serve?", answer: "DMSA accepts requests from all 30 cities and municipalities in Laguna, including San Pedro, Biñan, Santa Rosa, Calamba, Los Baños and Santa Cruz. Find your town on this page." },
      { question: "Which towns in Laguna has DMSA worked in?", answer: "Completed jobs shown on this site include Anos and Marymount Village in Los Baños, and South Langkiwa in Biñan. For other towns, request a quotation; availability depends on the location and scope." },
      { question: "Does DMSA do soil poisoning in Laguna?", answer: "Yes. DMSA has carried out soil poisoning together with chemical injection in Marymount Village, Los Baños, and in South Langkiwa, Biñan." },
    ],
  },
  {
    slug: "batangas",
    name: "Batangas",
    region: "Calabarzon",
    galleryRegion: "Batangas",
    servedFrom: "branch",
    launchWave: 2,
    metaTitle: "Pest & Termite Control in Batangas",
    metaDescription: "Pest control and termite (anay) treatment for homes and businesses in Batangas, served from DMSA's Los Baños branch. Free ocular inspection.",
    intro: [
      "DMSA Pest Control Services provides termite (anay) treatment, soil poisoning and general pest control for homes and businesses in Batangas. The province borders Laguna and Cavite, and its towns are served from DMSA's branch in Los Baños.",
      "Requests are welcome from every city and municipality in Batangas, including Batangas City, Lipa, Tanauan and Santo Tomas. Each request starts with a free ocular inspection before the treatment and price are confirmed.",
    ],
    faqs: [
      { question: "Does DMSA serve Batangas?", answer: "Yes. DMSA accepts pest control and termite treatment requests from all cities and municipalities in Batangas. Availability depends on the location and the work needed." },
      { question: "Which DMSA office serves Batangas?", answer: "Batangas is served from DMSA's branch in San Antonio, Los Baños, Laguna." },
      { question: "Is the ocular inspection free in Batangas?", answer: "Yes. The free ocular inspection is included in the quotation process for properties DMSA can serve." },
    ],
  },
  {
    slug: "cavite",
    name: "Cavite",
    region: "Calabarzon",
    galleryRegion: "Cavite",
    servedFrom: "branch",
    launchWave: 2,
    metaTitle: "Pest & Termite Control in Cavite",
    metaDescription: "Termite (anay) treatment, soil poisoning and pest control for homes, offices and shops in Cavite, from DMSA's Los Baños branch. Free ocular inspection.",
    intro: [
      "DMSA Pest Control Services provides termite (anay) treatment and general pest control for houses, offices, shops and warehouses in Cavite, plus pre-construction soil poisoning for new builds. Cavite towns are served from DMSA's branch in Los Baños, Laguna.",
      "Requests are welcome from every city and municipality in Cavite, including Bacoor, Imus, Dasmariñas, General Trias and Tagaytay. A free ocular inspection comes first, then DMSA confirms the treatment, schedule and price.",
    ],
    faqs: [
      { question: "Does DMSA serve Cavite?", answer: "Yes. DMSA accepts pest control and termite treatment requests from all cities and municipalities in Cavite. Availability depends on the location and the work needed." },
      { question: "Which DMSA office serves Cavite?", answer: "Cavite is served from DMSA's branch in San Antonio, Los Baños, Laguna." },
      { question: "Does DMSA do soil poisoning for new houses in Cavite?", answer: "Yes. DMSA provides pre-construction anti-termite soil treatment. Share the construction stage and schedule when you request a quotation so it can be done before the slab is poured." },
    ],
  },
  {
    slug: "rizal",
    name: "Rizal",
    region: "Calabarzon",
    galleryRegion: "Rizal",
    servedFrom: "branch",
    launchWave: 2,
    metaTitle: "Pest & Termite Control in Rizal",
    metaDescription: "Pest control and termite (anay) treatment in Antipolo, Cainta, Taytay and all Rizal towns, served from DMSA's Los Baños branch. Free ocular inspection.",
    intro: [
      "DMSA Pest Control Services provides residential and commercial pest control and termite (anay) treatment in Rizal province, served from its branch in Los Baños, Laguna.",
      "Requests are welcome from Antipolo and every municipality in Rizal, from Cainta, Taytay and San Mateo to the towns along Laguna de Bay. Each request starts with a free ocular inspection of the property.",
    ],
    faqs: [
      { question: "Does DMSA serve Rizal province?", answer: "Yes. DMSA accepts pest control and termite treatment requests from Antipolo and all municipalities in Rizal. Availability depends on the location and the work needed." },
      { question: "Which DMSA office serves Rizal?", answer: "Rizal is served from DMSA's branch in San Antonio, Los Baños, Laguna." },
      { question: "Is the ocular inspection free in Rizal?", answer: "Yes. The free ocular inspection is included in the quotation process for properties DMSA can serve." },
    ],
  },
  {
    slug: "quezon",
    name: "Quezon",
    region: "Calabarzon",
    galleryRegion: "Quezon",
    servedFrom: "branch",
    launchWave: 3,
    metaTitle: "Pest Control in Quezon Province",
    metaDescription: "Pest control and termite (anay) treatment in Lucena, Tayabas and all Quezon province towns, from DMSA. Homes and businesses. Free ocular inspection.",
    intro: [
      "DMSA Pest Control Services provides termite (anay) treatment and general pest control for homes, shops and warehouses in Quezon province, which lies between Laguna and the Bicol Region.",
      "Requests are welcome from Lucena, Tayabas and every municipality in the province. Island municipalities may need extra planning, so share your location when you request a quotation.",
    ],
    faqs: [
      { question: "Does DMSA serve Quezon province?", answer: "Yes. DMSA accepts pest control and termite treatment requests from Lucena, Tayabas and all municipalities in Quezon province. Availability depends on the location and the work needed." },
      { question: "Is this the same as Quezon City?", answer: "No. This page covers Quezon province in Calabarzon. Quezon City is in Metro Manila and has its own page under Metro Manila." },
      { question: "Is the ocular inspection free in Quezon province?", answer: "Yes. The free ocular inspection is included in the quotation process for properties DMSA can serve." },
    ],
  },
  {
    slug: "metro-manila",
    name: "Metro Manila",
    region: "Metro Manila",
    galleryRegion: "Metro Manila",
    servedFrom: "branch",
    launchWave: 2,
    metaTitle: "Pest & Termite Control in Metro Manila",
    metaDescription: "Pest control and termite (anay) treatment for condos, houses, offices and shops in all 16 Metro Manila cities and Pateros. Free ocular inspection.",
    intro: [
      "DMSA Pest Control Services provides pest control and termite (anay) treatment in Metro Manila for condominiums, apartments, houses, offices and retail spaces. Metro Manila is served from DMSA's branch in Los Baños, Laguna.",
      "Requests are welcome from all 16 cities and the municipality of Pateros. For condominiums and office buildings, mention any building rules on contractor access and work hours when you request a quotation.",
    ],
    faqs: [
      { question: "Does DMSA serve Metro Manila?", answer: "Yes. DMSA accepts pest control and termite treatment requests from all Metro Manila cities and Pateros. Availability depends on the location and the work needed." },
      { question: "Do you treat condominium units?", answer: "Yes. Residential service covers condominiums. Arrange any gate pass or work permit with building management, and share the building's rules when you request a quotation." },
      { question: "Which DMSA office serves Metro Manila?", answer: "Metro Manila is served from DMSA's branch in San Antonio, Los Baños, Laguna." },
    ],
  },
  {
    slug: "albay",
    name: "Albay",
    region: "Bicol Region",
    galleryRegion: "Bicol Region",
    servedFrom: "main",
    launchWave: 3,
    metaTitle: "Pest & Termite Control in Albay",
    metaDescription: "Pest control and termite (anay) treatment in Legazpi, Tabaco, Ligao and all Albay towns, from DMSA's Camarines Sur main office. Free ocular inspection.",
    intro: [
      "DMSA Pest Control Services provides termite (anay) treatment and general pest control for homes and businesses in Albay, served from its main office in San Fernando, Camarines Sur.",
      "Requests are welcome from Legazpi, Tabaco, Ligao and every municipality in Albay. Each request starts with a free ocular inspection before the treatment and price are confirmed.",
    ],
    faqs: [
      { question: "Does DMSA serve Albay?", answer: "Yes. DMSA accepts pest control and termite treatment requests from all cities and municipalities in Albay. Availability depends on the location and the work needed." },
      { question: "Which DMSA office serves Albay?", answer: "Albay is served from DMSA's main office in Zone 3, Pamukid, San Fernando, Camarines Sur." },
      { question: "Is the ocular inspection free in Albay?", answer: "Yes. The free ocular inspection is included in the quotation process for properties DMSA can serve." },
    ],
  },
  {
    slug: "camarines-norte",
    name: "Camarines Norte",
    region: "Bicol Region",
    galleryRegion: "Bicol Region",
    servedFrom: "main",
    launchWave: 3,
    metaTitle: "Pest Control in Camarines Norte",
    metaDescription: "Pest control and termite (anay) treatment in Daet and all Camarines Norte towns, from DMSA's main office in Camarines Sur. Free ocular inspection.",
    intro: [
      "DMSA Pest Control Services provides termite (anay) treatment and general pest control for homes and businesses in Camarines Norte, served from its main office in San Fernando, Camarines Sur.",
      "Requests are welcome from Daet and every municipality in the province. Each request starts with a free ocular inspection before the treatment and price are confirmed.",
    ],
    faqs: [
      { question: "Does DMSA serve Camarines Norte?", answer: "Yes. DMSA accepts pest control and termite treatment requests from all municipalities in Camarines Norte. Availability depends on the location and the work needed." },
      { question: "Which DMSA office serves Camarines Norte?", answer: "Camarines Norte is served from DMSA's main office in Zone 3, Pamukid, San Fernando, Camarines Sur." },
      { question: "Is the ocular inspection free in Camarines Norte?", answer: "Yes. The free ocular inspection is included in the quotation process for properties DMSA can serve." },
    ],
  },
  {
    slug: "camarines-sur",
    name: "Camarines Sur",
    region: "Bicol Region",
    galleryRegion: "Bicol Region",
    servedFrom: "main",
    launchWave: 1,
    metaTitle: "Pest & Termite Control in Camarines Sur",
    metaDescription: "Pest control and termite (anay) treatment in Naga, Iriga and all 37 Camarines Sur towns and cities, from DMSA's main office in San Fernando.",
    intro: [
      "DMSA Pest Control Services is based in Zone 3, Pamukid, San Fernando, Camarines Sur. From here, DMSA provides pest control and termite (anay) treatment for residential and commercial properties across Camarines Sur and the wider Bicol Region.",
      "Whether you have termite damage in a house, cockroaches or rodents in a shop, or a building project that needs pre-construction anti-termite soil treatment, you can request a quotation with a free ocular inspection. Availability depends on the location and required scope.",
    ],
    faqs: [
      { question: "Where is DMSA's office in Camarines Sur?", answer: "DMSA's main office is in Zone 3, Pamukid, San Fernando, Camarines Sur." },
      { question: "Which towns in Camarines Sur does DMSA serve?", answer: "DMSA accepts requests from all 37 cities and municipalities in Camarines Sur, including Naga, Iriga, Pili and Libmanan. Find your town on this page." },
      { question: "Does DMSA serve areas outside San Fernando?", answer: "Yes. DMSA serves homes and businesses across Camarines Sur and the wider Bicol Region. Availability depends on the location and required scope." },
      { question: "Is the ocular inspection free in the Bicol Region?", answer: "Yes. The free ocular inspection is included in the quotation process for properties DMSA can serve." },
    ],
  },
  {
    slug: "catanduanes",
    name: "Catanduanes",
    region: "Bicol Region",
    galleryRegion: "Bicol Region",
    servedFrom: "main",
    launchWave: 4,
    metaTitle: "Pest & Termite Control in Catanduanes",
    metaDescription: "Pest control and termite (anay) treatment in Virac and all Catanduanes towns, arranged from DMSA's main office in Camarines Sur. Free ocular inspection.",
    intro: [
      "DMSA Pest Control Services accepts pest control and termite (anay) treatment requests from Catanduanes, arranged from its main office in San Fernando, Camarines Sur.",
      "Catanduanes is an island province, so share your town and the scope of the work when you request a quotation. DMSA confirms the schedule after reviewing the location.",
    ],
    faqs: [
      { question: "Does DMSA serve Catanduanes?", answer: "Yes. DMSA accepts pest control and termite treatment requests from Virac and all municipalities in Catanduanes. The schedule is confirmed after DMSA reviews the location and scope." },
      { question: "Which DMSA office handles Catanduanes?", answer: "Requests from Catanduanes are handled by DMSA's main office in Zone 3, Pamukid, San Fernando, Camarines Sur." },
      { question: "Is the ocular inspection free in Catanduanes?", answer: "Yes. The free ocular inspection is included in the quotation process for properties DMSA can serve." },
    ],
    accessNote: "Catanduanes is an island province. DMSA accepts requests from every town and arranges island jobs case by case, confirming the schedule after reviewing the location and the scope of work.",
  },
  {
    slug: "masbate",
    name: "Masbate",
    region: "Bicol Region",
    galleryRegion: "Bicol Region",
    servedFrom: "main",
    launchWave: 4,
    metaTitle: "Pest & Termite Control in Masbate",
    metaDescription: "Pest control and termite (anay) treatment in Masbate City and all Masbate towns, arranged from DMSA's main office in Camarines Sur. Free inspection.",
    intro: [
      "DMSA Pest Control Services accepts pest control and termite (anay) treatment requests from Masbate, arranged from its main office in San Fernando, Camarines Sur.",
      "Masbate is an island province, so share your town and the scope of the work when you request a quotation. DMSA confirms the schedule after reviewing the location.",
    ],
    faqs: [
      { question: "Does DMSA serve Masbate?", answer: "Yes. DMSA accepts pest control and termite treatment requests from Masbate City and all municipalities in Masbate. The schedule is confirmed after DMSA reviews the location and scope." },
      { question: "Which DMSA office handles Masbate?", answer: "Requests from Masbate are handled by DMSA's main office in Zone 3, Pamukid, San Fernando, Camarines Sur." },
      { question: "Is the ocular inspection free in Masbate?", answer: "Yes. The free ocular inspection is included in the quotation process for properties DMSA can serve." },
    ],
    accessNote: "Masbate is an island province. DMSA accepts requests from every town and arranges island jobs case by case, confirming the schedule after reviewing the location and the scope of work.",
  },
  {
    slug: "sorsogon",
    name: "Sorsogon",
    region: "Bicol Region",
    galleryRegion: "Bicol Region",
    servedFrom: "main",
    launchWave: 3,
    metaTitle: "Pest & Termite Control in Sorsogon",
    metaDescription: "Pest control and termite (anay) treatment in Sorsogon City and all Sorsogon towns, from DMSA's main office in Camarines Sur. Free ocular inspection.",
    intro: [
      "DMSA Pest Control Services provides termite (anay) treatment and general pest control for homes and businesses in Sorsogon, served from its main office in San Fernando, Camarines Sur.",
      "Requests are welcome from Sorsogon City and every municipality in the province. Each request starts with a free ocular inspection before the treatment and price are confirmed.",
    ],
    faqs: [
      { question: "Does DMSA serve Sorsogon?", answer: "Yes. DMSA accepts pest control and termite treatment requests from all cities and municipalities in Sorsogon. Availability depends on the location and the work needed." },
      { question: "Which DMSA office serves Sorsogon?", answer: "Sorsogon is served from DMSA's main office in Zone 3, Pamukid, San Fernando, Camarines Sur." },
      { question: "Is the ocular inspection free in Sorsogon?", answer: "Yes. The free ocular inspection is included in the quotation process for properties DMSA can serve." },
    ],
  },
];

/** Region headings on /service-areas, in display order. */
export const regions = [
  { id: "calabarzon", name: "Calabarzon" },
  { id: "national-capital-region", name: "Metro Manila" },
  { id: "bicol-region", name: "Bicol Region" },
];

export const isLaunched = (province) => province.launchWave <= launchedWave;
export const launchedProvinces = provinces.filter(isLaunched);

/** The two towns with a DMSA office, for links in the footer and on the about and contact pages. */
export const officeTowns = [
  { name: "San Fernando, Camarines Sur", office: "main", path: "/pest-control/camarines-sur/san-fernando" },
  { name: "Los Baños, Laguna", office: "branch", path: "/pest-control/laguna/los-banos" },
];

/** Where a gallery region or site service area is described: a live province hub, or its section on /service-areas. */
export function areaHref(name) {
  const province = launchedProvinces.find((item) => item.name === name);
  if (province) return `/pest-control/${province.slug}`;
  return `/service-areas#${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}
