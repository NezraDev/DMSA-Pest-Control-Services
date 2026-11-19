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

function formatDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("en-PH", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(year, month - 1, day)));
}

function findGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = findGuide((await params).slug);
  if (!guide) return {};
  return pageMetadata({ title: guide.metaTitle, description: guide.metaDescription, path: `/guides/${guide.slug}` });
}

export default async function GuidePage({ params }: Props) {
  const guide = findGuide((await params).slug);
  if (!guide) notFound();

  const path = `/guides/${guide.slug}`;
  const title = sentence(guide.title);
  const service = services.find((item) => item.slug === guide.relatedService);
  const pest = pests.find((item) => item.slug === guide.relatedPest);
  const related = guides.filter((item) => guide.related.includes(item.slug));

  return (
    <main id="main-content">
      <JsonLd data={pageSchema({ name: title, description: guide.metaDescription, path, breadcrumbs: [{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }, { name: title, path }] })} />
      <JsonLd data={articleSchema({ headline: title, description: guide.metaDescription, path, datePublished: guide.datePublished, dateModified: guide.dateModified })} />
      <section className="page-hero">
        <div className="site-container page-hero-inner">
          <BackLink href="/guides">All guides</BackLink>
          <h1>{title}</h1>
          <p>{guide.cardSummary}</p>
        </div>
      </section>
      <ArticleLayout
        sections={guide.sections}
        byline={`By DMSA Pest Control Services · Updated ${formatDate(guide.dateModified)}`}
        quickAnswer={guide.summary}
        renderAfter={(section) => section.id === "when-to-call" ? (
          <div className="guide-actions">
            <Button asChild><Link href={`/request-quote${service ? `?service=${encodeURIComponent(service.quoteService)}` : ""}`}>Request a quotation <ArrowRight aria-hidden="true" /></Link></Button>
            {service ? <Link className="text-link" href={`/services/${service.slug}`}>About {service.title.toLowerCase()} <ArrowRight aria-hidden="true" /></Link> : null}
          </div>
        ) : null}
      >
        <section aria-labelledby="more-guides-title">
          <h2 id="more-guides-title">Related pages</h2>
          <ul>
            {pest ? <li><Link href={`/pests/${pest.slug}`}>{pest.name} ({pest.localName}): signs, types and treatment</Link></li> : null}
            {related.map((item) => <li key={item.slug}><Link href={`/guides/${item.slug}`}>{sentence(item.title)}</Link></li>)}
            {guide.relatedService === "termite-control" ? <li><Link href="/termite-inspection">What the free termite inspection covers</Link></li> : null}
            <li><Link href="/pest-control-price">What affects the price of pest control</Link></li>
            <li><Link href="/guides">All guides</Link> · <Link href="/faq">Frequently asked questions</Link></li>
          </ul>
          <p>
            Pest control near you: {launchedProvinces.map((province, index) => (
              <span key={province.slug}>{index > 0 ? " · " : null}<Link href={`/pest-control/${province.slug}`}>{province.name}</Link></span>
            ))} · <Link href="/service-areas">all service areas</Link>.
          </p>
        </section>
      </ArticleLayout>
      <FaqSection title="Questions about this guide" faqs={guide.faqs} path={path} />
      <FinalCta />
    </main>
  );
}
