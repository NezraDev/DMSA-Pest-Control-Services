import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPinned, SearchCheck } from "lucide-react";

import {
  FinalCta,
  PageHero,
  SectionHeading,
} from "@/components/site/page-elements";
import { TrustFacts } from "@/components/site/trust-facts";
import { Button } from "@/components/ui/button";
import { pageHeroes } from "@/data/page-content-data";
import { companyValues, siteConfig } from "@/data/site-data";
import { galleryItems } from "@/data/gallery-data";
import { launchedProvinces, officeTowns } from "@/data/locations/provinces";
import { services } from "@/data/services-data";
import { iconMap } from "@/lib/icon-map";
import { JsonLd } from "@/components/site/json-ld";
import { pageMetadata, pageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About DMSA",
  description:
    "DMSA Pest Control Services provides pest and termite control from San Fernando, Camarines Sur and Los Baños, Laguna, for homes and businesses across Luzon.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main id="main-content">
      <JsonLd data={pageSchema({ type: "AboutPage", name: pageHeroes.about.title, description: pageHeroes.about.description, path: "/about", breadcrumbs: [{ name: "Home", path: "/" }, { name: "About", path: "/about" }] })} />
      <PageHero
        {...pageHeroes.about}
        actions={
          <Button asChild size="lg">
            <Link href="/request-quote">
              Request a quotation <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        }
      />
      <section className="section story-section">
        <div className="site-container story-grid">
          <div className="story-stat">
            <SearchCheck aria-hidden="true" />
            <strong>Inspect first</strong>
            <span>Plan from what the property shows</span>
            <p>
              Residential and commercial pest management starts with the actual
              signs, access points and site conditions.
            </p>
          </div>
          <div>
            <SectionHeading
              title="Committed to Quality Service and Excellence"
              description="DMSA helps homeowners, business operators and property teams through effective solutions, safe and reliable service, and environmentally responsible planning."
            />
            <p className="body-copy">
              Each residential and commercial service starts with the property’s
              actual conditions, with recommendations communicated clearly and
              matched to the work required.
            </p>
          </div>
        </div>
      </section>
      <TrustFacts />
      <section className="section values-section">
        <div className="site-container">
          <SectionHeading
            centered
            title="What guides each service conversation."
          />
          <div className="values-grid">
            {companyValues.map(({ title, text, icon }) => {
              const Icon = iconMap[icon];
              return (
                <article key={title}>
                  <Icon aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section coverage-section">
        <div className="site-container coverage-grid">
          <div>
            <SectionHeading
              title="Based in Bicol. Available across key Luzon regions."
              description="Scheduling depends on location, property needs and the required service scope."
            />
            <ul className="coverage-list">
              {siteConfig.serviceAreas.map((area, index) => (
                <li key={area}>
                  <span>0{index + 1}</span>
                  <MapPinned aria-hidden="true" />
                  <strong>{area}</strong>
                </li>
              ))}
            </ul>
          </div>
          <div className="hq-card-list">
            <div className="hq-card">
              <span className="hq-icon">
                <MapPinned aria-hidden="true" />
              </span>
              <p>Main office</p>
              <h2>San Fernando, Camarines Sur</h2>
              <address>{siteConfig.address}</address>
              <p>{siteConfig.hours}</p>
              <Button asChild variant="outline">
                <Link href="/contact">
                  Contact & directions <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <div className="hq-card">
              <span className="hq-icon">
                <MapPinned aria-hidden="true" />
              </span>
              <p>Branch</p>
              <h2>Los Baños, Laguna</h2>
              <address>{siteConfig.additionalLocation}</address>
              <p>{siteConfig.hours}</p>
              <Button asChild variant="outline">
                <Link href="/contact">
                  Contact & directions <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="site-container seo-copy">
          <h2>What DMSA does</h2>
          <p>
            DMSA Pest Control Services treats termites (anay) and the common pests that disrupt homes and workplaces: cockroaches (ipis),
            ants (langgam), flies (langaw), and rats and mice (daga). Every job starts with a free ocular inspection, and the scope,
            schedule and price are confirmed before work begins.
          </p>
          <ul>
            {services.map((service) => <li key={service.slug}><Link href={`/services/${service.slug}`}>{service.title}</Link>: {service.description}</li>)}
          </ul>
          <h2>Completed work</h2>
          <p>Recent jobs are documented with photos in the gallery, with locations generalized to protect client privacy:</p>
          <ul>
            {galleryItems.map((item) => <li key={item.slug}><Link href={`/gallery/${item.slug}`}>{item.heading}</Link> ({item.servicePerformed.toLowerCase()})</li>)}
          </ul>
          <h2>Where DMSA works</h2>
          <p>
            The main office in San Fernando, Camarines Sur, serves the Bicol Region. The branch in Los Baños, Laguna, serves Laguna and the
            surrounding provinces. See{" "}
            {launchedProvinces.map((province, index) => (
              <span key={province.slug}>{index > 0 ? " and " : null}<Link href={`/pest-control/${province.slug}`}>{province.name}</Link></span>
            ))}, the office towns of{" "}
            {officeTowns.map((town, index) => (
              <span key={town.path}>{index > 0 ? " and " : null}<Link href={town.path}>{town.name.split(",")[0]}</Link></span>
            ))}, or <Link href="/service-areas">every city and municipality DMSA serves</Link>.
          </p>
        </div>
      </section>
      <FinalCta />
    </main>
  );
}
