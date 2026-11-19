import type { Metadata } from "next";

import { GalleryExplorer } from "@/components/site/gallery-explorer";
import { FinalCta, PageHero } from "@/components/site/page-elements";
import { ProofCarousel } from "@/components/site/proof-carousel";
import { galleryItems } from "@/data/gallery-data";
import { pageHeroes } from "@/data/page-content-data";
import { JsonLd } from "@/components/site/json-ld";
import { pageMetadata, pageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Pest Control Treatment Gallery",
  description: "Photos of completed DMSA termite jobs in Los Baños and Biñan, Laguna: chemical injection, soil poisoning and before-and-after cleanup.",
  path: "/gallery",
});

const galleryProofImages = galleryItems.flatMap((item) =>
  item.imagePaths.map((src, index) => ({
    src,
    label: item.imageCaptions?.[index] ?? (item.imagePaths.length > 1 ? `${item.title} - Photo ${index + 1}` : item.title),
    alt: item.imageCaptions?.[index]
      ? `${item.imageCaptions[index]}, ${item.generalLocation}`
      : `${item.title}, photo ${index + 1}, in ${item.generalLocation}`,
  })),
);

export default function GalleryPage() {
  return (
    <main id="main-content">
      <JsonLd data={pageSchema({ type: "CollectionPage", name: pageHeroes.gallery.title, description: pageHeroes.gallery.description, path: "/gallery", breadcrumbs: [{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }] })} />
      <PageHero {...pageHeroes.gallery} />
      <section className="section gallery-page-section"><div className="site-container"><ProofCarousel images={galleryProofImages} /><GalleryExplorer /></div></section>
      <FinalCta />
    </main>
  );
}
