import { Section } from "@/components/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteConfig } from "@/lib/config";

export function FAQ() {
  return (
    <Section
      id="faq"
      title="FAQ"
      subtitle="things to know"
      description="Bearer instruments are high-stakes. Read these before you put real money in."
      className="container mx-auto max-w-[var(--max-container-width)] px-6 lg:px-10"
    >
      <Accordion
        type="single"
        collapsible
        defaultValue="item-0"
        className="mx-auto w-full max-w-2xl py-6"
      >
        {siteConfig.faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
