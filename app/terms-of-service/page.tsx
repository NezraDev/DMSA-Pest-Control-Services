import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage, type LegalSection } from "@/components/site/legal-page";
import { siteConfig } from "@/data/site-data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "The terms for using the DMSA Pest Control Services website, including how quotation requests, inspections and service bookings work.",
  path: "/terms-of-service",
});

const email = siteConfig.publicEmail || siteConfig.socialLinks.email;

const sections: LegalSection[] = [
  {
    id: "about",
    title: "About these terms",
    body: (
      <p>
        These terms apply to your use of this website, run by {siteConfig.name} (“DMSA”, “we”, “us”). By using the
        website or sending a request through it, you agree to these terms. If you do not agree, please do not use the
        website’s forms.
      </p>
    ),
  },
  {
    id: "website-information",
    title: "Information on this website",
    body: (
      <p>
        The website gives general information about our pest and termite control services. Every property is
        different, so this information does not replace an inspection or advice from our team about your specific
        situation.
      </p>
    ),
  },
  {
    id: "quotations",
    title: "Quotation requests and bookings",
    body: (
      <ul>
        <li>Sending a quotation request does not book a service or fix a price.</li>
        <li>A free ocular inspection is included in the quotation process, and DMSA may arrange one before confirming the work.</li>
        <li>The service scope, schedule and price are confirmed by DMSA after reviewing your request and, where needed, inspecting the property.</li>
        <li>Your preferred service date is a request. It is only confirmed when DMSA confirms it with you.</li>
        <li>Any written quotation or service agreement from DMSA sets out the terms for that service. If it differs from this page, the quotation or agreement applies.</li>
      </ul>
    ),
  },
  {
    id: "your-responsibilities",
    title: "Your responsibilities",
    body: (
      <>
        <p>When you use the website, you agree to:</p>
        <ul>
          <li>give accurate contact and property details;</li>
          <li>only request service for a property you own, occupy or manage, or are allowed to arrange service for;</li>
          <li>not send spam, false requests or harmful content through the forms; and</li>
          <li>not try to disrupt, overload or gain unauthorized access to the website.</li>
        </ul>
      </>
    ),
  },
  {
    id: "chat-assistant",
    title: "The Ask DMSA chat",
    body: (
      <p>
        The Ask DMSA chat gives general answers from prepared information about our services. It is not a quotation,
        booking or professional advice, and it does not confirm prices or schedules. Contact our team for anything
        specific to your property.
      </p>
    ),
  },
  {
    id: "content",
    title: "Photos and content",
    body: (
      <p>
        The text, photos, videos and logos on this website belong to DMSA or are used with permission. Job photos are
        shared with approval, and locations are generalized. Please do not copy or reuse this content without our
        written permission.
      </p>
    ),
  },
  {
    id: "other-sites",
    title: "Links to other services",
    body: (
      <p>
        The website links to other services, such as Facebook, Instagram, TikTok, Viber and map providers. Their own
        terms and privacy policies apply when you use them, and we are not responsible for their content.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <p>
        We work to keep the website accurate and available, but it is provided “as is”, and we cannot promise it will
        always be error-free or uninterrupted. To the extent allowed by law, DMSA is not liable for losses arising from
        your use of the website. This does not limit any rights you have under Philippine consumer protection law, or
        our responsibilities for services we actually provide, which are covered by the quotation or agreement for that
        service.
      </p>
    ),
  },
  {
    id: "privacy",
    title: "Privacy",
    body: (
      <p>
        Our <Link href="/privacy-policy">Privacy Policy</Link> explains how we handle the details you send through the
        website.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law",
    body: <p>These terms are governed by the laws of the Republic of the Philippines.</p>,
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <p>
        We may update these terms when our website or services change. The date at the top of this page shows when
        they were last updated. Continuing to use the website after a change means you accept the updated terms.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <ul>
        <li>Email: <a href={`mailto:${email}`}>{email}</a></li>
        <li>Mobile: <a href={`tel:${siteConfig.phoneMobileHref}`}>{siteConfig.phoneMobile}</a></li>
        <li>Viber: <a href={`viber://chat?number=${encodeURIComponent(siteConfig.phoneViberHref)}`}>{siteConfig.phoneViber}</a></li>
      </ul>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      description="The terms for using this website and for how quotation requests, inspections and bookings work."
      updated="November 19, 2026"
      sections={sections}
    />
  );
}
