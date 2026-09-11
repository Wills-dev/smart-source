import { cn } from "cn";
import { Circle } from "lucide-react";
import { AVAILABILITY_LABEL } from "@/lib/constants";
import type { ProductAvailability } from "@/types/product";

const DOT_COLOR: Record<ProductAvailability, string> = {
  "in-stock": "text-brand-gold",
  limited: "text-brand-silver",
  "pre-order": "text-brand-charcoal",
  "out-of-stock": "text-muted-foreground",
};

interface AvailabilityBadgeProps {
  availability: ProductAvailability;
  className?: string;
}

function AvailabilityBadge({ availability, className }: AvailabilityBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground",
        className
      )}
    >
      <Circle className={cn("size-2 fill-current", DOT_COLOR[availability])} />
      {AVAILABILITY_LABEL[availability]}
    </span>
  );
}

export { AvailabilityBadge };
