import type { Metadata } from "next";

import { siteConfig } from "@/data/site-data";
import { absoluteUrl, siteUrl } from "@/lib/site-url";

export const defaultShareImage = {
  url: "/brand/og-dmsa.jpg",
  width: 1200,
  height: 630,
  alt: "A DMSA technician applying termite treatment beneath a timber frame",
};

export const organizationId = `${siteUrl}/#organization`;

type PageSeo = {
  /** Combined with the brand by the root title template. */
  title?: string;
  /** Used as the complete title, for pages that need their full length for search terms. */
  absoluteTitle?: string;
  description: string;
  path: string;
  image?: { url: string; alt: string };
  noindex?: boolean;
};

/** Builds per-page metadata, so shared links never fall back to the homepage's URL and title. */
export function pageMetadata({ title, absoluteTitle, description, path, image, noindex }: PageSeo): Metadata {
  const fullTitle = absoluteTitle ?? `${title} | ${siteConfig.name}`;
  const images = [image ?? defaultShareImage];

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      locale: "en_PH",
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: images.map(({ url }) => url) },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ name, path }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: absoluteUrl(path),
    })),
  };
}

export function serviceSchema({ name, description, path, areaServed }: { name: string; description: string; path: string; areaServed: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    serviceType: name,
    provider: { "@id": organizationId },
    areaServed: areaServed.map((area) => ({ "@type": "AdministrativeArea", name: area })),
  };
}
