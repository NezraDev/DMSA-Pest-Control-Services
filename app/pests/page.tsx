import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { JsonLd } from "@/components/site/json-ld";
import { FinalCta, PageHero } from "@/components/site/page-elements";
import { pests } from "@/data/pests-data";
import { pageMetadata, pageSchema } from "@/lib/seo";

const description = "Identify the pest before you treat it: anay and gamu-gamo, ipis, langgam, daga and langaw. Signs, risks, prevention and how DMSA treats each one.";

export const metadata: Metadata = pageMetadata({
  title: "Common Pests in Philippine Homes",
  description,
  path: "/pests",
});

const sentence = (text: string) => text.replace(/^./, (letter) => letter.toUpperCase());

export default function PestsPage() {
  return (
    <main id="main-content">
      <JsonLd data={pageSchema({ type: "CollectionPage", name: "Common pests in Philippine homes and businesses", description, path: "/pests", breadcrumbs: [{ name: "Home", path: "/" }, { name: "Pests", path: "/pests" }] })} />
      <PageHero
        title="Common pests in Philippine homes and businesses"
        description="Each pest behaves differently, so the right treatment starts with knowing what you are dealing with. Choose a pest to see the signs, the risks and what works."
      />
      <section className="section">
        <div className="site-container">
          <div className="area-grid guide-grid">
            {pests.map((pest) => (
              <article key={pest.slug}>
                <h2><Link href={`/pests/${pest.slug}`}>{pest.name} ({pest.localName})</Link></h2>
                <p>{pest.cardSummary}</p>
                <Link className="text-link" href={`/pests/${pest.slug}`} aria-label={`Read: ${sentence(pest.title)}`}>Signs and treatment <ArrowRight aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="site-container seo-copy">
          <h2>What you are seeing, and what it usually means</h2>
          <div className="article-table-wrap">
            <table className="article-table">
              <caption>Common signs and the pest they usually point to</caption>
              <thead><tr><th scope="col">What you find</th><th scope="col">Likely pest</th></tr></thead>
              <tbody>
                <tr><th scope="row">Mud tubes on walls, hollow-sounding wood, piles of wings</th><td><Link href="/pests/termites-anay">Termites (anay)</Link></td></tr>
                <tr><th scope="row">Swarms of winged insects around lights after rain</th><td><Link href="/pests/termites-anay">Gamu-gamo (winged termites)</Link> or flying ants</td></tr>
                <tr><th scope="row">Pepper-like droppings, egg cases, a musty smell in cabinets</th><td><Link href="/pests/cockroaches-ipis">Cockroaches (ipis)</Link></td></tr>
                <tr><th scope="row">Lines of tiny insects to food or water</th><td><Link href="/pests/ants-langgam">Ants (langgam)</Link></td></tr>
                <tr><th scope="row">Scratching in the ceiling at night, gnawed wires, droppings</th><td><Link href="/pests/rodents-daga">Rats or mice (daga)</Link></td></tr>
                <tr><th scope="row">Flies around bins and drains, maggots in waste</th><td><Link href="/pests/flies-langaw">Flies (langaw)</Link></td></tr>
              </tbody>
            </table>
          </div>
          <h2>Why identifying the pest comes first</h2>
          <p>
            Each pest needs a different approach. Termites are treated where they enter the building and in the wood they feed on, while cockroaches
            are treated where they hide and breed, and ants where their trail comes from. Spraying the insects you can see rarely solves the problem,
            and with termites it can make the activity harder to trace. That is why every DMSA job starts with a free ocular inspection.
          </p>
          <h2>Not sure which pest you have?</h2>
          <p>
            Take a clear photo and note where and when you see it. Termites and ants are easy to confuse, especially when they fly, so start with the guide to{" "}
            <Link href="/guides/anay-vs-ants-how-to-tell">telling anay from ants</Link>. If you are still unsure, <Link href="/request-quote">request a quotation</Link>,
            choose Unsure in the form and describe the signs. DMSA identifies the pest during the free ocular inspection.
          </p>
          <p>
            For treatment details, see <Link href="/services/termite-control">termite control</Link> and <Link href="/services/general-pest-control">general pest control</Link>,
            or read the <Link href="/guides">pest control guides</Link>.
          </p>
        </div>
      </section>
      <FinalCta />
    </main>
  );
}
