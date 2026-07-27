"use client";

import {
  LazyMotion,
  useScroll,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface SkyContextValue {
  /** whole-document scroll progress, 0–1 — the single global motion source */
  progress: MotionValue<number>;
  /** false → clouds render static (reduced motion, or below md) */
  drift: boolean;
}

const loadMotionFeatures = () => import("./motion-features").then((m) => m.default);

const SkyContext = createContext<SkyContextValue | null>(null);

export function useSky() {
  return useContext(SkyContext);
}

export function SkyProvider({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion() ?? false;
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // useScroll() with no target tracks document.documentElement, which
  // framer-motion never re-measures via ResizeObserver — only on scroll/
  // resize events. If page height changes after mount (font swap, async
  // content), scrollYProgress goes stale and then jumps on the next scroll
  // event. Force a re-measure as soon as height changes so it stays current.
  useEffect(() => {
    const ro = new ResizeObserver(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    ro.observe(document.body);
    return () => ro.disconnect();
  }, []);

  // Every animated element on the page uses `m.*` + this one LazyMotion
  // boundary rather than `motion.*`, so the feature bundle loads as a separate
  // chunk instead of riding in the initial JS. `domAnimation` is the whole
  // surface this site needs: animate/variants/exit plus whileInView. Nothing
  // drags and nothing uses layout animations, so `domMax` would be dead weight.
  // `strict` makes a stray `motion.*` throw instead of silently reintroducing
  // the eager bundle.
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <SkyContext.Provider
        value={{ progress: scrollYProgress, drift: isDesktop && !reduceMotion }}
      >
        {children}
      </SkyContext.Provider>
    </LazyMotion>
  );
}
