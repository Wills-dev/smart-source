"use client";

import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuoteDialog } from "@/components/organisms/QuoteDialog";
import { siteConfig } from "@/config/site";
import type { Product } from "@/types/product";

interface MobileStickyActionsProps {
  product: Product;
}

function MobileStickyActions({ product }: MobileStickyActionsProps) {
  const { openQuote } = useQuoteDialog();
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    `Hello SmartSource, I'm interested in ${product.name}.`
  )}`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-2 border-t border-border bg-background/95 p-3 backdrop-blur-md lg:hidden">
      <Button variant="outline" size="icon" render={<a href={`tel:${siteConfig.contact.phone}`} />} aria-label="Call SmartSource">
        <Phone />
      </Button>
      <Button
        variant="outline"
        size="icon"
        render={<a href={whatsappHref} target="_blank" rel="noopener noreferrer" />}
        aria-label="WhatsApp SmartSource"
        className="border-[#25D366]/40 text-[#128C4A]"
      >
        <MessageCircle />
      </Button>
      <Button
        className="flex-1"
        onClick={() => openQuote({ id: product.id, name: product.name })}
      >
        Request Quote
      </Button>
    </div>
  );
}

export { MobileStickyActions };
