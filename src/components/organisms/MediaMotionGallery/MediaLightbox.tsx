"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ImageWithFallback } from "@/components/atoms/ImageWithFallback";
import type { MediaItem } from "@/types/common";

interface MediaLightboxProps {
  item: MediaItem | null;
  onClose: () => void;
}

function MediaLightbox({ item, onClose }: MediaLightboxProps) {
  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl overflow-hidden p-0 sm:max-w-2xl">
        <DialogTitle className="sr-only">{item?.caption ?? "Media"}</DialogTitle>
        {item && (
          <>
            <div className="relative aspect-[4/3] w-full bg-brand-charcoal">
              <ImageWithFallback src={item.image} alt={item.caption} fallbackLabel={item.caption} sizes="672px" />
            </div>
            <p className="px-4 py-3 text-sm text-muted-foreground">{item.caption}</p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export { MediaLightbox };
