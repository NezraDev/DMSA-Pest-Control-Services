import type { MetadataRoute } from "next";

import { serviceAreas } from "@/data/service-areas-data";
import { services } from "@/data/services-data";
import { guides } from "@/data/guides-data";
import { testimonials } from "@/data/testimonials-data";
import { towns } from "@/data/towns-data";
import { treatedLocations } from "@/data/treated-locations-data";
import { absoluteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/services",
    ...services.map(({ slug }) => `/services/${slug}`),
    "/treated-locations",
    "/service-areas",
    ...serviceAreas.flatMap(({ page }) => (page ? [`/service-areas/${page.slug}`] : [])),
    ...towns.map(({ slug }) => `/pest-control/${slug}`),
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

  return [
    ...routes.map((route) => ({ url: absoluteUrl(route) })),
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
