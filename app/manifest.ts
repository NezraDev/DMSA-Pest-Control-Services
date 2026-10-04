import type { MetadataRoute } from "next";

import { siteConfig } from "@/data/site-data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "DMSA Pest Control",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#7b1113",
    icons: [{ src: siteConfig.logos.pageIcon, sizes: "any", type: "image/png" }],
  };
}
