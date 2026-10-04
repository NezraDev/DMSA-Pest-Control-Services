"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

type ProofImage = { src: string; label: string; alt?: string };

export function ProofCarousel({
  images,
  title = "Treatment proof",
  description = "Swipe the images or use the arrow controls to browse the treatment photos.",
}: {
  images: readonly ProofImage[];
  title?: string;
  description?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (index: number) => {
    const nextIndex = Math.max(0, Math.min(index, images.length - 1));
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: track.clientWidth * nextIndex, behavior: "smooth" });
    setActiveIndex(nextIndex);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const updateActiveSlide = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const width = track.clientWidth || 1;
        setActiveIndex(Math.max(0, Math.min(Math.round(track.scrollLeft / width), images.length - 1)));
      });
    };

    track.addEventListener("scroll", updateActiveSlide, { passive: true });
    window.addEventListener("resize", updateActiveSlide);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", updateActiveSlide);
      window.removeEventListener("resize", updateActiveSlide);
    };
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <section className="proof-carousel" aria-roledescription="carousel" aria-label="Treatment photo gallery">
      <div className="proof-carousel-heading">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="proof-carousel-controls">
          <Button type="button" variant="outline" size="icon" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Previous proof image"><ChevronLeft aria-hidden="true" /></Button>
          <Button type="button" variant="outline" size="icon" onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === images.length - 1} aria-label="Next proof image"><ChevronRight aria-hidden="true" /></Button>
        </div>
      </div>
      <div ref={trackRef} className="proof-carousel-track">
        {images.map((image, index) => (
          <figure className="proof-carousel-slide" key={`${image.src}-${image.label}`} aria-roledescription="slide" aria-label={`${index + 1} of ${images.length}: ${image.label}`}>
            <div><Image src={image.src} alt={image.alt ?? image.label} fill sizes="(max-width: 860px) 100vw, 900px" priority={index === 0} /></div>
            <figcaption><span>{String(index + 1).padStart(2, "0")}</span>{image.label}</figcaption>
          </figure>
        ))}
      </div>
      <p className="proof-carousel-status" aria-live="polite">{activeIndex + 1} / {images.length}</p>
    </section>
  );
}
