"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ease = "power2.out";
const clear = "opacity,transform";

export default function ScrollReveal() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 768px)",
      },
      (context) => {
        const { motion, desktop } = context.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;

        const once = (trigger: Element, start = "top 88%") => ({ trigger, start, once: true });

        gsap.utils.toArray<HTMLElement>("[data-reveal='heading']").forEach((el) => {
          gsap.from(el, { opacity: 0, y: 16, duration: 0.6, ease, clearProps: clear, scrollTrigger: once(el) });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal='grid']").forEach((el) => {
          gsap.from(el.querySelectorAll("[data-reveal-item]"), {
            opacity: 0,
            y: 14,
            duration: 0.7,
            stagger: 0.08,
            ease,
            clearProps: clear,
            scrollTrigger: once(el),
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal='panel']").forEach((el) => {
          gsap.from(el, { opacity: 0, y: 16, duration: 0.8, ease, clearProps: clear, scrollTrigger: once(el) });
          const img = el.querySelector("[data-reveal-img]");
          if (desktop && img) {
            gsap.from(img, { scale: 1.025, duration: 1.4, ease, clearProps: "transform", scrollTrigger: once(el) });
          }
        });

        gsap.utils.toArray<HTMLElement>("[data-swap]").forEach((el) => {
          const trigger = desktop ? el.closest("section") ?? el : el;
          const swapEase = "power3.inOut";
          const fromLeft = el.dataset.swap === "left";
          gsap
            .timeline({
              defaults: { duration: 1.2, ease: swapEase },
              scrollTrigger: {
                trigger,
                start: desktop ? "top 35%" : "top 55%",
                toggleActions: "play none none reverse",
              },
            })
            .fromTo(
              el.querySelector("[data-swap-next]"),
              fromLeft ? { x: 0, xPercent: -100 } : { y: 0, yPercent: 100 },
              fromLeft ? { xPercent: 0 } : { yPercent: 0 },
              0,
            )
            .fromTo(
              el.querySelector("[data-swap-base]"),
              fromLeft ? { xPercent: 0 } : { yPercent: 0 },
              fromLeft ? { xPercent: 18 } : { yPercent: -18 },
              0,
            );
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal='journal']").forEach((el) => {
          const tl = gsap.timeline({ scrollTrigger: once(el, "top 85%") });
          tl.from(el, { opacity: 0, duration: 0.6, ease, clearProps: "opacity" }).from(
            el.querySelectorAll("[data-reveal-item]"),
            { opacity: 0, y: 12, duration: 0.7, stagger: 0.08, ease, clearProps: clear },
            "-=0.3",
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal='footer-editorial']").forEach((el) => {
          const shots = el.querySelectorAll("[data-footer-shot]");
          gsap
            .timeline({
              defaults: { ease: "power3.out" },
              scrollTrigger: { trigger: el, start: "top 82%", toggleActions: "play none none reverse" },
            })
            // A hairline draws across first, then the frames drop from it.
            .fromTo(
              el.querySelector("[data-footer-line]"),
              { scaleX: 0 },
              { scaleX: 1, duration: 1.2, ease: "power3.inOut", clearProps: "transform" },
              0,
            )
            // Frames drop in from above: the window unmasks downward while the photo settles into place.
            .fromTo(
              shots,
              { clipPath: "inset(0% 0% 100% 0%)", y: -24 },
              { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 1.1, stagger: 0.09, clearProps: "clipPath,transform" },
              0.45,
            )
            .fromTo(
              el.querySelectorAll("[data-footer-shot-img]"),
              { yPercent: -14, scale: 1.08 },
              { yPercent: 0, scale: 1, duration: 1.4, stagger: 0.09, clearProps: "transform" },
              0.45,
            );

          gsap
            .timeline({
              defaults: { ease: "power3.out" },
              scrollTrigger: { trigger: el.querySelector("[data-footer-words]"), start: "top 96%", toggleActions: "play none none reverse" },
            })
            // The wordmark rises out of its own line mask.
            .fromTo(el.querySelectorAll("[data-footer-word]"), { yPercent: 105 }, { yPercent: 0, duration: 1.1, stagger: 0.12, clearProps: "transform" }, 0)
            .fromTo(
              el.querySelectorAll("[data-footer-label]"),
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, clearProps: "opacity,transform" },
              0.35,
            );
        });
      },
    );
  });

  return null;
}
