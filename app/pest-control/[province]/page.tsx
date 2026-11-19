import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { FaqSection } from "@/components/site/faq-section";
import { JsonLd } from "@/components/site/json-ld";
import { BackLink, FinalCta, ProjectCard, SectionHeading } from "@/components/site/page-elements";
import { Button } from "@/components/ui/button";
import { industries } from "@/data/industries-data";
import { pests } from "@/data/pests-data";
import { provinceContent } from "@/lib/location-content";
import { findProvince, launchedLocationProvinces, type LocationTown } from "@/lib/locations";
import { pageMetadata, pageSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-url";

type Props = { params: Promise<{ province: string }> };

export const dynamicParams = false;

const sentence = (text: string) => text.replace(/^./, (letter) => letter.toUpperCase());

export function generateStaticParams() {
  return launchedLocationProvinces.map((province) => ({ province: province.slug }));
}

async function load(params: Props["params"]) {
  const province = findProvince((await params).province);
  return province?.launched ? province : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const province = await load(params);
  if (!province) return {};
  const content = provinceContent(province);
  return pageMetadata({ ...content.title, description: content.metaDescription, path: content.path });
}

function TownLinks({ title, towns }: { title: string; towns: LocationTown[] }) {
  if (towns.length === 0) return null;
  return (
    <div className="town-group">
      <h3>{title}</h3>
      <ul className="town-link-grid">
        {towns.map((town) => (
          <li key={town.key}>
            <Link href={town.path}>{town.name}</Link>
            <span>{town.barangays.length} barangays</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ProvincePage({ params }: Props) {
  const province = await load(params);
  if (!province) notFound();

  const content = provinceContent(province);
  const otherProvinces = launchedLocationProvinces.filter((item) => item !== province);

  return (
    <main id="main-content">
      <JsonLd data={pageSchema({ type: "CollectionPage", name: content.heading, description: content.metaDescription, path: content.path, breadcrumbs: [{ name: "Home", path: "/" }, { name: "Service areas", path: "/service-areas" }, { name: province.name, path: content.path }] })} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "@id": `${absoluteUrl(content.path)}#towns`,
          name: `${sentence(content.townWord)} in ${province.name} served by DMSA`,
          numberOfItems: province.towns.length,
          itemListElement: province.towns.map((town, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: `Pest control in ${town.name}, ${province.name}`,
            url: absoluteUrl(town.path),
          })),
        }}
      />
      <section className="page-hero">
        <div className="site-container page-hero-inner">
          <BackLink href="/service-areas">All service areas</BackLink>
          <h1>{content.heading}</h1>
          <p>{content.intro[0]}</p>
          <div className="hero-actions">
            <Button asChild size="lg"><Link href="/request-quote">Request a quotation <ArrowRight aria-hidden="true" /></Link></Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container seo-copy">
          <h2>Pest control services in {province.name}</h2>
          {content.intro.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <p>{content.officeParagraph}</p>
          {province.accessNote ? <p>{province.accessNote}</p> : null}
          <p>
            Pests treated: {pests.map((pest, index) => (
              <span key={pest.slug}>{index > 0 ? ", " : null}<Link href={`/pests/${pest.slug}`}>{pest.name.toLowerCase()} ({pest.localName})</Link></span>
            ))}. For businesses: {industries.map((industry, index) => (
              <span key={industry.slug}>{index > 0 ? ", " : null}<Link href={`/industries/${industry.slug}`}>{industry.name.toLowerCase()}</Link></span>
            ))}.
          </p>
          <ul>
            {content.services.map((service) => (
              <li key={service.href}><Link href={service.href}>{service.title}</Link>: {service.text}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section town-directory" id="towns">
        <div className="site-container">
          <SectionHeading
            title={`${sentence(content.townWord)} in ${province.name}`}
            description={`DMSA accepts requests from all ${province.towns.length} ${content.townWord} in ${province.name}, covering ${content.barangayCount.toLocaleString("en-PH")} barangays. Choose your town for the serving office, distance, barangays and local questions.`}
          />
          <TownLinks title="Cities" towns={content.cities} />
          <TownLinks title="Municipalities" towns={content.municipalities} />
        </div>
      </section>

      {content.jobs.length > 0 ? (
        <section className="section gallery-preview-section">
          <div className="site-container">
            <div className="heading-row">
              <SectionHeading title={`DMSA treatment jobs in ${province.name}`} />
            </div>
            <div className="project-grid">{content.jobs.map((job) => <ProjectCard key={job.slug} location={job} />)}</div>
          </div>
        </section>
      ) : null}

      <FaqSection title={`Pest control questions in ${province.name}`} faqs={content.faqs} path={content.path} />

      <section className="section">
        <div className="site-container seo-copy">
          <h2>How to book pest control in {province.name}</h2>
          <ol>{content.steps.map((step) => <li key={step}>{step}</li>)}</ol>
          <h2>Guides and other areas</h2>
          <ul>
            {content.guides.map((guide) => <li key={guide.slug}><Link href={`/guides/${guide.slug}`}>{sentence(guide.title)}</Link></li>)}
            {otherProvinces.map((item) => <li key={item.slug}><Link href={item.path}>Pest and termite control in {item.name}</Link></li>)}
            <li><Link href="/service-areas">All DMSA service areas</Link></li>
          </ul>
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
