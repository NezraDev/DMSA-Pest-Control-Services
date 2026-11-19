import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock3, Mail, MapPin, MessageCircle, Phone, SearchCheck } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { MapCanvas } from "@/components/maps/map-canvas";
import { PageHero } from "@/components/site/page-elements";
import { SocialLinks } from "@/components/site/social-links";
import { Button } from "@/components/ui/button";
import { pageHeroes } from "@/data/page-content-data";
import { siteConfig } from "@/data/site-data";
import { officeTowns, provinces } from "@/data/locations/provinces";

const servedBy = (office: "main" | "branch") => provinces.filter((province) => province.servedFrom === office).map((province) => province.name).join(", ").replace(/, ([^,]*)$/, " and $1");
import { JsonLd } from "@/components/site/json-ld";
import { pageMetadata, pageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact DMSA",
  description: "Contact DMSA Pest Control in San Fernando, Camarines Sur or Los Baños, Laguna. Call 0955 562 9226 or Viber 0918 299 5218. Open daily, 8 AM to 5 PM.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main id="main-content">
      <JsonLd data={pageSchema({ type: "ContactPage", name: pageHeroes.contact.title, description: pageHeroes.contact.description, path: "/contact", breadcrumbs: [{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }] })} />
      <PageHero {...pageHeroes.contact} />
      <section className="section contact-page-section">
        <div className="site-container contact-layout">
          <div className="contact-info">
            <h2>Contact information</h2>
            <p>Based in San Fernando, Camarines Sur, with a branch in Los Baños, Laguna, and serving properties across the Bicol Region, Cavite, Laguna, Batangas, Rizal, Quezon and Metro Manila. <Link href="/service-areas">See service areas</Link>.</p>
            <div className="inspection-callout"><SearchCheck aria-hidden="true" /><div><strong>Free ocular inspection included</strong><span>It is part of the quotation process and may be arranged during follow-up.</span></div><Button asChild size="sm"><Link href="/request-quote">Request quotation <ArrowRight aria-hidden="true" /></Link></Button></div>
            <div className="contact-methods">
              <a href={`tel:${siteConfig.phoneMobileHref}`}><Phone aria-hidden="true" /><span><small>Mobile</small><strong>{siteConfig.phoneMobile}</strong></span></a>
              <a href={`viber://chat?number=${encodeURIComponent(siteConfig.phoneViberHref)}`}><MessageCircle aria-hidden="true" /><span><small>Viber</small><strong>{siteConfig.phoneViber}</strong></span></a>
              <div><Clock3 aria-hidden="true" /><span><small>Operating hours</small><strong>{siteConfig.hours}</strong></span></div>
              <div><MapPin aria-hidden="true" /><span><small>Main office</small><strong>{siteConfig.address}</strong></span></div>
              <div><MapPin aria-hidden="true" /><span><small>Los Baños branch</small><strong>{siteConfig.additionalLocation}</strong></span></div>
              {siteConfig.publicEmail ? <a href={`mailto:${siteConfig.publicEmail}`}><Mail aria-hidden="true" /><span><small>Email</small><strong>{siteConfig.publicEmail}</strong></span></a> : null}
            </div>
            <div className="contact-social"><p>Follow DMSA on Facebook, Instagram and TikTok</p><SocialLinks /></div>
            <MapCanvas mode="hq" coordinates={siteConfig.hqCoordinates} className="contact-map" />
            <p className="map-caption">Main office pin is approximate. Contact DMSA for visit directions.</p>
          </div>
          <div className="contact-form-card"><p className="form-kicker">Secure email form</p><h2>Send a message</h2><p>Your message is sent to DMSA through the website’s server-side email service. A success notice appears only after delivery is accepted.</p><ContactForm /></div>
        </div>
      </section>
      <section className="section">
        <div className="site-container seo-copy">
          <h2>Which DMSA office covers your area?</h2>
          <ul>
            <li><strong>Main office, San Fernando, Camarines Sur:</strong> {siteConfig.address}. Covers {servedBy("main")}.</li>
            <li><strong>Branch, Los Baños, Laguna:</strong> {siteConfig.additionalLocation}. Covers {servedBy("branch")}.</li>
          </ul>
          <p>
            Both locations are open {siteConfig.hours}. Use the same phone numbers for either office:{" "}
            <a href={`tel:${siteConfig.phoneMobileHref}`}>{siteConfig.phoneMobile}</a> or{" "}
            <a href={`viber://chat?number=${encodeURIComponent(siteConfig.phoneViberHref)}`}>{siteConfig.phoneViber}</a> on Viber.
          </p>
          <h2>Call, message or request a quotation?</h2>
          <ul>
            <li><strong>Request a quotation</strong> when you want a property checked. The form collects the pest, property type and a map pin, and the free ocular inspection is part of the process. <Link href="/request-quote">Start a request</Link>.</li>
            <li><strong>Call or message on Viber</strong> for quick questions or to follow up on a request.</li>
            <li><strong>Send a message</strong> with the form above for anything else, such as partnerships or general questions.</li>
          </ul>
          <h2>Find your area and learn more</h2>
          <p>
            {officeTowns.map((town, index) => (
              <span key={town.path}>{index > 0 ? " · " : null}<Link href={town.path}>Pest control in {town.name}</Link></span>
            ))}{" · "}<Link href="/service-areas">All service areas</Link> · <Link href="/pests">Pests we treat</Link> · <Link href="/faq">FAQ</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
