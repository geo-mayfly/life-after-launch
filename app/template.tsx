"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ease, dur } from "@/lib/motion";

/**
 * Route transition (brief §4.3) — the incoming page rises 12px into place,
 * a soft "page turn on the wall". template.tsx re-mounts per navigation, so
 * this runs on every route change. The poster→page morph (View Transitions)
 * and this fade never collide: VT drives that nav, this drives the rest.
 * Header and Footer live in layout.tsx, outside this transition (stable frame).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: dur.slow, ease }}
    >
      {children}
    </motion.div>
  );
}
