import type { Metadata } from "next";
import Script from "next/script";

import { MobileActionBar, SiteFooter, SiteHeader } from "@/components/site/site-chrome";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { siteConfig } from "@/data/site-data";
import { services } from "@/data/services-data";
import { absoluteUrl, siteUrl } from "@/lib/site-url";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim()
  || "jpHM_YYoRPyNfR6LYeipOGhyzRLByHZ4yUBcoB5WrnI";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DMSA Pest Control Services",
    template: "%s | DMSA Pest Control Services",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ["DMSA Pest Control Services", "DMSA Pest Control", "pest control Philippines", "termite control", "anay control", "Bicol", "Camarines Sur", "Cavite", "Laguna", "Batangas", "Rizal", "Quezon", "Metro Manila"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    locale: "en_PH",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: siteConfig.logos.website, alt: `${siteConfig.name} logo` }],
  },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.description, images: [siteConfig.logos.website] },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: googleSiteVerification ? { google: googleSiteVerification } : undefined,
  icons: {
    icon: siteConfig.logos.pageIcon,
    shortcut: siteConfig.logos.pageIcon,
  },
};

const themeScript = `
  (function () {
    try {
      var theme = localStorage.getItem('dmsa-theme') || 'light';
      var dark = theme === 'dark' || (theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
      document.documentElement.classList.toggle('dark', dark);
      document.documentElement.dataset.theme = theme;
    } catch (_) {}
  })();
`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteConfig.name,
      alternateName: ["DMSA Pest Control", siteConfig.shortName],
      inLanguage: "en-PH",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#organization`,
      url: siteUrl,
      name: siteConfig.name,
      alternateName: "DMSA Pest Control",
      description: siteConfig.description,
      logo: absoluteUrl(siteConfig.logos.website),
      image: absoluteUrl(siteConfig.logos.website),
      telephone: [siteConfig.phoneViberHref, siteConfig.phoneMobileHref],
      email: siteConfig.publicEmail || siteConfig.socialLinks.email,
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "Zone 3, Pamukid",
          addressLocality: "San Fernando",
          addressRegion: "Camarines Sur",
          addressCountry: "PH",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "San Antonio",
          addressLocality: "Los Baños",
          addressRegion: "Laguna",
          addressCountry: "PH",
        },
      ],
      geo: {
        "@type": "GeoCoordinates",
        longitude: siteConfig.hqCoordinates[0],
        latitude: siteConfig.hqCoordinates[1],
      },
      areaServed: siteConfig.serviceAreas.map((name) => ({ "@type": "AdministrativeArea", name })),
      sameAs: Object.values(siteConfig.socialLinks).filter((value) => /^https?:\/\//.test(value)),
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "08:00",
        closes: "17:00",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Pest control services",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: service.title, description: service.description },
        })),
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-PH" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">{themeScript}</Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <SiteHeader />
        <ScrollReveal />
        {children}
        <SiteFooter />
        <MobileActionBar />
      </body>
    </html>
  );
}
