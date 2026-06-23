"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import type { Episode } from "@/content/schema";
import { episodeMatchesTopic } from "@/lib/content";
import { site } from "@/content/site";
import { ease } from "@/lib/motion";
import Chip from "@/components/ui/Chip";
import EpisodePoster from "@/components/episode/EpisodePoster";
import CloudHead from "@/components/brand/CloudHead";

/**
 * The episode wall + filter bar + search (brief §6.2, review P2-13). Posters are
 * real server-data <a>s; filtering/search re-flows the wall with a Framer
 * `layout` animation (never a reload). Empty state is the drifting cloud-head,
 * in the show's voice. Reduced motion → a plain reflow.
 */
const CHIPS = ["All", ...site.topics];

function matchesQuery(e: Episode, q: string) {
  if (!q) return true;
  const hay = [
    e.episodeTitle,
    e.hook,
    e.guestName,
    e.guestCompany,
    e.keyTakeaways.question,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return hay.includes(q.toLowerCase());
}

export default function EpisodesExplorer({ episodes }: { episodes: Episode[] }) {
  const reduced = useReducedMotion();
  const [topic, setTopic] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => episodes.filter((e) => episodeMatchesTopic(e, topic) && matchesQuery(e, query)),
    [episodes, topic, query],
  );

  const gridClass =
    "grid gap-7 [grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))]";

  return (
    <div>
      {/* Search + filter bar */}
      <div className="mb-8 flex flex-col gap-5">
        <label className="relative block max-w-md">
          <span className="sr-only">Search episodes</span>
          <svg
            aria-hidden
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-on-blue-soft"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search episodes…"
            className="h-12 w-full rounded-full border border-[rgba(255,255,255,0.28)] bg-[rgba(255,255,255,0.08)] pl-11 pr-4 text-on-blue outline-none placeholder:text-on-blue-soft focus-visible:border-[rgba(255,255,255,0.7)]"
          />
        </label>

        <div
          className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
          role="group"
          aria-label="Filter episodes by topic"
        >
          {CHIPS.map((c) => (
            <Chip key={c} active={topic === c} onClick={() => setTopic(c)}>
              {c}
            </Chip>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : reduced ? (
        <div className={gridClass}>
          {filtered.map((e) => (
            <EpisodePoster key={e.slug} episode={e} />
          ))}
        </div>
      ) : (
        <motion.div layout className={gridClass}>
          <AnimatePresence mode="popLayout">
            {filtered.map((e) => (
              <motion.div
                key={e.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.32, ease }}
              >
                <EpisodePoster episode={e} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 px-5 py-sp-9 text-center">
      <CloudHead size={140} color="var(--on-blue-soft)" drift />
      <p className="font-display text-h3 text-on-blue">
        Nothing here yet. The fog hasn&rsquo;t cleared on this one.
      </p>
    </div>
  );
}
