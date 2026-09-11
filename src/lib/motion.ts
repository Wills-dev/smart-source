import type { Variants, Transition } from "framer-motion";

/**
 * Shared Framer Motion presets so animation stays consistent instead of
 * ad-hoc per component. Reduced-motion is handled globally via
 * <MotionConfig reducedMotion="user"> in app/layout.tsx, which
 * automatically disables transform/scale animation for users who have
 * requested it at the OS level — no per-component checks needed.
 *
 * "visible" is a function of `custom` (an optional delay in seconds) rather
 * than a fixed object — Framer Motion uses a variant's own `transition` in
 * place of any `transition` prop on the component, so per-instance delay
 * has to flow through `custom` instead of a transition prop override.
 */

export const easeOut: Transition["ease"] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut, delay },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: easeOut, delay },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut, delay },
  }),
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOut, delay },
  }),
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOut, delay },
  }),
};

export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: easeOut, delay },
  }),
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const viewportOnce = { once: true, margin: "-80px" } as const;
