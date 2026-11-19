import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { JsonLd } from "@/components/site/json-ld";
import { FinalCta, PageHero, SectionHeading } from "@/components/site/page-elements";
import { Button } from "@/components/ui/button";
import { serviceAreas } from "@/data/service-areas-data";
import { siteConfig } from "@/data/site-data";
import { towns } from "@/data/towns-data";
import { pageMetadata, pageSchema } from "@/lib/seo";

const description = "Pest and termite (anay) control across the Bicol Region, Laguna, Cavite, Batangas, Rizal, Quezon and Metro Manila, from San Fernando and Los Baños.";

export const metadata: Metadata = pageMetadata({
  title: "Pest Control Service Areas in Luzon",
  description,
  path: "/service-areas",
});

export default function ServiceAreasPage() {
  const townsByName = (slug: string) => towns.find((town) => town.slug === slug);
  const sanFernando = townsByName("san-fernando-camarines-sur");
  const losBanos = townsByName("los-banos");

  return (
    <main id="main-content">
      <JsonLd data={pageSchema({ name: "Pest and termite control service areas in Luzon", description, path: "/service-areas", breadcrumbs: [{ name: "Home", path: "/" }, { name: "Service areas", path: "/service-areas" }] })} />
      <PageHero
        title="Pest and termite control service areas in Luzon"
        description="DMSA serves homes and businesses from its main office in San Fernando, Camarines Sur, and its branch in Los Baños, Laguna. Find your province or town below."
        actions={<Button asChild size="lg"><Link href="/request-quote">Request a quotation <ArrowRight aria-hidden="true" /></Link></Button>}
      />

      <section className="section">
        <div className="site-container">
          <SectionHeading title="DMSA locations" description={`Both locations are open ${siteConfig.hours}. Call ${siteConfig.phoneMobile} or message ${siteConfig.phoneViber} on Viber.`} />
          <div className="area-grid">
            <article>
              <h3>Main office: San Fernando, Camarines Sur</h3>
              <p>{siteConfig.address}</p>
              {sanFernando ? <p><Link className="text-link" href={`/pest-control/${sanFernando.slug}`}>Pest control in San Fernando <ArrowRight aria-hidden="true" /></Link></p> : null}
            </article>
            <article>
              <h3>Branch: Los Baños, Laguna</h3>
              <p>{siteConfig.additionalLocation}</p>
              {losBanos ? <p><Link className="text-link" href={`/pest-control/${losBanos.slug}`}>Pest control in Los Baños <ArrowRight aria-hidden="true" /></Link></p> : null}
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container">
          <SectionHeading title="Towns with completed work or a DMSA office" description="Each page shows the local office or the jobs DMSA has completed in and near that town." />
          <div className="area-grid">
            {towns.map((town) => (
              <article key={town.slug}>
                <h3>Pest control in {town.name}, {town.province}</h3>
                <p>{town.intro[0]}</p>
                <Link className="text-link" href={`/pest-control/${town.slug}`}>{town.name} details <ArrowRight aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container">
          <SectionHeading title="Provinces and regions DMSA serves" description="Availability depends on the location and the work needed." />
          <div className="area-grid">
            {serviceAreas.map((area) => (
              <article key={area.name}>
                <h3>Pest control in {area.name}</h3>
                <p>{area.summary}</p>
                {area.page ? <Link className="text-link" href={`/service-areas/${area.page.slug}`}>{area.name} details <ArrowRight aria-hidden="true" /></Link> : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container seo-copy">
          <h2>Not sure if DMSA serves your area?</h2>
          <p>
            Request a quotation and drop a pin on the property. DMSA reviews the location and confirms whether it can be served,
            then arranges the free ocular inspection. You can also see completed jobs on the{" "}
            <Link href="/treated-locations">treated-locations map</Link>.
          </p>
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
