/* eslint-disable @next/next/no-img-element */
"use client";

import { Section } from "@/components/section";
import { easeOutCubic } from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface FeatureLayout {
  textClass: string;
  imageClass: string;
  spacingClass: string;
  imageAlignClass: string;
}

const LAYOUTS: FeatureLayout[] = [
  {
    textClass: "lg:col-span-5 lg:col-start-1",
    imageClass: "lg:col-span-6 lg:col-start-7",
    spacingClass: "pb-24 lg:pb-40",
    imageAlignClass: "lg:justify-end",
  },
  {
    textClass: "lg:col-span-5 lg:col-start-8 lg:row-start-1",
    imageClass: "lg:col-span-6 lg:col-start-1 lg:row-start-1",
    spacingClass: "pb-16 lg:pb-32",
    imageAlignClass: "lg:justify-start",
  },
  {
    textClass: "lg:col-span-6 lg:col-start-1",
    imageClass: "lg:col-span-5 lg:col-start-8",
    spacingClass: "pb-0",
    imageAlignClass: "lg:justify-end",
  },
];

interface FeatureProps {
  title: string;
  description: string;
  imageSrc: string;
  isActive: boolean;
  layout: FeatureLayout;
}

function Feature({
  title,
  description,
  imageSrc,
  isActive,
  layout,
}: FeatureProps) {
  const textVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: easeOutCubic,
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: easeOutCubic },
    },
  };

  return (
    <div
      className={cn(
        "grid grid-cols-12 items-center gap-x-6 gap-y-10 lg:gap-x-10",
        layout.spacingClass
      )}
    >
      <motion.div
        className={cn("col-span-12", layout.textClass)}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={textVariants}
      >
        <div className="flex max-w-md flex-col gap-5">
          <motion.h3
            className="font-display text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl"
            variants={itemVariants}
          >
            {title}
          </motion.h3>
          <motion.p
            className="text-lg leading-relaxed text-muted-foreground md:text-xl"
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
        <img
          src={imageSrc}
          alt={title}
          className="h-auto w-full max-w-[300px] drop-shadow-2xl"
        />
      </div>
    </div>
  );
}

export function FeatureHighlight() {
  const features = siteConfig.featureHighlight;
  const [activeFeature, setActiveFeature] = useState(-1);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const { top, bottom } = container.getBoundingClientRect();
      const middleOfScreen = window.innerHeight / 2;
      const featureHeight = (bottom - top) / features.length;
      const activeIndex = Math.floor((middleOfScreen - top) / featureHeight);
      setActiveFeature(
        Math.max(-1, Math.min(features.length - 1, activeIndex))
      );
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [features.length]);

  return (
    <Section
      id="features"
      index="001"
      variant="editorial"
      title="Features"
      subtitle="cash in three taps"
      description="Receive, request, send. The wallet does not get in the way."
      className="container mx-auto max-w-[var(--max-container-width)] px-6 py-[var(--section-y-wide)] lg:px-10"
      ref={containerRef}
    >
      {features.map((feature, index) => (
        <Feature
          key={index}
          isActive={activeFeature === index}
          layout={LAYOUTS[index] ?? LAYOUTS[LAYOUTS.length - 1]}
          title={feature.title}
          description={feature.description}
          imageSrc={feature.imageSrc}
        />
      ))}
    </Section>
  );
}
