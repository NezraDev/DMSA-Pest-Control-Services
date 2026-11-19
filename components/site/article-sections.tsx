import type { ReactNode } from "react";

import type { GuideSection } from "@/lib/content-types";

/** Contents list, article body and optional per-section extras, shared by guides, pest and industry pages. */
export function ArticleLayout({
  sections,
  byline,
  quickAnswer,
  renderAfter,
  children,
}: {
  sections: GuideSection[];
  byline?: string;
  quickAnswer?: string;
  /** Extra content placed at the end of a section, by section id. */
  renderAfter?: (section: GuideSection) => ReactNode;
  /** Content after the last section. */
  children?: ReactNode;
}) {
  return (
    <section className="section legal-section">
      <div className="site-container legal-layout">
        <nav className="legal-contents" aria-label="On this page">
          <p className="legal-contents-title">On this page</p>
          <ol>
            {sections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.heading}</a></li>)}
          </ol>
        </nav>
        <article className="legal-article">
          {byline ? <p className="legal-updated">{byline}</p> : null}
          {quickAnswer ? (
            <aside className="quick-answer" aria-label="Quick answer">
              <p className="quick-answer-label">Quick answer</p>
              <p>{quickAnswer}</p>
            </aside>
          ) : null}
          {sections.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
              <h2 id={`${section.id}-title`}>{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.list ? <ul>{section.list.map((item) => <li key={item}>{item}</li>)}</ul> : null}
              {section.table ? (
                <div className="article-table-wrap">
                  <table className={section.table.head.length > 2 ? "article-table stack" : "article-table"}>
                    <caption>{section.table.caption}</caption>
                    <thead><tr>{section.table.head.map((cell, index) => <th key={`${cell}-${index}`} scope="col">{cell}</th>)}</tr></thead>
                    <tbody>
                      {section.table.rows.map((row) => (
                        <tr key={row.join("|")}>
                          {row.map((cell, index) => (index === 0 ? <th key={`${cell}-${index}`} scope="row">{cell}</th> : <td key={`${cell}-${index}`} data-label={section.table?.head[index]}>{cell}</td>))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
              {section.after?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {renderAfter?.(section)}
            </section>
          ))}
          {children}
        </article>
      </div>
    </section>
  );
}
