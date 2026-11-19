import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { ArticleLayout } from "@/components/site/article-sections";
import { FaqSection } from "@/components/site/faq-section";
import { JsonLd } from "@/components/site/json-ld";
import { BackLink, FinalCta } from "@/components/site/page-elements";
import { Button } from "@/components/ui/button";
import { guides } from "@/data/guides-data";
import { industries } from "@/data/industries-data";
import { pests } from "@/data/pests-data";
import { siteConfig } from "@/data/site-data";
import { pageMetadata, pageSchema, serviceSchema } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

const sentence = (text: string) => text.replace(/^./, (letter) => letter.toUpperCase());

export function generateStaticParams() {
  return industries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((item) => item.slug === slug);
  if (!industry) return {};
  return pageMetadata({ title: industry.metaTitle, description: industry.metaDescription, path: `/industries/${industry.slug}` });
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = industries.find((item) => item.slug === slug);
  if (!industry) notFound();

  const path = `/industries/${industry.slug}`;
  const title = sentence(industry.title);
  const isConstruction = industry.slug === "construction-sites";
  const relatedPests = pests.filter((pest) => industry.relatedPests.includes(pest.slug));
  const relatedGuides = guides.filter((guide) => industry.relatedGuides.includes(guide.slug));
  const otherIndustries = industries.filter((item) => item.slug !== industry.slug);

  return (
    <main id="main-content">
      <JsonLd data={pageSchema({ name: title, description: industry.metaDescription, path, breadcrumbs: [{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }, { name: industry.name, path }] })} />
      <JsonLd data={serviceSchema({ name: title, description: industry.metaDescription, path, areaServed: siteConfig.serviceAreas })} />
      <section className="page-hero">
        <div className="site-container page-hero-inner">
          <BackLink href="/industries">All industries</BackLink>
          <h1>{title}</h1>
          <p>{industry.cardSummary}</p>
          <div className="hero-actions">
            <Button asChild size="lg"><Link href={`/request-quote?service=${encodeURIComponent(isConstruction ? "Termite Control" : "General Pest Control")}`}>Request a quotation <ArrowRight aria-hidden="true" /></Link></Button>
          </div>
        </div>
      </section>

      <ArticleLayout sections={industry.sections} quickAnswer={industry.summary}>
        <section aria-labelledby="more-title">
          <h2 id="more-title">Related pests, guides and services</h2>
          <ul>
            <li><Link href={isConstruction ? "/services/termite-control" : "/services/commercial-pest-control"}>{isConstruction ? "Termite control and anay treatment" : "Commercial pest control"}</Link></li>
            {relatedPests.map((pest) => <li key={pest.slug}><Link href={`/pests/${pest.slug}`}>{pest.name} ({pest.localName})</Link></li>)}
            {relatedGuides.map((guide) => <li key={guide.slug}><Link href={`/guides/${guide.slug}`}>{sentence(guide.title)}</Link></li>)}
            {otherIndustries.map((item) => <li key={item.slug}><Link href={`/industries/${item.slug}`}>{sentence(item.title)}</Link></li>)}
          </ul>
        </section>
      </ArticleLayout>

      <FaqSection title={`${industry.name}: common questions`} faqs={industry.faqs} path={path} />
      <FinalCta />
    </main>
  );
}
