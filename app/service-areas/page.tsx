import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { JsonLd } from "@/components/site/json-ld";
import { FinalCta, PageHero, SectionHeading } from "@/components/site/page-elements";
import { Button } from "@/components/ui/button";
import { officeTowns, regions } from "@/data/locations/provinces";
import { siteConfig } from "@/data/site-data";
import { isTownPublished } from "@/lib/location-quality";
import { allTowns, locationProvinces, offices } from "@/lib/locations";
import { pageMetadata, pageSchema } from "@/lib/seo";

const description = "Pest and termite (anay) control in Laguna, Batangas, Cavite, Rizal, Quezon, Metro Manila and Bicol: every city and municipality DMSA serves, by province.";

export const metadata: Metadata = pageMetadata({
  title: "Pest Control Service Areas in Luzon",
  description,
  path: "/service-areas",
});

export default function ServiceAreasPage() {
  const branch = officeTowns.find((town) => town.office === "branch");
  const main = officeTowns.find((town) => town.office === "main");
  const servedBy = (office: "main" | "branch") => locationProvinces.filter((province) => province.servedFrom === office).map((province) => province.name).join(", ").replace(/, ([^,]*)$/, " and $1");

  return (
    <main id="main-content">
      <JsonLd data={pageSchema({ type: "CollectionPage", name: "Pest and termite control service areas in Luzon", description, path: "/service-areas", breadcrumbs: [{ name: "Home", path: "/" }, { name: "Service areas", path: "/service-areas" }] })} />
      <PageHero
        title="Pest and termite control service areas in Luzon"
        description={`DMSA serves all ${allTowns.length} cities and municipalities in Laguna, Batangas, Cavite, Rizal, Quezon, Metro Manila and the six Bicol provinces, from its main office in San Fernando, Camarines Sur, and its branch in Los Baños, Laguna.`}
        actions={<Button asChild size="lg"><Link href="/request-quote">Request a quotation <ArrowRight aria-hidden="true" /></Link></Button>}
      />

      <section className="section">
        <div className="site-container">
          <SectionHeading title="DMSA locations" description={`Both locations are open ${siteConfig.hours}. Call ${siteConfig.phoneMobile} or message ${siteConfig.phoneViber} on Viber.`} />
          <div className="area-grid">
            <article>
              <h3>Main office: San Fernando, Camarines Sur</h3>
              <p>{siteConfig.address}</p>
              <p>Serves {servedBy("main")}.</p>
              {main ? <p><Link className="text-link" href={main.path}>Pest control in San Fernando <ArrowRight aria-hidden="true" /></Link></p> : null}
            </article>
            <article>
              <h3>Branch: Los Baños, Laguna</h3>
              <p>{siteConfig.additionalLocation}</p>
              <p>Serves {servedBy("branch")}.</p>
              {branch ? <p><Link className="text-link" href={branch.path}>Pest control in Los Baños <ArrowRight aria-hidden="true" /></Link></p> : null}
            </article>
          </div>
        </div>
      </section>

      {regions.map((region) => {
        const regionProvinces = locationProvinces.filter((province) => province.region === region.name);
        return (
          <section key={region.id} id={region.id} className="section town-directory">
            <div className="site-container">
              <SectionHeading
                title={region.name === "Metro Manila" ? "Metro Manila (NCR)" : region.name}
                description={`${regionProvinces.reduce((sum, province) => sum + province.towns.length, 0)} cities and municipalities, served from DMSA's ${offices[regionProvinces[0].servedFrom].label}.`}
              />
              {regionProvinces.map((province) => (
                <article key={province.slug} id={province.slug} className="province-block">
                  <h3>
                    {province.launched
                      ? <Link href={province.path}>Pest control in {province.name} <ArrowRight aria-hidden="true" /></Link>
                      : <>Pest control in {province.name}</>}
                  </h3>
                  <p>
                    {province.towns.length} cities and municipalities.{" "}
                    {province.launched
                      ? <>Linked towns have their own page. For any town, <Link href={province.path}>see {province.name}</Link> or request a quotation.</>
                      : <>Request a quotation for any town in {province.name}; <Link href="/request-quote">start here</Link>.</>}
                  </p>
                  <ul className="town-name-list">
                    {province.towns.map((town) => (
                      <li key={town.key}>{isTownPublished(town) ? <Link href={town.path}>{town.name}</Link> : town.name}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        );
      })}

      <section className="section">
        <div className="site-container seo-copy">
          <h2>Not sure if DMSA serves your area?</h2>
          <p>
            Request a quotation and drop a pin on the property. DMSA reviews the location and confirms whether it can be served,
            then arranges the free ocular inspection. You can also see completed jobs on the{" "}
            <Link href="/treated-locations">treated-locations map</Link> and read the <Link href="/faq">frequently asked questions</Link>.
          </p>
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
