"use client";

import { useEffect, useRef, useState } from "react";

/**
 * StatCounter (brief §10.3) — the FINAL number is the source of truth and is
 * rendered as real text server-side (screen-reader / no-JS / crawler safe and
 * consistent across every page).
 *
 * The count-up is a purely visual enhancement, and ONLY plays for counters
 * that start below the fold and are then scrolled into view. Counters already
 * on screen at load show their final value immediately — so a hero counter is
 * never caught mid-animation showing a wrong/partial number. Reduced motion
 * shows the final value. aria-live off.
 */

type Props = {
  value: number;
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
  durationMs = 1100,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value); // final value at rest
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || started.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Already on screen at load → keep the final value (no on-load count-up).
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) return;

    const run = () => {
      started.current = true;
      const start = performance.now();
      setDisplay(0);
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs);
        const eased = 1 - Math.pow(1 - t, 3);
        if (t < 1) {
          setDisplay(value * eased);
          requestAnimationFrame(tick);
        } else {
          setDisplay(value); // always settle on the true value
        }
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {prefix}
      {format(display)}
      {suffix}
    </span>
  );
}
