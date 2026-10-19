/** @type {import("../lib/content-types").SiteConfig} */
export const siteConfig = {
  name: "DMSA Pest Control Services",
  shortName: "DMSA",
  description:
    "Effective, safe and reliable pest-control solutions for residential and commercial properties, delivered with environmentally responsible care.",
  // Use separate files when the header/footer logo and browser/page icon differ.
  // Place both files in public/brand, then update only these two paths.
  logos: {
    website: "/brand/dmsa-logo-red-profile.png",
    pageIcon: "/brand/dmsa-logo-red.png",
  },
  address:
    "Zone 3, Pamukid, San Fernando, Camarines Sur, Philippines, Los Baños Branch: San Antonio, Los Baños, Laguna",
  additionalLocation: "San Antonio, Los Baños, Laguna, Philippines",
  phoneViber: "0918 299 5218",
  phoneViberHref: "+639182995218",
  phoneMobile: "0955 562 9226",
  phoneMobileHref: "+639556292226",
  publicEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  socialLinks: {
    facebook: "https://www.facebook.com/dmsapestcontrol",
    instagram: "https://www.instagram.com/dmsapestcontrol/",
    tiktok: "https://www.tiktok.com/@dmsapestcontrolservices",
    email: "dmsapestcontrolservices@gmail.com",
  },
  hours: "Monday–Sunday, 8:00 AM–5:00 PM",
  serviceAreas: [
    "Bicol Region",
    "Cavite",
    "Laguna",
    "Batangas",
    "Rizal",
    "Quezon",
    "Metro Manila",
  ],
  hqCoordinates: [123.145, 13.574],
};

/** @type {import("../lib/content-types").ContentPoint[]} */
export const trustPoints = [
  {
    title: "Effective solutions",
    detail: "Inspection-led planning",
    icon: "compass",
  },
  {
    title: "Safe & reliable service",
    detail: "Considerate service planning",
    icon: "shield",
  },
  {
    title: "Residential & commercial",
    detail: "Service for varied properties",
    icon: "building",
  },
  {
    title: "Environmentally responsible",
    detail: "Care for people and surroundings",
    icon: "sprout",
  },
];

/** @type {import("../lib/content-types").ContentPoint[]} */
export const companyValues = [
  {
    title: "Effective solutions",
    text: "Recommendations begin with inspection findings, pest activity and the conditions present at the property.",
    icon: "compass",
  },
  {
    title: "Safe & reliable service",
    text: "Service is planned with clear preparation, responsible application and dependable follow-up guidance.",
    icon: "shield",
  },
  {
    title: "Residential & commercial",
    text: "DMSA supports homes, offices, retail spaces, warehouses, construction sites and other property needs.",
    icon: "building",
  },
  {
    title: "Environmentally responsible",
    text: "Planning considers occupants, the property and surrounding environment throughout the service process.",
    icon: "sprout",
  },
];

/** @type {import("../lib/content-types").ProcessStep[]} */
export const processSteps = [
  {
    number: "01",
    title: "Request a quotation",
    text: "Share your concern and property location.",
    icon: "message",
  },
  {
    number: "02",
    title: "Free ocular inspection",
    text: "Arrange a free site review for your quotation.",
    icon: "search",
  },
  {
    number: "03",
    title: "Review the quotation",
    text: "Review the approach, schedule and price.",
    icon: "clipboard",
  },
  {
    number: "04",
    title: "Service & guidance",
    text: "Get service and practical prevention guidance.",
    icon: "calendar",
  },
];
