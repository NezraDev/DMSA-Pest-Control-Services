import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CircleAlert, ClipboardList, Lightbulb } from "lucide-react";

import { FaqSection } from "@/components/site/faq-section";
import { JsonLd } from "@/components/site/json-ld";
import { BackLink, Checklist, FinalCta, ProjectCard, SectionHeading } from "@/components/site/page-elements";
import { TrustFacts } from "@/components/site/trust-facts";
import { Button } from "@/components/ui/button";
import { galleryItems } from "@/data/gallery-data";
import { guides } from "@/data/guides-data";
import { industries } from "@/data/industries-data";
import { pests } from "@/data/pests-data";
import { serviceAreas } from "@/data/service-areas-data";
import { services } from "@/data/services-data";
import { siteConfig } from "@/data/site-data";
import { launchedProvinces, officeTowns } from "@/data/locations/provinces";
import { pageMetadata, pageSchema, serviceSchema } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

// Services with no guide of their own point to the guides closest to their customers' questions.
const fallbackGuides: Record<string, string[]> = {
  "commercial-pest-control": ["how-to-prepare-for-pest-control-treatment", "soil-poisoning-before-construction"],
};

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
  const ownGuides = guides.filter((guide) => guide.relatedService === service.slug);
  const relatedGuides = ownGuides.length > 0
    ? ownGuides
    : guides.filter((guide) => fallbackGuides[service.slug]?.includes(guide.slug));
  const otherServices = services.filter((item) => item.slug !== service.slug);
  const lowerTitle = service.title.toLowerCase();

  return (
    <main id="main-content">
      <JsonLd data={serviceSchema({ name: service.title, description: service.metaDescription, path, areaServed: siteConfig.serviceAreas })} />
      <JsonLd data={pageSchema({ name: service.heading, description: service.metaDescription, path, breadcrumbs: [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: service.title, path }] })} />
      <section className="page-hero">
        <div className="site-container page-hero-inner">
          <BackLink href="/services">All services</BackLink>
          <h1>{service.heading}</h1>
          <p>{service.description}</p>
          <div className="hero-actions">
            <Button asChild size="lg"><Link href={`/request-quote#service=${encodeURIComponent(service.quoteService)}`}>Request a quotation <ArrowRight aria-hidden="true" /></Link></Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container seo-copy">
          <h2>{service.overviewHeading}</h2>
          {service.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="section service-details-section">
        <div className="site-container service-detail-columns">
          <div><h2 className="seo-column-title"><CircleAlert aria-hidden="true" />Signs you need {lowerTitle}</h2><Checklist items={service.signs} /></div>
          <div><h2 className="seo-column-title"><ClipboardList aria-hidden="true" />How {lowerTitle} works</h2><ol className="numbered-list">{service.process.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}</ol></div>
          <div><h2 className="seo-column-title"><Lightbulb aria-hidden="true" />Tips after {lowerTitle}</h2><Checklist items={service.prevention} /></div>
        </div>
      </section>

      <section className="section">
        <div className="site-container seo-copy">
          <h2>What to expect from the inspection and treatment</h2>
          {service.visit.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <h2>Preparing for {lowerTitle}</h2>
          <ul>{service.preparation.map((item) => <li key={item}>{item}</li>)}</ul>
          <h2>{service.note.title}</h2>
          {service.note.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
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

      <TrustFacts />

      <FaqSection title={`${service.title}: frequently asked questions`} faqs={service.faqs} path={path} />

      <section className="section">
        <div className="site-container seo-copy">
          <h2>Where {lowerTitle} is available</h2>
          <p>
            DMSA serves {serviceAreas.map(({ name }) => name).join(", ").replace(/, ([^,]*)$/, " and $1")}. Availability depends on the location and required scope.{" "}
            <Link href="/service-areas">See every city and municipality served</Link>.
          </p>
          <ul>
            {launchedProvinces.map((province) => (
              <li key={province.slug}><Link href={`/pest-control/${province.slug}`}>{service.shortTitle.replace(/^./, (letter) => letter.toUpperCase())} in {province.name}</Link></li>
            ))}
            {officeTowns.map((town) => (
              <li key={town.path}><Link href={town.path}>Pest control in {town.name}</Link></li>
            ))}
          </ul>
          <h2>Learn more</h2>
          <ul>
            {(service.slug === "termite-control" ? pests.filter((pest) => pest.slug === "termites-anay") : service.slug === "commercial-pest-control" ? [] : pests.filter((pest) => pest.slug !== "termites-anay")).map((pest) => (
              <li key={pest.slug}><Link href={`/pests/${pest.slug}`}>{pest.name} ({pest.localName}): signs and treatment</Link></li>
            ))}
            {service.slug === "commercial-pest-control" || service.slug === "termite-control"
              ? industries.filter((industry) => service.slug === "commercial-pest-control" || industry.slug === "construction-sites").map((industry) => (
                <li key={industry.slug}><Link href={`/industries/${industry.slug}`}>{industry.title.replace(/^./, (letter) => letter.toUpperCase())}</Link></li>
              ))
              : null}
            {service.slug === "termite-control" ? <li><Link href="/termite-inspection">What the free termite inspection covers</Link></li> : null}
            <li><Link href="/pest-control-price">What affects the price of pest control</Link></li>
          </ul>
          <h2>Explore our other services</h2>
          <ul>
            {otherServices.map((item) => (
              <li key={item.slug}><Link href={`/services/${item.slug}`}>{item.title}</Link>: {item.description}</li>
            ))}
          </ul>
          {relatedGuides.length > 0 ? (
            <>
              <h2>Related guides</h2>
              <ul>
                {relatedGuides.map((guide) => (
                  <li key={guide.slug}><Link href={`/guides/${guide.slug}`}>{guide.title.replace(/^./, (letter) => letter.toUpperCase())}</Link></li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
