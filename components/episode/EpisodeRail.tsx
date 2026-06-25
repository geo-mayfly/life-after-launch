"use client";

import { useEffect, useState } from "react";
import type { Episode } from "@/content/schema";
import { episodeEyebrow } from "@/lib/content";
import { EPISODE_SECTIONS } from "@/lib/episode-nav";
import { scrollToId } from "@/lib/scroll";
import EpisodeCover from "@/components/episode/EpisodeCover";
import ListenButtons from "@/components/episode/ListenButtons";

/**
 * EpisodeRail (desktop) — the sticky left panel (brief: navigation + details).
 * A compact episode identity that fades in once the hero scrolls past; Listen
 * (always visible); an "On this page" scroll-spy nav targeting the four in-pane
 * sections; and Share. Sits inside a tone-tinted BlueWall column.
 */
export default function EpisodeRail({ episode }: { episode: Episode }) {
  const [pastHero, setPastHero] = useState(false);
  const [active, setActive] = useState<string>(EPISODE_SECTIONS[0].id);
  const [shared, setShared] = useState(false);

  // Fade the compact identity in once the hero leaves the viewport.
  useEffect(() => {
    // The rail is display:none below lg — don't run observers there.
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    const hero = document.getElementById("episode-hero");
    if (!hero) return;
    const io = new IntersectionObserver(
      ([e]) => setPastHero(!e.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  // Scroll-spy across the four in-pane sections.
  useEffect(() => {
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    const els = EPISODE_SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  async function share() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const data = { title: `${episode.episodeTitle} — Life After Launch`, url };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(url);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {
      /* user cancelled */
    }
  }

  return (
    <div className="sticky top-[72px] px-5 py-sp-7 sm:px-7">
      {/* Compact identity — fades in once the hero scrolls past. */}
      <div
        className="flex items-center gap-4"
        style={{
          opacity: pastHero ? 1 : 0,
          transform: pastHero ? "none" : "translateY(-6px)",
          transition: "opacity .42s var(--ease), transform .42s var(--ease)",
          pointerEvents: pastHero ? "auto" : "none",
        }}
        aria-hidden={!pastHero}
      >
        <div className="w-16 shrink-0 overflow-hidden rounded-xs shadow-sm">
          <div className="aspect-[4/5]">
            <EpisodeCover episode={episode} caption={false} />
          </div>
        </div>
        <div className="min-w-0">
          <p className="truncate text-[0.7rem] font-semibold uppercase tracking-eyebrow text-on-blue-soft">
            {episodeEyebrow(episode)}
          </p>
          <p className="truncate font-display text-[1.15rem] leading-tight text-on-blue">
            {episode.episodeTitle}
          </p>
          <p className="text-small text-on-blue-soft">{episode.duration}</p>
        </div>
      </div>

      {/* Listen — always visible. */}
      <div className={pastHero ? "mt-sp-6" : ""}>
        <p className="eyebrow mb-3 text-on-blue-faint">Listen</p>
        <div className="flex flex-col items-start gap-2.5">
          <ListenButtons listen={episode.listen} size="sm" />
        </div>
      </div>

      {/* On this page — scroll-spy. */}
      <nav className="mt-sp-6" aria-label="On this page">
        <p className="eyebrow mb-3 text-on-blue-faint">On this page</p>
        <ul className="flex flex-col gap-1">
          {EPISODE_SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => scrollToId(s.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex w-full items-center gap-3 py-1.5 text-left transition-colors duration-fast ${
                    isActive ? "text-on-blue" : "text-on-blue-soft hover:text-on-blue"
                  }`}
                >
                  <span
                    aria-hidden
                    className="h-px transition-all duration-base"
                    style={{
                      width: isActive ? 24 : 12,
                      background: isActive ? "var(--marigold)" : "rgba(255,255,255,0.4)",
                    }}
                  />
                  <span className="text-[0.95rem] font-medium">{s.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Share. */}
      <button
        type="button"
        onClick={share}
        className="mt-sp-6 inline-flex items-center gap-2 text-small font-semibold text-on-blue-soft transition-colors hover:text-on-blue"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M14 9V6l6 6-6 6v-3c-5 0-8 1.5-10 5 .5-5 3-9 10-10z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
        {shared ? "Link copied" : "Share"}
      </button>
    </div>
  );
}
