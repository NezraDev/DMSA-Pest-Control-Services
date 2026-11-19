import type { Metadata } from "next";
import Link from "next/link";

import { TreatedMapExplorer } from "@/components/maps/treated-map-explorer";
import { FinalCta, PageHero, SectionHeading } from "@/components/site/page-elements";
import { pageHeroes } from "@/data/page-content-data";
import { serviceAreas } from "@/data/service-areas-data";
import { JsonLd } from "@/components/site/json-ld";
import { pageMetadata, pageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Treated Locations Map",
  description: "Map of completed DMSA termite and pest control jobs in Laguna and beyond, with generalized locations. Filter by region, service, pest and year.",
  path: "/treated-locations",
});

export default function TreatedLocationsPage() {
  return (
    <main id="main-content">
      <JsonLd data={pageSchema({ name: pageHeroes.locations.title, description: pageHeroes.locations.description, path: "/treated-locations", breadcrumbs: [{ name: "Home", path: "/" }, { name: "Treated locations", path: "/treated-locations" }] })} />
      <PageHero {...pageHeroes.locations} />
      <section className="section treated-page-section"><div className="site-container"><TreatedMapExplorer /></div></section>
      <section className="section">
        <div className="site-container">
          <SectionHeading title="Pest and termite control by area" description="Availability depends on the location and required scope." />
          <p><Link className="text-link" href="/service-areas">All service areas and towns</Link></p>
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
