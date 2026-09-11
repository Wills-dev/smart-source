"use client";

import { MotionConfig } from "framer-motion";

/** Wraps the app so every Framer Motion animation respects prefers-reduced-motion automatically. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
