import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock3, Mail, MapPin, MessageCircle, Phone, SearchCheck } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { MapCanvas } from "@/components/maps/map-canvas";
import { PageHero } from "@/components/site/page-elements";
import { Button } from "@/components/ui/button";
import { pageHeroes } from "@/data/page-content-data";
import { siteConfig } from "@/data/site-data";

export const metadata: Metadata = {
  title: "Contact DMSA",
  description: "Contact DMSA in San Fernando, Camarines Sur by phone, Viber or secure website message.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero {...pageHeroes.contact} />
      <section className="section contact-page-section">
        <div className="site-container contact-layout">
          <div className="contact-info">
            <h2>Contact information</h2>
            <p>Based in San Fernando and serving properties across the Bicol Region, Cavite, Laguna, Batangas, Rizal, Quezon and Metro Manila.</p>
            <div className="inspection-callout"><SearchCheck aria-hidden="true" /><div><strong>Free ocular inspection included</strong><span>It is part of the quotation process and may be arranged during follow-up.</span></div><Button asChild size="sm"><Link href="/request-quote">Request quotation <ArrowRight aria-hidden="true" /></Link></Button></div>
            <div className="contact-methods">
              <a href={`tel:${siteConfig.phoneMobileHref}`}><Phone aria-hidden="true" /><span><small>Mobile</small><strong>{siteConfig.phoneMobile}</strong></span></a>
              <a href={`viber://chat?number=${encodeURIComponent(siteConfig.phoneViberHref)}`}><MessageCircle aria-hidden="true" /><span><small>Viber</small><strong>{siteConfig.phoneViber}</strong></span></a>
              <div><Clock3 aria-hidden="true" /><span><small>Operating hours</small><strong>{siteConfig.hours}</strong></span></div>
              <div><MapPin aria-hidden="true" /><span><small>Headquarters</small><strong>{siteConfig.address}</strong></span></div>
              {siteConfig.publicEmail ? <a href={`mailto:${siteConfig.publicEmail}`}><Mail aria-hidden="true" /><span><small>Email</small><strong>{siteConfig.publicEmail}</strong></span></a> : null}
            </div>
            <MapCanvas mode="hq" coordinates={siteConfig.hqCoordinates} className="contact-map" />
            <p className="map-caption">Headquarters pin is approximate. Contact DMSA for visit directions.</p>
          </div>
          <div className="contact-form-card"><p className="form-kicker">Secure email form</p><h2>Send a message</h2><p>Your message is sent to DMSA through the website’s server-side email service. A success notice appears only after delivery is accepted.</p><ContactForm /></div>
        </div>
      </section>
    </main>
  );
}
