import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ArticleLayout } from "@/components/site/article-sections";
import { FaqSection } from "@/components/site/faq-section";
import { JsonLd } from "@/components/site/json-ld";
import { FinalCta } from "@/components/site/page-elements";
import { TrustFacts } from "@/components/site/trust-facts";
import { Button } from "@/components/ui/button";
import { priceRanges } from "@/data/site-data";
import type { Faq, GuideSection } from "@/lib/content-types";
import { pageMetadata, pageSchema } from "@/lib/seo";

const path = "/pest-control-price";
const title = "Pest control price in the Philippines: what affects the cost";
const description = "What decides the price of pest control and termite treatment: pest, property size, method, construction stage and distance. Free inspection and quotation.";

export const metadata: Metadata = pageMetadata({ title: "Pest Control Price: What Affects Cost", description, path });

const sections: GuideSection[] = [
  {
    id: "how-pricing-works",
    heading: "How DMSA prices a job",
    paragraphs: [
      "Every property is different, so DMSA prices each job after seeing it. You request a quotation, DMSA arranges the free ocular inspection, and then you receive a recommendation with the treatment, the areas covered, the schedule and the price. Nothing is charged for the inspection, and you decide whether to go ahead after you have seen the quotation.",
      "This is also why an online form or a phone call can't give a final price: the visible signs rarely show how far a pest problem has spread.",
    ],
  },
  {
    id: "cost-factors",
    heading: "What affects the price",
    table: {
      caption: "The main factors in a pest control or termite treatment quotation",
      head: ["Factor", "Why it changes the price"],
      rows: [
        ["Type of pest", "Termites, cockroaches, ants, rodents and flies need different methods, materials and time."],
        ["Size of the area", "A condo unit, a two-storey house and a warehouse need very different amounts of work."],
        ["How far the problem has spread", "A contained problem in one room is simpler than activity across ceilings, walls and several rooms."],
        ["Treatment method", "Chemical injection, wood treatment, soil poisoning and colony-focused systems involve different work."],
        ["Construction stage", "Soil treatment before the slab is poured is applied directly; finished buildings need drilled injection points."],
        ["Access", "Tiled floors, built-in cabinets, high ceilings and crowded storerooms take longer to reach."],
        ["One-time or scheduled service", "Some sites, such as food businesses, benefit from regular checks rather than a single visit."],
        ["Cleanup and follow-up", "Removing infested soil and debris, and any follow-up visits, add to the work."],
        ["Location", "Distance from DMSA's San Fernando main office or Los Baños branch affects scheduling."],
      ],
    },
  },
  {
    id: "termite-costs",
    heading: "Termite treatment costs",
    paragraphs: [
      "Termite work is usually the largest job, because termites spread out of sight and treatment has to reach where they enter. The cost depends on the size of the structure, how much wood is affected, whether soil can be treated directly, and whether infested soil and debris need to be removed.",
      "For a detailed breakdown and tips on keeping the cost down, read the guide on what affects the cost of termite treatment.",
    ],
  },
  {
    id: "general-pest-costs",
    heading: "General pest control costs",
    paragraphs: [
      "For cockroaches, ants, flies and rodents, the price depends on the size of the property, how many areas are affected, where the pests are hiding and whether follow-up checks are advised. Commercial sites, such as offices, shops and warehouses, are reviewed together with how the site operates, so the visit can be coordinated around working hours.",
    ],
  },
  {
    id: "keeping-costs-down",
    heading: "How to keep the cost down",
    list: [
      "Act early: small, contained problems are simpler and cheaper to treat.",
      "Plan soil treatment during construction, while the ground is still open.",
      "Fix leaks and damp areas, and keep wood and boxes off the floor.",
      "Store food and garbage properly, and seal gaps around pipes and doors.",
      "Follow the prevention and monitoring advice you are given after treatment.",
    ],
  },
  {
    id: "comparing-quotations",
    heading: "What to ask when comparing quotations",
    list: [
      "Which pest was identified, and what method will be used?",
      "Which areas will be treated, and which won't?",
      "Is removal of infested soil or debris included?",
      "Is a follow-up visit included or advised?",
      "What do you need to prepare before the visit, and when can people and pets return?",
    ],
  },
  {
    id: "when-to-call",
    heading: "Get a price for your property",
    paragraphs: [
      "Request a quotation online, call or message DMSA on Viber. Share the pest, the property type and a pin on the map. The ocular inspection is free and included, and the price is confirmed before any work begins.",
    ],
  },
];

