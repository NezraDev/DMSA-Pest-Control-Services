import type { Metadata } from "next";
import Link from "next/link";

import { TreatedMapExplorer } from "@/components/maps/treated-map-explorer";
import { FinalCta, PageHero, SectionHeading } from "@/components/site/page-elements";
import { pageHeroes } from "@/data/page-content-data";
import { serviceAreas } from "@/data/service-areas-data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Pest Control Service Areas in Luzon",
  description: "DMSA provides pest and termite control in the Bicol Region, Laguna, Cavite, Batangas, Rizal, Quezon and Metro Manila. See service areas and completed work.",
  path: "/treated-locations",
});

export default function TreatedLocationsPage() {
  return (
    <main id="main-content">
      <PageHero {...pageHeroes.locations} />
      <section className="section treated-page-section"><div className="site-container"><TreatedMapExplorer /></div></section>
      <section className="section">
        <div className="site-container">
          <SectionHeading title="Pest and termite control by area" description="Availability depends on the location and required scope." />
          <div className="area-grid">
            {serviceAreas.map((area) => (
              <article key={area.name}>
                <h3>Pest control in {area.name}</h3>
                <p>{area.summary}</p>
                {area.page ? <Link className="text-link" href={`/service-areas/${area.page.slug}`}>{area.name} details</Link> : null}
              </article>
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </main>
  );
}
