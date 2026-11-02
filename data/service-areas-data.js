// Every area appears on /treated-locations. Set `page` only when there is real local
// information to publish, such as an office or completed jobs. Near-identical town
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
    },
  },
  {
    name: "Laguna",
    summary: "DMSA's Los Baños branch is in San Antonio, Los Baños, and the team has completed residential termite treatment in Anos and Marymount Village.",
    page: {
      slug: "laguna",
      metaTitle: "Pest & Termite Control in Los Baños, Laguna",
      metaDescription: "Pest control and termite (anay) treatment in Laguna from DMSA's Los Baños branch, with completed work in Anos and Marymount Village. Free inspection.",
      heading: "Pest and termite control in Los Baños and Laguna",
      intro: [
        "DMSA Pest Control Services has a branch in San Antonio, Los Baños, and provides pest control and termite (anay) treatment for homes and businesses in Laguna.",
        "Completed work in the area includes residential termite control in Anos, Los Baños, and termite control with chemical injection and soil poisoning in Marymount Village. Both jobs are shown below with photos. To discuss your property, request a quotation with a free ocular inspection.",
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
