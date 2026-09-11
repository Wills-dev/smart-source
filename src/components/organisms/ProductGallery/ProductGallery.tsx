"use client";

import { useState } from "react";
import { cn } from "cn";
import { Expand } from "lucide-react";
import { ImageWithFallback } from "@/components/atoms/ImageWithFallback";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const gallery = images.length > 0 ? images : ["/images/products/placeholder.jpg"];

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        className="group relative aspect-square w-full overflow-hidden rounded-lg bg-muted"
      >
        <ImageWithFallback
          src={gallery[active]}
          alt={`${productName} — image ${active + 1}`}
          fallbackLabel={productName}
          sizes="(min-width: 1024px) 45vw, 100vw"
          priority
        />
        <span className="absolute right-3 bottom-3 flex size-9 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100">
          <Expand className="size-4" />
        </span>
      </button>

      {gallery.length > 1 && (
        <div className="scrollbar-none flex gap-2 overflow-x-auto">
          {gallery.map((image, index) => (
            <button
              key={image + index}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                "relative aspect-square w-16 shrink-0 overflow-hidden rounded-md border-2 transition-colors",
                active === index ? "border-brand-gold" : "border-transparent hover:border-border"
              )}
            >
              <ImageWithFallback src={image} alt={`${productName} thumbnail ${index + 1}`} sizes="64px" />
            </button>
          ))}
        </div>
      )}

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-3xl overflow-hidden p-0 sm:max-w-3xl">
          <DialogTitle className="sr-only">{productName}</DialogTitle>
          <div className="relative aspect-square w-full bg-muted">
            <ImageWithFallback src={gallery[active]} alt={productName} fallbackLabel={productName} sizes="768px" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { ProductGallery };
