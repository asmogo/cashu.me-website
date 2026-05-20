/* eslint-disable @next/next/no-img-element */
"use client";

import { Section } from "@/components/section";
import { easeOutCubic } from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface FeatureProps {
  title: string;
  description: string;
  imageSrc: string;
  direction: "ltr" | "rtl";
  isActive: boolean;
}

function Feature({
  title,
  description,
  imageSrc,
  direction,
  isActive,
}: FeatureProps) {
  const isLTR = direction === "ltr";
  const textVariants = {
    hidden: { opacity: 0, x: isLTR ? -20 : 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: easeOutCubic,
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: isLTR ? -10 : 10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: easeOutCubic },
    },
  };

  return (
    <motion.div
      className={cn(
        "flex flex-col items-center justify-between py-16 lg:py-24",
        isLTR ? "lg:flex-row" : "lg:flex-row-reverse"
      )}
    >
      <motion.div
        className={cn(
          "w-full lg:w-1/2",
          isLTR ? "lg:pr-12" : "lg:pl-12"
        )}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={textVariants}
      >
        <div className="mx-auto flex max-w-md flex-col gap-5 text-center lg:mx-0 lg:text-left">
          <motion.h2
            className="font-display text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl"
            variants={itemVariants}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-lg leading-relaxed text-muted-foreground md:text-xl"
            variants={itemVariants}
          >
            {description}
          </motion.p>
        </div>
      </motion.div>

      <div className="mt-12 w-full lg:mt-0 lg:w-1/2">
        <img
          src={imageSrc}
          alt={title}
          className="mx-auto h-auto w-full max-w-[300px] drop-shadow-2xl"
        />
      </div>
    </motion.div>
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
      title="Features"
      subtitle="cash in three taps"
      description="Receive, request, send. The wallet does not get in the way."
      className="container mx-auto max-w-[var(--max-container-width)] px-6 lg:px-10"
      ref={containerRef}
    >
      {features.map((feature, index) => (
        <Feature key={index} isActive={activeFeature === index} {...feature} />
      ))}
    </Section>
  );
}
