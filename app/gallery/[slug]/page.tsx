import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, MapPin, Quote, ShieldCheck, Tag } from "lucide-react";

import { BackLink, FinalCta, ProjectVisual } from "@/components/site/page-elements";
import { ProofCarousel } from "@/components/site/proof-carousel";
import { Button } from "@/components/ui/button";
import { galleryItems } from "@/data/gallery-data";
import { JsonLd } from "@/components/site/json-ld";
import { services } from "@/data/services-data";
import { towns } from "@/data/towns-data";
import { organizationId, pageMetadata, pageSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-url";

function formatTreatmentDate(value: string) {
  // A month-only date ("2026-11") is shown as "November 2026".
  const monthOnly = /^(\d{4})-(\d{2})$/.exec(value);
  if (monthOnly) {
    const monthIndex = Number(monthOnly[2]) - 1;
    if (monthIndex < 0 || monthIndex > 11) return value;
    return new Intl.DateTimeFormat("en-PH", { month: "long", year: "numeric", timeZone: "UTC" })
      .format(new Date(Date.UTC(Number(monthOnly[1]), monthIndex, 1)));
  }

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
  const path = `/gallery/${location.slug}`;
  return pageMetadata({
    absoluteTitle: location.metaTitle,
    description: location.shortDescription,
    path,
    image: { url: location.imagePaths[0], alt: `${location.title} in ${location.generalLocation}` },
  });
}

export default async function GalleryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = findLocation(slug);
  if (!location) notFound();

  const comparisonImages =
    typeof location.beforeImage === "string" && typeof location.afterImage === "string"
      ? { before: location.beforeImage, after: location.afterImage }
      : null;
  const captionFor = (index: number) => location.imageCaptions?.[index];
  const treatmentImages = location.imagePaths.map((src, index) => ({
    src,
    label: captionFor(index) ?? location.title,
    alt: captionFor(index)
      ? `${captionFor(index)}, ${location.generalLocation}`
      : `${location.servicePerformed} in ${location.generalLocation}, photo ${index + 1}`,
  }));
  const path = `/gallery/${location.slug}`;
  const service = services.find((item) => item.slug === (location.category === "Termite Control" ? "termite-control" : "general-pest-control"));
  const town = towns.find((item) => item.slug === location.town);
  const photoSchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${absoluteUrl(path)}#photos`,
    name: `${location.title} in ${location.generalLocation}`,
    about: { "@id": organizationId },
    image: [
      ...location.imagePaths.map((src, index) => ({ src, caption: captionFor(index) })),
      ...(comparisonImages
        ? [{ src: comparisonImages.before, caption: location.comparisonCaptions?.[0] }, { src: comparisonImages.after, caption: location.comparisonCaptions?.[1] }]
        : []),
    ].map(({ src, caption }) => ({
      "@type": "ImageObject",
      contentUrl: absoluteUrl(src),
      caption: caption ?? `${location.title} in ${location.generalLocation}`,
      contentLocation: { "@type": "Place", name: location.generalLocation },
      creator: { "@id": organizationId },
    })),
  };

  return (
    <main id="main-content">
      <JsonLd data={pageSchema({ name: `${location.title} in ${location.generalLocation}`, description: location.shortDescription, path, breadcrumbs: [{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }, { name: location.title, path }] })} />
      <JsonLd data={photoSchema} />
      <section className="detail-hero">
        <div className="site-container">
          <BackLink href="/gallery">Back to gallery</BackLink>
          <div className="detail-hero-grid">
            <div className="detail-hero-copy"><h1>{location.title}</h1><p>{location.shortDescription}</p><Button asChild size="lg"><Link href={`/request-quote?service=${encodeURIComponent(location.servicePerformed)}`}>Request quotation <ArrowRight aria-hidden="true" /></Link></Button></div>
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
                    <div className="before-after-image"><Image src={comparisonImages.before} alt={location.comparisonCaptions?.[0] ?? `Before treatment image for ${location.title}`} fill sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 1180px) calc(50vw - 34px), 570px" /></div>
                    <figcaption>Before image</figcaption>
                  </figure>
                  <figure>
                    <div className="before-after-image"><Image src={comparisonImages.after} alt={location.comparisonCaptions?.[1] ?? `After treatment image for ${location.title}`} fill sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 1180px) calc(50vw - 34px), 570px" /></div>
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
              <p className="detail-links">
                {service ? <Link className="text-link" href={`/services/${service.slug}`}>About {service.title.toLowerCase()} <ArrowRight aria-hidden="true" /></Link> : null}
                {town ? <Link className="text-link" href={`/pest-control/${town.slug}`}>Pest control in {town.name} <ArrowRight aria-hidden="true" /></Link> : null}
              </p>
            </div>
            <aside className="feedback-card"><Quote aria-hidden="true" /><h2>Customer feedback</h2><p>{location.customerFeedback || "Customer feedback is not available for this entry."}</p>{location.customerFeedback ? <cite>Published with customer permission</cite> : null}</aside>
          </div>
        </div>
      </section>
      <FinalCta />
    </main>
  );
}
