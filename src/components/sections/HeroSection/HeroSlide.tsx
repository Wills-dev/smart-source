"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/components/atoms/ImageWithFallback";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/atoms/Container";
import { staggerContainer, fadeUp, imageReveal } from "@/lib/motion";
import type { HeroSlide as HeroSlideType } from "@/types/common";

interface HeroSlideProps {
  slide: HeroSlideType;
  active: boolean;
  priority?: boolean;
}

function HeroSlide({ slide, active, priority = false }: HeroSlideProps) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-brand-charcoal">
      <motion.div
        className="absolute inset-0"
        initial="hidden"
        animate={active ? "visible" : "hidden"}
        variants={imageReveal}
      >
        {/* next/image has no native art-direction support, so the mobile crop
            is swapped in via a CSS breakpoint rather than a single <img sizes>. */}
        <div className="absolute inset-0 sm:hidden">
          <ImageWithFallback
            src={slide.mobileImage ?? slide.image}
            alt={slide.title}
            fallbackLabel={slide.title}
            sizes="100vw"
            priority={priority}
          />
        </div>
        <div className="absolute inset-0 hidden sm:block">
          <ImageWithFallback
            src={slide.image}
            alt={slide.title}
            fallbackLabel={slide.title}
            sizes="100vw"
            priority={priority}
          />
        </div>
      </motion.div>
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/30" />

      <Container className="relative flex h-full items-end pb-16 sm:items-center sm:pb-0">
        <motion.div
          className="flex max-w-2xl flex-col gap-5"
          initial="hidden"
          animate={active ? "visible" : "hidden"}
          variants={staggerContainer(0.12, 0.2)}
        >
          <motion.h1
            variants={fadeUp}
            className="font-heading text-4xl leading-[1.08] font-semibold text-white sm:text-5xl lg:text-[4.5rem]"
          >
            {slide.title}
          </motion.h1>
          <motion.p variants={fadeUp} className="max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
            {slide.description}
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 pt-2">
            <Button size="xl" render={<Link href={slide.href} />}>
              {slide.ctaLabel}
              <ArrowRight data-icon="inline-end" />
            </Button>
            {slide.secondaryCtaLabel && slide.secondaryHref && (
              <Button
                size="xl"
                variant="outline"
                className="border-white/40 bg-white/5 text-white hover:bg-white/15 hover:text-white"
                render={<Link href={slide.secondaryHref} />}
              >
                {slide.secondaryCtaLabel}
              </Button>
            )}
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}

export { HeroSlide };
