"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";
import { ease, easePop } from "@/lib/motion";
import { site } from "@/content/site";
import BlueWall from "@/components/brand/BlueWall";
import CloudHead from "@/components/brand/CloudHead";
import Eyebrow from "@/components/ui/Eyebrow";
import ListenSheet from "@/components/episode/ListenSheet";

const LAUNCH = "LAUNCH".split("");

/**
 * The cinematic hero (set-piece §4.4a). Full-viewport textured wall: the
 * wordmark draws in (letter-by-letter mask reveal on LAUNCH), a cloud-head
 * rises and occludes the lettering, one marigold CTA pops last. A slow,
 * low-amplitude pointer parallax drifts the cloud only — never the type.
 * Fully static under reduced motion.
 */
export default function HomeHero() {
  const reduced = useReducedMotion();

  // Pointer parallax (≤12px) — the one sanctioned drift. Cloud only.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });
  const driftX = useTransform(sx, [-1, 1], [-12, 12]);
  const driftY = useTransform(sy, [-1, 1], [-10, 10]);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth) * 2 - 1);
      py.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, reduced]);

  const show = reduced ? "show" : undefined;

  return (
    <BlueWall
      tone="launch"
      as="section"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
      vignette={0.5}
    >
      {/* The wall "unpacks" from ink-navy on first paint. */}
      {!reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2] bg-ink-navy"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6, ease }}
        />
      )}

      <div className="relative z-[1] mx-auto w-full max-w-wall px-5 pb-16 pt-28 sm:px-8">
        <div className="relative max-w-4xl">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.42, ease }}
          >
            <Eyebrow on="dark">AN AUSSIE FOUNDERS CLUB PODCAST</Eyebrow>
          </motion.div>

          {/* Wordmark — poster scale. "Life After" then masked "LAUNCH". */}
          <h1
            className="mt-5 font-display text-hero leading-[0.92] text-marigold"
            aria-label="Life After Launch"
          >
            <motion.span
              aria-hidden
              className="block italic"
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease }}
            >
              Life After
            </motion.span>
            <span aria-hidden className="mt-1 flex overflow-hidden tracking-[0.01em]">
              {LAUNCH.map((letter, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={reduced ? false : { y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 0.45 + i * 0.04, duration: 0.6, ease }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            className="mt-7 max-w-xl text-lead text-on-blue"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.42, ease }}
          >
            {site.elevatorPitch}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-6"
            initial={reduced ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.4, ease: easePop }}
          >
            <ListenSheet />
            <Link
              href="/episodes"
              className="spark-link text-on-blue-soft hover:text-on-blue"
            >
              Start with the latest →
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Cloud-head — rises, drifts, and occludes the wordmark (signature move). */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-[-2%] z-[1] hidden lg:block"
        style={reduced ? undefined : { x: driftX, y: driftY }}
        initial={reduced ? false : { opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7, ease }}
      >
        <CloudHead size={460} color="rgba(255,255,255,0.9)" drift={!reduced} />
      </motion.div>
    </BlueWall>
  );
}
