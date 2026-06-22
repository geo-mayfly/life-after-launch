"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ease, inViewOnce } from "@/lib/motion";

/**
 * Pull-quote (brief §4.5, §6.3) — one big display-serif grab from the
 * interview. Scales 0.96→1 and fades in as it crosses centre. One per page.
 */
export default function PullQuote({
  text,
  attribution,
}: {
  text: string;
  attribution: string;
}) {
  const reduced = useReducedMotion();

  return (
    <figure className="mx-auto max-w-content px-5 py-sp-8 sm:px-8">
      <motion.blockquote
        initial={reduced ? false : { opacity: 0, scale: 0.96 }}
        whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
        viewport={inViewOnce}
        transition={{ duration: 0.72, ease }}
        className="font-display text-h1 italic leading-[1.08] text-ink"
      >
        <span aria-hidden className="text-marigold">
          “
        </span>
        {text}
        <span aria-hidden className="text-marigold">
          ”
        </span>
      </motion.blockquote>
      <figcaption className="mt-5 eyebrow text-deep-blue">
        — {attribution}
      </figcaption>
    </figure>
  );
}
