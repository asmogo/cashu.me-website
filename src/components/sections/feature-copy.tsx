"use client";

import { useReducedMotion } from "@/lib/use-reduced-motion";

import {
  easeOutCubic,
  REVEAL_DURATION_LG,
  REVEAL_DURATION_SM,
} from "@/lib/animation";
import { cn } from "@/lib/utils";
import { m } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function FeatureCopy({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    const section = ref.current?.closest("section");
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { rootMargin: "-50% 0px -50% 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  const textVariants = {
    hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: REVEAL_DURATION_LG,
        ease: easeOutCubic,
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: REVEAL_DURATION_SM, ease: easeOutCubic },
    },
  };

  const animateState = reduceMotion || isActive ? "visible" : "hidden";

  return (
    <m.div
      ref={ref}
      className={cn("motion-reveal col-span-12 lg:row-start-1", className)}
      initial={reduceMotion ? "visible" : "hidden"}
      animate={animateState}
      variants={textVariants}
    >
      <div className="flex max-w-xl flex-col gap-6">
        <m.h2
          className="motion-reveal type-display-2 text-foreground"
          variants={itemVariants}
        >
          {title}
        </m.h2>
        <m.p
          className="motion-reveal type-lead text-foreground/75 max-w-[50ch]"
          variants={itemVariants}
        >
          {description}
        </m.p>
      </div>
    </m.div>
  );
}
