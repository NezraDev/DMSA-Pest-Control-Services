import type { Metadata } from "next";

import { GalleryExplorer } from "@/components/site/gallery-explorer";
import { FinalCta, PageHero } from "@/components/site/page-elements";
import { ProofCarousel } from "@/components/site/proof-carousel";
import { galleryItems } from "@/data/gallery-data";
import { pageHeroes } from "@/data/page-content-data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Pest Control Treatment Gallery",
  description: "See photos of completed DMSA termite and pest control work, including before-and-after images of soil poisoning and treatment in Los Baños, Laguna.",
  path: "/gallery",
});

const galleryProofImages = galleryItems.flatMap((item) =>
  item.imagePaths.map((src, index) => ({
    src,
    label: item.imagePaths.length > 1 ? `${item.title} - Photo ${index + 1}` : item.title,
    alt: `${item.title}, photo ${index + 1}, in ${item.generalLocation}`,
  })),
);

export default function GalleryPage() {
  return (
    <main id="main-content">
      <PageHero {...pageHeroes.gallery} />
      <section className="section gallery-page-section"><div className="site-container"><ProofCarousel images={galleryProofImages} /><GalleryExplorer /></div></section>
      <FinalCta />
    </main>
  );
}
