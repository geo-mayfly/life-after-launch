"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { AcquiredEpisode } from "@/lib/acquired";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "key-takeaways", label: "Key takeaways" },
  { id: "transcript", label: "Transcript" },
  { id: "guest-links", label: "Guest & links" },
] as const;

function ListenLinks({ compact = false }: { compact?: boolean }) {
  const cls = compact
    ? "rounded-full border border-black/10 px-4 py-2 text-[0.66rem]"
    : "rounded-full bg-[#ffb21a] px-4 py-3 text-[0.68rem] shadow-[0_12px_28px_rgba(204,126,0,0.18)]";

  return (
    <div className={compact ? "grid gap-2" : "grid gap-2"}>
      {["Spotify", "Apple", "YouTube"].map((platform) => (
        <a
          key={platform}
          href={`https://www.acquired.fm/`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${cls} font-black uppercase tracking-[0.12em] text-[#172033] transition hover:bg-[#ffc23d]`}
        >
          {compact ? platform : `Choose ${platform}`}
        </a>
      ))}
    </div>
  );
}

function JumpLinks({
  active,
  accent,
  onClick,
}: {
  active: string;
  accent: string;
  onClick?: () => void;
}) {
  return (
    <nav aria-label="On this page" className="grid gap-2">
      {SECTIONS.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          onClick={onClick}
          className={`relative border-l px-4 py-2.5 text-[0.78rem] font-semibold transition ${
            active === section.id
              ? "text-[#f2a000]"
              : "border-black/10 text-[#253047]/62 hover:text-[#172033]"
          }`}
          style={{ borderColor: active === section.id ? accent : "rgba(23,32,51,0.12)" }}
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
}

function ShareButton({ episode }: { episode: AcquiredEpisode }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = `${window.location.origin}/episodes/${episode.slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className="rounded-full text-left text-[0.74rem] font-semibold text-[#253047]/62 transition hover:text-[#172033]"
    >
      {copied ? "Copied" : "Share episode"}
    </button>
  );
}

export default function AcquiredEpisodeNav({ episode }: { episode: AcquiredEpisode }) {
  const [active, setActive] = useState("overview");
  const [heroPast, setHeroPast] = useState(false);
  const [open, setOpen] = useState(false);

  const eyebrow = useMemo(
    () => `${episode.season} ${episode.episode} • ${episode.date}`,
    [episode.date, episode.episode, episode.season],
  );

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("episode-hero");
      const heroTop = hero?.getBoundingClientRect().top ?? 0;
      setHeroPast(window.scrollY > 220 || heroTop < -120);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      {
        rootMargin: "-18% 0px -58% 0px",
        threshold: [0.08, 0.18, 0.32, 0.5],
      },
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <aside className="hidden lg:block">
        <div className="sticky top-[104px] max-h-[calc(100svh-128px)] overflow-y-auto pr-5 text-[#172033]">
          <Link
            href="/episodes"
            className="text-[0.76rem] font-semibold text-[#253047]/58 transition hover:text-[#172033]"
          >
            ← All Episodes
          </Link>

          <div
            className={`mt-7 overflow-hidden transition-all duration-500 ${
              heroPast ? "max-h-[120px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="grid grid-cols-[64px_1fr] gap-3 pt-6">
              <div
                className="grid aspect-square w-16 place-items-center rounded-sm text-lg font-black shadow-[0_10px_28px_rgba(20,30,50,0.14)]"
                style={{ background: episode.palette.background, color: episode.palette.color }}
              >
                {episode.mark.slice(0, 2)}
              </div>
              <div className="min-w-0 self-center">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#253047]/42">
                  {eyebrow}
                </p>
                <p className="mt-1 truncate font-display text-[1.05rem] font-semibold leading-tight tracking-[-0.03em] text-[#172033]">
                  {episode.name}
                </p>
                <p className="mt-1 text-xs text-[#253047]/50">{episode.duration}</p>
              </div>
            </div>
          </div>

          <section className="mt-8">
            <h2 className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#253047]/42">
              Listen
            </h2>
            <div className="mt-3">
              <ListenLinks />
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#253047]/42">
              On this page
            </h2>
            <div className="mt-3">
              <JumpLinks active={active} accent={episode.palette.accent} />
            </div>
          </section>

          <section className="mt-8">
            <div className="mt-3">
              <ShareButton episode={episode} />
            </div>
          </section>
        </div>
      </aside>

      <div className="fixed inset-x-3 bottom-4 z-50 rounded-full border border-black/10 bg-[#f7f0e4]/95 p-2 shadow-[0_18px_70px_rgba(45,32,12,0.18)] backdrop-blur lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-between rounded-full px-4 py-3 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#172033]"
        >
          On this page
          <span className="text-[#253047]/50">{SECTIONS.find((s) => s.id === active)?.label}</span>
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[70] bg-black/45 backdrop-blur-sm lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Episode navigation"
        >
          <div className="absolute inset-x-3 bottom-[86px] max-h-[72vh] overflow-y-auto rounded-[1.4rem] border border-black/10 bg-[#f7f0e4] p-5 text-[#172033] shadow-2xl">
            <div className="flex items-center justify-between">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#253047]/45">
                On this page
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-black/10 px-3 py-1 text-sm text-[#253047]/70"
              >
                Close
              </button>
            </div>
            <div className="mt-5">
              <JumpLinks
                active={active}
                accent={episode.palette.accent}
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="mt-6 border-t border-black/10 pt-5">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#253047]/42">
                Listen
              </p>
              <div className="mt-3">
                <ListenLinks compact />
              </div>
            </div>
            <div className="mt-5">
              <ShareButton episode={episode} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
