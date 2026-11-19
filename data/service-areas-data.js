// Every area appears on /service-areas and /treated-locations. Set `page` only when there is
// real local information to publish, such as an office or completed jobs. Near-identical
// pages can be treated by Google as doorway pages and hurt rankings.

/** @type {import("../lib/content-types").ServiceArea[]} */
export const serviceAreas = [
  {
    name: "Bicol Region",
    summary: "DMSA's main office is in Zone 3, Pamukid, San Fernando, Camarines Sur, serving homes and businesses across the Bicol Region.",
    page: {
      slug: "bicol-camarines-sur",
      metaTitle: "Pest & Termite Control in Camarines Sur",
      metaDescription: "Pest control and termite (anay) treatment in Camarines Sur and the Bicol Region, from DMSA's San Fernando office. Request a free ocular inspection.",
      heading: "Pest and termite control in Camarines Sur and the Bicol Region",
      intro: [
        "DMSA Pest Control Services is based in Zone 3, Pamukid, San Fernando, Camarines Sur. From here, DMSA provides pest control and termite (anay) treatment for residential and commercial properties in Camarines Sur and the wider Bicol Region.",
        "Whether you have termite damage in a house, cockroaches or rodents in a shop, or a building project that needs pre-construction anti-termite soil treatment, you can request a quotation with a free ocular inspection. Availability depends on the location and required scope.",
      ],
      faqs: [
        { question: "Where is DMSA's office in Camarines Sur?", answer: "DMSA's main office is in Zone 3, Pamukid, San Fernando, Camarines Sur." },
        { question: "Does DMSA serve areas outside San Fernando?", answer: "Yes. DMSA serves homes and businesses across Camarines Sur and the wider Bicol Region. Availability depends on the location and required scope." },
        { question: "Is the ocular inspection free in the Bicol Region?", answer: "Yes. The free ocular inspection is included in the quotation process for properties DMSA can serve." },
      ],
    },
  },
  {
    name: "Laguna",
    summary: "DMSA's Los Baños branch is in San Antonio, Los Baños, and the team has completed termite treatment in Anos, Marymount Village and South Langkiwa, Biñan.",
    page: {
      slug: "laguna",
      metaTitle: "Pest & Termite Control in Laguna",
      metaDescription: "Pest control and termite (anay) treatment in Laguna from DMSA's Los Baños branch, with completed jobs in Los Baños and Biñan. Free ocular inspection.",
      heading: "Pest and termite control in Los Baños and Laguna",
      intro: [
        "DMSA Pest Control Services has a branch in San Antonio, Los Baños, and provides pest control and termite (anay) treatment for homes and businesses in Laguna.",
        "Completed work in the province includes residential termite control in Anos, Los Baños; termite control with chemical injection and soil poisoning in Marymount Village, Los Baños; and the same treatment in San Antonio, South Langkiwa, Biñan. All three jobs are shown below with photos. To discuss your property, request a quotation with a free ocular inspection.",
      ],
      faqs: [
        { question: "Does DMSA have a branch in Laguna?", answer: "Yes. DMSA's Laguna branch is in San Antonio, Los Baños. Call 0955 562 9226 or message 0918 299 5218 on Viber." },
        { question: "Which towns in Laguna has DMSA worked in?", answer: "Completed jobs shown on this site include Anos and Marymount Village in Los Baños, and South Langkiwa in Biñan. For other towns, request a quotation; availability depends on the location and scope." },
        { question: "Does DMSA do soil poisoning in Laguna?", answer: "Yes. DMSA has carried out soil poisoning together with chemical injection in Marymount Village, Los Baños, and in South Langkiwa, Biñan." },
      ],
    },
  },
  {
    name: "Cavite",
    summary: "Termite treatment and general pest control for homes, offices and shops in Cavite, with pre-construction soil treatment for new builds.",
  },
  {
    name: "Batangas",
    summary: "Pest control in Batangas for houses and commercial properties, including ants, cockroaches, flies, rodents and termites.",
  },
  {
    name: "Rizal",
    summary: "Residential and commercial pest control in Rizal, starting with a quotation request and a free ocular inspection of the property.",
  },
  {
    name: "Quezon",
    summary: "Anay treatment and pest management in Quezon province for homes, retail spaces, warehouses and other properties.",
  },
  {
    name: "Metro Manila",
    summary: "Pest control and termite treatment in Metro Manila for condominiums, apartments, houses, offices and retail spaces.",
  },
];
