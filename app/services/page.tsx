import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleAlert, ClipboardList, Lightbulb, SearchCheck } from "lucide-react";

import { Checklist, FinalCta, PageHero } from "@/components/site/page-elements";
import { Button } from "@/components/ui/button";
import { pageHeroes } from "@/data/page-content-data";
import { services } from "@/data/services-data";
import { iconMap } from "@/lib/icon-map";
import { JsonLd } from "@/components/site/json-ld";
import { pageMetadata, pageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Pest & Termite Control Services",
  description: "General pest control, termite (anay) treatment, and residential and commercial pest control across Luzon, with a free ocular inspection.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main id="main-content">
      <JsonLd data={pageSchema({ type: "CollectionPage", name: pageHeroes.services.title, description: pageHeroes.services.description, path: "/services", breadcrumbs: [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }] })} />
      <PageHero {...pageHeroes.services} actions={<Button asChild size="lg"><Link href="/request-quote">Request a quotation <ArrowRight aria-hidden="true" /></Link></Button>} />
      <section className="section service-details-section">
        <div className="site-container service-detail-list">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <article id={service.slug} key={service.slug} className="service-detail">
                <div className="service-detail-intro">
                  <span className="service-index">0{index + 1}</span>
                  <span className="service-icon large"><Icon aria-hidden="true" /></span>
                  <h2><Link href={`/services/${service.slug}`}>{service.title}</Link></h2>
                  <p>{service.description}</p>
                  <p className="service-detail-tag">{service.eyebrow}</p>
                  <p><Link className="text-link" href={`/services/${service.slug}`}>More about {service.shortTitle.toLowerCase()} <ArrowRight aria-hidden="true" /></Link></p>
                  <Button asChild><Link href={`/request-quote#service=${encodeURIComponent(service.quoteService)}`}>Request quotation <ArrowRight aria-hidden="true" /></Link></Button>
                </div>
                <div className="service-detail-columns">
                  <div><h3><CircleAlert aria-hidden="true" />Signs to mention</h3><Checklist items={service.signs} /></div>
                  <div><h3><ClipboardList aria-hidden="true" />Typical process</h3><ol className="numbered-list">{service.process.map((step, stepIndex) => <li key={step}><span>{stepIndex + 1}</span>{step}</li>)}</ol></div>
                  <div><h3><Lightbulb aria-hidden="true" />Prevention basics</h3><Checklist items={service.prevention} /></div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <section className="safety-note-section">
        <div className="site-container safety-note"><SearchCheck aria-hidden="true" /><div><h2>We inspect first, then recommend.</h2><p>The products, the method, access and prep all depend on the pest and what we find on site. DMSA confirms these with you directly. This website does not give chemical advice.</p></div><CheckCircle2 aria-hidden="true" /></div>
      </section>
      <FinalCta />
    </main>
  );
}
