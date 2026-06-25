"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { Episode } from "@/content/schema";
import { episodeEyebrow } from "@/lib/content";
import { ease } from "@/lib/motion";
import BlueWall from "@/components/brand/BlueWall";
import Eyebrow from "@/components/ui/Eyebrow";
import EpisodeCover from "@/components/episode/EpisodeCover";
import ListenButtons from "@/components/episode/ListenButtons";
import VinylRecord from "@/components/episode/VinylRecord";

/**
 * ExploreWall — the immersive, full-bleed episode grid (acquired.fm style).
 * Hovering a tile lifts it and dims the rest; CLICKING a tile blooms it into a
 * full-screen takeover via a shared-element morph (the cover flies from the
 * grid to the takeover) while a marigold-labelled vinyl record slides out
 * behind it — the brand's "play" moment. Back / Esc / ✕ reverse it.
 *
 * Reduced motion: no morph, no spin, no dim — a plain cross-fade.
 */
export default function ExploreWall({ episodes }: { episodes: Episode[] }) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const active = episodes.find((e) => e.slug === activeSlug) ?? null;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!activeSlug) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveSlug(null);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [activeSlug]);

  return (
    <BlueWall
      tone="navy"
      as="section"
      className="py-sp-9"
      vignette={0.55}
      aria-labelledby="explore-heading"
    >
      <div className="mx-auto max-w-wall px-5 sm:px-8">
        <div className="mb-9 flex items-end justify-between gap-4">
          <div>
            <Eyebrow on="dark">THE LIBRARY</Eyebrow>
            <h2 id="explore-heading" className="mt-3 font-display text-h2 text-on-blue">
              Explore every episode.
            </h2>
          </div>
          <Link href="/episodes" className="spark-link shrink-0 font-semibold text-on-blue">
            All episodes →
          </Link>
        </div>

        <div
          className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3"
          onMouseLeave={() => setHovered(null)}
        >
          {episodes.map((e) => {
            const dimmed = hovered !== null && hovered !== e.slug;
            return (
              <motion.button
                key={e.slug}
                type="button"
                onClick={() => setActiveSlug(e.slug)}
                onMouseEnter={() => setHovered(e.slug)}
                onFocus={() => setHovered(e.slug)}
                onBlur={() => setHovered(null)}
                className="group relative aspect-[4/5] rounded-md"
                aria-label={`Preview ${e.episodeTitle} — ${e.hook}`}
                animate={
                  reduced
                    ? undefined
                    : { scale: hovered === e.slug ? 1.04 : 1, opacity: dimmed ? 0.5 : 1 }
                }
                transition={{ duration: 0.32, ease }}
                style={{ zIndex: hovered === e.slug ? 2 : 1 }}
              >
                <motion.div
                  layoutId={reduced ? undefined : `explore-${e.slug}`}
                  className="absolute inset-0 overflow-hidden rounded-md shadow-sm transition-shadow duration-base group-hover:shadow-lg"
                >
                  <EpisodeCover episode={e} />
                </motion.div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Portal to body so the fixed overlay escapes this section's stacking
          context (and sits above the header). */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {active && (
              <Takeover
                key={active.slug}
                episode={active}
                reduced={!!reduced}
                onClose={() => setActiveSlug(null)}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </BlueWall>
  );
}

function Takeover({
  episode,
  reduced,
  onClose,
}: {
  episode: Episode;
  reduced: boolean;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100]"
      role="dialog"
      aria-modal="true"
      aria-label={episode.episodeTitle}
      initial={{ opacity: reduced ? 1 : 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease }}
    >
      <BlueWall tone={episode.tone} className="h-full w-full" vignette={0.6}>
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close preview"
          className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(255,255,255,0.3)] text-on-blue transition-colors hover:bg-[rgba(255,255,255,0.12)]"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="mx-auto flex h-full max-w-wall items-center px-5 sm:px-8">
          <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Details */}
          <motion.div
            className="relative z-10 order-2 lg:order-1"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: 16 }}
            transition={{ delay: reduced ? 0 : 0.12, duration: 0.42, ease }}
          >
            <button onClick={onClose} className="spark-link eyebrow text-on-blue">
              ← Back
            </button>
            <p className="mt-7 eyebrow text-on-blue-soft">{episodeEyebrow(episode)}</p>
            <h2 className="mt-3 max-w-xl font-display text-hero leading-[0.98] text-on-blue">
              {episode.episodeTitle}
            </h2>
            <p className="mt-5 max-w-md text-lead text-on-blue">{episode.hook}</p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <ListenButtons listen={episode.listen} />
              <Link
                href={`/episodes/${episode.slug}`}
                className="spark-link font-semibold text-on-blue"
              >
                Episode page →
              </Link>
            </div>
          </motion.div>

          {/* Media: the cover (morphed) + the record sliding out behind it */}
          <div className="relative order-1 hidden items-center justify-center lg:order-2 lg:flex">
            <motion.div
              aria-hidden
              className="absolute"
              initial={reduced ? { opacity: 0 } : { x: -40, opacity: 0, scale: 0.86 }}
              animate={reduced ? { opacity: 1 } : { x: "34%", opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: 0 }}
              transition={{ delay: reduced ? 0 : 0.12, duration: 0.6, ease }}
            >
              <VinylRecord episode={episode} size={420} spinning={!reduced} />
            </motion.div>

            <motion.div
              layoutId={reduced ? undefined : `explore-${episode.slug}`}
              className="relative z-10 aspect-[4/5] w-[320px] overflow-hidden rounded-lg shadow-lg"
            >
              <EpisodeCover episode={episode} caption={false} />
            </motion.div>
            </div>
          </div>
        </div>
      </BlueWall>
    </motion.div>
  );
}
