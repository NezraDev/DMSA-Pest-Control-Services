import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { ArticleLayout } from "@/components/site/article-sections";
import { FaqSection } from "@/components/site/faq-section";
import { JsonLd } from "@/components/site/json-ld";
import { BackLink, FinalCta } from "@/components/site/page-elements";
import { Button } from "@/components/ui/button";
import { launchedProvinces } from "@/data/locations/provinces";
import { guides } from "@/data/guides-data";
import { pests } from "@/data/pests-data";
import { services } from "@/data/services-data";
import { articleSchema, pageMetadata, pageSchema } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

const sentence = (text: string) => text.replace(/^./, (letter) => letter.toUpperCase());

export function generateStaticParams() {
  return pests.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pest = pests.find((item) => item.slug === slug);
  if (!pest) return {};
  return pageMetadata({ title: pest.metaTitle, description: pest.metaDescription, path: `/pests/${pest.slug}` });
}

export default async function PestPage({ params }: Props) {
  const { slug } = await params;
  const pest = pests.find((item) => item.slug === slug);
  if (!pest) notFound();

  const path = `/pests/${pest.slug}`;
  const title = sentence(pest.title);
  const service = services.find((item) => item.slug === pest.relatedService);
  const related = guides.filter((guide) => pest.relatedGuides.includes(guide.slug));
  const otherPests = pests.filter((item) => item.slug !== pest.slug);

  return (
    <main id="main-content">
      <JsonLd data={pageSchema({ name: title, description: pest.metaDescription, path, breadcrumbs: [{ name: "Home", path: "/" }, { name: "Pests", path: "/pests" }, { name: `${pest.name} (${pest.localName})`, path }] })} />
      <JsonLd data={articleSchema({ headline: title, description: pest.metaDescription, path, datePublished: pest.dateModified, dateModified: pest.dateModified })} />
      <section className="page-hero">
        <div className="site-container page-hero-inner">
          <BackLink href="/pests">All pests</BackLink>
          <h1>{title}</h1>
          <p>{pest.cardSummary}</p>
          <div className="hero-actions">
            <Button asChild size="lg"><Link href={`/request-quote${service ? `#service=${encodeURIComponent(service.quoteService)}` : ""}`}>Request a quotation <ArrowRight aria-hidden="true" /></Link></Button>
          </div>
        </div>
      </section>

      <ArticleLayout
        sections={pest.sections}
        byline="By DMSA Pest Control Services"
        quickAnswer={pest.summary}
        renderAfter={(section) => section.id === "how-dmsa-treats" && service ? (
          <p><Link href={`/services/${service.slug}`}>More about {service.title.toLowerCase()}</Link></p>
        ) : null}
      >
        <section aria-labelledby="more-title">
          <h2 id="more-title">Related guides and services</h2>
          <ul>
            {related.map((guide) => <li key={guide.slug}><Link href={`/guides/${guide.slug}`}>{sentence(guide.title)}</Link></li>)}
            {service ? <li><Link href={`/services/${service.slug}`}>{service.title}</Link></li> : null}
            {otherPests.map((item) => <li key={item.slug}><Link href={`/pests/${item.slug}`}>{item.name} ({item.localName})</Link></li>)}
          </ul>
          <p>
            Find your town: {launchedProvinces.map((province, index) => (
              <span key={province.slug}>{index > 0 ? " · " : null}<Link href={`/pest-control/${province.slug}`}>{province.name}</Link></span>
            ))} · <Link href="/service-areas">all service areas</Link>.
          </p>
        </section>
      </ArticleLayout>

      <FaqSection title={`${pest.name} (${pest.localName}): common questions`} faqs={pest.faqs} path={path} />
      <FinalCta />
    </main>
  );
}
