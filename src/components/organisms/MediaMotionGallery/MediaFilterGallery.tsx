"use client";

import { useState } from "react";
import { cn } from "cn";
import { MediaMotionGallery } from "./MediaMotionGallery";
import { mediaItems } from "@/data/media";
import type { MediaCategory } from "@/types/common";

const FILTERS: { label: string; value: MediaCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Products", value: "products" },
  { label: "Projects", value: "projects" },
  { label: "Warehouse", value: "warehouse" },
  { label: "Delivery", value: "delivery" },
  { label: "Partners", value: "partners" },
];

function MediaFilterGallery() {
  const [active, setActive] = useState<MediaCategory | "all">("all");
  const items = active === "all" ? mediaItems : mediaItems.filter((item) => item.category === active);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setActive(filter.value)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              active === filter.value
                ? "border-brand-gold bg-brand-gold text-brand-black"
                : "border-border text-foreground hover:border-brand-gold/50"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <MediaMotionGallery items={items} columns={4} height="h-[720px]" />
    </div>
  );
}

export { MediaFilterGallery };
