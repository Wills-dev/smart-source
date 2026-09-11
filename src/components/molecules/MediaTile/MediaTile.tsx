"use client";

import { cn } from "cn";
import { ImageWithFallback } from "@/components/atoms/ImageWithFallback";
import type { MediaItem } from "@/types/common";

const ASPECT: Record<MediaItem["aspect"], string> = {
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
  tall: "aspect-[2/3]",
};

interface MediaTileProps {
  item: MediaItem;
  onSelect?: (item: MediaItem) => void;
  className?: string;
}

function MediaTile({ item, onSelect, className }: MediaTileProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(item)}
      className={cn(
        "group relative block w-full overflow-hidden rounded-md bg-brand-charcoal outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
        ASPECT[item.aspect],
        className
      )}
    >
      <ImageWithFallback
        src={item.image}
        alt={item.caption}
        sizes="(min-width: 1024px) 20vw, 45vw"
        className="transition-transform duration-500 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
    </button>
  );
}

export { MediaTile };
