// The words on every town and province page, built from that place's own data. The page
// components render these objects, and the quality gate (location-quality.ts) measures the
// same text, so what Google sees and what the gate checks can never drift apart.
import { guides } from "../data/guides-data.js";
import { services } from "../data/services-data.js";
import { siteConfig } from "../data/site-data.js";
import type { Faq, GalleryItem, Guide } from "./content-types.ts";
import {
  jobsNear,
  nearestTowns,
  officeDistanceKm,
  offices,
  splitBarangays,
  townJobs,
  type LocationProvince,
  type LocationTown,
} from "./locations.ts";

/** Characters the root title template adds: " | DMSA Pest Control". */
export const titleSuffix = " | DMSA Pest Control";
const maxTitle = 60;
const descriptionRange = [120, 155] as const;

const contactLine = `Call ${siteConfig.phoneMobile} or message ${siteConfig.phoneViber} on Viber`;

/** Title for a page rendered through the root template, or a full title when the template would make it too long. */
export function fitTitle(candidates: string[]): { title?: string; absoluteTitle?: string; full: string } {
  // Keep the most specific wording (e.g. the province) and shorten the brand before dropping words.
  for (const title of candidates) {
    if (title.length + titleSuffix.length <= maxTitle) return { title, full: title + titleSuffix };
    const absolute = `${title} | DMSA`;
    if (absolute.length <= maxTitle) return { absoluteTitle: absolute, full: absolute };
  }
  const last = `${candidates.at(-1)} | DMSA`;
  return { absoluteTitle: last, full: last };
}

/** The first candidate that fits the meta description length Google shows in full. */
export function fitDescription(candidates: string[]) {
  return candidates.find((text) => text.length >= descriptionRange[0] && text.length <= descriptionRange[1])
    ?? candidates.reduce((best, text) => (Math.abs(text.length - 140) < Math.abs(best.length - 140) ? text : best));
}

/** Spreads related-guide links across the site so every guide gets internal links. */
function rotatingGuides(seed: string, count = 3): Guide[] {
  let hash = 0;
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return Array.from({ length: count }, (_, index) => guides[(hash + index) % guides.length]);
}

const serviceLines = () => services.map((service) => ({ title: service.title, href: `/services/${service.slug}`, text: service.description }));

export const serviceSteps = [
  `Request a quotation online, call ${siteConfig.phoneMobile} or message ${siteConfig.phoneViber} on Viber. Share your barangay or subdivision and drop a pin on the map.`,
  "DMSA reviews your request and arranges the free ocular inspection.",
  "After the inspection, DMSA recommends a treatment and confirms the scope, schedule and price.",
  "The team carries out the treatment and gives prevention or monitoring advice for the property.",
];

function dedupeFaqs(faqs: Faq[]) {
  const seen = new Set<string>();
  return faqs.filter((faq) => (seen.has(faq.question) ? false : (seen.add(faq.question), true)));
}

const countWords = (text: string) => text.split(/\s+/).filter(Boolean).length;

export type TownContent = {
  path: string;
  heading: string;
  title: ReturnType<typeof fitTitle>;
  metaDescription: string;
  intro: string;
  officeHeading: string;
  officeParagraphs: string[];
  overviewHeading: string;
  overview: string[];
  barangayHeading: string;
  barangayIntro: string;
  barangaysServed: string[];
  barangayList: { named: string[]; numbered: number };
  services: { title: string; href: string; text: string }[];
  soilNote: string;
  steps: string[];
  faqs: Faq[];
  neighbours: { name: string; province: string; path: string; km: number }[];
  jobs: { job: GalleryItem; km: number }[];
  guides: Guide[];
  /** Words in owner notes, for the quality gate. */
  noteWords: number;
};

