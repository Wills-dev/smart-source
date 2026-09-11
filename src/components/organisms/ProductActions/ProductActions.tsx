"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuantityInput } from "@/components/molecules/QuantityInput";
import { CallButton } from "@/components/molecules/CallButton";
import { useQuoteDialog } from "@/components/organisms/QuoteDialog";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { siteConfig } from "@/config/site";
import type { Product } from "@/types/product";

interface ProductActionsProps {
  product: Product;
}

function ProductActions({ product }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(product.minimumOrder ?? 1);
  const { openQuote } = useQuoteDialog();
  const { addProductId } = useRecentlyViewed();

  useEffect(() => {
    addProductId(product.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    `Hello SmartSource, I'm interested in ${product.name}.`
  )}`;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-foreground">Quantity</span>
        <QuantityInput value={quantity} onChange={setQuantity} min={product.minimumOrder ?? 1} />
        {product.minimumOrder && (
          <span className="text-xs text-muted-foreground">Min. order: {product.minimumOrder}</span>
        )}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          size="lg"
          className="flex-1"
          onClick={() => openQuote({ id: product.id, name: product.name })}
        >
          Request Quote
        </Button>
        <CallButton size="lg" variant="outline" className="flex-1" label="Call to Order" />
        <Button
          size="lg"
          variant="outline"
          className="flex-1 border-[#25D366]/40 text-[#128C4A] hover:bg-[#25D366]/10"
          render={<a href={whatsappHref} target="_blank" rel="noopener noreferrer" />}
        >
          <MessageCircle data-icon="inline-start" />
          WhatsApp
        </Button>
      </div>
    </div>
  );
}

export { ProductActions };
