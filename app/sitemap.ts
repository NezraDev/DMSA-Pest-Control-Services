import type { MetadataRoute } from "next";

import { treatedLocations } from "@/data/treated-locations-data";
import { absoluteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/about", "/request-quote", "/treated-locations", "/gallery", "/contact"];
  return [
    ...routes.map((route) => ({ url: absoluteUrl(route || "/"), changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : 0.7 })),
    ...treatedLocations.map((location) => ({ url: absoluteUrl(`/gallery/${location.slug}`), changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
