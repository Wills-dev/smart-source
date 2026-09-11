"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "cn";

interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  step?: number;
  className?: string;
}

function QuantityInput({ value, onChange, min = 1, step = 1, className }: QuantityInputProps) {
  return (
    <div className={cn("inline-flex items-center rounded-lg border border-border", className)}>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => onChange(Math.max(min, value - step))}
        aria-label="Decrease quantity"
      >
        <Minus />
      </Button>
      <span className="min-w-10 px-1 text-center text-sm font-medium tabular-nums">{value}</span>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => onChange(value + step)}
        aria-label="Increase quantity"
      >
        <Plus />
      </Button>
    </div>
  );
}

export { QuantityInput };
