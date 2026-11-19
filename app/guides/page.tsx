import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { JsonLd } from "@/components/site/json-ld";
import { FinalCta, PageHero, SectionHeading } from "@/components/site/page-elements";
import { guides } from "@/data/guides-data";
import { pests } from "@/data/pests-data";
import { pageMetadata, pageSchema } from "@/lib/seo";

const description = "Plain-language pest control guides for Filipino homes and businesses: signs of anay, soil poisoning, telling termites from ants, preparation and costs.";

export const metadata: Metadata = pageMetadata({
  title: "Pest Control and Anay Guides",
  description,
  path: "/guides",
});

const sentence = (text: string) => text.replace(/^./, (letter) => letter.toUpperCase());

const groups = [
  {
    id: "termites",
    title: "Termite (anay) guides",
    intro: "Termites do their damage out of sight, so most questions are about spotting them early, telling them apart from ants, protecting a new build and what treatment costs. Start with the signs, then read about the inspection and soil treatment.",
    match: (service: string) => service === "termite-control",
    pest: "termites-anay",
  },
  {
    id: "prevention",
    title: "Prevention and preparation guides",
    intro: "Cockroaches, ants, flies and rodents come in for food, water and shelter. These guides cover the everyday habits that keep them out, and how to get your home or business ready when a treatment is booked.",
    match: (service: string) => service !== "termite-control",
    pest: "cockroaches-ipis",
  },
];

export default function GuidesPage() {
  return (
    <main id="main-content">
      <JsonLd data={pageSchema({ type: "CollectionPage", name: "Pest control and termite (anay) guides", description, path: "/guides", breadcrumbs: [{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }] })} />
      <PageHero
        title="Pest control and termite (anay) guides"
        description="Straight answers to the questions DMSA hears most, from spotting termites to preparing your home for treatment. Each guide starts with a quick answer."
      />
      {groups.map((group) => {
        const pest = pests.find((item) => item.slug === group.pest);
        return (
          <section key={group.id} id={group.id} className="section town-directory">
            <div className="site-container">
              <SectionHeading title={group.title} description={group.intro} />
              <div className="area-grid guide-grid">
                {guides.filter((guide) => group.match(guide.relatedService)).map((guide) => (
                  <article key={guide.slug}>
                    <h3><Link href={`/guides/${guide.slug}`}>{sentence(guide.title)}</Link></h3>
                    <p>{guide.cardSummary}</p>
                    <Link className="text-link" href={`/guides/${guide.slug}`} aria-label={`Read: ${sentence(guide.title)}`}>Read guide <ArrowRight aria-hidden="true" /></Link>
                  </article>
                ))}
              </div>
              {pest ? <p className="guide-group-link"><Link className="text-link" href={`/pests/${pest.slug}`}>{pest.name} ({pest.localName}): signs, types and treatment <ArrowRight aria-hidden="true" /></Link></p> : null}
            </div>
          </section>
        );
      })}
      <section className="section">
        <div className="site-container seo-copy">
          <h2>Need help with pests now?</h2>
          <p>
            Guides can help you spot a problem, but an inspection shows what is really going on. <Link href="/request-quote">Request a quotation</Link>{" "}
            and DMSA arranges a free ocular inspection. You can also read the <Link href="/faq">frequently asked questions</Link>, see{" "}
            <Link href="/pest-control-price">what affects the price</Link> or <Link href="/service-areas">find your town</Link>.
          </p>
        </div>
      </section>
      <FinalCta />
    </main>
  );
}
