import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPinned, Phone } from "lucide-react";
import { SiFacebook, SiGmail, SiInstagram, SiTiktok } from "react-icons/si";

import {
  FinalCta,
  ProjectCard,
  SectionHeading,
} from "@/components/site/page-elements";
import { TreatedMapExplorer } from "@/components/maps/treated-map-explorer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqs } from "@/data/faq-data";
import { homeContent } from "@/data/page-content-data";
import { services } from "@/data/services-data";
import { processSteps, siteConfig, trustPoints } from "@/data/site-data";
import { treatedLocations } from "@/data/treated-locations-data";
import { iconMap } from "@/lib/icon-map";

export const metadata: Metadata = {
  title: { absolute: "DMSA Pest Control Services | Pest & Termite Control" },
  description:
    "DMSA Pest Control Services provides pest and termite control for residential and commercial properties across Bicol, Cavite, Laguna, Batangas, Rizal, Quezon and Metro Manila.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main id="main-content">
      <section className="home-hero">
        <div className="site-container hero-shell">
          <div className="hero-copy">
            <p className="eyebrow">
              <span aria-hidden="true" />
              {homeContent.eyebrow}
            </p>
            <h1>{homeContent.title}</h1>
            <p className="hero-lead">{homeContent.lead}</p>
            <div className="hero-actions">
              <Button asChild size="lg">
                <Link href="/request-quote">
                  {homeContent.primaryAction} <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/services">{homeContent.secondaryAction}</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${siteConfig.phoneViberHref}`}>
                  <Phone aria-hidden="true" />
                  Call 0918 299 5218
                </a>
              </Button>
            </div>
            <div className="hero-proof" aria-label="Service highlights">
              <span>
                <CheckCircle2 aria-hidden="true" />
                Free ocular inspection with quotation
              </span>
              <span>
                <CheckCircle2 aria-hidden="true" />
                Open seven days
              </span>
              <span>
                <CheckCircle2 aria-hidden="true" />
                Residential & commercial
              </span>
            </div>
            <div
              className="hero-socials"
              aria-label="DMSA social media and email"
            >
              <a
                href={siteConfig.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DMSA on Facebook"
                title="Facebook"
              >
                <SiFacebook aria-hidden="true" />
              </a>
              <a
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DMSA on Instagram"
                title="Instagram"
              >
                <SiInstagram aria-hidden="true" />
              </a>
              <a
                href={`mailto:${siteConfig.socialLinks.email}`}
                aria-label="Email DMSA using Gmail"
                title="Gmail"
              >
                <SiGmail aria-hidden="true" />
              </a>
              <a
                href={siteConfig.socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DMSA on Tiktok"
                title="Tiktok"
              >
                <SiTiktok aria-hidden="true" />
              </a>
            </div>
          </div>
          <aside className="hero-dispatch" aria-label="DMSA service desk">
            <div className="dispatch-heading">
              <span>Quotation desk</span>
              <strong>Start your quotation</strong>
              <p>
                Choose a concern below. The free ocular inspection is included
                in the process.
              </p>
            </div>
            <nav aria-label="Service shortcuts">
              {services.map((service, index) => (
                <Link
                  key={service.slug}
                  href={`/request-quote?service=${encodeURIComponent(service.title)}`}
                >
                  <span>0{index + 1}</span>
                  <strong>{service.shortTitle}</strong>
                  <ArrowRight aria-hidden="true" />
                </Link>
              ))}
            </nav>
            <div className="dispatch-coverage">
              <MapPinned aria-hidden="true" />
              <div className="dispatch-coverage-copy">
                <small>Service Areas</small>
                <div
                  className="dispatch-coverage-areas"
                  aria-label="DMSA service areas"
                >
                  {siteConfig.serviceAreas.map((area) => (
                    <span key={area}>{area}</span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="trust-strip" aria-label="Why customers consider DMSA">
        <div className="site-container trust-grid">
          {trustPoints.map(({ title, detail, icon }) => {
            const Icon = iconMap[icon];
            return (
              <div key={title}>
                <Icon aria-hidden="true" />
                <span>
                  <strong>{title}</strong>
                  <small>{detail}</small>
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section services-preview">
        <div className="site-container">
          <div className="heading-row">
            <SectionHeading
              eyebrow="Core services"
              title="Focused control for the pests that disrupt your space."
              description="Start with the service that fits. If you are unsure, DMSA can help identify the right inspection path."
            />
            <Link className="text-link" href="/services">
              Explore all services <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="service-grid">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon];
              return (
                <Link
                  className={
                    index < 2 ? "service-card featured" : "service-card"
                  }
                  key={service.slug}
                  href={`/services#${service.slug}`}
                >
                  <span className="service-index">0{index + 1}</span>
                  <span className="service-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <div>
                    <p>{service.eyebrow}</p>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                  <span className="service-row-action" aria-hidden="true">
                    <ArrowRight />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section process-section">
        <div className="site-container">
          <div className="heading-row">
            <SectionHeading
              eyebrow="How it works"
              title="A direct path from concern to service plan."
              description="The process gathers the information needed before timing, treatment and price are confirmed."
            />
            <Button asChild variant="outline">
              <Link href="/about">
                How DMSA works <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <ol className="process-grid">
            {processSteps.map(({ number, title, text, icon }) => {
              const Icon = iconMap[icon];
              return (
                <li key={number}>
                  <span className="process-number">{number}</span>
                  <Icon aria-hidden="true" />
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="section map-preview-section">
        <div className="site-container">
          <div className="heading-row">
            <SectionHeading
              eyebrow="Coverage in view"
              title="Explore service locations by region."
              description="Location pins are generalized to protect property and customer privacy."
            />
            <Button asChild variant="outline">
              <Link href="/treated-locations">
                Open full map <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <TreatedMapExplorer compact />
        </div>
      </section>

      <section className="section gallery-preview-section">
        <div className="site-container">
          <div className="heading-row">
            <SectionHeading
              eyebrow="Gallery & feedback"
              title="Service entries for homes and businesses."
              description="Browse pest-control entries by property type, service and general location."
            />
            <Link className="text-link" href="/gallery">
              View gallery <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="project-grid">
            {treatedLocations.slice(0, 3).map((location) => (
              <ProjectCard key={location.slug} location={location} />
            ))}
          </div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="site-container faq-grid">
          <div>
            <SectionHeading
              eyebrow="Common questions"
              title="Helpful answers before you request a visit."
            />
            <p className="faq-contact">
              Need a different answer? <Link href="/contact">Contact DMSA</Link>
              .
            </p>
          </div>
          <Accordion type="single" collapsible className="faq-accordion">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <p>{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
