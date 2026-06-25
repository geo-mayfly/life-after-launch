import type { CSSProperties } from "react";
import type { Metadata } from "next";
import MorphLink from "@/components/motion/MorphLink";
import { acquiredEpisodes, type AcquiredEpisode } from "@/lib/acquired";

export const metadata: Metadata = {
  title: "Episodes | Acquired",
  description: "Browse Acquired-style deep dives into the world's greatest companies.",
};

function ArchiveCard({ episode, index }: { episode: AcquiredEpisode; index: number }) {
  const markSize =
    episode.mark.length > 8
      ? "text-[clamp(1.6rem,3vw,4rem)]"
      : episode.mark.length > 5
        ? "text-[clamp(2rem,3.8vw,5rem)]"
        : "text-[clamp(3rem,5vw,6.5rem)]";

  return (
    <MorphLink
      href={`/episodes/${episode.slug}`}
      ariaLabel={`Open ${episode.name} episode`}
      className="acquired-tile group relative isolate grid aspect-square overflow-hidden rounded-[0.35rem] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.24)]"
      style={
        {
          background: episode.palette.background,
          color: episode.palette.color,
          "--tile-delay": `${index * 36}ms`,
          viewTransitionName: `acquired-card-${episode.slug}`,
        } as CSSProperties
      }
    >
      <span
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at 30% 10%, currentColor 0 1px, transparent 1.5px)",
          backgroundSize: "14px 14px",
        }}
      />
      <span className="absolute right-3 top-3 z-20 rounded-sm bg-white/10 px-2.5 py-1.5 text-[0.52rem] font-black uppercase tracking-[0.16em] opacity-80 backdrop-blur">
        {episode.label}
      </span>
      {episode.portrait && (
        <span className="absolute inset-x-[18%] bottom-0 top-[14%] z-0 rounded-t-full bg-[linear-gradient(180deg,rgba(255,255,255,0.32),rgba(0,0,0,0.28))] opacity-80 shadow-[inset_0_0_80px_rgba(0,0,0,0.35)]" />
      )}
      <span className="acquired-vinyl absolute left-1/2 top-1/2 z-30 grid h-[min(72%,13rem)] aspect-square -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[repeating-radial-gradient(circle,#050505_0_7px,#171717_8px_12px,#070707_13px_18px)] opacity-0 shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
        <span
          className="grid h-[38%] w-[38%] place-items-center rounded-full text-[0.56rem] font-black uppercase tracking-[0.14em] text-black"
          style={{ background: episode.palette.accent }}
        >
          Play
        </span>
      </span>
      <span
        className="absolute inset-x-1/2 bottom-4 z-40 flex w-max -translate-x-1/2 translate-y-6 items-center gap-2 rounded-full px-5 py-3 text-center text-[0.62rem] font-black uppercase tracking-[0.18em] opacity-0 shadow-[0_18px_46px_rgba(0,0,0,0.22)] transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
        style={{ background: episode.palette.accent, color: "#050505" }}
      >
        Episode
        <span className="grid h-5 w-5 place-items-center rounded-full bg-black text-[0.55rem] text-white">
          →
        </span>
      </span>
      <span className={`relative z-10 m-auto max-w-[86%] text-center font-sans ${markSize} font-black uppercase leading-[0.86] tracking-[-0.08em] transition duration-500 group-hover:scale-[0.86] group-hover:opacity-25`}>
        {episode.mark}
      </span>
    </MorphLink>
  );
}

export default function EpisodesPage() {
  return (
    <main className="bg-[#f7f7f2] pt-[74px] text-black">
      <section className="px-5 py-14 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-[1480px]">
          <p className="text-[0.72rem] font-black uppercase tracking-[0.22em] text-black/42">
            Discover Episodes
          </p>
          <h1 className="mt-4 max-w-5xl font-display text-[clamp(4rem,10vw,11rem)] leading-[0.78] tracking-[-0.08em]">
            Every Company Has A Story
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-black/62">
            Deep dives into how the world&apos;s greatest companies were built and why
            they worked.
          </p>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-5">
        <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {acquiredEpisodes.map((episode, index) => (
            <ArchiveCard key={episode.slug} episode={episode} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
