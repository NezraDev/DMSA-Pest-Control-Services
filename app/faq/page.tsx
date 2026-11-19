import type { Metadata } from "next";
import Link from "next/link";

import { FaqSection } from "@/components/site/faq-section";
import { JsonLd } from "@/components/site/json-ld";
import { FinalCta, PageHero } from "@/components/site/page-elements";
import { faqs } from "@/data/faq-data";
import { serviceAreas } from "@/data/service-areas-data";
import { services } from "@/data/services-data";
import type { Faq } from "@/lib/content-types";
import { faqSchema, pageMetadata, pageSchema } from "@/lib/seo";

const description = "Answers about DMSA's free ocular inspection, quotations, termite (anay) treatment, general pest control, homes and businesses, and service areas.";

export const metadata: Metadata = pageMetadata({
  title: "Pest Control & Termite FAQs",
  description,
  path: "/faq",
});

const serviceFaqs = (slug: string) => services.find((service) => service.slug === slug)?.faqs ?? [];
const lagunaFaqs = serviceAreas.find((area) => area.page?.slug === "laguna")?.page?.faqs ?? [];

/** Looks a question up by its exact text, so a renamed question fails the build instead of disappearing. */
function pick(list: Faq[], question: string): Faq {
  const found = list.find((faq) => faq.question === question);
  if (!found) throw new Error(`FAQ not found: ${question}`);
  return found;
}

const groups: { id: string; title: string; faqs: Faq[] }[] = [
  {
    id: "inspection-and-quotations",
    title: "Ocular inspection and quotations",
    faqs: [
      pick(faqs, "Is the ocular inspection really free?"),
      pick(faqs, "How do I know which service to request?"),
      pick(faqs, "Is an online quotation final?"),
      pick(serviceFaqs("general-pest-control"), "How much does pest control cost?"),
    ],
  },
  {
    id: "termite-control",
    title: "Termite (anay) control",
    faqs: serviceFaqs("termite-control"),
  },
  {
    id: "general-pest-control",
    title: "General pest control",
    faqs: [
      pick(faqs, "What pests does DMSA treat?"),
      pick(serviceFaqs("general-pest-control"), "Which pests does general pest control cover?"),
      pick(serviceFaqs("general-pest-control"), "Do you handle rats and mice?"),
      pick(serviceFaqs("general-pest-control"), "How often should pest control be done?"),
      pick(serviceFaqs("general-pest-control"), "Can we stay in the property during treatment?"),
    ],
  },
  {
    id: "homes-and-businesses",
    title: "Homes and businesses",
    faqs: [
      pick(serviceFaqs("general-pest-control"), "Can DMSA treat both homes and businesses?"),
      pick(serviceFaqs("residential-pest-control"), "Do you treat condominiums and apartments?"),
      pick(serviceFaqs("residential-pest-control"), "Can you treat a house while we live in it?"),
      pick(serviceFaqs("residential-pest-control"), "Do you treat termites in cabinets and door frames?"),
      pick(serviceFaqs("commercial-pest-control"), "What types of businesses does DMSA serve?"),
      pick(serviceFaqs("commercial-pest-control"), "Can treatment be coordinated around our operations?"),
      pick(serviceFaqs("commercial-pest-control"), "What do we receive after the service?"),
      pick(serviceFaqs("commercial-pest-control"), "Do we need to close during treatment?"),
    ],
  },
  {
    id: "areas-and-visits",
    title: "Service areas and visits",
    faqs: [
      pick(faqs, "Where is DMSA located?"),
      pick(lagunaFaqs, "Does DMSA have a branch in Laguna?"),
      pick(faqs, "Do you serve areas outside Camarines Sur?"),
      pick(faqs, "What should I prepare before a visit?"),
    ],
  },
];

export default function FaqPage() {
  const allFaqs = groups.flatMap((group) => group.faqs);
  return (
    <main id="main-content">
      <JsonLd data={pageSchema({ name: "Pest control and termite (anay) questions", description, path: "/faq", breadcrumbs: [{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }] })} />
      <JsonLd data={faqSchema(allFaqs, "/faq")} />
      <PageHero
        title="Pest control and termite (anay) questions"
        description="Answers about the free ocular inspection, quotations, termite treatment, general pest control and where DMSA works."
      />
      <nav className="section faq-jump" aria-label="FAQ topics">
        <div className="site-container">
          <ul>{groups.map((group) => <li key={group.id}><a href={`#${group.id}`}>{group.title}</a></li>)}</ul>
        </div>
      </nav>
      {groups.map((group) => (
        <FaqSection key={group.id} id={group.id} title={group.title} faqs={group.faqs} path="/faq" schema={false} />
      ))}
      <section className="section">
        <div className="site-container seo-copy">
          <h2>Still have a question?</h2>
          <p>
            Read the <Link href="/guides">pest control guides</Link>, browse <Link href="/services">all services</Link>, or{" "}
            <Link href="/contact">contact DMSA</Link>. To have a property checked, <Link href="/request-quote">request a quotation</Link> with a free ocular inspection.
          </p>
        </div>
      </section>
      <FinalCta />
    </main>
  );
}
