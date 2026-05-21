import { Section } from "@/components/section";
import { AccordionItem } from "@/components/ui/accordion";
import { siteConfig } from "@/lib/config";

export function FAQ() {
  return (
    <Section
      id="faq"
      variant="editorial"
      hideHeader
      className="container mx-auto max-w-[var(--max-container-width)] px-6 py-[var(--section-y-base)] lg:px-10"
    >
      <div className="mx-auto max-w-3xl">
        {siteConfig.faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            question={faq.question}
            defaultOpen={index === 0}
          >
            {faq.answer}
          </AccordionItem>
        ))}
      </div>
    </Section>
  );
}
