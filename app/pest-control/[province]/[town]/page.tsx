import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { FaqSection } from "@/components/site/faq-section";
import { JsonLd } from "@/components/site/json-ld";
import { BackLink, FinalCta, ProjectCard, SectionHeading } from "@/components/site/page-elements";
import { TrustFacts } from "@/components/site/trust-facts";
import { Button } from "@/components/ui/button";
import { industries } from "@/data/industries-data";
import { pests } from "@/data/pests-data";
import { townContent } from "@/lib/location-content";
import { isTownIndexable } from "@/lib/location-quality";
import { findTown, launchedTowns } from "@/lib/locations";
import { branchId, organizationId, pageMetadata, pageSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-url";

type Props = { params: Promise<{ province: string; town: string }> };

export const dynamicParams = false;

const sentence = (text: string) => text.replace(/^./, (letter) => letter.toUpperCase());

export function generateStaticParams() {
  return launchedTowns.map((town) => ({ province: town.province.slug, town: town.slug }));
}

async function load(params: Props["params"]) {
  const { province, town: slug } = await params;
  const town = findTown(province, slug);
  return town?.province.launched ? town : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const town = await load(params);
  if (!town) return {};
  const content = townContent(town);
  return pageMetadata({
    ...content.title,
    description: content.metaDescription,
    path: content.path,
    noindex: !isTownIndexable(town),
  });
}

export default async function TownPage({ params }: Props) {
  const town = await load(params);
  if (!town) notFound();

  const content = townContent(town);
  const { province } = town;
  const { named, numbered } = content.barangayList;

  return (
    <main id="main-content">
      <JsonLd data={pageSchema({ name: content.heading, description: content.metaDescription, path: content.path, breadcrumbs: [{ name: "Home", path: "/" }, { name: "Service areas", path: "/service-areas" }, { name: province.name, path: province.path }, { name: town.name, path: content.path }] })} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${absoluteUrl(content.path)}#service`,
          name: `Pest control and termite treatment in ${town.name}, ${province.name}`,
          serviceType: "Pest control",
          url: absoluteUrl(content.path),
          provider: { "@id": town.servedFrom === "main" ? organizationId : branchId },
          areaServed: {
            "@type": town.type === "city" ? "City" : "AdministrativeArea",
            name: town.name,
            containedInPlace: { "@type": "AdministrativeArea", name: province.name },
          },
        }}
      />
      <section className="page-hero">
        <div className="site-container page-hero-inner">
          <BackLink href={province.path}>Pest control in {province.name}</BackLink>
          <h1>{content.heading}</h1>
          <p>{content.intro}</p>
          <div className="hero-actions">
            <Button asChild size="lg"><Link href="/request-quote">Request a quotation <ArrowRight aria-hidden="true" /></Link></Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container seo-copy">
          <h2>{content.officeHeading}</h2>
          {content.officeParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <h2>{content.overviewHeading}</h2>
          {content.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <h2>How service works in {town.name}</h2>
          <ol>{content.steps.map((step) => <li key={step}>{step}</li>)}</ol>
          <h2>Pest control services in {town.name}</h2>
          <ul>
            {content.services.map((service) => (
              <li key={service.href}><Link href={service.href}>{service.title}</Link>: {service.text}</li>
            ))}
          </ul>
          <p>
            Pests DMSA treats in {town.name}:{" "}
            {pests.map((pest, index) => (
              <span key={pest.slug}>{index > 0 ? ", " : null}<Link href={`/pests/${pest.slug}`}>{pest.localName} ({pest.name.toLowerCase()})</Link></span>
            ))}. For businesses in {town.name}:{" "}
            {industries.map((industry, index) => (
              <span key={industry.slug}>{index > 0 ? ", " : null}<Link href={`/industries/${industry.slug}`}>{industry.name.toLowerCase()}</Link></span>
            ))}. Read <Link href="/termite-inspection">what the free termite inspection covers</Link> and{" "}
            <Link href="/pest-control-price">what affects the price</Link>.
          </p>
          <p>
            {content.soilNote}{" "}
            <Link href="/guides/soil-poisoning-before-construction">How soil poisoning before construction works</Link>.
          </p>
          <h2>{content.barangayHeading}</h2>
          <p>{content.barangayIntro}</p>
          {content.barangaysServed.length > 0 ? (
            <p>Barangays where DMSA has completed work: <strong>{content.barangaysServed.join(", ")}</strong>.</p>
          ) : null}
          <details className="barangay-details">
            <summary>Show all {town.barangays.length} barangays in {town.name}</summary>
            <ul className="barangay-list">{named.map((name) => <li key={name}>{name}</li>)}</ul>
            {numbered > 0 ? <p>{named.length > 0 ? "Plus" : "All"} {numbered} numbered barangays (for example, Barangay 1 and Barangay 2).</p> : null}
          </details>
        </div>
      </section>

      {content.jobs.length > 0 ? (
        <section className="section gallery-preview-section">
          <div className="site-container">
            <div className="heading-row">
              <SectionHeading
                title={content.jobs.some(({ km }) => km === 0) ? `DMSA jobs in and near ${town.name}` : `DMSA jobs near ${town.name}`}
                description={content.jobs.some(({ km }) => km > 0) ? `Completed work within about ${Math.max(...content.jobs.map(({ km }) => km))} km of ${town.name}, nearest first.` : undefined}
              />
            </div>
            <div className="project-grid">{content.jobs.map(({ job }) => <ProjectCard key={job.slug} location={job} />)}</div>
          </div>
        </section>
      ) : null}

      <TrustFacts />

      <FaqSection title={`Pest control questions in ${town.name}`} faqs={content.faqs} path={content.path} />

      <section className="section">
        <div className="site-container seo-copy">
          <h2>Nearby towns DMSA serves</h2>
          <ul>
            {content.neighbours.map((item) => (
              <li key={item.path}>
                <Link href={item.path}>Pest control in {item.name}, {item.province}</Link>
                {item.km > 0 ? <> · about {item.km} km away</> : null}
              </li>
            ))}
          </ul>
          <h2>More help</h2>
          <ul>
            <li><Link href={province.path}>Pest and termite control in {province.name}</Link></li>
            <li><Link href="/service-areas">All DMSA service areas</Link></li>
            {content.guides.map((guide) => <li key={guide.slug}><Link href={`/guides/${guide.slug}`}>{sentence(guide.title)}</Link></li>)}
          </ul>
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
