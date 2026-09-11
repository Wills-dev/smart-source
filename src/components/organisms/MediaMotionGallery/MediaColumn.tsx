"use client";

import { motion } from "framer-motion";
import { MediaTile } from "@/components/molecules/MediaTile";
import type { MediaItem } from "@/types/common";

interface MediaColumnProps {
  items: MediaItem[];
  direction: "up" | "down";
  duration: number;
  onSelect?: (item: MediaItem) => void;
}

/** Items are duplicated so animating exactly -50%/0% loops seamlessly with no visible jump. */
function MediaColumn({ items, direction, duration, onSelect }: MediaColumnProps) {
  const track = [...items, ...items];

  return (
    <div className="relative h-full overflow-hidden">
      <motion.div
        className="flex flex-col gap-4"
        animate={{ y: direction === "up" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {track.map((item, index) => (
          <MediaTile key={`${item.id}-${index}`} item={item} onSelect={onSelect} />
        ))}
      </motion.div>
    </div>
  );
}

export { MediaColumn };
