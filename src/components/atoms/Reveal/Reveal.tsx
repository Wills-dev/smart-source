"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";

interface RevealProps {
  children: React.ReactNode;
  variants?: Variants;
  delay?: number;
  className?: string;
}

/** Scroll-triggered entrance animation — fires once, respects reduced-motion globally via MotionProvider. */
function Reveal({ children, variants = fadeUp, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export { Reveal };
