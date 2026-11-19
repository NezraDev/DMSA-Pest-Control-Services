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
import { townByKey } from "@/lib/locations";
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
  const study = location.caseStudy ?? {};
  const caseSections = [
    { title: "What the client noticed", items: study.problem ?? [] },
    { title: "What the inspection found", items: study.findings ?? [] },
    { title: "How DMSA treated it", items: study.treatment ?? [], ordered: true },
    { title: "Areas treated", items: study.areaTreated ? [study.areaTreated] : [] },
    { title: "Follow-up and advice", items: study.aftercare ?? [] },
  ].filter((section) => section.items.length > 0);
  const performed = location.servicePerformed.toLowerCase();
  const methodNotes = [
    performed.includes("injection")
      ? "Chemical injection delivers treatment through small drilled points in floors, walls and frames, so it reaches the routes termites use behind finished surfaces."
      : "Termite control in a finished home targets the affected areas and likely entry points, such as cracks in floors and walls, door frames and cabinets.",
    ...(performed.includes("soil poisoning") ? ["Soil poisoning treats the soil along and under the structure, such as garden strips beside the walls, to help keep subterranean termites from reaching the building."] : []),
    "Removing termite-infested soil and debris is part of the cleanup, so old tunnels and nesting material are not left behind.",
    `Every DMSA job starts with a free ocular inspection. The treatment above was chosen for this property after that inspection; yours may differ.`,
  ];
  const service = services.find((item) => item.slug === (location.category === "Termite Control" ? "termite-control" : "general-pest-control"));
  const town = location.town ? townByKey(location.town) : undefined;
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
      <JsonLd data={pageSchema({ name: `${location.title} in ${location.generalLocation}`, description: location.shortDescription, path, breadcrumbs: [{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }, { name: location.heading, path }] })} />
      <JsonLd data={photoSchema} />
      <section className="detail-hero">
        <div className="site-container">
          <BackLink href="/gallery">Back to gallery</BackLink>
          <div className="detail-hero-grid">
            <div className="detail-hero-copy"><h1>{location.heading}</h1><p>{location.shortDescription}</p><Button asChild size="lg"><Link href={`/request-quote?service=${encodeURIComponent(location.servicePerformed)}`}>Request quotation <ArrowRight aria-hidden="true" /></Link></Button></div>
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
            <div className="detail-main">
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
                {town ? <Link className="text-link" href={town.path}>Pest control in {town.name} <ArrowRight aria-hidden="true" /></Link> : null}
                {town ? <Link className="text-link" href={town.province.path}>Pest control in {town.province.name} <ArrowRight aria-hidden="true" /></Link> : null}
              </p>
            </div>
            {caseSections.length > 0 ? (
              <div className="treatment-overview case-study">
                <h2>Case study</h2>
                {caseSections.map((section) => (
                  <section key={section.title} aria-label={section.title}>
                    <h3>{section.title}</h3>
                    {section.ordered
                      ? <ol>{section.items.map((item) => <li key={item}>{item}</li>)}</ol>
                      : section.items.map((item) => <p key={item}>{item}</p>)}
                  </section>
                ))}
              </div>
            ) : null}
            <div className="treatment-overview">
              <h2>Seeing the same signs at home?</h2>
              <ol className="next-steps">
                <li>Leave mud tubes and damaged wood as they are, and do not spray them, so the source can still be traced.</li>
                <li>Take photos and note where you found each sign.</li>
                <li>Move boxes and stored items away from the affected area.</li>
                <li>Request a quotation with a pin on the map. The ocular inspection is free and included.</li>
              </ol>
              <p className="detail-links">
                <Link className="text-link" href={`/request-quote?service=${encodeURIComponent("Termite Control")}`}>Request a quotation <ArrowRight aria-hidden="true" /></Link>
                <Link className="text-link" href="/guides/signs-of-anay-termites-in-your-house">Signs of anay in your house <ArrowRight aria-hidden="true" /></Link>
              </p>
            </div>
            <div className="treatment-overview">
              <h2>About the methods used</h2>
              {methodNotes.map((note) => <p key={note}>{note}</p>)}
              <p className="detail-links">
                <Link className="text-link" href="/pests/termites-anay">How to recognise anay <ArrowRight aria-hidden="true" /></Link>
                <Link className="text-link" href="/termite-inspection">The free termite inspection <ArrowRight aria-hidden="true" /></Link>
              </p>
            </div>
            </div>
            <aside className="feedback-card"><Quote aria-hidden="true" /><h2>Customer feedback</h2><p>{location.customerFeedback || "Customer feedback is not available for this entry."}</p>{location.customerFeedback ? <cite>Published with customer permission</cite> : null}</aside>
          </div>
        </div>
      </section>
      <FinalCta />
    </main>
  );
}
