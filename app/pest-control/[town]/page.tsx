import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { FaqSection } from "@/components/site/faq-section";
import { JsonLd } from "@/components/site/json-ld";
import { BackLink, FinalCta, ProjectCard, SectionHeading } from "@/components/site/page-elements";
import { Button } from "@/components/ui/button";
import { galleryItems } from "@/data/gallery-data";
import { guides } from "@/data/guides-data";
import { serviceAreas } from "@/data/service-areas-data";
import { services } from "@/data/services-data";
import { siteConfig } from "@/data/site-data";
import { towns } from "@/data/towns-data";
import type { GalleryItem, Town } from "@/lib/content-types";
import { organizationId, pageMetadata, pageSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-url";

type Props = { params: Promise<{ town: string }> };

export const dynamicParams = false;

function findTown(slug: string) {
  return towns.find((town) => town.slug === slug.normalize("NFC"));
}

function distanceKm([lng1, lat1]: [number, number], [lng2, lat2]: [number, number]) {
  const rad = Math.PI / 180;
  const a = Math.sin(((lat2 - lat1) * rad) / 2) ** 2
    + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(((lng2 - lng1) * rad) / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(a));
}

/** Jobs in the town first, then other jobs in the same province, nearest first. */
function jobsNear(town: Town): GalleryItem[] {
  const inTown = galleryItems.filter((item) => item.town === town.slug);
  const nearby = galleryItems
    .filter((item) => item.town !== town.slug && item.region === town.region)
    .sort((a, b) => distanceKm(town.coordinates, a.coordinates) - distanceKm(town.coordinates, b.coordinates));
  return [...inTown, ...nearby].slice(0, 3);
}

export function generateStaticParams() {
  return towns.map(({ slug }) => ({ town: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const town = findTown((await params).town);
  if (!town) return {};
  return pageMetadata({ title: town.metaTitle, description: town.metaDescription, path: `/pest-control/${town.slug}` });
}

export default async function TownPage({ params }: Props) {
  const town = findTown((await params).town);
  if (!town) notFound();

  const path = `/pest-control/${town.slug}`;
  const province = serviceAreas.find((area) => area.name === town.region);
  const provincePath = province?.page ? `/service-areas/${province.page.slug}` : "/service-areas";
  const jobs = jobsNear(town);
  const hasJobsInTown = jobs.some((job) => job.town === town.slug);
  const nearbyTowns = towns.filter((item) => town.nearby.includes(item.slug));
  const location = town.servedFrom === "main"
    ? { label: "DMSA main office", address: siteConfig.address }
    : { label: "DMSA Los Baños branch", address: siteConfig.additionalLocation };

  const steps = [
    `Request a quotation online, call ${siteConfig.phoneMobile} or message ${siteConfig.phoneViber} on Viber. Share your barangay or subdivision and drop a pin on the map.`,
    "DMSA reviews your request and arranges the free ocular inspection.",
    "After the inspection, DMSA recommends a treatment and confirms the scope, schedule and price.",
    "The team carries out the treatment and gives prevention or monitoring advice for the property.",
  ];

  return (
    <main id="main-content">
      <JsonLd data={pageSchema({ name: town.heading, description: town.metaDescription, path, breadcrumbs: [{ name: "Home", path: "/" }, { name: "Service areas", path: "/service-areas" }, ...(province?.page ? [{ name: province.name, path: provincePath }] : []), { name: town.name, path }] })} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Pest control and termite treatment in ${town.name}, ${town.province}`,
          serviceType: "Pest control",
          url: absoluteUrl(path),
          provider: { "@id": organizationId },
          areaServed: { "@type": "City", name: town.name, containedInPlace: { "@type": "AdministrativeArea", name: town.province } },
        }}
      />
      <section className="page-hero">
        <div className="site-container page-hero-inner">
          <BackLink href={provincePath}>{province?.page ? `Pest control in ${province.name}` : "All service areas"}</BackLink>
          <h1>{town.heading}</h1>
          <p>{town.intro[0]}</p>
          <div className="hero-actions">
            <Button asChild size="lg"><Link href="/request-quote">Request a quotation <ArrowRight aria-hidden="true" /></Link></Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container seo-copy">
          <h2>Pest and termite control across {town.name}</h2>
          {town.intro.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {town.local.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <h2>How service works in {town.name}</h2>
          <ol>{steps.map((step) => <li key={step}>{step}</li>)}</ol>
          <p>
            Nearest DMSA location: <strong>{location.label}</strong>, {location.address}. Open {siteConfig.hours}.
          </p>
          <h2>Pest control services in {town.name}</h2>
          <ul>
            {services.map((service) => (
              <li key={service.slug}><Link href={`/services/${service.slug}`}>{service.title}</Link>: {service.description}</li>
            ))}
          </ul>
        </div>
      </section>

      {jobs.length > 0 ? (
        <section className="section gallery-preview-section">
          <div className="site-container">
            <div className="heading-row">
              <SectionHeading title={hasJobsInTown ? `DMSA jobs in and near ${town.name}` : `DMSA jobs near ${town.name}`} />
            </div>
            <div className="project-grid">{jobs.map((job) => <ProjectCard key={job.slug} location={job} />)}</div>
          </div>
        </section>
      ) : null}

      <FaqSection title={`Pest control questions in ${town.name}`} faqs={town.faqs} path={path} />

      <section className="section">
        <div className="site-container seo-copy">
          <h2>Nearby areas and more help</h2>
          <ul>
            {nearbyTowns.map((item) => (
              <li key={item.slug}><Link href={`/pest-control/${item.slug}`}>Pest control in {item.name}, {item.province}</Link></li>
            ))}
            {province?.page ? <li><Link href={provincePath}>Pest and termite control in {province.name}</Link></li> : null}
            <li><Link href="/service-areas">All DMSA service areas</Link></li>
            <li><Link href={`/guides/${guides[0].slug}`}>{guides[0].title.replace(/^./, (letter) => letter.toUpperCase())}</Link></li>
          </ul>
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
