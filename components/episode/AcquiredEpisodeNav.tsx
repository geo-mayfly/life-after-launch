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
    ? "rounded-full border border-white/10 px-4 py-2 text-[0.66rem]"
    : "rounded-2xl border border-white/10 px-5 py-4 text-[0.72rem]";

  return (
    <div className="grid gap-2">
      {["Spotify", "Apple", "YouTube"].map((platform) => (
        <a
          key={platform}
          href={`https://www.acquired.fm/`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${cls} font-black uppercase tracking-[0.16em] text-white/72 transition hover:border-white/28 hover:bg-white/[0.08] hover:text-white`}
        >
          {platform}
        </a>
      ))}
    </div>
  );
}

function JumpLinks({
  active,
  onClick,
}: {
  active: string;
  onClick?: () => void;
}) {
  return (
    <nav aria-label="On this page" className="grid gap-2">
      {SECTIONS.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          onClick={onClick}
          className={`rounded-full px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.16em] transition ${
            active === section.id
              ? "bg-white text-[#080d15]"
              : "border border-white/10 text-white/54 hover:bg-white/[0.08] hover:text-white"
          }`}
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
      className="rounded-full border border-white/10 px-4 py-2 text-left text-[0.68rem] font-black uppercase tracking-[0.16em] text-white/62 transition hover:bg-white/[0.08] hover:text-white"
    >
      {copied ? "Copied" : "Copy link"}
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
        <div className="sticky top-[98px] max-h-[calc(100svh-122px)] overflow-y-auto pr-2">
          <Link
            href="/episodes"
            className="text-[0.7rem] font-black uppercase tracking-[0.2em] text-white/46 transition hover:text-white"
          >
            ← All Episodes
          </Link>

          <div
            className={`mt-7 overflow-hidden transition-all duration-500 ${
              heroPast ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-4">
              <div
                className="grid aspect-square w-24 place-items-center rounded-md text-xl font-black"
                style={{ background: episode.palette.background, color: episode.palette.color }}
              >
                {episode.mark.slice(0, 2)}
              </div>
              <p className="mt-4 text-[0.64rem] font-black uppercase tracking-[0.16em] text-white/38">
                {eyebrow}
              </p>
              <p className="mt-2 font-display text-3xl leading-none tracking-[-0.06em] text-white">
                {episode.name}
              </p>
              <p className="mt-2 text-sm text-white/48">{episode.duration}</p>
            </div>
          </div>

          <section className="mt-8">
            <h2 className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-white/38">
              Listen
            </h2>
            <div className="mt-3">
              <ListenLinks />
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-white/38">
              On this page
            </h2>
            <div className="mt-3">
              <JumpLinks active={active} />
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-white/38">
              Share
            </h2>
            <div className="mt-3">
              <ShareButton episode={episode} />
            </div>
          </section>
        </div>
      </aside>

      <div className="sticky top-[74px] z-40 border-b border-white/10 bg-[#0b111d]/95 px-4 py-3 backdrop-blur lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-between rounded-full border border-white/10 px-4 py-3 text-[0.72rem] font-black uppercase tracking-[0.16em] text-white"
        >
          On this page
          <span className="text-white/46">{SECTIONS.find((s) => s.id === active)?.label}</span>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[70] bg-black/55 backdrop-blur-sm lg:hidden">
          <div className="absolute inset-x-3 top-[88px] rounded-[1.4rem] border border-white/12 bg-[#0d1420] p-5 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <p className="text-[0.72rem] font-black uppercase tracking-[0.2em] text-white/45">
                On this page
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/10 px-3 py-1 text-sm text-white/70"
              >
                Close
              </button>
            </div>
            <div className="mt-5">
              <JumpLinks active={active} onClick={() => setOpen(false)} />
            </div>
            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-white/38">
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
