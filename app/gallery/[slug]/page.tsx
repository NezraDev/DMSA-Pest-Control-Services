import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, MapPin, Quote, ShieldCheck, Tag } from "lucide-react";

import { BackLink, FinalCta, ProjectVisual } from "@/components/site/page-elements";
import { ProofCarousel } from "@/components/site/proof-carousel";
import { Button } from "@/components/ui/button";
import { galleryItems } from "@/data/gallery-data";

function formatTreatmentDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return value;

  const year = Number(match[1]);
  const monthIndex = Number(match[2]) - 1;
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, monthIndex, day));
  if (
    monthIndex < 0 ||
    monthIndex > 11 ||
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== monthIndex ||
    date.getUTCDate() !== day
  ) return value;

  return new Intl.DateTimeFormat("en-PH", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function generateStaticParams() {
  return galleryItems.map((location) => ({ slug: location.slug }));
}

function findLocation(slug: string) {
  const normalizedSlug = slug.normalize("NFC");
  return galleryItems.find((item) => item.slug.normalize("NFC") === normalizedSlug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const location = findLocation(slug);
  if (!location) return { title: "Treatment not found" };
  return {
    title: `${location.title} — Gallery`,
    description: location.shortDescription,
    alternates: { canonical: `/gallery/${location.slug}` },
  };
}

export default async function GalleryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = findLocation(slug);
  if (!location) notFound();

  const comparisonImages =
    typeof location.beforeImage === "string" && typeof location.afterImage === "string"
      ? { before: location.beforeImage, after: location.afterImage }
      : null;
  const treatmentImages = location.imagePaths.map((src, index) => ({
    src,
    label: location.title,
    alt: `${location.title}, treatment image ${index + 1}`,
  }));

  return (
    <main id="main-content">
      <section className="detail-hero">
        <div className="site-container">
          <BackLink href="/gallery">Back to gallery</BackLink>
          <div className="detail-hero-grid">
            <div className="detail-hero-copy"><div className="sample-chip inline-chip">Sample record</div><h1>{location.title}</h1><p>{location.shortDescription}</p><Button asChild size="lg"><Link href={`/request-quote?service=${encodeURIComponent(location.servicePerformed)}`}>Request quotation <ArrowRight aria-hidden="true" /></Link></Button></div>
            <ProjectVisual location={location} large />
          </div>
        </div>
      </section>
      <section className="section project-detail-section">
        <div className="site-container">
          {comparisonImages ? (
              <section className="before-after-block" aria-labelledby="before-after-title">
                <div className="before-after-heading">
                  <h2 id="before-after-title">Before and after</h2>
                  <p>Compare the images assigned to this treatment entry.</p>
                </div>
                <div className="before-after-grid">
                  <figure>
                    <div className="before-after-image"><Image src={comparisonImages.before} alt={`Before treatment image for ${location.title}`} fill sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 1180px) calc(50vw - 34px), 570px" /></div>
                    <figcaption>Before image</figcaption>
                  </figure>
                  <figure>
                    <div className="before-after-image"><Image src={comparisonImages.after} alt={`After treatment image for ${location.title}`} fill sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 1180px) calc(50vw - 34px), 570px" /></div>
                    <figcaption>After image</figcaption>
                  </figure>
                </div>
              </section>
          ) : null}
          <ProofCarousel
            title="Treatment gallery"
            description="Swipe or use the arrow controls to browse this treatment's proof images."
            images={treatmentImages}
          />
          <div className="project-detail-grid">
            <div className="treatment-overview">
              <h2>Treatment overview</h2>
              <p>{location.description}</p>
              <dl className="detail-list">
              <div><MapPin aria-hidden="true" /><dt>General location</dt><dd>{location.generalLocation}</dd></div>
              <div><ShieldCheck aria-hidden="true" /><dt>Service</dt><dd>{location.servicePerformed}</dd></div>
              <div><Tag aria-hidden="true" /><dt>Pest / property</dt><dd>{location.pest} · {location.propertyType}</dd></div>
              <div><CalendarDays aria-hidden="true" /><dt>Date</dt><dd>{formatTreatmentDate(location.treatmentDate)}</dd></div>
              </dl>
            </div>
            <aside className="feedback-card"><Quote aria-hidden="true" /><h2>Customer feedback</h2><p>{location.customerFeedback || "Customer feedback is not available for this entry."}</p>{location.customerFeedback ? <cite>Published with customer permission</cite> : null}</aside>
          </div>
        </div>
      </section>
      <FinalCta />
    </main>
  );
}
