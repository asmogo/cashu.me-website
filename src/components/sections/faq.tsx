"use client";

import { Section } from "@/components/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteConfig } from "@/lib/config";
import { useRef } from "react";

export function FAQ() {
  const ref = useRef<HTMLElement>(null);

  return (
    <Section
      id="faq"
      variant="editorial"
      hideHeader
      className="container mx-auto max-w-[var(--max-container-width)] px-6 py-[var(--section-y-base)] lg:px-10"
      ref={ref}
    >
      <div className="mx-auto max-w-3xl">
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
    </Section>
  );
}
