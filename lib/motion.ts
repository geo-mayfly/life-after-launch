import type { Variants, Transition } from "framer-motion";

/**
 * Motion tokens (brief §4.1) — defined once, imported everywhere.
 * Framer Motion equivalents of the CSS easings/durations.
 */
export const ease = [0.22, 0.61, 0.36, 1] as const; // confident ease-out
export const easePop = [0.34, 1.56, 0.64, 1] as const; // slight overshoot

export const dur = {
  fast: 0.14,
  base: 0.24,
  slow: 0.42,
  scene: 0.72,
} as const;

/** Tier-1 in-view reveal: soft fade + small rise. The workhorse animation. */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: dur.slow, ease },
  },
};

/** Container that staggers its children's reveal (60–80ms). */
export function staggerContainer(stagger = 0.07, delayChildren = 0): Variants {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

/** Press feedback for buttons (scale down with a touch of pop). */
export const pressable = {
  whileTap: { scale: 0.98 },
  transition: { duration: dur.fast, ease: easePop } as Transition,
};

/** Shared viewport config for in-view reveals — fire once at ~12% visibility. */
export const inViewOnce = { once: true, amount: 0.12 } as const;

/** Default route transition (brief §4.3). */
export const routeTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: dur.slow, ease } },
  exit: { opacity: 0, y: -12, transition: { duration: dur.base, ease } },
};
