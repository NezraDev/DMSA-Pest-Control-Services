import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Camera, Check, MapPin, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { GalleryItem } from "@/lib/content-types";
import { pestIconMap } from "@/lib/icon-map";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow"><span aria-hidden="true" />{children}</p>;
}

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="site-container page-hero-inner">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p>{description}</p>
        {actions ? <div className="hero-actions">{actions}</div> : null}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "section-heading centered" : "section-heading"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="checklist">
      {items.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}
    </ul>
  );
}

export function ProjectVisual({ location, large = false }: { location: GalleryItem; large?: boolean }) {
  const Icon = pestIconMap[location.pest];
  const comparisonImages =
    location.isSample && typeof location.beforeImage === "string" && typeof location.afterImage === "string"
      ? { before: location.beforeImage, after: location.afterImage }
      : null;
  const previewImage = location.imagePaths[0];
  const imageSizes = large ? "(max-width: 860px) 100vw, 56vw" : "(max-width: 640px) 100vw, 33vw";
  return (
    <div className={`${large ? "project-visual project-visual-large" : "project-visual"}${comparisonImages ? " project-slideshow" : ""}`} role={previewImage ? undefined : "img"} aria-label={previewImage ? undefined : `${location.displayCategory} gallery visual for ${location.generalLocation}`}>
      {comparisonImages ? (
        <>
          <Image className="project-slide project-slide-before" src={comparisonImages.before} alt={`${location.title} before and after slideshow in ${location.generalLocation}`} fill sizes={imageSizes} />
          <Image className="project-slide project-slide-after" src={comparisonImages.after} alt="" fill sizes={imageSizes} />
        </>
      ) : previewImage ? (
        <Image src={previewImage} alt={`${location.title} in ${location.generalLocation}`} fill sizes={imageSizes} />
      ) : (
        <>
          <div className="visual-grid" aria-hidden="true" />
          <Icon className="project-icon" aria-hidden="true" />
          <span className="photo-placeholder"><Camera aria-hidden="true" />{location.displayCategory}</span>
        </>
      )}
      {location.isSample ? <span className="sample-chip">Sample record</span> : null}
    </div>
  );
}

export function ProjectCard({ location }: { location: GalleryItem }) {
  return (
    <article className="project-card">
      <ProjectVisual location={location} />
      <div className="project-card-body">
        <div className="project-meta"><span>{location.servicePerformed}</span><span>{location.year}</span></div>
        <h3>{location.title}</h3>
        <p className="location-line"><MapPin aria-hidden="true" />{location.generalLocation}</p>
        <p>{location.shortDescription}</p>
        <Link className="card-link" href={`/gallery/${location.slug}`}>View treatment <ArrowRight aria-hidden="true" /></Link>
      </div>
    </article>
  );
}

export function FinalCta() {
  return (
    <section className="final-cta">
      <div className="site-container final-cta-inner">
        <div className="final-cta-copy">
          <Eyebrow>Quotation with site review</Eyebrow>
          <h2>Request a quotation with a free ocular inspection.</h2>
          <p>Share the location and pest concern. DMSA can arrange the included inspection during follow-up before confirming scope and price.</p>
        </div>
        <div className="final-cta-actions">
          <Button asChild size="lg" className="light-button"><Link href="/request-quote">Request quotation <ArrowRight aria-hidden="true" /></Link></Button>
          <Button asChild size="lg" variant="outline" className="outline-light"><Link href="/contact">Contact DMSA</Link></Button>
        </div>
      </div>
    </section>
  );
}

export function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="back-link"><ArrowLeft aria-hidden="true" />{children}</Link>;
}

export function PrivacyNotice() {
  return <p className="privacy-note"><ShieldCheck aria-hidden="true" />Pins show approximate areas only. Exact customer addresses are never displayed.</p>;
}
