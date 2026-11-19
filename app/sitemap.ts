import type { MetadataRoute } from "next";

import { services } from "@/data/services-data";
import { guides } from "@/data/guides-data";
import { industries } from "@/data/industries-data";
import { pests } from "@/data/pests-data";
import { testimonials } from "@/data/testimonials-data";
import { treatedLocations } from "@/data/treated-locations-data";
import { isTownIndexable } from "@/lib/location-quality";
import { launchedLocationProvinces, launchedTowns } from "@/lib/locations";
import { absoluteUrl } from "@/lib/site-url";

/** Every indexable page. Town pages that are still noindex (see lib/location-quality.ts) are left out. */
function sitemapRoutes() {
  return [
    "/",
    "/services",
    ...services.map(({ slug }) => `/services/${slug}`),
    "/pests",
    ...pests.map(({ slug }) => `/pests/${slug}`),
    "/industries",
    ...industries.map(({ slug }) => `/industries/${slug}`),
    "/pest-control-price",
    "/termite-inspection",
    "/treated-locations",
    "/service-areas",
    ...launchedLocationProvinces.map(({ path }) => path),
    ...launchedTowns.filter(isTownIndexable).map(({ path }) => path),
    "/guides",
    "/faq",
    "/gallery",
    "/about",
    "/request-quote",
    "/contact",
    "/privacy-policy",
    "/terms-of-service",
    // The testimonials page stays out of search until it has real reviews.
    ...(testimonials.length > 0 ? ["/testimonials"] : []),
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...sitemapRoutes().map((route) => ({ url: absoluteUrl(route) })),
    ...guides.map((guide) => ({
      url: absoluteUrl(`/guides/${guide.slug}`),
      lastModified: guide.dateModified,
    })),
    ...treatedLocations.map((location) => ({
      url: absoluteUrl(`/gallery/${location.slug}`),
      lastModified: location.treatmentDate,
    })),
  ];
}
