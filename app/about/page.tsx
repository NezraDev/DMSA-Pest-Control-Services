import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPinned, SearchCheck } from "lucide-react";

import {
  FinalCta,
  PageHero,
  SectionHeading,
} from "@/components/site/page-elements";
import { Button } from "@/components/ui/button";
import { pageHeroes } from "@/data/page-content-data";
import { companyValues, siteConfig } from "@/data/site-data";
import { iconMap } from "@/lib/icon-map";

export const metadata: Metadata = {
  title: "About DMSA",
  description:
    "Learn about DMSA Pest Control Services, its inspection-led approach and regional service coverage.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main id="main-content">
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
              eyebrow="Our purpose"
              title="Committed to Quality Service and Excellence."
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
      <section className="section values-section">
        <div className="site-container">
          <SectionHeading
            centered
            eyebrow="Working values"
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
              eyebrow="Service coverage"
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
              <p>Headquarters</p>
              <h2>Los Baños, Laguna</h2>
              <address>{siteConfig.additionalLocation}</address>
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
              <p>Headquarters</p>
              <h2>San Fernando, Camarines Sur</h2>
              <address>{siteConfig.address}</address>
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
      <FinalCta />
    </main>
  );
}
