"use client";

import { useEffect, useRef, useState } from "react";

/**
 * StatCounter (brief §10.3) — the FINAL number renders as real text server-side
 * (so screen-reader / no-JS / crawler users always get the meaningful value).
 * The count-up is a purely visual enhancement layered over it: runs once on
 * first view, skipped (final value shown) under reduced motion. aria-live off.
 */

type Props = {
  value: number;
  /** Prefix/suffix rendered verbatim, e.g. suffix "x" → "5x". */
  prefix?: string;
  suffix?: string;
  className?: string;
  durationMs?: number;
};

function format(n: number) {
  return Math.round(n).toLocaleString("en-AU");
}

export default function StatCounter({
  value,
  prefix = "",
  suffix = "",
  className = "",
  durationMs = 1200,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  // Initial render = the real final value (SSR + no-JS safe).
  const [display, setDisplay] = useState(value);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || done.current) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return; // leave the final value in place

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || done.current) return;
        done.current = true;
        io.disconnect();

        const start = performance.now();
        setDisplay(0);
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          // ease-out
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(value * eased);
          if (t < 1) requestAnimationFrame(tick);
          else setDisplay(value);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, durationMs]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {prefix}
      {format(display)}
      {suffix}
    </span>
  );
}
