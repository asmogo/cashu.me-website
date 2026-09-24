"use client";

import { Section } from "@/components/section";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/** Card content is server-rendered; the scroll driver loads near this section. */
export function BentoMotion({ children }: { children: ReactNode }) {
  const section = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = section.current;
    const cards = grid.current;
    if (!target || !cards) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let near = false;
    let disposed = false;
    let generation = 0;
    let cleanup: (() => void) | undefined;
    const update = () => {
      const current = ++generation;
      cleanup?.();
      cleanup = undefined;
      if (!near || reduced.matches) return;
      void import("./bento-motion-effects")
        .then(({ animateBento }) => {
          if (!disposed && current === generation)
            cleanup = animateBento(target, cards);
        })
        .catch(() => {
          // A failed optional animation chunk must never hide the content.
          if (!disposed && current === generation) {
            for (const card of Array.from(cards.children) as HTMLElement[]) {
              card.style.opacity = "1";
              card.style.transform = "none";
            }
          }
        });
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          near = true;
          observer.disconnect();
          update();
        }
      },
      { rootMargin: "100% 0px" },
    );
    observer.observe(target);
    reduced.addEventListener("change", update);
    return () => {
      disposed = true;
      observer.disconnect();
      reduced.removeEventListener("change", update);
      cleanup?.();
    };
  }, []);

  return (
    <Section
      id="bento"
      variant="editorial"
      hideHeader
      className="container-page px-6 py-[var(--section-y-base)] lg:px-10"
      ref={section}
    >
      <div ref={grid} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {children}
      </div>
    </Section>
  );
}
