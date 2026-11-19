import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { JsonLd } from "@/components/site/json-ld";
import { FinalCta, PageHero } from "@/components/site/page-elements";
import { industries } from "@/data/industries-data";
import { pageMetadata, pageSchema } from "@/lib/seo";

const description = "Pest control and termite treatment for offices, shops, warehouses and construction sites, planned around operations, with a free ocular inspection.";

export const metadata: Metadata = pageMetadata({
  title: "Pest Control for Businesses by Industry",
  description,
  path: "/industries",
});

const sentence = (text: string) => text.replace(/^./, (letter) => letter.toUpperCase());

export default function IndustriesPage() {
  return (
    <main id="main-content">
      <JsonLd data={pageSchema({ type: "CollectionPage", name: "Pest control for businesses by industry", description, path: "/industries", breadcrumbs: [{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }] })} />
      <PageHero
        title="Pest control for businesses by industry"
        description="Each type of site has its own pest risks. DMSA reviews how your site operates before recommending a treatment, then leaves an action summary for your team."
      />
      <section className="section">
        <div className="site-container">
          <div className="area-grid guide-grid">
            {industries.map((industry) => (
              <article key={industry.slug}>
                <h2><Link href={`/industries/${industry.slug}`}>{sentence(industry.title)}</Link></h2>
                <p>{industry.cardSummary}</p>
                <Link className="text-link" href={`/industries/${industry.slug}`} aria-label={`Read: ${sentence(industry.title)}`}>How DMSA helps <ArrowRight aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="site-container seo-copy">
          <h2>What a commercial visit includes</h2>
          <ol>
            <li>A free ocular inspection of the site, including storage, waste, utility and staff areas.</li>
            <li>An operations review: opening hours, deliveries, restricted areas and building rules.</li>
            <li>A treatment plan with the areas, schedule and price confirmed before work begins.</li>
            <li>Service coordinated around your operations where possible.</li>
            <li>An action summary with practical steps on stock rotation, cleaning routines and closing access points.</li>
          </ol>
          <h2>Pests businesses deal with most</h2>
          <p>
            <Link href="/pests/cockroaches-ipis">Cockroaches</Link> and <Link href="/pests/rodents-daga">rodents</Link> are the most common
            problems around food, stock and garbage areas. <Link href="/pests/flies-langaw">Flies</Link> follow waste, <Link href="/pests/ants-langgam">ants</Link>{" "}
            follow food and water, and <Link href="/pests/termites-anay">termites</Link> threaten wooden fixtures, pallets and the building itself.
          </p>
          <h2>Business not listed here?</h2>
          <p>
            Request a quotation anyway. Commercial pest control from DMSA covers offices, retail spaces, warehouses, construction sites and other
            commercial properties. Describe the site and where you see pests, and DMSA reviews it during the free ocular inspection.
          </p>
          <h2>Commercial pest control with DMSA</h2>
          <p>
            Every commercial job starts with a free ocular inspection and an operations review, so treatment can be coordinated around your opening hours,
            deliveries and staff. Read more about <Link href="/services/commercial-pest-control">commercial pest control</Link>, see the{" "}
            <Link href="/pests">pests DMSA treats</Link>, or <Link href="/request-quote">request a quotation</Link>.
          </p>
        </div>
      </section>
      <FinalCta />
    </main>
  );
}
