import { Container } from "@/components/atoms/Container";
import { Reveal } from "@/components/atoms/Reveal";
import { ImageWithFallback } from "@/components/atoms/ImageWithFallback";
import { RequestQuoteButton } from "@/components/molecules/RequestQuoteButton";

function FeaturedBanner() {
  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden bg-brand-charcoal">
      <ImageWithFallback
        src="/images/company/project-site.jpg"
        alt="Construction site with stacked materials"
        sizes="100vw"
        className="opacity-70"
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/50 to-black/20" />

      <Container className="relative">
        <Reveal className="flex max-w-xl flex-col gap-5">
          <span className="text-xs font-medium tracking-[0.2em] text-brand-gold uppercase">
            Project-Scale Sourcing
          </span>
          <h2 className="font-heading text-3xl leading-tight font-semibold text-white sm:text-4xl lg:text-5xl">
            Building at Scale?
          </h2>
          <p className="text-base leading-relaxed text-white/80 sm:text-lg">
            Request a custom material quotation for your project — we&apos;ll help you source everything from
            foundation to finish.
          </p>
          <div className="pt-2">
            <RequestQuoteButton size="xl" label="Request a Quote" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export { FeaturedBanner };
