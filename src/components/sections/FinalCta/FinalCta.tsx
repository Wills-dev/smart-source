import { Container } from "@/components/atoms/Container";
import { Reveal } from "@/components/atoms/Reveal";
import { ImageWithFallback } from "@/components/atoms/ImageWithFallback";
import { RequestQuoteButton } from "@/components/molecules/RequestQuoteButton";
import { CallButton } from "@/components/molecules/CallButton";

function FinalCta() {
  return (
    <section className="relative flex min-h-[50vh] items-center overflow-hidden bg-brand-black">
      <ImageWithFallback
        src="/images/company/project-team.jpg"
        alt="SmartSource project delivery team"
        sizes="100vw"
        className="opacity-50"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-black/40" />

      <Container className="relative">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
          <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            Need Materials for Your Next Project?
          </h2>
          <p className="max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
            Tell us what you&apos;re building and we&apos;ll help you source the right materials.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <RequestQuoteButton size="xl" label="Request a Quote" />
            <CallButton
              size="xl"
              variant="outline"
              className="border-white/40 bg-white/5 text-white hover:bg-white/15 hover:text-white"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export { FinalCta };
