import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";

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
import { testimonials } from "@/data/testimonials-data";
import { homeContent } from "@/data/page-content-data";
import { services } from "@/data/services-data";
import { processSteps, trustPoints } from "@/data/site-data";
import { treatedLocations } from "@/data/treated-locations-data";
import { iconMap } from "@/lib/icon-map";
import { HomepageSlideshow } from "@/components/site/homepage-slideshow";
import { TrustFacts } from "@/components/site/trust-facts";
import { JsonLd } from "@/components/site/json-ld";
import { serviceAreas } from "@/data/service-areas-data";
import { areaHref } from "@/data/locations/provinces";
import { faqSchema, pageMetadata, pageSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = pageMetadata({
  absoluteTitle: "Pest Control & Anay Treatment in Laguna & Bicol | DMSA",
  description:
    "Pest and termite (anay) control for homes and businesses in Bicol, Laguna, Cavite, Batangas, Rizal, Quezon and Metro Manila. Free ocular inspection.",
  path: "/",
});

const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "DMSA Pest Control Services introduction",
  description: "How DMSA provides effective, safe and reliable pest control for homes and businesses.",
  thumbnailUrl: absoluteUrl("/brand/video/dmsa-poster.jpg"),
  contentUrl: absoluteUrl("/brand/video/dmsa-video.mp4"),
  uploadDate: "2026-10-05",
};

export default function Home() {
  return (
    <main id="main-content">
      <JsonLd data={pageSchema({ name: "DMSA Pest Control Services", description: "Pest and termite (anay) control for homes and businesses in Bicol, Laguna, Cavite, Batangas, Rizal, Quezon and Metro Manila.", path: "/" })} />
      <JsonLd data={faqSchema(faqs, "/")} />
      <JsonLd data={videoSchema} />
      <section className="home-hero home-hero-cinematic">
        <HomepageSlideshow />
        <div className="site-container hero-shell">
          <div className="hero-main">
            <div className="hero-copy">
              <h1>{homeContent.title}</h1>
            </div>
            <div className="hero-brief">
              <p className="hero-lead">{homeContent.lead}</p>
              <div className="hero-actions">
                <Button asChild size="lg" className="hero-book-button">
                  <Link href="/request-quote">
                    {homeContent.primaryAction} <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="hero-bottom-row">
            <Link className="hero-explore-link" href="#services">
              Explore our services <ArrowDown aria-hidden="true" />
            </Link>
          </div>

          <ol className="hero-process" aria-label="How DMSA works">
            {processSteps.map(({ title, text }) => (
              <li key={title}>
                <div>
                  <h2>{title}</h2>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section dmsa-video-section" aria-labelledby="dmsa-video-title">
        <div className="site-container dmsa-video-layout">
          <div className="dmsa-video-copy">
            <h2 id="dmsa-video-title">Want to know more about DMSA?</h2>
            <p>
              See how DMSA provides effective, safe and reliable pest-control
              solutions for homes and businesses with environmentally
              responsible care.
            </p>
          </div>
          <div className="dmsa-video-frame">
            <video
              controls
              playsInline
              preload="metadata"
              poster="/brand/video/dmsa-poster.jpg"
              width={1920}
              height={1080}
              aria-label="DMSA Pest Control Services introduction video"
            >
              <source src="/brand/video/dmsa-video.mp4" type="video/mp4" />
              Your browser does not support HTML video. You can also{" "}
              <a href="/brand/video/dmsa-video.mp4">open the DMSA video</a>.
            </video>
          </div>
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

      <TrustFacts />

      <section className="section services-preview" id="services">
        <div className="site-container">
          <div className="heading-row">
            <SectionHeading
              title="Pest and termite control for the pests that disrupt your space."
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
                  href={`/services/${service.slug}`}
                >
                  <span className="service-index">0{index + 1}</span>
                  <span className="service-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <p className="service-card-tag">{service.eyebrow}</p>
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

      <section className="section">
        <div className="site-container seo-copy">
          <h2>Your pest control company for homes and businesses in Luzon</h2>
          <p>
            DMSA Pest Control Services provides termite control and anay
            treatment. We also handle ants, cockroaches, flies and rodents.
            We work in houses, apartments, condominiums, offices, shops,
            warehouses and construction sites. For new builds, we apply
            anti-termite soil treatment before the slab is poured.
          </p>
          <p>
            Our main office is in San Fernando, Camarines Sur. Our branch is in
            Los Baños, Laguna. We serve{" "}
            {serviceAreas.map((area, index) => (
              <span key={area.name}>
                {index > 0 ? (index === serviceAreas.length - 1 ? " and " : ", ") : null}
                <Link href={areaHref(area.name)}>{area.name}</Link>
              </span>
            ))}
            . Every quotation includes a free ocular inspection. That way, the
            treatment fits what your property actually needs.
          </p>
          <p>
            Find your town on the <Link href="/service-areas">service areas page</Link>,
            learn about the <Link href="/pests">pests we treat</Link>, or see{" "}
            <Link href="/pest-control-price">what affects the price</Link>.
          </p>
        </div>
      </section>

      <section className="section map-preview-section">
        <div className="site-container">
          <div className="heading-row">
            <SectionHeading
              title="Pest control service locations by region."
              description="Location pins are generalized to protect property and customer privacy."
            />
            <div className="heading-row-actions">
              <Link className="text-link" href="/service-areas">
                All service areas <ArrowRight aria-hidden="true" />
              </Link>
              <Button asChild variant="outline">
                <Link href="/treated-locations">
                  Open full map <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
          <TreatedMapExplorer compact />
        </div>
      </section>

      <section className="section gallery-preview-section">
        <div className="site-container">
          <div className="heading-row">
            <SectionHeading
              title="Completed termite and pest control jobs."
              description="Browse DMSA's pest control work by property type, service and general location."
            />
            <div className="heading-row-actions">
              <Link className="text-link" href="/gallery">
                View gallery <ArrowRight aria-hidden="true" />
              </Link>
              {testimonials.length > 0 ? <Link className="text-link" href="/testimonials">
                Client testimonials <ArrowRight aria-hidden="true" />
              </Link> : null}
            </div>
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
              title="Pest control questions and answers."
            />
            <p className="faq-contact">
              Need a different answer? <Link href="/contact">Contact DMSA</Link>
              , see <Link href="/faq">all FAQs</Link> or read our{" "}
              <Link href="/guides">pest control guides</Link>.
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
