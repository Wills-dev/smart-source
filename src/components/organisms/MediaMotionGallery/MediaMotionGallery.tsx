"use client";

import { useState } from "react";
import { cn } from "cn";
import { MediaColumn } from "./MediaColumn";
import { MediaLightbox } from "./MediaLightbox";
import type { MediaItem } from "@/types/common";

const DURATIONS = [26, 34, 29, 38, 31, 25];

type ColumnCount = 3 | 4 | 5 | 6;

/** Tailwind needs literal class strings (not interpolated ones) to include them in the build. */
const GRID_COLS: Record<ColumnCount, string> = {
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
  6: "grid-cols-2 sm:grid-cols-4 lg:grid-cols-6",
};

/** Per-column responsive visibility, so the number of rendered columns matches the grid's track count at each breakpoint. */
const COLUMN_VISIBILITY: Record<ColumnCount, string[]> = {
  3: ["", "", "hidden sm:block"],
  4: ["", "", "hidden sm:block", "hidden lg:block"],
  5: ["", "", "hidden sm:block", "hidden lg:block", "hidden lg:block"],
  6: ["", "", "hidden sm:block", "hidden sm:block", "hidden lg:block", "hidden lg:block"],
};

interface MediaMotionGalleryProps {
  items: MediaItem[];
  columns?: ColumnCount;
  className?: string;
  height?: string;
}

function MediaMotionGallery({
  items,
  columns = 4,
  className,
  height = "h-[560px]",
}: MediaMotionGalleryProps) {
  const [selected, setSelected] = useState<MediaItem | null>(null);

  const buckets: MediaItem[][] = Array.from({ length: columns }, () => []);
  items.forEach((item, index) => buckets[index % columns].push(item));

  return (
    <div
      className={cn("relative overflow-hidden", height, className)}
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div className={cn("grid h-full gap-4", GRID_COLS[columns])}>
        {buckets.map((bucket, index) => (
          <div key={index} className={COLUMN_VISIBILITY[columns][index]}>
            <MediaColumn
              items={bucket}
              direction={index % 2 === 0 ? "up" : "down"}
              duration={DURATIONS[index % DURATIONS.length]}
              onSelect={setSelected}
            />
          </div>
        ))}
      </div>

      <MediaLightbox item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

export { MediaMotionGallery };
