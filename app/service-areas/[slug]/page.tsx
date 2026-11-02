import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { JsonLd } from "@/components/site/json-ld";
import { BackLink, FinalCta, ProjectCard, SectionHeading } from "@/components/site/page-elements";
import { Button } from "@/components/ui/button";
import { galleryItems } from "@/data/gallery-data";
import { serviceAreas } from "@/data/service-areas-data";
import { services } from "@/data/services-data";
import { siteConfig } from "@/data/site-data";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

function findArea(slug: string) {
  return serviceAreas.find((area) => area.page?.slug === slug);
}

export function generateStaticParams() {
  return serviceAreas.flatMap(({ page }) => (page ? [{ slug: page.slug }] : []));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = findArea(slug)?.page;
  if (!page) return {};
  return pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: `/service-areas/${page.slug}` });
}

export default async function ServiceAreaPage({ params }: Props) {
  const { slug } = await params;
  const area = findArea(slug);
  const page = area?.page;
  if (!area || !page) notFound();

  const path = `/service-areas/${page.slug}`;
  const jobs = galleryItems.filter((item) => item.region === area.name);

  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Service areas", path: "/treated-locations" }, { name: area.name, path }])} />
      <section className="page-hero">
        <div className="site-container page-hero-inner">
          <BackLink href="/treated-locations">All service areas</BackLink>
          <h1>{page.heading}</h1>
          <p>{page.intro[0]}</p>
          <div className="hero-actions">
            <Button asChild size="lg"><Link href="/request-quote">Request a quotation <ArrowRight aria-hidden="true" /></Link></Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container seo-copy">
          <h2>Pest control services in {area.name}</h2>
          {page.intro.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <ul>
            {services.map((service) => (
              <li key={service.slug}><Link href={`/services/${service.slug}`}>{service.title}</Link>: {service.description}</li>
            ))}
          </ul>
          <h2>Contact DMSA</h2>
          <p>
            Call <a href={`tel:${siteConfig.phoneMobileHref}`}>{siteConfig.phoneMobile}</a> or message{" "}
            <a href={`viber://chat?number=${encodeURIComponent(siteConfig.phoneViberHref)}`}>{siteConfig.phoneViber}</a> on Viber. Open {siteConfig.hours}.
          </p>
        </div>
      </section>

      {jobs.length > 0 ? (
        <section className="section gallery-preview-section">
          <div className="site-container">
            <div className="heading-row">
              <SectionHeading title={`DMSA treatment jobs in ${area.name}`} />
            </div>
            <div className="project-grid">{jobs.map((location) => <ProjectCard key={location.slug} location={location} />)}</div>
          </div>
        </section>
      ) : null}

      <FinalCta />
    </main>
  );
}
