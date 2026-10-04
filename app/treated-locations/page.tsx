import type { Metadata } from "next";

import { TreatedMapExplorer } from "@/components/maps/treated-map-explorer";
import { FinalCta, PageHero } from "@/components/site/page-elements";
import { pageHeroes } from "@/data/page-content-data";

export const metadata: Metadata = {
  title: "Service Areas & Treated Locations",
  description: "Explore a privacy-safe interactive demo of DMSA treated-location records across its service regions.",
  alternates: { canonical: "/treated-locations" },
};

export default function TreatedLocationsPage() {
  return (
    <main id="main-content">
      <PageHero {...pageHeroes.locations} />
      <section className="section treated-page-section"><div className="site-container"><TreatedMapExplorer /></div></section>
      <FinalCta />
    </main>
  );
}