export function townContent(town: LocationTown): TownContent {
  const { name, province, notes } = town;
  const office = offices[town.servedFrom];
  const km = officeDistanceKm(town);
  const place = `${name}, ${province.name}`;
  const typeLabel = town.type === "city" ? "city" : "municipality";
  const displayName = town.alias ? `${name} (${town.alias})` : name;
  const count = town.barangays.length;

  const intro = notes.intro
    ?? `DMSA Pest Control Services provides termite (anay) treatment and general pest control for homes and businesses in ${place}. ${name} is served from DMSA's ${office.label}.`;

  const distanceSentence = town.hasOffice
    ? `DMSA's ${office.shortLabel} is at ${office.address}.`
    : km === null
      ? `${name} is served from DMSA's ${office.label}, at ${office.address}.`
      : `${name} is served from DMSA's ${office.label}, about ${km} km away in a straight line. The office is at ${office.address}.`;
  const officeParagraphs = [
    distanceSentence,
    `Both DMSA locations are open ${siteConfig.hours}. ${contactLine}, or request a quotation online. The free ocular inspection is arranged after DMSA reviews your request.`,
    ...[notes.accessNote ?? province.accessNote].filter((note): note is string => Boolean(note)),
  ];

  const overview = notes.localNotes?.length
    ? notes.localNotes
    : [
      `Services available in ${name} include termite (anay) inspection and treatment, soil poisoning before construction, and general pest control for cockroaches (ipis), ants (langgam), flies (langaw) and rats and mice (daga). DMSA works with houses, apartments and condominiums as well as offices, shops, warehouses and buildings under construction.`,
      "Every request starts with the free ocular inspection. DMSA confirms the treatment, schedule and price before any work begins, and gives prevention advice afterwards.",
    ];

  const barangayIntro = `${displayName} is a ${typeLabel} in ${province.name} with ${count} barangays. DMSA accepts quotation requests from homes and businesses in all of them.`;

  const generatedFaqs: Faq[] = [
    {
      question: `Does DMSA offer pest control in ${name}?`,
      answer: `Yes. DMSA provides termite (anay) treatment and general pest control for homes and businesses in ${place}, served from its ${office.label}. Request a quotation to arrange the free ocular inspection.`,
    },
    ...(!town.hasOffice && km !== null
      ? [{
        question: `How far is ${name} from the nearest DMSA office?`,
        answer: `${name} is about ${km} km in a straight line from DMSA's ${office.label}. Road distance is longer, and DMSA confirms the schedule after reviewing your request.`,
      }]
      : []),
    {
      question: `How do I book a pest control inspection in ${name}?`,
      answer: `Request a quotation online, call ${siteConfig.phoneMobile} or message ${siteConfig.phoneViber} on Viber. Share your barangay and drop a pin on the map. The ocular inspection is free and included in the quotation process.`,
    },
    {
      question: `Does DMSA do soil poisoning before construction in ${name}?`,
      answer: `Yes. DMSA provides pre-construction anti-termite soil treatment for new homes and buildings in ${name}. Share the construction stage and schedule when you request a quotation, so the treatment can be done before the floor slab is poured.`,
    },
  ];

  const title = fitTitle([`Pest Control in ${place}`, `Pest Control in ${name}`]);
  const metaDescription = notes.metaDescription ?? fitDescription([
    `Termite (anay) treatment and pest control for homes and businesses in ${place}, from DMSA's ${office.shortLabel}. Free ocular inspection.`,
    `Termite (anay) treatment and pest control in ${place}, from DMSA's ${office.shortLabel}. Homes and businesses. Free ocular inspection.`,
    `Termite (anay) treatment and pest control in ${place}, from DMSA's ${office.shortLabel}. Free ocular inspection.`,
    `Termite (anay) and pest control in ${place} from DMSA's ${office.shortLabel}. Free inspection.`,
    `Termite (anay) treatment and general pest control for homes, condos, offices and shops in ${place}, from DMSA's ${office.shortLabel}. Free ocular inspection.`,
  ]);

  return {
    path: town.path,
    heading: `Pest control and termite (anay) treatment in ${place}`,
    title,
    metaDescription,
    intro,
    officeHeading: `Which DMSA office serves ${name}`,
    officeParagraphs,
    overviewHeading: `Pest and termite control across ${name}`,
    overview,
    barangayHeading: `Barangays in ${name}`,
    barangayIntro,
    barangaysServed: notes.barangaysServed ?? [],
    barangayList: splitBarangays(town.barangays),
    services: serviceLines(),
    soilNote: `Building in ${name}? Soil poisoning is easiest before the floor slab is poured, so plan it with your contractor early.`,
    steps: serviceSteps,
    faqs: dedupeFaqs([...(notes.faqs ?? []), ...generatedFaqs]),
    neighbours: nearestTowns(town).map(({ town: item, km: distance }) => ({ name: item.name, province: item.province.name, path: item.path, km: distance })),
    jobs: jobsNear(town),
    guides: rotatingGuides(town.key),
    noteWords: countWords((notes.localNotes ?? []).join(" ")),
  };
}

export type ProvinceContent = {
  path: string;
  heading: string;
  title: ReturnType<typeof fitTitle>;
  metaDescription: string;
  intro: string[];
  officeParagraph: string;
  /** "cities and municipalities", or "municipalities" for a province with no cities. */
  townWord: string;
  cities: LocationTown[];
  municipalities: LocationTown[];
  barangayCount: number;
  services: { title: string; href: string; text: string }[];
  steps: string[];
  faqs: Faq[];
  jobs: GalleryItem[];
  guides: Guide[];
};

export function provinceContent(province: LocationProvince): ProvinceContent {
  const office = offices[province.servedFrom];
  const distances = province.towns
    .filter((town) => town.servedFrom === province.servedFrom)
    .map(officeDistanceKm)
    .filter((km): km is number => km !== null);
  const farthest = distances.length ? Math.max(...distances) : null;
  const officeTown = province.towns.find((town) => town.hasOffice);
  const townCount = province.towns.length;
  const townWord = province.towns.some((town) => town.type === "city") ? "cities and municipalities" : "municipalities";
  const officeParagraph = officeTown
    ? `DMSA's ${office.shortLabel} is at ${office.address}. It serves all ${townCount} ${townWord} in ${province.name}${farthest ? `; the farthest is about ${farthest} km away in a straight line` : ""}.`
    : `${province.name} is served from DMSA's ${office.label}, at ${office.address}.${farthest && distances.length ? ` Its ${townCount} ${townWord} are about ${Math.min(...distances)} to ${farthest} km from the office in a straight line.` : ""}`;

  return {
    path: province.path,
    heading: `Pest control and termite (anay) treatment in ${province.name}`,
    title: fitTitle([province.metaTitle]),
    metaDescription: province.metaDescription,
    intro: province.intro,
    officeParagraph,
    townWord,
    cities: province.towns.filter((town) => town.type === "city"),
    municipalities: province.towns.filter((town) => town.type === "municipality"),
    barangayCount: province.towns.reduce((sum, town) => sum + town.barangays.length, 0),
    services: serviceLines(),
    steps: serviceSteps,
    faqs: province.faqs,
    jobs: province.towns.flatMap(townJobs),
    guides: rotatingGuides(province.slug),
  };
}
