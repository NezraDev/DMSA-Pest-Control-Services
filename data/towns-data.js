// Town pages exist only where DMSA has an office or a documented job, so each page has
// real local content. Add a town when there is something specific to say about it
// (a completed job, a branch, confirmed coverage), never as a copy of another page.

/** @type {import("../lib/content-types").Town[]} */
export const towns = [
  {
    slug: "los-banos",
    name: "Los Baños",
    province: "Laguna",
    region: "Laguna",
    coordinates: [121.2394, 14.1699],
    servedFrom: "branch",
    metaTitle: "Pest Control in Los Baños, Laguna",
    metaDescription: "Pest control and termite (anay) treatment in Los Baños, Laguna, from DMSA's local branch. Completed jobs in Anos and Marymount Village. Free inspection.",
    heading: "Pest control and termite (anay) treatment in Los Baños",
    intro: [
      "DMSA Pest Control Services has a branch in San Antonio, Los Baños, so homes and businesses in town are served by a local team. Services cover termites (anay), cockroaches (ipis), ants (langgam), flies and rodents (daga), for houses, apartments, condominiums, shops, offices and buildings under construction.",
    ],
    local: [
      "DMSA has completed two termite jobs in Barangay Anos. In one home, the team treated termite-affected areas and likely entry points in walls, floors and cabinets through drilled injection points, and removed termite-infested soil and debris. In Marymount Village, the treatment combined chemical injection in affected areas with soil poisoning, and the before-and-after photos show a storage area cleared of infested soil.",
      "Because the branch is in Los Baños, the free ocular inspection can be arranged with the local team. When you request a quotation, share your barangay or subdivision and drop a pin on the map so DMSA can review the location.",
    ],
    faqs: [
      { question: "Is there a DMSA branch in Los Baños?", answer: "Yes. DMSA's Los Baños branch is in San Antonio, Los Baños, Laguna." },
      { question: "Has DMSA done termite treatment in Los Baños?", answer: "Yes. Completed jobs include residential termite control in Anos and termite control with chemical injection and soil poisoning in Marymount Village, both shown on this page." },
      { question: "How do I book an inspection in Los Baños?", answer: "Request a quotation online, call 0955 562 9226 or message 0918 299 5218 on Viber. The ocular inspection is free and included in the quotation process." },
    ],
    nearby: ["binan"],
  },
  {
    slug: "binan",
    name: "Biñan",
    province: "Laguna",
    region: "Laguna",
    coordinates: [121.0806, 14.3397],
    servedFrom: "branch",
    metaTitle: "Pest Control in Biñan, Laguna",
    metaDescription: "Termite (anay) control and pest control in Biñan, Laguna, by DMSA. Completed soil poisoning and chemical injection job in South Langkiwa. Free inspection.",
    heading: "Pest control and termite (anay) treatment in Biñan",
    intro: [
      "DMSA Pest Control Services provides termite (anay) control and general pest control for homes and businesses in Biñan, Laguna. The nearest DMSA location is the Laguna branch in San Antonio, Los Baños.",
    ],
    local: [
      "In November 2026, DMSA treated a home in San Antonio, South Langkiwa, Biñan. The work combined chemical injection in termite-affected areas, such as walls and door frames, with soil poisoning along the walls, and the team removed termite-infested soil and debris as part of the cleanup. Photos of the job are shown below.",
      "If you see mud tubes, damaged door frames or swarming insects at home in Biñan, request a quotation with your barangay or subdivision and a pin on the map. The ocular inspection is free and included in the quotation process.",
    ],
    faqs: [
      { question: "Does DMSA serve Biñan?", answer: "Yes. DMSA has completed termite treatment in South Langkiwa, Biñan. Availability for your property depends on the location and scope, so request a quotation to confirm." },
      { question: "What termite treatment did DMSA do in Biñan?", answer: "The job in South Langkiwa combined chemical injection in termite-affected areas with soil poisoning, plus removal of termite-infested soil and debris." },
      { question: "Where is the nearest DMSA office to Biñan?", answer: "The nearest DMSA location is the Laguna branch in San Antonio, Los Baños." },
    ],
    nearby: ["los-banos"],
  },
  {
    slug: "san-fernando-camarines-sur",
    name: "San Fernando",
    province: "Camarines Sur",
    region: "Bicol Region",
    coordinates: [123.145, 13.574],
    servedFrom: "main",
    metaTitle: "Pest Control in San Fernando, CamSur",
    metaDescription: "Pest control and termite (anay) treatment in San Fernando, Camarines Sur, from DMSA's main office in Zone 3, Pamukid. Free ocular inspection included.",
    heading: "Pest control and termite (anay) treatment in San Fernando, Camarines Sur",
    intro: [
      "DMSA Pest Control Services' main office is in Zone 3, Pamukid, San Fernando, Camarines Sur. From here, DMSA provides pest and termite (anay) control for homes and businesses in San Fernando and across the Bicol Region.",
    ],
    local: [
      "With the main office in town, the free ocular inspection can be arranged by the San Fernando team. Services include termite control and soil poisoning, general pest control for ants (langgam), cockroaches (ipis), flies and rodents (daga), and pre-construction anti-termite soil treatment for new buildings.",
      "To get started, request a quotation with your barangay and a pin on the map, call 0955 562 9226, or message 0918 299 5218 on Viber. DMSA confirms the treatment, schedule and price after reviewing the property.",
    ],
    faqs: [
      { question: "Where is DMSA's office in San Fernando?", answer: "DMSA's main office is in Zone 3, Pamukid, San Fernando, Camarines Sur." },
      { question: "Does DMSA offer termite treatment in San Fernando?", answer: "Yes. DMSA provides termite inspection and treatment for existing homes and buildings, and pre-construction soil treatment for new builds." },
      { question: "Do you serve towns near San Fernando?", answer: "Yes. DMSA serves homes and businesses across Camarines Sur and the rest of the Bicol Region, depending on the location and the work needed." },
    ],
    nearby: [],
  },
];
