// Location model: every city and municipality DMSA serves, built from the PSA PSGC list
// (data/locations/psgc-data.js), the province copy (provinces.js) and owner notes
// (town-notes.js). Imports use explicit file extensions so `node --experimental-strip-types`
// (tests and `npm run seo:locations`) can load this file as well as Next.js.
import { townCoordinates } from "../data/locations/coordinates-data.js";
import { launchedWave, officeTowns, provinces } from "../data/locations/provinces.js";
import { psgcProvinces } from "../data/locations/psgc-data.js";
import { townNotes } from "../data/locations/town-notes.js";
import { galleryItems } from "../data/gallery-data.js";
import { siteConfig } from "../data/site-data.js";
import type { GalleryItem, Office, Province, PsgcTown, TownNotes } from "./content-types.ts";

export type LocationTown = {
  /** "province-slug/town-slug", the URL path after /pest-control/. */
  key: string;
  slug: string;
  path: string;
  name: string;
  alias?: string;
  officialName: string;
  type: PsgcTown["type"];
  code: string;
  province: LocationProvince;
  coordinates: [number, number] | null;
  barangays: string[];
  servedFrom: Office;
  notes: TownNotes;
  hasOffice: boolean;
};

export type LocationProvince = Province & {
  path: string;
  launched: boolean;
  towns: LocationTown[];
};

/** Lowercase ASCII slug: "Las Piñas" → "las-pinas", "Pio V. Corpuz" → "pio-v-corpuz". */
export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function distanceKm([lng1, lat1]: [number, number], [lng2, lat2]: [number, number]) {
  const rad = Math.PI / 180;
  const a = Math.sin(((lat2 - lat1) * rad) / 2) ** 2
    + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(((lng2 - lng1) * rad) / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(a));
}

const officePaths = new Map(officeTowns.map((town) => [town.path, town.office as Office]));

// Names in common use that are worth showing next to the official one.
const displayedAliases = new Set(["Montalban", "Mendez-Nuñez"]);

export const locationProvinces: LocationProvince[] = provinces.map((province) => {
  const source = psgcProvinces.find((item) => item.name === province.name);
  if (!source) throw new Error(`Province ${province.name} is missing from psgc-data.js`);
  const result: LocationProvince = {
    ...province,
    path: `/pest-control/${province.slug}`,
    launched: province.launchWave <= launchedWave,
    towns: [],
  };
  result.towns = source.towns.map((town) => {
    const slug = slugify(town.name);
    const key = `${province.slug}/${slug}`;
    const path = `/pest-control/${key}`;
    const notes = townNotes[key] ?? {};
    return {
      key,
      slug,
      path,
      name: town.name,
      alias: town.alias && displayedAliases.has(town.alias) ? town.alias : undefined,
      officialName: town.officialName,
      type: town.type,
      code: town.code,
      province: result,
      coordinates: townCoordinates[town.code] ?? null,
      barangays: town.barangays,
      servedFrom: notes.servedFrom ?? officePaths.get(path) ?? province.servedFrom,
      notes,
      hasOffice: officePaths.has(path),
    };
  });
  return result;
});

export const allTowns = locationProvinces.flatMap((province) => province.towns);
export const launchedLocationProvinces = locationProvinces.filter((province) => province.launched);
export const launchedTowns = launchedLocationProvinces.flatMap((province) => province.towns);

export function findProvince(slug: string) {
  return locationProvinces.find((province) => province.slug === slug.normalize("NFC"));
}

export function findTown(provinceSlug: string, townSlug: string) {
  return findProvince(provinceSlug)?.towns.find((town) => town.slug === townSlug.normalize("NFC"));
}

export function townByKey(key: string) {
  return allTowns.find((town) => town.key === key);
}

const losBanos = allTowns.find((town) => town.key === "laguna/los-banos");

/** The two DMSA locations. The branch distance is measured from the Los Baños town centre. */
export const offices: Record<Office, { label: string; shortLabel: string; town: string; address: string; coordinates: [number, number] }> = {
  main: {
    label: "main office in San Fernando, Camarines Sur",
    shortLabel: "San Fernando main office",
    town: "San Fernando",
    address: siteConfig.address,
    coordinates: siteConfig.hqCoordinates,
  },
  branch: {
    label: "branch in Los Baños, Laguna",
    shortLabel: "Los Baños branch",
    town: "Los Baños",
    address: siteConfig.additionalLocation,
    coordinates: losBanos?.coordinates ?? [121.2394, 14.1699],
  },
};

/** Straight-line distance to the serving office, rounded to the nearest km. */
export function officeDistanceKm(town: LocationTown) {
  if (!town.coordinates) return null;
  return Math.round(distanceKm(town.coordinates, offices[town.servedFrom].coordinates));
}

export function townJobs(town: LocationTown): GalleryItem[] {
  return galleryItems.filter((item) => item.town === town.key);
}

/** Jobs in the town first, then other jobs within `maxKm`, nearest first. */
export function jobsNear(town: LocationTown, maxKm = 60): { job: GalleryItem; km: number }[] {
  const origin = town.coordinates;
  const inTown = townJobs(town).map((job) => ({ job, km: 0 }));
  if (!origin) return inTown;
  const nearby = galleryItems
    .filter((item) => item.town !== town.key)
    .map((job) => ({ job, km: Math.round(distanceKm(origin, job.coordinates)) }))
    .filter(({ km }) => km <= maxKm)
    .sort((a, b) => a.km - b.km);
  return [...inTown, ...nearby].slice(0, 3);
}

/** Nearest live town pages, in any launched province. */
export function nearestTowns(town: LocationTown, count = 6): { town: LocationTown; km: number }[] {
  const origin = town.coordinates;
  if (!origin) return town.province.towns.filter((item) => item !== town && item.province.launched).slice(0, count).map((item) => ({ town: item, km: 0 }));
  return launchedTowns
    .filter((item) => item !== town && item.coordinates)
    .map((item) => ({ town: item, km: Math.round(distanceKm(origin, item.coordinates as [number, number])) }))
    .sort((a, b) => a.km - b.km || a.town.name.localeCompare(b.town.name))
    .slice(0, count);
}

/** Numbered barangays ("Barangay 101") are counted rather than listed when a city has many. */
export function splitBarangays(barangays: string[]) {
  const numbered = barangays.filter((name) => /^Barangay \d+/i.test(name));
  if (numbered.length <= 20) return { named: barangays, numbered: 0 };
  return { named: barangays.filter((name) => !numbered.includes(name)), numbered: numbered.length };
}

export const townLabel = (town: LocationTown) => `${town.name}, ${town.province.name}`;
