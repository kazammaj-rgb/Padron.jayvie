"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function GsapScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("section[id]").forEach((section) => {
        const title = section.querySelector(".section-title");
        const subtitle = section.querySelector(".section-subtitle");
        const cards = section.querySelectorAll(
          ".glass-panel:not(.education-card), .glass-panel-strong:not(.education-card)"
        );

        if (title) {
          gsap.from(title, {
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              toggleActions: "play none none none",
            },
            y: 80,
            opacity: 0,
            rotateX: 18,
            transformPerspective: 1200,
            duration: 1.1,
            ease: "power4.out",
          });
        }

        if (subtitle) {
          gsap.from(subtitle, {
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none none",
            },
            y: 40,
            opacity: 0,
            duration: 0.9,
            delay: 0.15,
            ease: "power3.out",
          });
        }

        if (cards.length) {
          gsap.from(cards, {
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              toggleActions: "play none none none",
            },
            y: 60,
            opacity: 0,
            rotateY: (i) => (i % 2 === 0 ? -8 : 8),
            transformPerspective: 1000,
            stagger: 0.12,
            duration: 0.9,
            ease: "power3.out",
          });
        }

        gsap.to(section, {
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
          backgroundPosition: "50% 100%",
        });
      });

      gsap.utils.toArray<HTMLElement>(".parallax-bg").forEach((el) => {
        gsap.to(el, {
          yPercent: 25,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".parallax-slow").forEach((el) => {
        gsap.to(el, {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".parallax-fast").forEach((el) => {
        gsap.to(el, {
          y: -160,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".tilt-on-scroll").forEach((el) => {
        gsap.to(el, {
          rotateX: 5,
          rotateY: -5,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 30%",
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return <>{children}</>;
}
