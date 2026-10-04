import type { Metadata } from "next";
import { Clock3, LockKeyhole, MapPin, MessageCircle, Phone, SearchCheck } from "lucide-react";

import { QuoteForm } from "@/components/forms/quote-form";
import { PageHero } from "@/components/site/page-elements";
import { formOptions } from "@/data/form-options-data";
import { pageHeroes } from "@/data/page-content-data";
import { siteConfig } from "@/data/site-data";

export const metadata: Metadata = {
  title: "Request a Quotation",
  description: "Request a DMSA pest control quotation with a free ocular inspection, property details, location pin and preferred date.",
  alternates: { canonical: "/request-quote" },
};

export default async function RequestQuotePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const requestedService = typeof params.service === "string" && formOptions.service.includes(params.service)
    ? params.service
    : "Unsure";

  return (
    <main id="main-content">
      <PageHero {...pageHeroes.request} />
      <section className="section quote-page-section">
        <div className="site-container quote-layout">
          <div><QuoteForm initialService={requestedService} /></div>
          <aside className="quote-sidebar">
            <div className="side-card"><p className="side-label">Direct contact</p><h2>Prefer to talk?</h2><a href={`tel:${siteConfig.phoneMobileHref}`}><Phone aria-hidden="true" /><span><small>Call</small>{siteConfig.phoneMobile}</span></a><a href={`viber://chat?number=${encodeURIComponent(siteConfig.phoneViberHref)}`}><MessageCircle aria-hidden="true" /><span><small>Viber</small>{siteConfig.phoneViber}</span></a></div>
            <div className="side-card subdued"><h2>Before you submit</h2><ul><li><SearchCheck aria-hidden="true" />A free ocular inspection is included in the quotation process and may be arranged during follow-up.</li><li><MapPin aria-hidden="true" />Use a general location if you prefer; exact details can be confirmed privately.</li><li><Clock3 aria-hidden="true" />A preferred date is a request, subject to confirmation.</li><li><LockKeyhole aria-hidden="true" />Form details are emailed to DMSA and not stored by this site.</li></ul></div>
          </aside>
        </div>
      </section>
    </main>
  );
}
