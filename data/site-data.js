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
  // Main office. The Los Baños branch is additionalLocation. Keep both exactly as they
  // appear on the Google Business Profiles.
  address: "Zone 3, Pamukid, San Fernando, Camarines Sur, Philippines",
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
  hours: "Monday to Sunday, 8:00 AM to 5:00 PM",
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
  // Google Business Profiles, one per office. Los Baños branch: live (November 2026).
  // TODO(owner): add `main` with the San Fernando profile's Maps and review links once it exists.
  googleProfiles: {
    branch: {
      mapsUrl: "https://share.google/lmiBH1J2hpkeuoI4U",
      reviewUrl: "https://g.page/r/CY61rhsMxv0sECE/review",
    },
  },
};

/** @type {import("../lib/content-types").ContentPoint[]} */
export const trustPoints = [
  {
    title: "Effective solutions",
    detail: "Plans based on what we find",
    icon: "compass",
  },
  {
    title: "Safe & reliable service",
    detail: "Careful, well-planned visits",
    icon: "shield",
  },
  {
    title: "Homes & businesses",
    detail: "Houses, condos, shops and sites",
    icon: "building",
  },
  {
    title: "Care for the environment",
    detail: "Mindful of people and nature",
    icon: "sprout",
  },
];

/** @type {import("../lib/content-types").ContentPoint[]} */
export const companyValues = [
  {
    title: "Effective solutions",
    text: "We plan each job from what the inspection finds: the pest, where it is and the state of the property.",
    icon: "compass",
  },
  {
    title: "Safe & reliable service",
    text: "Each visit comes with clear prep steps, careful treatment and follow-up advice you can rely on.",
    icon: "shield",
  },
  {
    title: "Homes & businesses",
    text: "DMSA serves homes, offices, shops, warehouses, building sites and more.",
    icon: "building",
  },
  {
    title: "Care for the environment",
    text: "We plan with care for the people in the building, the property and the area around it.",
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
    text: "We check your place for free.",
    icon: "search",
  },
  {
    number: "03",
    title: "Review the quotation",
    text: "See the plan, the schedule and the price.",
    icon: "clipboard",
  },
  {
    number: "04",
    title: "Service & guidance",
    text: "We treat and share tips to keep pests out.",
    icon: "calendar",
  },
];

// TODO(owner): fill in these facts. Each one appears on the site (home, about, service,
// price and town pages, plus the business schema) only once it has a value, so nothing
// unconfirmed is ever published. Leave a fact as "" until it is confirmed.
/** @type {import("../lib/content-types").TrustFacts} */
export const trustFacts = {
  /** Year DMSA started operating, e.g. "2015". */
  foundedYear: "",
  /** Completed jobs, as you want it shown, e.g. "500+". */
  jobsCompleted: "",
  /** Warranty or re-treatment policy in one sentence. */
  warranty: "",
  /** The kind of products used, in one sentence. */
  products: "",
};

// TODO(owner): optional starting price ranges for /pest-control-price, e.g.
// { service: "General pest control, condo unit", range: "From ₱X" }. Leave empty to show no prices.
/** @type {{ service: string; range: string; note?: string }[]} */
export const priceRanges = [];
