import type { ReactNode } from "react";

import { JsonLd } from "@/components/site/json-ld";
import { SectionHeading } from "@/components/site/page-elements";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Faq } from "@/lib/content-types";
import { faqSchema } from "@/lib/seo";

/** Visible FAQ accordion with matching FAQPage markup, built from the same list so they never drift apart. */
export function FaqSection({
  title,
  faqs,
  path,
  aside,
  schema = true,
  id,
}: {
  title: string;
  faqs: Faq[];
  path: string;
  aside?: ReactNode;
  /** Set false when the page already emits one FAQPage covering these questions. */
  schema?: boolean;
  id?: string;
}) {
  if (faqs.length === 0) return null;
  return (
    <section className="section faq-section" id={id}>
      {schema ? <JsonLd data={faqSchema(faqs, path)} /> : null}
      <div className="site-container faq-grid">
        <div>
          <SectionHeading title={title} />
          {aside}
        </div>
        <Accordion type="single" collapsible className="faq-accordion">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent><p>{faq.answer}</p></AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
