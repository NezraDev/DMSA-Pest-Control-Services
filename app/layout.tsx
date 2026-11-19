import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Script from "next/script";

import { MobileActionBar, SiteFooter, SiteHeader } from "@/components/site/site-chrome";
import { Chatbot } from "@/components/site/chatbot";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { siteConfig, trustFacts } from "@/data/site-data";
import { services } from "@/data/services-data";
import { galleryItems } from "@/data/gallery-data";
import { officeTowns, provinces } from "@/data/locations/provinces";
import { townByKey } from "@/lib/locations";
import { branchId, defaultShareImage, organizationId, websiteId } from "@/lib/seo";
import { absoluteUrl, siteUrl } from "@/lib/site-url";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-poppins", display: "swap" });

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim()
  || "jpHM_YYoRPyNfR6LYeipOGhyzRLByHZ4yUBcoB5WrnI";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DMSA Pest Control Services",
    template: "%s | DMSA Pest Control",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_PH",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [defaultShareImage],
  },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.description, images: [defaultShareImage.url] },
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
      "@id": websiteId,
      url: siteUrl,
      name: siteConfig.name,
      alternateName: ["DMSA Pest Control", siteConfig.shortName],
      inLanguage: "en-PH",
      publisher: { "@id": organizationId },
    },
    {
      "@type": "LocalBusiness",
      "@id": organizationId,
      url: siteUrl,
      name: siteConfig.name,
      alternateName: "DMSA Pest Control",
      description: siteConfig.description,
      logo: absoluteUrl(siteConfig.logos.website),
      image: absoluteUrl(defaultShareImage.url),
      telephone: siteConfig.phoneMobileHref,
      email: siteConfig.publicEmail || siteConfig.socialLinks.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Zone 3, Pamukid",
        addressLocality: "San Fernando",
        addressRegion: "Camarines Sur",
        addressCountry: "PH",
      },
      department: { "@id": branchId },
      ...(trustFacts.foundedYear ? { foundingDate: trustFacts.foundedYear } : {}),
      knowsAbout: ["Pest control", "Termite control", "Anay treatment", "Soil poisoning", "Anti-termite soil treatment", "Cockroach control", "Ant control", "Rodent control"],
      geo: {
        "@type": "GeoCoordinates",
        longitude: siteConfig.hqCoordinates[0],
        latitude: siteConfig.hqCoordinates[1],
      },
      areaServed: provinces.map((province) => ({ "@type": "AdministrativeArea", name: province.name })),
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
          itemOffered: { "@type": "Service", name: service.title, description: service.description, url: absoluteUrl(`/services/${service.slug}`) },
        })),
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": branchId,
      name: `${siteConfig.name} - Los Baños Branch`,
      parentOrganization: { "@id": organizationId },
      url: absoluteUrl("/pest-control/laguna/los-banos"),
      image: absoluteUrl(defaultShareImage.url),
      telephone: siteConfig.phoneViberHref,
      address: {
        "@type": "PostalAddress",
        streetAddress: "San Antonio",
        addressLocality: "Los Baños",
        addressRegion: "Laguna",
        addressCountry: "PH",
      },
      areaServed: provinces.filter((province) => province.servedFrom === "branch").map((province) => ({ "@type": "AdministrativeArea", name: province.name })),
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "08:00",
        closes: "17:00",
      },
    },
  ],
};

// Footer links to every town page with a DMSA office or a completed job (the indexable ones).
const footerTowns = [
  ...new Map(
    [...officeTowns.map((town) => town.path.replace("/pest-control/", "")), ...galleryItems.flatMap((item) => (item.town ? [item.town] : []))]
      .map((key) => townByKey(key))
      .filter((town) => town !== undefined)
      .map((town) => [town.path, { name: town.name, path: town.path }] as const),
  ).values(),
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-PH" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">{themeScript}</Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <SiteHeader />
        <ScrollReveal />
        {children}
        <SiteFooter towns={footerTowns} />
        <MobileActionBar />
        <Chatbot />
      </body>
    </html>
  );
}
