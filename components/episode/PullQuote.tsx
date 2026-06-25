"use client";

import { useEffect, useRef } from "react";

/**
 * Pull-quote (brief §4.5, §6.3) — one big display-serif grab from the
 * interview. Scales 0.96→1 and fades in as it crosses centre. Visible at rest
 * (SSR/no-JS safe): only armed when it starts below the fold; reduced motion
 * shows it immediately.
 */
export default function PullQuote({
  text,
  attribution,
}: {
  text: string;
  attribution: string;
}) {
  const ref = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) return; // already in view → leave visible

    el.style.opacity = "0";
    el.style.transform = "scale(0.96)";
    el.style.transition = "opacity 0.72s var(--ease), transform 0.72s var(--ease)";

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "none";
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure className="mx-auto max-w-content px-5 py-sp-8 sm:px-8">
      <blockquote
        ref={ref}
        className="font-display text-h1 italic leading-[1.08] text-ink"
      >
        <span aria-hidden className="text-marigold">
          “
        </span>
        {text}
        <span aria-hidden className="text-marigold">
          ”
        </span>
      </blockquote>
      <figcaption className="mt-5 eyebrow text-deep-blue">— {attribution}</figcaption>
    </figure>
  );
}
