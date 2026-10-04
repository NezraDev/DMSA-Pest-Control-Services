"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section, .site-footer"));
    const staggerSelector = [
      ".trust-grid > *",
      ".service-grid > *",
      ".process-grid > *",
      ".project-grid > *",
      ".values-grid > *",
      ".coverage-grid > *",
      ".story-grid > *",
      ".detail-hero-grid > *",
      ".before-after-grid > *",
      ".project-detail-grid > *",
      ".final-cta-actions > *",
      ".footer-grid > *",
      ".footer-bottom > *",
    ].join(",");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -10%" });

    sections.forEach((section) => {
      const staggerItems = Array.from(section.querySelectorAll<HTMLElement>(staggerSelector));
      staggerItems.forEach((item, index) => {
        item.classList.add("scroll-reveal-item");
        item.style.setProperty("--reveal-delay", `${Math.min(index, 6) * 70}ms`);
      });

      if (section.getBoundingClientRect().top <= window.innerHeight * 0.92) {
        section.classList.add("is-revealed");
        return;
      }
      section.classList.add("scroll-reveal");
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
      sections.forEach((section) => {
        section.classList.remove("scroll-reveal", "is-revealed");
        section.querySelectorAll<HTMLElement>(staggerSelector).forEach((item) => {
          item.classList.remove("scroll-reveal-item");
          item.style.removeProperty("--reveal-delay");
        });
      });
    };
  }, [pathname]);

  return null;
}
