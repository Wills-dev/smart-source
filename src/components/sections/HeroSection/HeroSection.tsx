"use client";

import { useEffect, useState } from "react";
import { cn } from "cn";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { HeroSlide } from "./HeroSlide";
import { heroSlides } from "@/data/heroSlides";

const AUTOPLAY_MS = 6500;

function HeroSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    // Syncs to embla's imperative API (created async via ref callback) — no
    // declarative alternative for reading its current index on attach.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="relative min-h-[75vh]">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        className="h-[75vh] min-h-130"
      >
        <CarouselContent className="ml-0 h-[75vh] min-h-130">
          {heroSlides.map((slide, index) => (
            <CarouselItem key={slide.id} className="h-[75vh] min-h-130 pl-0">
              <HeroSlide
                slide={slide}
                active={current === index}
                priority={index === 0}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              current === index
                ? "w-8 bg-brand-gold"
                : "w-1.5 bg-white/50 hover:bg-white/70",
            )}
          />
        ))}
      </div>
    </section>
  );
}

export { HeroSection };
