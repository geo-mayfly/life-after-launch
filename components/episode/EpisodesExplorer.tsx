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
 * The episode wall + filter bar (brief §6.2). Real <a> posters are server-data;
 * filtering re-flows the wall with a Framer `layout` animation (never a reload).
 * Empty state is the drifting cloud-head, in the show's voice. Reduced motion →
 * a plain reflow.
 */
const CHIPS = ["All", ...site.topics];

export default function EpisodesExplorer({ episodes }: { episodes: Episode[] }) {
  const reduced = useReducedMotion();
  const [topic, setTopic] = useState("All");

  const filtered = useMemo(
    () => episodes.filter((e) => episodeMatchesTopic(e, topic)),
    [episodes, topic],
  );

  return (
    <div>
      {/* Filter bar — horizontally scrollable chip row on mobile. */}
      <div
        className="no-scrollbar -mx-5 mb-10 flex gap-3 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-8"
        role="group"
        aria-label="Filter episodes by topic"
      >
        {CHIPS.map((c) => (
          <Chip key={c} active={topic === c} onClick={() => setTopic(c)}>
            {c}
          </Chip>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : reduced ? (
        <div className="grid grid-cols-2 justify-items-center gap-6 px-5 sm:px-8 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((e) => (
            <EpisodePoster key={e.slug} episode={e} width={300} />
          ))}
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-2 justify-items-center gap-6 px-5 sm:px-8 lg:grid-cols-3 xl:grid-cols-4"
        >
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
                <EpisodePoster episode={e} width={300} />
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
