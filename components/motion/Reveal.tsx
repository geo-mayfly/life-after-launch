"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Tier-1 in-view reveal (brief §4.2) — soft fade + small rise.
 *
 * Robustness first: content ships VISIBLE (the JSX renders with no hidden
 * styles, so SSR / no-JS / crawlers always see it). On the client we only
 * HIDE elements that are currently BELOW the fold, then reveal them as they
 * scroll in. Above-the-fold content is never touched — no "empty void on
 * load", no flash. Reduced motion leaves everything visible.
 */

type Tag = "div" | "ol" | "ul" | "li" | "span" | "p" | "section" | "article" | "figure";

const FOLD = 0.92; // treat anything starting above 92% of the viewport as "in view"

function prefersReduced() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className,
  ...rest
}: {
  children: ReactNode;
  as?: Tag;
  delay?: number;
  className?: string;
} & Record<`data-${string}`, string | undefined>) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * FOLD) return; // already in view → stay visible

    el.style.setProperty("--reveal-delay", `${delay}s`);
    el.dataset.reveal = "armed";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.reveal = "in";
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const Comp = Tag as "div";
  return (
    <Comp ref={ref as React.Ref<HTMLDivElement>} className={className} {...rest}>
      {children}
    </Comp>
  );
}

/**
 * Stagger — reveals direct <RevealItem> children in sequence. Same rules:
 * visible at rest; only hidden+revealed when the group is below the fold.
 */
export function Stagger({
  children,
  as: Tag = "div",
  className,
  stagger = 0.07,
}: {
  children: ReactNode;
  as?: Tag;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(
      el.querySelectorAll<HTMLElement>(":scope > [data-reveal-item]"),
    );
    if (!items.length || prefersReduced()) return;

    const playIn = () =>
      items.forEach((it, i) => {
        it.style.transitionDelay = `${i * stagger}s`;
        it.dataset.revealItem = "in";
      });

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * FOLD) {
      playIn(); // in view at load → already visible; keep them visible
      return;
    }

    items.forEach((it) => (it.dataset.revealItem = "armed"));
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playIn();
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [stagger]);

  const Comp = Tag as "div";
  return (
    <Comp ref={ref as React.Ref<HTMLDivElement>} className={className}>
      {children}
    </Comp>
  );
}

export function RevealItem({
  children,
  as: Tag = "div",
  className,
}: {
  children: ReactNode;
  as?: Tag;
  className?: string;
}) {
  const Comp = Tag as "div";
  // data-reveal-item present (empty) at rest = visible; Stagger toggles it.
  return (
    <Comp className={className} data-reveal-item="">
      {children}
    </Comp>
  );
}

export default Reveal;
