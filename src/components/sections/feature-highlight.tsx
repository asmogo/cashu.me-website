/* eslint-disable @next/next/no-img-element */
"use client";

import { Section } from "@/components/section";
import { siteConfig } from "@/lib/config";
import { easeOutCubic } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface FeatureLayout {
  textClass: string;
  imageClass: string;
  imageAlignClass: string;
}

const LAYOUTS: FeatureLayout[] = [
  {
    textClass: "lg:col-span-5 lg:col-start-1",
    imageClass: "lg:col-span-6 lg:col-start-7",
    imageAlignClass: "lg:justify-end",
  },
  {
    textClass: "lg:col-span-6 lg:col-start-1",
    imageClass: "lg:col-span-5 lg:col-start-8",
    imageAlignClass: "lg:justify-end",
  },
];

interface FeatureProps {
  title: string;
  description: string;
  imageSrc: string;
  isActive: boolean;
  layout: FeatureLayout;
  reduceMotion: boolean;
}

function Feature({
  title,
  description,
  imageSrc,
  isActive,
  layout,
  reduceMotion,
}: FeatureProps) {
  const textVariants = {
    hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
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
      transition: { duration: 0.3, ease: easeOutCubic },
    },
  };

  const animateState = reduceMotion || isActive ? "visible" : "hidden";

  return (
    <div className="grid grid-cols-12 items-center gap-x-6 gap-y-10 lg:gap-x-10">
      <motion.div
        className={cn("col-span-12", layout.textClass)}
        initial={reduceMotion ? "visible" : "hidden"}
        animate={animateState}
        variants={textVariants}
      >
        <div className="flex max-w-xl flex-col gap-6">
          <motion.h3
            className="type-display-2 text-foreground"
            variants={itemVariants}
          >
            {title}
          </motion.h3>
          <motion.p
            className="type-lead text-foreground/75 max-w-[50ch]"
            variants={itemVariants}
          >
            {description}
          </motion.p>
        </div>
      </motion.div>

      <div
        className={cn(
          "col-span-12 flex justify-center",
          layout.imageClass,
          layout.imageAlignClass
        )}
      >
        <div className="relative">
          {/* Soft halo lifts the phone off the inkwell, matching the hero. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="size-[520px] rounded-full bg-foreground/[0.08] blur-[140px]" />
          </div>
          <img
            src={imageSrc}
            alt={title}
            width={921}
            height={2000}
            className="relative h-auto w-full max-w-[300px] rounded-[2rem] border border-foreground/15 drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}

interface FeatureHighlightProps {
  feature: (typeof siteConfig.featureHighlight)[number];
  layoutIndex: number;
  className?: string;
  id?: string;
}

export function FeatureHighlight({
  feature,
  layoutIndex,
  className,
  id,
}: FeatureHighlightProps) {
  const layout = LAYOUTS[layoutIndex] ?? LAYOUTS[LAYOUTS.length - 1];
  const reduceMotion = useReducedMotion() ?? false;
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const { top, bottom } = container.getBoundingClientRect();
      const middleOfScreen = window.innerHeight / 2;
      setIsActive(top <= middleOfScreen && bottom >= middleOfScreen);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Section
      id={id}
      variant="editorial"
      hideHeader
      className={cn(
        "container mx-auto max-w-[var(--max-container-width)] px-6 lg:px-10",
        className
      )}
      ref={containerRef}
    >
      <Feature
        isActive={isActive}
        layout={layout}
        title={feature.title}
        description={feature.description}
        imageSrc={feature.imageSrc}
        reduceMotion={reduceMotion}
      />
    </Section>
  );
}
