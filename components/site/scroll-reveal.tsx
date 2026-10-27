"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Animate small headings, never a section containing images, forms or a WebGL map.
    const headings = Array.from(document.querySelectorAll<HTMLElement>(
      "main .section-heading, main .dmsa-video-copy, main .proof-carousel-heading",
    ));
    const slideshows = new Set<Element>(document.querySelectorAll(".project-slideshow"));
    const visibleSlideshows = new Set<Element>();
    const syncPlayback = () => {
      slideshows.forEach((element) => element.classList.toggle(
        "is-in-view", visibleSlideshows.has(element) && !document.hidden && !motion.matches,
      ));
      if (motion.matches) headings.forEach((element) => element.classList.add("is-revealed"));
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: "0px 0px 64px" });
    const playbackObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleSlideshows.add(entry.target);
        else visibleSlideshows.delete(entry.target);
      });
      syncPlayback();
    });
    const trackSlideshows = (node: Node, added: boolean) => {
      if (!(node instanceof Element)) return;
      const elements = [...node.querySelectorAll(".project-slideshow")];
      if (node.matches(".project-slideshow")) elements.push(node);
      elements.forEach((element) => {
        if (added) {
          slideshows.add(element);
          playbackObserver.observe(element);
        } else {
          playbackObserver.unobserve(element);
          slideshows.delete(element);
          visibleSlideshows.delete(element);
        }
      });
    };
    // Filtered cards and portal previews mount after navigation. Register only
    // added/removed slideshow nodes; attributes and scrolling are not observed.
    const mountsObserver = new MutationObserver((records) => records.forEach((record) => {
      record.removedNodes.forEach((node) => trackSlideshows(node, false));
      record.addedNodes.forEach((node) => trackSlideshows(node, true));
    }));

    if (!motion.matches) headings.forEach((heading) => {
      if (heading.getBoundingClientRect().top < window.innerHeight) return;
      heading.classList.add("scroll-reveal");
      observer.observe(heading);
    });
    slideshows.forEach((element) => playbackObserver.observe(element));
    mountsObserver.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("visibilitychange", syncPlayback);
    motion.addEventListener("change", syncPlayback);

    return () => {
      observer.disconnect();
      playbackObserver.disconnect();
      mountsObserver.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      motion.removeEventListener("change", syncPlayback);
      headings.forEach((element) => element.classList.remove("scroll-reveal", "is-revealed"));
      slideshows.forEach((element) => element.classList.remove("is-in-view"));
    };
  }, [pathname]);

  return null;
}
