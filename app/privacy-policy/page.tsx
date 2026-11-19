import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage, type LegalSection } from "@/components/site/legal-page";
import { siteConfig } from "@/data/site-data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How DMSA Pest Control Services collects, uses and protects the details you share through its website, quotation form and contact form.",
  path: "/privacy-policy",
});

const email = siteConfig.publicEmail || siteConfig.socialLinks.email;

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          This website is run by {siteConfig.name} (“DMSA”, “we”, “us”), a pest and termite control business based in
          Zone 3, Pamukid, San Fernando, Camarines Sur, with a branch in San Antonio, Los Baños, Laguna, Philippines.
        </p>
        <p>
          This policy explains what personal information we collect through this website, why we collect it, and the
          choices you have. We handle personal information in line with the Data Privacy Act of 2012 (Republic Act No.
          10173).
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    body: (
      <>
        <p><strong>When you request a quotation</strong>, we collect the details you enter:</p>
        <ul>
          <li>your full name, mobile number, email address and preferred contact method;</li>
          <li>whether you are a residential or commercial customer, the service you need, the pest concern and the property type;</li>
          <li>the property address or general location, and the map pin you place;</li>
          <li>your preferred service date and your description of the problem; and</li>
          <li>how you heard about DMSA.</li>
        </ul>
        <p><strong>When you send a message</strong> through the contact form, we collect your name, email address, mobile number if you give it, the subject and your message.</p>
        <p><strong>When you use the website</strong>, a small amount of technical information is involved:</p>
        <ul>
          <li>Your IP address is used briefly to stop the forms being sent too many times in a short period. It is not saved to a database.</li>
          <li>Our hosting provider keeps standard server logs, such as IP address, browser type and pages requested, to keep the site running and secure.</li>
          <li>Your choice of light or dark theme is saved in your own browser so the site remembers it. It is not sent to us.</li>
          <li>If you tap “Use my location” on the quotation map, your browser asks for permission first. Your location is only used to place the pin and only reaches us if you submit the form.</li>
        </ul>
        <p>This website does not use advertising or analytics cookies.</p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    body: (
      <>
        <p>We use the information you give us to:</p>
        <ul>
          <li>respond to your quotation request or message;</li>
          <li>arrange an ocular inspection, prepare a quotation and schedule service;</li>
          <li>send you a copy of the quotation request you submitted;</li>
          <li>understand how customers find DMSA, so we know where to share our services; and</li>
          <li>protect the website and its forms from spam and misuse.</li>
        </ul>
        <p>We do not sell your personal information, and we do not use it for unrelated marketing.</p>
      </>
    ),
  },
  {
    id: "how-its-handled",
    title: "How your details are handled",
    body: (
      <>
        <p>
          The website does not keep your form details in its own database. When you submit a form, your details are
          sent by email to DMSA, and a copy of a quotation request is emailed to you. These emails are kept in DMSA’s
          email account so our team can follow up.
        </p>
        <p>To do this, we rely on a few service providers:</p>
        <ul>
          <li><strong>Netlify</strong> hosts the website.</li>
          <li><strong>Resend</strong> delivers form submissions to DMSA by email.</li>
          <li><strong>Google (Gmail)</strong> holds DMSA’s mailbox and sends your copy of a quotation request.</li>
          <li><strong>CARTO</strong> and <strong>OpenStreetMap</strong> provide the map images. Your browser requests these directly, which shares your IP address with them.</li>
        </ul>
        <p>
          Some of these providers may process information outside the Philippines. We only share what is needed for
          them to provide their service.
        </p>
        <p>
          Locations shown in our gallery and on the treated-locations map are generalized. We do not publish customer
          names or exact addresses.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: (
      <p>
        We keep quotation requests and messages for as long as we need them to respond, provide and follow up on
        service, and keep reasonable business records, or for longer where the law requires it. After that, we delete
        them.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>Under the Data Privacy Act, you have the right to:</p>
        <ul>
          <li>be informed about how your personal information is used;</li>
          <li>access the personal information we hold about you;</li>
          <li>have inaccurate or incomplete information corrected;</li>
          <li>object to processing, or ask us to delete or block your information;</li>
          <li>receive a copy of your information in a commonly used format; and</li>
          <li>file a complaint with the <a href="https://privacy.gov.ph" rel="noopener noreferrer" target="_blank">National Privacy Commission</a>.</li>
        </ul>
        <p>To use any of these rights, contact us using the details below. We may ask you to confirm your identity first.</p>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        The website uses an encrypted (HTTPS) connection, and form submissions are checked on our server before they are
        sent. No method of sending or storing information is completely secure, but we take reasonable steps to protect
        your details. If you prefer, you can enter a general location instead of an exact address and confirm the
        details privately with our team.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        Our services are arranged with property owners, occupants and managers. The website is not meant for children,
        and we ask that anyone under 18 has a parent or guardian contact us instead.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy when our website or services change. The date at the top of this page shows when it
        was last updated.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <>
        <p>For questions about this policy or your personal information, contact DMSA:</p>
        <ul>
          <li>Email: <a href={`mailto:${email}`}>{email}</a></li>
          <li>Mobile: <a href={`tel:${siteConfig.phoneMobileHref}`}>{siteConfig.phoneMobile}</a></li>
          <li>Viber: <a href={`viber://chat?number=${encodeURIComponent(siteConfig.phoneViberHref)}`}>{siteConfig.phoneViber}</a></li>
        </ul>
        <p>You can also read our <Link href="/terms-of-service">Terms of Service</Link>.</p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="What DMSA collects when you request a quotation or send a message, and how it is used and protected."
      updated="November 19, 2026"
      path="/privacy-policy"
      sections={sections}
    />
  );
}
