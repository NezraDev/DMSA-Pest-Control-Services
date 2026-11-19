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
  page?: {
    slug: string;
    metaTitle: string;
    metaDescription: string;
    heading: string;
    intro: string[];
    faqs: Faq[];
  };
};

export type Town = {
  slug: string;
  name: string;
  province: string;
  /** Must match a ServiceArea name. */
  region: string;
  /** Approximate town centre, used only to sort nearby jobs. */
  coordinates: [number, number];
  servedFrom: "main" | "branch";
  metaTitle: string;
  metaDescription: string;
  heading: string;
  intro: string[];
  local: string[];
  faqs: Faq[];
  nearby: string[];
};

export type GuideSection = { id: string; heading: string; paragraphs?: string[]; list?: string[]; after?: string[] };

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
  sections: GuideSection[];
  related: string[];
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
  metaTitle: string;
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
  /** Slug of the matching /pest-control/<town> page, when one exists. */
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
