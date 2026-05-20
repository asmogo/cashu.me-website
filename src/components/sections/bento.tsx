/* eslint-disable @next/next/no-img-element */
"use client";

import { Section } from "@/components/section";
import { easeInOutCubic } from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function BentoGrid() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.3], [0, 0, 1], {
    ease: easeInOutCubic,
  });
  const opacity2 = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 0, 1], {
    ease: easeInOutCubic,
  });
  const opacity3 = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 0, 1], {
    ease: easeInOutCubic,
  });
  const y1 = useTransform(scrollYProgress, [0, 0.1, 0.3], [80, 80, 0], {
    ease: easeInOutCubic,
  });
  const y2 = useTransform(scrollYProgress, [0, 0.2, 0.4], [80, 80, 0], {
    ease: easeInOutCubic,
  });
  const y3 = useTransform(scrollYProgress, [0, 0.3, 0.5], [80, 80, 0], {
    ease: easeInOutCubic,
  });

  const motions = [
    { opacity: opacity1, y: y1 },
    { opacity: opacity2, y: y2 },
    { opacity: opacity3, y: y3 },
  ];

  return (
    <Section
      id="bento"
      title="Why ecash"
      subtitle="the difference between a balance and bearer cash"
      className="container mx-auto max-w-[var(--max-container-width)] px-6 lg:px-10"
      ref={ref}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {siteConfig.bento.map((item, index) => (
          <motion.div
            key={index}
            style={motions[index]}
            className={cn(
              "group relative grid grid-rows-[auto_1fr] overflow-hidden rounded-3xl border border-border/60 bg-muted p-6 pb-0 sm:p-8",
              item.fullWidth && "md:col-span-2"
            )}
          >
            <div className="flex flex-col">
              <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {item.title}
              </h3>
              <p className="mt-3 max-w-prose text-sm text-muted-foreground sm:text-base">
                {item.content}
              </p>
            </div>
            <div className="mt-6 flex justify-center">
              <img
                src={item.imageSrc}
                alt={item.imageAlt}
                className={cn(
                  "h-64 w-auto select-none object-contain object-top transition-transform duration-500 group-hover:-translate-y-2 sm:h-80",
                  item.fullWidth && "sm:h-96"
                )}
                draggable={false}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
