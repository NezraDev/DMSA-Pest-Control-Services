import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleAlert, ClipboardList, Lightbulb, SearchCheck } from "lucide-react";

import { Checklist, FinalCta, PageHero } from "@/components/site/page-elements";
import { Button } from "@/components/ui/button";
import { pageHeroes } from "@/data/page-content-data";
import { services } from "@/data/services-data";
import { iconMap } from "@/lib/icon-map";

export const metadata: Metadata = {
  title: "Pest Control Services",
  description: "Explore DMSA general pest, termite, residential and commercial pest control services.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main id="main-content">
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
                  <p className="eyebrow"><span aria-hidden="true" />{service.eyebrow}</p>
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                  <Button asChild><Link href={`/request-quote?service=${encodeURIComponent(service.title)}`}>Request quotation <ArrowRight aria-hidden="true" /></Link></Button>
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
        <div className="site-container safety-note"><SearchCheck aria-hidden="true" /><div><h2>Inspection comes before a specific recommendation.</h2><p>Product selection, application method, access needs and preparation depend on the pest, property and site findings. DMSA confirms these details directly; this website does not prescribe chemical treatments.</p></div><CheckCircle2 aria-hidden="true" /></div>
      </section>
      <FinalCta />
    </main>
  );
}
