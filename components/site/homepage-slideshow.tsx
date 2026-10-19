"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    src: "/slide/slide-1.png",
    alt: "A DMSA technician applying treatment to a timber door frame.",
    caption: "Treatment at the entryway",
  },
  {
    src: "/slide/slide-2.png",
    alt: "A DMSA technician treating the interior of a kitchen cabinet.",
    caption: "Treatment inside cabinetry",
  },
  {
    src: "/slide/slide-3.png",
    alt: "A close view of a technician examining damaged timber on a door frame.",
    caption: "A closer look at timber damage",
  },
  {
    src: "/slide/slide-4.png",
    alt: "Damaged timber exposed along the top of a doorway.",
    caption: "Inspecting affected timber",
  },
  {
    src: "/slide/slide-5.png",
    alt: "A close view of damaged timber during a property inspection.",
    caption: "Reviewing affected areas",
  },
  {
    src: "/slide/slide-6.png",
    alt: "A DMSA technician and another person reviewing a residential doorway.",
    caption: "Property review on site",
  },
  {
    src: "/slide/slide-7.png",
    alt: "A DMSA technician applying treatment beneath a timber frame.",
    caption: "Treatment beneath timber framing",
  },
];

export function HomepageSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  const showSlide = (index: number) => {
    setActiveIndex((index + slides.length) % slides.length);
  };

  return (
    <div
      className="homepage-slideshow"
      role="region"
      aria-roledescription="carousel"
      aria-label="DMSA service photography"
    >
      {slides.map((slide, index) => (
        <div
          className={`homepage-slide homepage-slide-${index + 1}${index === activeIndex ? " is-active" : ""}`}
          key={slide.src}
          aria-hidden={index !== activeIndex}
        >
          <Image
            src={slide.src}
            alt={index === activeIndex ? slide.alt : ""}
            fill
            loading="eager"
            fetchPriority={index === 0 ? "high" : "auto"}
            sizes="100vw"
          />
        </div>
      ))}
      <div className="homepage-slideshow-gradient" aria-hidden="true" />
      <div className="homepage-slideshow-footer" aria-live="off">
        <div className="homepage-slideshow-footer-inner">
          <div className="homepage-slide-caption">
            <span>DMSA service work</span>
            <strong>{slides[activeIndex].caption}</strong>
          </div>
          <div className="homepage-slide-controls" role="group" aria-label="Slideshow indicators">
            <div className="homepage-slide-dots" role="group" aria-label="Choose a photo">
              {slides.map((slide, index) => (
                <button
                  type="button"
                  key={slide.src}
                  className={index === activeIndex ? "is-active" : ""}
                  aria-label={`Show photo ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  onClick={() => showSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
