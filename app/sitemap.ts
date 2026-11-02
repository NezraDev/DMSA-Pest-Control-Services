import type { MetadataRoute } from "next";

import { serviceAreas } from "@/data/service-areas-data";
import { services } from "@/data/services-data";
import { testimonials } from "@/data/testimonials-data";
import { treatedLocations } from "@/data/treated-locations-data";
import { absoluteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/services",
    ...services.map(({ slug }) => `/services/${slug}`),
    "/treated-locations",
    ...serviceAreas.flatMap(({ page }) => (page ? [`/service-areas/${page.slug}`] : [])),
    "/gallery",
    "/about",
    "/request-quote",
    "/contact",
    // The testimonials page stays out of search until it has real reviews.
    ...(testimonials.length > 0 ? ["/testimonials"] : []),
  ];

  return [
    ...routes.map((route) => ({ url: absoluteUrl(route) })),
    ...treatedLocations.map((location) => ({
      url: absoluteUrl(`/gallery/${location.slug}`),
      lastModified: location.treatmentDate,
    })),
  ];
}
