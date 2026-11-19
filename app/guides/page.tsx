import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { JsonLd } from "@/components/site/json-ld";
import { FinalCta, PageHero } from "@/components/site/page-elements";
import { guides } from "@/data/guides-data";
import { pageMetadata, pageSchema } from "@/lib/seo";

const description = "Plain-language pest control guides for Filipino homes and businesses: signs of anay, soil poisoning, telling termites from ants, preparation and costs.";

export const metadata: Metadata = pageMetadata({
  title: "Pest Control and Anay Guides",
  description,
  path: "/guides",
});

const sentence = (text: string) => text.replace(/^./, (letter) => letter.toUpperCase());

export default function GuidesPage() {
  return (
    <main id="main-content">
      <JsonLd data={pageSchema({ type: "CollectionPage", name: "Pest control and termite (anay) guides", description, path: "/guides", breadcrumbs: [{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }] })} />
      <PageHero
        title="Pest control and termite (anay) guides"
        description="Straight answers to the questions DMSA hears most, from spotting termites to preparing your home for treatment."
      />
      <section className="section">
        <div className="site-container">
          <div className="area-grid guide-grid">
            {guides.map((guide) => (
              <article key={guide.slug}>
                <h2><Link href={`/guides/${guide.slug}`}>{sentence(guide.title)}</Link></h2>
                <p>{guide.cardSummary}</p>
                <Link className="text-link" href={`/guides/${guide.slug}`} aria-label={`Read: ${sentence(guide.title)}`}>Read guide <ArrowRight aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="site-container seo-copy">
          <h2>Need help with pests now?</h2>
          <p>
            Guides can help you spot a problem, but an inspection shows what is really going on. <Link href="/request-quote">Request a quotation</Link>{" "}
            and DMSA arranges a free ocular inspection, or read the <Link href="/faq">frequently asked questions</Link>.
          </p>
        </div>
      </section>
      <FinalCta />
    </main>
  );
}
