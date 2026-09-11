import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { Reveal } from "@/components/atoms/Reveal";
import { ProcessStep } from "@/components/molecules/ProcessStep";

const STEPS = [
  { title: "Tell Us What You Need", description: "Share your material list, project scope or a single product enquiry." },
  { title: "We Source & Confirm", description: "Our team checks availability, pricing and delivery for your location." },
  { title: "Receive Your Quote", description: "Get a tailored quotation covering everything you asked for." },
  { title: "Confirm Your Order", description: "Approve the quote and confirm quantities before dispatch." },
  { title: "Delivery Coordination", description: "We coordinate delivery timing around your site schedule." },
];

function HowItWorks() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title="From Enquiry to Delivery"
          description="A straightforward process built around how contractors and developers actually procure materials."
        />

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.06}>
              <ProcessStep index={index + 1} title={step.title} description={step.description} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export { HowItWorks };
