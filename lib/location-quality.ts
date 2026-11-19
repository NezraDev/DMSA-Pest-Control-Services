// Quality gate for town pages. Google's spam policies treat near-identical pages made for
// each town name ("doorway pages", "scaled content abuse") as spam, which can pull down the
// whole site. So a town page is only indexable when it has real local content; the others
// stay visible to visitors (and linked from their province page) but are marked
// noindex, follow and left out of the sitemap. They are promoted automatically once a job,
// an office or owner notes are added.
import { allTowns, townJobs, type LocationTown } from "./locations.ts";
import { townContent, type TownContent } from "./location-content.ts";

/** Pages more similar than this to another town page (after names are masked) are not unique. */
export const maxSimilarity = 0.55;
/** Minimum prose words (lists excluded) for a page to qualify on uniqueness alone. */
export const minUniqueWords = 450;
/** Owner notes this long make a page indexable on their own. */
export const minNoteWords = 120;

export type TownQuality = {
  key: string;
  words: number;
  similarity: number;
  similarTo: string;
  indexable: boolean;
  reason: string;
};

const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * The page's own prose (no barangay, neighbour, job or guide lists), with the town, province
 * and barangay names and all numbers masked, so only genuinely different writing counts.
 */
export function maskedBodyText(town: LocationTown, content: TownContent = townContent(town)) {
  const text = [
    content.intro,
    ...content.officeParagraphs,
    ...content.overview,
    content.barangayIntro,
    content.soilNote,
    ...content.services.map((service) => `${service.title} ${service.text}`),
    ...content.steps,
    ...content.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join(" ");
  const names = [town.name, town.alias, town.province.name, ...town.barangays]
    .filter((name): name is string => Boolean(name))
    .sort((a, b) => b.length - a.length);
  let masked = text;
  for (const name of names) masked = masked.replace(new RegExp(escape(name), "g"), " PLACE ");
  return masked
    .replace(/\d+/g, " NUM ")
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function shingles(words: string[], size = 5) {
  const set = new Set<string>();
  for (let index = 0; index + size <= words.length; index++) set.add(words.slice(index, index + size).join(" "));
  return set;
}

function jaccard(a: Set<string>, b: Set<string>) {
  let shared = 0;
  const [small, large] = a.size < b.size ? [a, b] : [b, a];
  for (const item of small) if (large.has(item)) shared++;
  const union = a.size + b.size - shared;
  return union === 0 ? 1 : shared / union;
}

let cache: Map<string, TownQuality> | null = null;

/** Quality of every town page in every province, computed once per process. */
export function townQualityReport(): Map<string, TownQuality> {
  if (cache) return cache;
  const entries = allTowns.map((town) => {
    const content = townContent(town);
    const words = maskedBodyText(town, content);
    return { town, content, words, shingles: shingles(words) };
  });
  cache = new Map();
  for (const entry of entries) {
    let similarity = 0;
    let similarTo = "";
    for (const other of entries) {
      if (other === entry) continue;
      const score = jaccard(entry.shingles, other.shingles);
      if (score > similarity) {
        similarity = score;
        similarTo = other.town.key;
      }
    }
    const { town, content } = entry;
    const unique = similarity < maxSimilarity && entry.words.length >= minUniqueWords;
    const reason = town.hasOffice
      ? "DMSA office in town"
      : townJobs(town).length > 0
        ? "completed DMSA job in town"
        : content.noteWords >= minNoteWords
          ? "owner notes"
          : unique
            ? "unique content"
            : entry.words.length < minUniqueWords
              ? `not indexed: needs local content (${entry.words.length} words, ${Math.round(similarity * 100)}% like ${similarTo})`
              : `not indexed: ${Math.round(similarity * 100)}% like ${similarTo}`;
    cache.set(town.key, {
      key: town.key,
      words: entry.words.length,
      similarity: Number(similarity.toFixed(3)),
      similarTo,
      indexable: !reason.startsWith("not indexed"),
      reason,
    });
  }
  return cache;
}

export function isTownIndexable(town: LocationTown) {
  return townQualityReport().get(town.key)?.indexable ?? false;
}
