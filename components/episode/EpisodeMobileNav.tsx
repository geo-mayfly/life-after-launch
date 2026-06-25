"use client";

import { useEffect, useState } from "react";
import type { Episode } from "@/content/schema";
import { EPISODE_SECTIONS } from "@/lib/episode-nav";
import { scrollToId } from "@/lib/scroll";
import ListenButtons from "@/components/episode/ListenButtons";

/**
 * EpisodeMobileNav — the left panel, collapsed for mobile: a sticky bottom
 * "On this page" bar that opens a drawer with Listen + the in-pane jump links.
 * CSS-only transitions (no animation library) so the episode route stays light.
 * Hidden on desktop (the sticky rail takes over).
 */
export default function EpisodeMobileNav({ episode }: { episode: Episode }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  // The nav only targets in-pane sections — hide the bar once Related/footer
  // (past the sentinel) is reached.
  useEffect(() => {
    const sentinel = document.getElementById("episode-twopanel-end");
    if (!sentinel) return;
    const io = new IntersectionObserver(
      ([e]) => setHidden(e.isIntersecting || e.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function jump(id: string) {
    setOpen(false);
    setTimeout(() => scrollToId(id), 60);
  }

  return (
    <div className="lg:hidden">
      {/* sticky bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(255,255,255,0.12)] bg-[rgba(6,42,82,0.94)] px-4 py-3 backdrop-blur transition-transform duration-base ease-brand"
        style={{ transform: hidden && !open ? "translateY(100%)" : "none" }}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          className="flex w-full items-center justify-between text-on-blue"
        >
          <span className="eyebrow">On this page</span>
          <span className="flex items-center gap-2 text-small font-semibold">
            Jump to
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </div>

      {/* backdrop */}
      <div
        className="fixed inset-0 z-40 bg-[rgba(4,18,40,0.55)] transition-opacity duration-base"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        aria-hidden
        onClick={() => setOpen(false)}
      />

      {/* drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="On this page"
        aria-hidden={!open}
        className="fixed inset-x-0 bottom-0 z-50 rounded-t-lg bg-ink-navy px-5 pb-8 pt-5 transition-transform duration-slow ease-brand"
        style={{ transform: open ? "translateY(0)" : "translateY(100%)" }}
      >
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-[rgba(255,255,255,0.25)]" />

        <p className="eyebrow mb-3 text-on-blue-faint">Listen</p>
        <ListenButtons listen={episode.listen} size="sm" />

        <p className="eyebrow mb-2 mt-7 text-on-blue-faint">On this page</p>
        <ul className="flex flex-col">
          {EPISODE_SECTIONS.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => jump(s.id)}
                tabIndex={open ? 0 : -1}
                className="flex w-full items-center justify-between border-b border-[rgba(255,255,255,0.1)] py-3.5 text-left font-display text-h3 text-on-blue"
              >
                {s.label}
                <span aria-hidden className="text-marigold">→</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
