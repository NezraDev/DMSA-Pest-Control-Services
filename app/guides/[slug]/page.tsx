import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { JsonLd } from "@/components/site/json-ld";
import { BackLink, FinalCta } from "@/components/site/page-elements";
import { Button } from "@/components/ui/button";
import { guides } from "@/data/guides-data";
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
  const related = guides.filter((item) => guide.related.includes(item.slug));

  return (
    <main id="main-content">
      <JsonLd data={pageSchema({ name: title, description: guide.metaDescription, path, breadcrumbs: [{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }, { name: title, path }] })} />
      <JsonLd data={articleSchema({ headline: title, description: guide.metaDescription, path, datePublished: guide.datePublished, dateModified: guide.dateModified })} />
      <section className="page-hero">
        <div className="site-container page-hero-inner">
          <BackLink href="/guides">All guides</BackLink>
          <h1>{title}</h1>
          <p>{guide.summary}</p>
        </div>
      </section>
      <section className="section legal-section">
        <div className="site-container legal-layout">
          <nav className="legal-contents" aria-label="In this guide">
            <h2>In this guide</h2>
            <ol>
              {guide.sections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.heading}</a></li>)}
            </ol>
          </nav>
          <article className="legal-article">
            <p className="legal-updated">By DMSA Pest Control Services · Updated {formatDate(guide.dateModified)}</p>
            {guide.sections.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
                <h2 id={`${section.id}-title`}>{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.list ? <ul>{section.list.map((item) => <li key={item}>{item}</li>)}</ul> : null}
                {section.after?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.id === "when-to-call" ? (
                  <div className="guide-actions">
                    <Button asChild><Link href={`/request-quote${service ? `?service=${encodeURIComponent(service.quoteService)}` : ""}`}>Request a quotation <ArrowRight aria-hidden="true" /></Link></Button>
                    {service ? <Link className="text-link" href={`/services/${service.slug}`}>About {service.title.toLowerCase()} <ArrowRight aria-hidden="true" /></Link> : null}
                  </div>
                ) : null}
              </section>
            ))}
            <section aria-labelledby="more-guides-title">
              <h2 id="more-guides-title">More pest control guides</h2>
              <ul>
                {related.map((item) => <li key={item.slug}><Link href={`/guides/${item.slug}`}>{sentence(item.title)}</Link></li>)}
                <li><Link href="/guides">All guides</Link> · <Link href="/faq">Frequently asked questions</Link></li>
              </ul>
            </section>
          </article>
        </div>
      </section>
      <FinalCta />
    </main>
  );
}
