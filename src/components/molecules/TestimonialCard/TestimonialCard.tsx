import { Quote } from "lucide-react";
import { cn } from "cn";
import { ImageWithFallback } from "@/components/atoms/ImageWithFallback";
import type { Testimonial } from "@/types/common";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col gap-5 rounded-lg border border-border bg-card p-6",
        className
      )}
    >
      <Quote className="size-6 text-brand-gold" />
      <p className="flex-1 text-sm leading-relaxed text-foreground/90 sm:text-base">
        “{testimonial.quote}”
      </p>
      <div className="flex items-center gap-3 pt-2">
        <div className="relative size-11 shrink-0 overflow-hidden rounded-full">
          <ImageWithFallback
            src={testimonial.image}
            alt={testimonial.name}
            fallbackLabel={testimonial.name.charAt(0)}
            sizes="44px"
          />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">
            {testimonial.role}
            {testimonial.company ? ` · ${testimonial.company}` : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export { TestimonialCard };
