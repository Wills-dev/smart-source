"use client";

import { FileText } from "lucide-react";
import { Button, type buttonVariants } from "@/components/ui/button";
import { useQuoteDialog } from "@/components/organisms/QuoteDialog";
import type { Product } from "@/types/product";
import type { VariantProps } from "class-variance-authority";

interface RequestQuoteButtonProps extends VariantProps<typeof buttonVariants> {
  product?: Pick<Product, "id" | "name">;
  className?: string;
  label?: string;
  showIcon?: boolean;
}

function RequestQuoteButton({
  product,
  className,
  variant = "default",
  size,
  label = "Request Quote",
  showIcon = false,
}: RequestQuoteButtonProps) {
  const { openQuote } = useQuoteDialog();

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={() => openQuote(product)}
    >
      {showIcon && <FileText data-icon="inline-start" />}
      {label}
    </Button>
  );
}

export { RequestQuoteButton };
