import type { ReactNode } from "react";

import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-elements";
import { pageSchema } from "@/lib/seo";

export type LegalSection = {
  id: string;
  title: string;
  body: ReactNode;
};

/** Shared reading layout for the privacy policy and terms of service. */
export function LegalPage({
  title,
  description,
  updated,
  sections,
  path,
}: {
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
  path: string;
}) {
  return (
    <main id="main-content">
      <JsonLd data={pageSchema({ name: title, description, path, breadcrumbs: [{ name: "Home", path: "/" }, { name: title, path }] })} />
      <PageHero title={title} description={description} />
      <section className="section legal-section">
        <div className="site-container legal-layout">
          <nav className="legal-contents" aria-label="On this page">
            <p className="legal-contents-title">On this page</p>
            <ol>
              {sections.map((section) => (
                <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>
              ))}
            </ol>
          </nav>
          <article className="legal-article">
            <p className="legal-updated">Last updated {updated}</p>
            {sections.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
                <h2 id={`${section.id}-title`}>{section.title}</h2>
                {section.body}
              </section>
            ))}
          </article>
        </div>
      </section>
    </main>
  );
}
