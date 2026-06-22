"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Episode } from "@/content/schema";
import { ease } from "@/lib/motion";
import ListenButtons from "@/components/episode/ListenButtons";

/**
 * Sticky mini "Listen" bar (brief §6.3) — appears on mobile after the hero
 * scrolls away. Link-out only. Hidden on larger viewports.
 */
export default function StickyListenBar({ episode }: { episode: Episode }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.24, ease }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(255,255,255,0.12)] bg-[rgba(6,42,82,0.94)] px-4 py-3 backdrop-blur md:hidden"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="truncate text-small font-semibold text-on-blue">
              {episode.episodeTitle}
            </span>
            <div className="shrink-0">
              <ListenButtons listen={episode.listen} size="sm" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
