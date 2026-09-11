import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { Reveal } from "@/components/atoms/Reveal";
import { TestimonialCard } from "@/components/molecules/TestimonialCard";
import { testimonials } from "@/data/testimonials";

function TestimonialsSection() {
  return (
    <section className="bg-muted/50 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Clients Say"
          description="Feedback from contractors, developers and teams who've sourced materials through SmartSource."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 0.05}>
              <TestimonialCard testimonial={testimonial} />
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Sample testimonials for illustration — replace with verified client feedback before launch.
        </p>
      </Container>
    </section>
  );
}

export { TestimonialsSection };
