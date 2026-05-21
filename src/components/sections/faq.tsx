"use client";

import { Section } from "@/components/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { easeInOutCubic } from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function FAQ() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.1], [0, 0, 1], {
    ease: easeInOutCubic,
  });
  const y = useTransform(scrollYProgress, [0, 0.05, 0.1], [30, 30, 0], {
    ease: easeInOutCubic,
  });

  const headerSlot = (
    <div className="grid grid-cols-12 gap-x-6 gap-y-10 lg:gap-x-10">
      <motion.div
        className="col-span-12 flex flex-col gap-5 lg:col-span-4 lg:sticky lg:top-24 lg:self-start"
        style={{ opacity, y }}
      >
        <div className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <span aria-hidden>[003]</span>
          <span className="text-primary font-semibold">FAQ</span>
        </div>
        <h2 className="font-display text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          things to know
        </h2>
        <p className="text-lg leading-7 text-muted-foreground text-balance max-w-[40ch]">
          Bearer instruments are high-stakes. Read these before you put real
          money in.
        </p>
      </motion.div>

      <div className="col-span-12 lg:col-span-7 lg:col-start-6">
        <Accordion
          type="single"
          collapsible
          defaultValue="item-0"
          className="w-full"
        >
          {siteConfig.faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );

  return (
    <Section
      id="faq"
      index="003"
      variant="editorial"
      headerSlot={headerSlot}
      className="container mx-auto max-w-[var(--max-container-width)] px-6 py-[var(--section-y-base)] lg:px-10"
      ref={ref}
    />
  );
}
