"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { reveal, staggerContainer, inViewOnce, ease, dur } from "@/lib/motion";

/**
 * Tier-1 in-view reveal (brief §4.2) — soft fade + small rise, once at ~12%.
 * The workhorse animation across every page. Honours reduced motion.
 */

type Tag = "div" | "ol" | "ul" | "li" | "span" | "p" | "section" | "article";

const MOTION = {
  div: motion.div,
  ol: motion.ol,
  ul: motion.ul,
  li: motion.li,
  span: motion.span,
  p: motion.p,
  section: motion.section,
  article: motion.article,
} as const;

type RevealProps = {
  children: ReactNode;
  as?: Tag;
  delay?: number;
  className?: string;
  // Allow data-* and aria-* passthrough on the wrapper.
  [key: `data-${string}`]: string | undefined;
};

export function Reveal({ children, as = "div", delay = 0, className, ...rest }: RevealProps) {
  const reduced = useReducedMotion();
  const Comp = MOTION[as];
  const Plain = as;

  if (reduced) {
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={inViewOnce}
      variants={{
        hidden: reveal.hidden,
        show: { opacity: 1, y: 0, transition: { duration: dur.slow, ease, delay } },
      }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Container that staggers child <RevealItem>s. */
export function Stagger({
  children,
  className,
  stagger = 0.07,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: Tag;
}) {
  const reduced = useReducedMotion();
  const Comp = MOTION[as];
  const Plain = as;
  if (reduced) return <Plain className={className}>{children}</Plain>;
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={inViewOnce}
      variants={staggerContainer(stagger)}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
}) {
  const reduced = useReducedMotion();
  const Comp = MOTION[as];
  const Plain = as;
  if (reduced) return <Plain className={className}>{children}</Plain>;
  return (
    <Comp className={className} variants={reveal}>
      {children}
    </Comp>
  );
}

export default Reveal;
