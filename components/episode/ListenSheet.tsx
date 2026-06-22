"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ease } from "@/lib/motion";
import { site } from "@/content/site";
import PlatformIcon, {
  PLATFORM_LABELS,
  type Platform,
} from "@/components/episode/PlatformIcon";

/**
 * The Home hero "Listen" CTA → a small platform sheet (brief §6.1):
 * Spotify / Apple / YouTube. The single marigold CTA per view.
 */
const ORDER: Platform[] = ["spotify", "apple", "youtube"];

export default function ListenSheet() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-marigold px-7 text-[1.05rem] font-semibold text-ink-navy shadow-gold transition-[transform,background-color] duration-fast hover:-translate-y-px hover:bg-marigold-bright active:scale-[0.98]"
      >
        Listen
        <motion.svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.24, ease }}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.24, ease }}
            className="absolute left-0 top-[calc(100%+10px)] z-30 w-60 overflow-hidden rounded-md bg-paper p-2 shadow-lg"
            data-surface="light"
          >
            {ORDER.map((p) => (
              <a
                key={p}
                role="menuitem"
                href={site.listen[p]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xs px-3 py-2.5 text-ink transition-colors hover:bg-bone"
              >
                <PlatformIcon platform={p} />
                <span className="font-medium">{PLATFORM_LABELS[p]}</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