const faqs: Faq[] = [
  { question: "How much does pest control cost in the Philippines?", answer: "It depends on the pest, the size of the property, how far the problem has spread and the treatment method. DMSA confirms the price after a free ocular inspection, before any work begins." },
  { question: "Is the inspection free?", answer: "Yes. The ocular inspection is free and included in DMSA's quotation process." },
  { question: "Why can't you give a price over the phone?", answer: "Pests, especially termites, spread out of sight. The inspection shows the extent of the problem and the right method, so the quotation reflects the actual work." },
  { question: "Do I have to go ahead after the inspection?", answer: "No. You receive the recommended treatment, schedule and price, and decide whether to proceed." },
  { question: "Is termite treatment more expensive than general pest control?", answer: "Termite treatment is often more involved because it has to reach where termites enter, such as soil, walls and floors. The quotation explains the method and the areas covered." },
];

export default function PricePage() {
  return (
    <main id="main-content">
      <JsonLd data={pageSchema({ name: title, description, path, breadcrumbs: [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Pest control price", path }] })} />
      <section className="page-hero">
        <div className="site-container page-hero-inner">
          <h1>{title.replace(/^./, (letter) => letter.toUpperCase())}</h1>
          <p>The price of pest control depends on the pest, the property and the treatment needed. Here is what DMSA looks at, and how to get an accurate quotation with a free inspection.</p>
          <div className="hero-actions">
            <Button asChild size="lg"><Link href="/request-quote">Get a free quotation <ArrowRight aria-hidden="true" /></Link></Button>
          </div>
        </div>
      </section>

      <ArticleLayout
        sections={sections}
        quickAnswer="There is no single price for pest control. The cost depends on the pest, the size of the area, how far the problem has spread, the treatment method, the construction stage and access. DMSA confirms the price after a free ocular inspection, before any work begins."
        renderAfter={(section) => {
          if (section.id === "how-pricing-works" && priceRanges.length > 0) {
            return (
              <div className="article-table-wrap">
                <table className="article-table">
                  <caption>Starting prices. The final price is confirmed after the inspection.</caption>
                  <thead><tr><th scope="col">Service</th><th scope="col">Starting price</th></tr></thead>
                  <tbody>{priceRanges.map((item) => <tr key={item.service}><th scope="row">{item.service}</th><td>{item.range}{item.note ? ` (${item.note})` : ""}</td></tr>)}</tbody>
                </table>
              </div>
            );
          }
          if (section.id === "termite-costs") return <p><Link href="/guides/what-affects-termite-treatment-cost">What affects the cost of termite treatment</Link> · <Link href="/termite-inspection">What the termite inspection covers</Link></p>;
          if (section.id === "general-pest-costs") return <p><Link href="/services/general-pest-control">General pest control</Link> · <Link href="/industries">Pest control by industry</Link></p>;
          if (section.id === "when-to-call") return <div className="guide-actions"><Button asChild><Link href="/request-quote">Request a quotation <ArrowRight aria-hidden="true" /></Link></Button><Link className="text-link" href="/service-areas">Check your area <ArrowRight aria-hidden="true" /></Link></div>;
          return null;
        }}
      />
      <TrustFacts />
      <FaqSection title="Pest control price: common questions" faqs={faqs} path={path} />
      <FinalCta />
    </main>
  );
}
