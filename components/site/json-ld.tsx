export function JsonLd({ data }: { data: object }) {
  // Escaping "<" keeps content from closing the script tag early.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
