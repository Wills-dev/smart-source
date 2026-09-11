import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { Reveal } from "@/components/atoms/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/faqs";

interface FaqSectionProps {
  items?: typeof faqs;
  title?: string;
}

function FaqSection({ items = faqs, title = "Frequently Asked Questions" }: FaqSectionProps) {
  return (
    <section className="py-20 sm:py-28">
      <Container width="narrow">
        <SectionHeading eyebrow="FAQ" title={title} align="center" className="mx-auto" />

        <Reveal className="mt-10">
          <Accordion className="border-t border-border">
            {items.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="py-4 text-base">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  );
}

export { FaqSection };
