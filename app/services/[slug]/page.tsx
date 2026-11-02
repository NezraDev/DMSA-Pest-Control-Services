import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CircleAlert, ClipboardList, Lightbulb } from "lucide-react";

import { JsonLd } from "@/components/site/json-ld";
import { BackLink, Checklist, FinalCta, ProjectCard, SectionHeading } from "@/components/site/page-elements";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { galleryItems } from "@/data/gallery-data";
import { serviceAreas } from "@/data/service-areas-data";
import { services } from "@/data/services-data";
import { siteConfig } from "@/data/site-data";
import { breadcrumbSchema, pageMetadata, serviceSchema } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  return pageMetadata({ title: service.metaTitle, description: service.metaDescription, path: `/services/${service.slug}` });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;
  const relatedJobs = galleryItems.filter((item) => {
    if (service.slug === "general-pest-control") return item.pest !== "Termites";
    if (service.slug === "termite-control") return item.pest === "Termites";
    if (service.slug === "residential-pest-control") return item.customerType === "Residential";
    return item.customerType === "Commercial";
  });

  return (
    <main id="main-content">
      <JsonLd data={serviceSchema({ name: service.title, description: service.metaDescription, path, areaServed: siteConfig.serviceAreas })} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: service.title, path }])} />
      <section className="page-hero">
        <div className="site-container page-hero-inner">
          <BackLink href="/services">All services</BackLink>
          <h1>{service.heading}</h1>
          <p>{service.description}</p>
          <div className="hero-actions">
            <Button asChild size="lg"><Link href={`/request-quote?service=${encodeURIComponent(service.quoteService)}`}>Request a quotation <ArrowRight aria-hidden="true" /></Link></Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container seo-copy">
          <h2>About this service</h2>
          {service.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="section service-details-section">
        <div className="site-container service-detail-columns">
          <div><h2 className="seo-column-title"><CircleAlert aria-hidden="true" />Signs to look for</h2><Checklist items={service.signs} /></div>
          <div><h2 className="seo-column-title"><ClipboardList aria-hidden="true" />How it works</h2><ol className="numbered-list">{service.process.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}</ol></div>
          <div><h2 className="seo-column-title"><Lightbulb aria-hidden="true" />Prevention tips</h2><Checklist items={service.prevention} /></div>
        </div>
      </section>

      {relatedJobs.length > 0 ? (
        <section className="section gallery-preview-section">
          <div className="site-container">
            <div className="heading-row">
              <SectionHeading title={`${service.shortTitle.replace(/^./, (letter) => letter.toUpperCase())} jobs by DMSA`} />
            </div>
            <div className="project-grid">{relatedJobs.map((location) => <ProjectCard key={location.slug} location={location} />)}</div>
          </div>
        </section>
      ) : null}

      <section className="section faq-section">
        <div className="site-container faq-grid">
          <SectionHeading title={`${service.title}: frequently asked questions`} />
          <Accordion type="single" collapsible className="faq-accordion">
            {service.faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent><p>{faq.answer}</p></AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="section">
        <div className="site-container seo-copy">
          <h2>Where this service is available</h2>
          <p>DMSA serves {serviceAreas.map(({ name }) => name).join(", ").replace(/, ([^,]*)$/, " and $1")}. Availability depends on the location and required scope. <Link href="/treated-locations">See all service areas</Link>.</p>
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
