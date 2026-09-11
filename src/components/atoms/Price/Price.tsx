import { cn } from "cn";
import { formatCurrency } from "@/lib/currency";
import type { ProductUnit } from "@/types/product";

interface PriceProps {
  value: number;
  unit?: ProductUnit;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const SIZE = {
  sm: "text-sm",
  md: "text-base font-semibold",
  lg: "text-2xl font-semibold",
} as const;

function Price({ value, unit, className, size = "md" }: PriceProps) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-1 text-foreground whitespace-nowrap",
        SIZE[size],
        className
      )}
    >
      {formatCurrency(value)}
      {unit && <span className="text-sm font-normal text-muted-foreground">/ {unit}</span>}
    </span>
  );
}

export { Price };
