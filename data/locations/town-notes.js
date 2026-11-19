// Local details for individual towns, written by DMSA. Keyed "province-slug/town-slug",
// the same as the page URL: /pest-control/laguna/los-banos → "laguna/los-banos".
//
// A town page goes into Google (indexable and in the sitemap) once it has real local content:
// a DMSA office, a completed job in data/gallery-data.js, or at least 120 words of localNotes.
// Until then it stays visible to visitors but is marked noindex. Run `npm run seo:locations`
// to see every town's status.
//
// Only write what is true for that town: jobs done (no client names or exact addresses),
// barangays or subdivisions served, how far ahead to book, travel or access details.
//
// Example:
//   "laguna/calamba": {
//     barangaysServed: ["Real", "Parian"],
//     localNotes: ["In 2026, DMSA treated ...", "..."],
//   },

/** @type {Record<string, import("../../lib/content-types").TownNotes>} */
export const townNotes = {
  "laguna/los-banos": {
    metaDescription: "Pest control and termite (anay) treatment in Los Baños, Laguna, from DMSA's local branch. Completed jobs in Anos and Marymount Village. Free inspection.",
    intro: "DMSA Pest Control Services has a branch in San Antonio, Los Baños, so homes and businesses in town are served by a local team. Services cover termites (anay), cockroaches (ipis), ants (langgam), flies and rodents (daga), for houses, apartments, condominiums, shops, offices and buildings under construction.",
    localNotes: [
      "DMSA has completed two termite jobs in Barangay Anos. In one home, the team treated termite-affected areas and likely entry points in walls, floors and cabinets through drilled injection points, and removed termite-infested soil and debris. In Marymount Village, the treatment combined chemical injection in affected areas with soil poisoning, and the before-and-after photos show a storage area cleared of infested soil.",
      "Because the branch is in Los Baños, the free ocular inspection can be arranged with the local team. When you request a quotation, share your barangay or subdivision and drop a pin on the map so DMSA can review the location.",
    ],
    barangaysServed: ["Anos"],
    faqs: [
      { question: "Is there a DMSA branch in Los Baños?", answer: "Yes. DMSA's Los Baños branch is in San Antonio, Los Baños, Laguna." },
      { question: "Has DMSA done termite treatment in Los Baños?", answer: "Yes. Completed jobs include residential termite control in Anos and termite control with chemical injection and soil poisoning in Marymount Village, both shown on this page." },
    ],
  },
  "laguna/binan": {
    metaDescription: "Termite (anay) control and pest control in Biñan, Laguna, by DMSA. Completed soil poisoning and chemical injection job in South Langkiwa. Free inspection.",
    intro: "DMSA Pest Control Services provides termite (anay) control and general pest control for homes and businesses in Biñan, Laguna. The nearest DMSA location is the Laguna branch in San Antonio, Los Baños.",
    localNotes: [
      "In November 2026, DMSA treated a home in San Antonio, South Langkiwa, Biñan. The work combined chemical injection in termite-affected areas, such as walls and door frames, with soil poisoning along the walls, and the team removed termite-infested soil and debris as part of the cleanup. Photos of the job are shown below.",
    ],
    faqs: [
      { question: "What termite treatment did DMSA do in Biñan?", answer: "The job in South Langkiwa combined chemical injection in termite-affected areas with soil poisoning, plus removal of termite-infested soil and debris." },
    ],
  },
  "camarines-sur/san-fernando": {
    metaDescription: "Pest control and termite (anay) treatment in San Fernando, Camarines Sur, from DMSA's main office in Zone 3, Pamukid. Free ocular inspection included.",
    intro: "DMSA Pest Control Services' main office is in Zone 3, Pamukid, San Fernando, Camarines Sur. From here, DMSA provides pest and termite (anay) control for homes and businesses in San Fernando and across the Bicol Region.",
    localNotes: [
      "With the main office in town, the free ocular inspection can be arranged by the San Fernando team. Services include termite control and soil poisoning, general pest control for ants (langgam), cockroaches (ipis), flies and rodents (daga), and pre-construction anti-termite soil treatment for new buildings.",
      "To get started, request a quotation with your barangay and a pin on the map, call 0955 562 9226, or message 0918 299 5218 on Viber. DMSA confirms the treatment, schedule and price after reviewing the property.",
    ],
    faqs: [
      { question: "Where is DMSA's office in San Fernando?", answer: "DMSA's main office is in Zone 3, Pamukid, San Fernando, Camarines Sur." },
      { question: "Does DMSA offer termite treatment in San Fernando?", answer: "Yes. DMSA provides termite inspection and treatment for existing homes and buildings, and pre-construction soil treatment for new builds." },
      { question: "Do you serve towns near San Fernando?", answer: "Yes. DMSA serves homes and businesses across Camarines Sur and the rest of the Bicol Region, depending on the location and the work needed." },
    ],
  },
  // TODO(owner): Quezon border towns such as "quezon/tagkawayan", "quezon/calauag" and
  // "quezon/guinayangan" may be closer to the San Fernando main office. Add
  // `servedFrom: "main"` for any town the main office handles.
};

// Island municipalities in mainland provinces. Confirmed by DMSA (November 2026): island
// jobs are accepted and arranged case by case. Catanduanes and Masbate carry the same note
// at province level in provinces.js.
const islandTowns = [
  ["quezon/polillo", "Polillo"],
  ["quezon/burdeos", "Burdeos"],
  ["quezon/panukulan", "Panukulan"],
  ["quezon/patnanungan", "Patnanungan"],
  ["quezon/jomalig", "Jomalig"],
  ["quezon/alabat", "Alabat"],
  ["quezon/perez", "Perez"],
  ["quezon/quezon", "Quezon"],
  ["batangas/tingloy", "Tingloy"],
  ["albay/rapu-rapu", "Rapu-Rapu"],
];
for (const [key, name] of islandTowns) {
  townNotes[key] = {
    ...townNotes[key],
    accessNote: `${name} is an island municipality. DMSA accepts requests from ${name} and arranges island jobs case by case, confirming the schedule after reviewing the location and the scope of work.`,
  };
}
