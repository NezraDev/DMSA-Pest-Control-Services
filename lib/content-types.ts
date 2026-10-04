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
  imagePaths: string[];
  beforeImage: string | false;
  afterImage: string | false;
  category: string;
  displayCategory: string;
  propertyType: string;
  servicePerformed: "General Pest Control" | "Termite Control";
  generalLocation: string;
  treatmentDate: string;
  year: number;
  coordinates: [number, number];
  region: "Bicol Region" | "Cavite" | "Laguna" | "Batangas" | "Rizal" | "Quezon" | "Metro Manila";
  pest: "Ants" | "Cockroaches" | "Flies" | "Rodents" | "Termites";
  customerType: "Residential" | "Commercial" | "Other";
  customerTypeOther?: string;
  description: string;
  shortDescription: string;
  customerFeedback: string;
  featured: boolean;
  isSample: true;
};

export type PageHeroContent = {
  eyebrow: string;
  title: string;
  description: string;
};
