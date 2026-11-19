export type IconName =
  | "bug"
  | "building"
  | "calendar"
  | "clipboard"
  | "compass"
  | "handshake"
  | "home"
  | "map"
  | "message"
  | "rat"
  | "search"
  | "shield"
  | "sprout";

export type SiteConfig = {
  name: string;
  shortName: string;
  description: string;
  logos: {
    website: string;
    pageIcon: string;
  };
  address: string;
  additionalLocation: string;
  phoneViber: string;
  phoneViberHref: string;
  phoneMobile: string;
  phoneMobileHref: string;
  publicEmail: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    tiktok: string;
    email: string;
  };
  hours: string;
  serviceAreas: string[];
  hqCoordinates: [number, number];
  /** Google Maps link of the main office's Business Profile. */
  googleMapsUrl?: string;
  /** "Write a review" link from the Business Profile. */
  googleReviewUrl?: string;
};

export type TrustFacts = {
  foundedYear: string;
  jobsCompleted: string;
  warranty: string;
  products: string;
};

export type NavigationItem = { href: string; label: string };

export type ServiceNote = { title: string; paragraphs: string[] };

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  description: string;
  signs: string[];
  process: string[];
  prevention: string[];
  icon: IconName;
  quoteService: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  overview: string[];
  overviewHeading: string;
  visit: string[];
  preparation: string[];
  note: ServiceNote;
  faqs: Faq[];
};

export type ServiceArea = {
  name: string;
  summary: string;
};

/** A city or municipality as published in the PSA Philippine Standard Geographic Code. */
export type PsgcTown = {
  code: string;
  name: string;
  alias?: string;
  officialName: string;
  type: "city" | "municipality";
  barangays: string[];
};

export type PsgcProvince = { name: string; towns: PsgcTown[] };

export type Office = "main" | "branch";

export type Province = {
  slug: string;
  /** Must match a province name in psgc-data.js. */
  name: string;
  /** Region heading on /service-areas. */
  region: "Calabarzon" | "Metro Manila" | "Bicol Region";
  /** The matching GalleryItem region, so jobs can be found for the province. */
  galleryRegion: GalleryItem["region"];
  /** Default office for the province's towns. A town can override it in town-notes.js. */
  servedFrom: Office;
  /** Pages go live when this wave is at or below `launchedWave` in provinces.js. */
  launchWave: 1 | 2 | 3 | 4;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  faqs: Faq[];
  /** How DMSA reaches the province (e.g. island travel). Hidden until confirmed by the owner. */
  accessNote?: string;
};

/** Owner-supplied local details for one town, keyed "province-slug/town-slug" in town-notes.js. */
export type TownNotes = {
  servedFrom?: Office;
  metaDescription?: string;
  /** Replaces the generated first paragraph. */
  intro?: string;
  /** Paragraphs written for this town, such as jobs done, areas covered and travel. */
  localNotes?: string[];
  /** Barangays or subdivisions where DMSA has worked. */
  barangaysServed?: string[];
  /** How DMSA reaches the town (e.g. by boat). Shown only when set. */
  accessNote?: string;
  faqs?: Faq[];
};

export type ArticleTable = { caption: string; head: string[]; rows: string[][] };

export type GuideSection = { id: string; heading: string; paragraphs?: string[]; list?: string[]; table?: ArticleTable; after?: string[] };

export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  cardSummary: string;
  datePublished: string;
  dateModified: string;
  relatedService: string;
  /** Pest page (/pests/<slug>) this guide supports. */
  relatedPest?: string;
  sections: GuideSection[];
  faqs: Faq[];
  related: string[];
};

/** An outline for a future guide. Drafts are never built into pages. */
export type GuideDraft = {
  title: string;
  targetKeyword: string;
  /** The one existing URL this guide supports and links to. */
  supports: string;
  outline: string[];
  /** Facts DMSA must confirm before the guide is written. */
  ownerToConfirm: string[];
};

export type Pest = {
  slug: string;
  name: string;
  localName: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** Quick answer shown first. */
  summary: string;
  cardSummary: string;
  relatedService: string;
  relatedGuides: string[];
  dateModified: string;
  sections: GuideSection[];
  faqs: Faq[];
};

export type Industry = {
  slug: string;
  name: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  cardSummary: string;
  sections: GuideSection[];
  faqs: Faq[];
  relatedPests: string[];
  relatedGuides: string[];
};

export type ContentPoint = {
  title: string;
  detail?: string;
  text?: string;
  icon: IconName;
};

export type ProcessStep = {
  number: string;
  title: string;
  text: string;
  icon: IconName;
};

export type Faq = { question: string; answer: string };

export type GalleryItem = {
  id: string;
  slug: string;
  title: string;
  /** The page H1. It must be unique across the site, so it names the place. */
  heading: string;
  metaTitle: string;
  /**
   * Case-study details, filled in by DMSA. Each section shows only when it has text.
   * Never include client names or exact addresses.
   */
  caseStudy?: {
    /** What the client noticed before calling DMSA. */
    problem?: string[];
    /** What the inspection found, and where. */
    findings?: string[];
    /** The treatment, step by step. */
    treatment?: string[];
    /** Rooms, structures or soil areas treated. */
    areaTreated?: string;
    /** Follow-up visits and advice given to the client. */
    aftercare?: string[];
  };
  imagePaths: string[];
  beforeImage: string | false;
  afterImage: string | false;
  category: string;
  displayCategory: string;
  propertyType: string;
  servicePerformed: string;
  generalLocation: string;
  /** "YYYY-MM-DD", or "YYYY-MM" when only the month is known. */
  treatmentDate: string;
  year: number;
  coordinates: [number, number];
  region:
    | "Bicol Region"
    | "Cavite"
    | "Laguna"
    | "Batangas"
    | "Rizal"
    | "Quezon"
    | "Metro Manila";
  pest: "Ants" | "Cockroaches" | "Flies" | "Rodents" | "Termites";
  customerType: "Residential" | "Commercial" | "Other";
  customerTypeOther?: string;
  description: string;
  shortDescription: string;
  customerFeedback: string;
  featured: boolean;
  /** Key of the town page, "province-slug/town-slug", as in /pest-control/laguna/los-banos. */
  town?: string;
  /** One caption per entry in imagePaths, describing what the photo shows. */
  imageCaptions?: string[];
  /** Captions for the before and after images. */
  comparisonCaptions?: [string, string];
};

export type PageHeroContent = {
  title: string;
  description: string;
};
