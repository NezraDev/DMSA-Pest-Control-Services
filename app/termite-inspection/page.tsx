import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ArticleLayout } from "@/components/site/article-sections";
import { FaqSection } from "@/components/site/faq-section";
import { JsonLd } from "@/components/site/json-ld";
import { FinalCta } from "@/components/site/page-elements";
import { TrustFacts } from "@/components/site/trust-facts";
import { Button } from "@/components/ui/button";
import type { Faq, GuideSection } from "@/lib/content-types";
import { pageMetadata, pageSchema, serviceSchema } from "@/lib/seo";
import { siteConfig } from "@/data/site-data";

const path = "/termite-inspection";
const title = "Free termite (anay) inspection: what it covers";
const description = "What DMSA checks during the free termite (anay) ocular inspection, how to prepare, and what you receive after: the method, areas, schedule and price.";

export const metadata: Metadata = pageMetadata({ title: "Free Termite (Anay) Inspection", description, path });

const sections: GuideSection[] = [
  {
    id: "what-it-is",
    heading: "What the termite inspection is",
    paragraphs: [
      "The ocular inspection is a visit by DMSA to look at your property before recommending a treatment. It is free and included in the quotation process, for homes, commercial buildings and construction sites. Its purpose is to find out whether termites are active, where they are getting in, how far the activity has spread and which treatment suits the building.",
    ],
  },
  {
    id: "what-dmsa-checks",
    heading: "What DMSA checks",
    list: [
      "Mud tubes on walls, posts, foundations and inside cabinets.",
      "Damaged or hollow-sounding wood in door and window frames, cabinets, stairs, ceilings and floors.",
      "Discarded wings, gamu-gamo swarms and droppings that point to drywood termites.",
      "Likely entry points, such as cracks in floors and walls, expansion joints and the gaps around pipes.",
      "Places where wood touches soil, and damp areas from leaks or poor drainage.",
      "For construction sites, the construction stage and the area under and around the planned slab.",
    ],
  },
  {
    id: "how-to-prepare",
    heading: "How to prepare",
    list: [
      "Don't scrape off mud tubes or spray insecticide on termites before the visit. Disturbing them makes the activity harder to trace.",
      "Note where you have seen mud tubes, damaged wood or swarming insects, and take photos.",
      "Clear items away from affected walls, cabinets and wooden structures.",
      "For a building under construction, share the schedule and the slab-pouring date.",
      "Make sure someone can give access to all rooms, the ceiling where possible, and the outside of the building.",
    ],
  },
  {
    id: "what-you-receive",
    heading: "What you receive after the inspection",
    paragraphs: [
      "After the inspection, DMSA recommends a treatment and confirms the scope, schedule and price before any work begins. Depending on what was found, the recommendation can include chemical injection in affected areas, treatment of affected wood, soil poisoning, colony-focused systems and removal of termite-infested soil and debris.",
      "You decide whether to go ahead. If you do, DMSA explains how to prepare for the treatment day and, afterwards, gives monitoring advice so new signs can be caught early.",
    ],
  },
  {
    id: "when-to-book",
    heading: "When to book an inspection",
    list: [
      "You found mud tubes, damaged wood, pellets or piles of wings.",
      "Gamu-gamo swarm from inside a wall, cabinet or frame.",
      "You are buying, renting or renovating an older house.",
      "You are about to build and need soil treatment before the slab is poured.",
      "A neighbouring house or unit has had termites.",
    ],
  },
  {
    id: "when-to-call",
    heading: "Book your free inspection",
    paragraphs: [
      `Request a quotation online and choose Termite Control, call ${siteConfig.phoneMobile} or message ${siteConfig.phoneViber} on Viber. Share your barangay and a pin on the map, and DMSA arranges the inspection.`,
    ],
  },
];

const faqs: Faq[] = [
  { question: "Is the termite inspection really free?", answer: "Yes. The ocular inspection is free and included in DMSA's quotation process." },
  { question: "Do I have to book treatment after the inspection?", answer: "No. DMSA recommends a treatment and confirms the scope, schedule and price, and you decide whether to go ahead." },
  { question: "Can other pests be checked during the same visit?", answer: "Mention any other pests you have seen, such as cockroaches or rats, when you request a quotation, so DMSA can plan the visit and include them in the recommendation." },
  { question: "Should I spray the termites before the inspection?", answer: "No. Spraying or breaking mud tubes makes the activity harder to trace. Leave it undisturbed and take photos instead." },
  { question: "Do you inspect construction sites?", answer: "Yes. For new builds, DMSA reviews the site and construction stage so soil treatment can be timed before the slab is poured." },
];

export default function TermiteInspectionPage() {
  return (
    <main id="main-content">
      <JsonLd data={pageSchema({ name: title, description, path, breadcrumbs: [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Termite control", path: "/services/termite-control" }, { name: "Termite inspection", path }] })} />
      <JsonLd data={serviceSchema({ name: "Termite inspection", description, path, areaServed: siteConfig.serviceAreas })} />
      <section className="page-hero">
        <div className="site-container page-hero-inner">
          <h1>{title.replace(/^./, (letter) => letter.toUpperCase())}</h1>
          <p>Before any termite treatment, DMSA inspects the property to find where termites are active and how they are getting in. The inspection is free and included in every quotation.</p>
          <div className="hero-actions">
            <Button asChild size="lg"><Link href={`/request-quote?service=${encodeURIComponent("Termite Control")}`}>Book a free inspection <ArrowRight aria-hidden="true" /></Link></Button>
          </div>
        </div>
      </section>
      <ArticleLayout
        sections={sections}
        quickAnswer="DMSA's termite inspection is free and included in the quotation process. A technician checks for mud tubes, damaged wood, wings and entry points, then recommends a treatment and confirms the scope, schedule and price before any work begins."
        renderAfter={(section) => {
          if (section.id === "what-dmsa-checks") return <p><Link href="/pests/termites-anay">How to recognise anay and gamu-gamo</Link> · <Link href="/guides/signs-of-anay-termites-in-your-house">Signs of anay in your house</Link></p>;
          if (section.id === "what-you-receive") return <p><Link href="/services/termite-control">Termite control and anay treatment</Link> · <Link href="/pest-control-price">What affects the price</Link></p>;
          if (section.id === "when-to-book") return <p><Link href="/industries/construction-sites">Termite treatment for construction sites</Link></p>;
          if (section.id === "when-to-call") return <div className="guide-actions"><Button asChild><Link href={`/request-quote?service=${encodeURIComponent("Termite Control")}`}>Request a quotation <ArrowRight aria-hidden="true" /></Link></Button><Link className="text-link" href="/service-areas">Check your area <ArrowRight aria-hidden="true" /></Link></div>;
          return null;
        }}
      />
      <TrustFacts />
      <FaqSection title="Termite inspection: common questions" faqs={faqs} path={path} />
      <FinalCta />
    </main>
  );
}
