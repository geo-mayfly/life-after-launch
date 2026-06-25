"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Marquee — a horizontal, auto-advancing, pausable, drag-to-browse rail
 * (brief §6.1 "Listener love"). Built on a natively-scrollable container so
 * it's keyboard/touch accessible and degrades gracefully; the auto-advance is
 * a rAF enhancement that pauses on hover/focus/press and stops under reduced
 * motion. Content is duplicated for a seamless loop.
 */
export default function Marquee({
  items,
  speed = 0.35,
  gap = 24,
}: {
  items: ReactNode[];
  speed?: number;
  gap?: number;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    let raf = 0;
    const step = () => {
      if (!paused.current) {
        el.scrollLeft += speed;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const pause = () => (paused.current = true);
    const resume = () => (paused.current = false);
    el.addEventListener("pointerenter", pause);
    el.addEventListener("pointerleave", resume);
    el.addEventListener("pointerdown", pause);
    window.addEventListener("pointerup", resume);
    el.addEventListener("focusin", pause);
    el.addEventListener("focusout", resume);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", pause);
      el.removeEventListener("pointerleave", resume);
      el.removeEventListener("pointerdown", pause);
      window.removeEventListener("pointerup", resume);
      el.removeEventListener("focusin", pause);
      el.removeEventListener("focusout", resume);
    };
  }, [speed]);

  const doubled = [...items, ...items];

  return (
    <div
      ref={scroller}
      className="drag-cursor no-scrollbar overflow-x-auto focus-visible:outline-none"
      style={{ scrollbarWidth: "none" }}
      role="group"
      aria-label="Listener testimonials — scroll to browse"
      tabIndex={0}
    >
      <div className="flex w-max" style={{ gap }}>
        {doubled.map((item, i) => (
          <div key={i} aria-hidden={i >= items.length} className="shrink-0">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
