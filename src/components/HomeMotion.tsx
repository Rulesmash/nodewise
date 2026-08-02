"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Force content always readable — never leave opacity mid-tween. */
function solidifyHome() {
  const root = document.querySelector(".home-page");
  if (!root) return;

  const critical = root.querySelectorAll<HTMLElement>(
    [
      "#hero-main-title",
      "#hero-sub-text",
      ".hero-ctas",
      ".mvp-highlight-card",
      ".mvp-highlight-content",
      ".mvp-highlight-pricing",
      ".mvp-pricing-box",
      ".mvp-price-big",
      "[data-reveal]",
      "[data-reveal-item]",
      ".package-card",
      ".cta-banner",
    ].join(",")
  );

  critical.forEach((el) => {
    // Inline + GSAP so neither can leave a ghost opacity:0
    el.style.setProperty("opacity", "1", "important");
    el.style.setProperty("visibility", "visible", "important");
    el.style.filter = "none";
  });
}

export default function HomeMotion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Hard rule: content is visible before any motion runs
    solidifyHome();

    if (reduce) {
      return () => solidifyHome();
    }

    const ctx = gsap.context(() => {
      const title = document.querySelector<HTMLElement>("#hero-main-title");
      const sub = document.querySelector<HTMLElement>("#hero-sub-text");
      const ctas = document.querySelector<HTMLElement>(".hero-ctas");

      // Hero: transform-only intro (no opacity — avoids flash-to-invisible)
      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: solidifyHome,
      });

      if (title) {
        intro.fromTo(
          title,
          { y: 16 },
          { y: 0, duration: 0.65, clearProps: "transform" },
          0.05
        );
      }
      if (sub) {
        intro.fromTo(
          sub,
          { y: 12 },
          { y: 0, duration: 0.5, clearProps: "transform" },
          0.16
        );
      }
      if (ctas) {
        intro.fromTo(
          ctas,
          { y: 10 },
          { y: 0, duration: 0.45, clearProps: "transform" },
          0.26
        );
      }

      // Scroll reveals: Y-only. Never opacity — MVP/pricing must stay painted.
      gsap.utils
        .toArray<HTMLElement>(".home-page [data-reveal]")
        .forEach((el) => {
          // Skip MVP card entirely — critical conversion block stays static
          if (el.classList.contains("mvp-highlight-card")) return;

          gsap.from(el, {
            y: 20,
            duration: 0.55,
            ease: "power3.out",
            immediateRender: false,
            clearProps: "transform",
            scrollTrigger: {
              trigger: el,
              start: "top 94%",
              once: true,
              toggleActions: "play none none none",
            },
          });
        });

      gsap.utils
        .toArray<HTMLElement>(".home-page [data-reveal-stagger]")
        .forEach((group) => {
          const kids = group.querySelectorAll<HTMLElement>("[data-reveal-item]");
          if (!kids.length) return;
          gsap.from(kids, {
            y: 16,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
            immediateRender: false,
            clearProps: "transform",
            scrollTrigger: {
              trigger: group,
              start: "top 92%",
              once: true,
              toggleActions: "play none none none",
            },
          });
        });
    }, ".home-page");

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      solidifyHome();
    });

    const failsafe = window.setTimeout(solidifyHome, 300);
    const failsafe2 = window.setTimeout(solidifyHome, 1200);

    return () => {
      window.clearTimeout(failsafe);
      window.clearTimeout(failsafe2);
      ctx.revert();
      // Revert undoes GSAP styles — paint solid again after teardown
      solidifyHome();
      requestAnimationFrame(solidifyHome);
    };
  }, []);

  return null;
}
