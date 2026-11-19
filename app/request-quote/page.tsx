import type { Metadata } from "next";
import Link from "next/link";
import { Clock3, LockKeyhole, MapPin, MessageCircle, Phone, SearchCheck } from "lucide-react";

import { QuoteForm } from "@/components/forms/quote-form";
import { PageHero } from "@/components/site/page-elements";
import { pageHeroes } from "@/data/page-content-data";
import { siteConfig } from "@/data/site-data";
import { services } from "@/data/services-data";
import { launchedProvinces } from "@/data/locations/provinces";
import { JsonLd } from "@/components/site/json-ld";
import { pageMetadata, pageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Request a Pest Control Quotation",
  description: "Request a pest control or termite treatment quotation from DMSA, with a free ocular inspection included. Pin your property and share your concern.",
  path: "/request-quote",
});

// The service is preselected in the browser from #service=... (see QuoteForm), so this page
// stays a single static URL with no query-string duplicates.
export default function RequestQuotePage() {

  return (
    <main id="main-content">
      <JsonLd data={pageSchema({ name: pageHeroes.request.title, description: pageHeroes.request.description, path: "/request-quote", breadcrumbs: [{ name: "Home", path: "/" }, { name: "Request a quotation", path: "/request-quote" }] })} />
      <PageHero {...pageHeroes.request} />
      <section className="section quote-page-section">
        <div className="site-container quote-layout">
          <div><QuoteForm /></div>
          <aside className="quote-sidebar">
            <div className="side-card"><p className="side-label">Direct contact</p><h2>Prefer to talk?</h2><a href={`tel:${siteConfig.phoneMobileHref}`}><Phone aria-hidden="true" /><span><small>Call</small>{siteConfig.phoneMobile}</span></a><a href={`viber://chat?number=${encodeURIComponent(siteConfig.phoneViberHref)}`}><MessageCircle aria-hidden="true" /><span><small>Viber</small>{siteConfig.phoneViber}</span></a></div>
            <div className="side-card subdued"><h2>Before you submit</h2><ul><li><SearchCheck aria-hidden="true" />A free ocular inspection is included in the quotation process and may be arranged during follow-up.</li><li><MapPin aria-hidden="true" />Use a general location if you prefer; exact details can be confirmed privately.</li><li><Clock3 aria-hidden="true" />A preferred date is a request, subject to confirmation.</li><li><LockKeyhole aria-hidden="true" />Form details are emailed to DMSA and not stored by this site.</li></ul></div>
          </aside>
        </div>
      </section>
      <section className="section">
        <div className="site-container seo-copy">
          <h2>What happens after you send your request</h2>
          <ol>
            <li>Your request is emailed to DMSA, which reviews the pest concern, the property and the location.</li>
            <li>DMSA contacts you by your preferred method (call, SMS, Viber or email) to confirm the details.</li>
            <li>The free ocular inspection is arranged at the property.</li>
            <li>You receive a recommendation with the treatment, the areas covered, the schedule and the price.</li>
            <li>The treatment goes ahead only after you confirm.</li>
          </ol>
          <h2>What you can request a quotation for</h2>
          <ul>
            {services.map((service) => <li key={service.slug}><Link href={`/services/${service.slug}`}>{service.title}</Link>: {service.description}</li>)}
          </ul>
          <p>
            Not sure what the pest is? Choose Unsure in the form, or compare the signs on the <Link href="/pests">pests we treat</Link> page first.
            Businesses can read about <Link href="/industries">pest control by industry</Link>.
          </p>
          <h2>Where DMSA works</h2>
          <p>
            DMSA serves Laguna, Batangas, Cavite, Rizal, Quezon, Metro Manila and the Bicol Region from its main office in San Fernando, Camarines Sur,
            and its branch in Los Baños, Laguna. See your province:{" "}
            {launchedProvinces.map((province, index) => (
              <span key={province.slug}>{index > 0 ? ", " : null}<Link href={`/pest-control/${province.slug}`}>{province.name}</Link></span>
            ))}, or browse <Link href="/service-areas">every city and municipality</Link>.
          </p>
          <h2>Questions before you request?</h2>
          <p>
            Read <Link href="/pest-control-price">what affects the price</Link>, <Link href="/termite-inspection">what the free termite inspection covers</Link>{" "}
            and the <Link href="/faq">frequently asked questions</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
