import Link from "next/link";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  acquiredEpisodes,
  getAcquiredEpisode,
  getRelatedAcquiredEpisodes,
  type AcquiredEpisode,
} from "@/lib/acquired";

export function generateStaticParams() {
  return acquiredEpisodes.map((episode) => ({ slug: episode.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const episode = getAcquiredEpisode(slug);
  if (!episode) return {};

  return {
    title: `${episode.name} | Acquired`,
    description: episode.dek,
  };
}

function EpisodeArtwork({ episode, large = false }: { episode: AcquiredEpisode; large?: boolean }) {
  const markSize =
    episode.mark.length > 8
      ? "text-[clamp(2.3rem,6vw,6.6rem)]"
      : episode.mark.length > 5
        ? "text-[clamp(3rem,7vw,8rem)]"
        : "text-[clamp(4.5rem,11vw,12rem)]";

  return (
    <div
      className={`episode-transition-card relative isolate grid aspect-square overflow-hidden rounded-[0.45rem] shadow-[0_30px_110px_rgba(0,0,0,0.45)] ${
        large ? "place-items-center" : "place-items-center"
      }`}
      style={
        {
          background: episode.palette.background,
          color: episode.palette.color,
          viewTransitionName: `acquired-card-${episode.slug}`,
        } as CSSProperties
      }
    >
      <span
        className="absolute inset-0 opacity-22"
        style={{
          background:
            "radial-gradient(circle at 30% 10%, currentColor 0 1px, transparent 1.5px)",
          backgroundSize: "14px 14px",
        }}
      />
      <span className="absolute right-4 top-4 rounded-sm bg-white/10 px-3 py-2 text-[0.58rem] font-black uppercase tracking-[0.18em] opacity-80 backdrop-blur">
        {episode.label}
      </span>
      {episode.portrait && (
        <span className="absolute inset-x-[18%] bottom-0 top-[14%] rounded-t-full bg-[linear-gradient(180deg,rgba(255,255,255,0.32),rgba(0,0,0,0.28))] opacity-80 shadow-[inset_0_0_90px_rgba(0,0,0,0.35)]" />
      )}
      <span className={`relative z-10 max-w-[84%] text-center font-sans ${markSize} font-black uppercase leading-[0.84] tracking-[-0.08em]`}>
        {episode.mark}
      </span>
    </div>
  );
}

function VinylPlayer({ episode }: { episode: AcquiredEpisode }) {
  return (
    <div className="relative mx-auto grid aspect-square w-[min(68vw,360px)] place-items-center">
      <div className="episode-record absolute inset-0 rounded-full bg-[repeating-radial-gradient(circle,#050505_0_7px,#171717_8px_12px,#070707_13px_18px)] shadow-[0_34px_100px_rgba(0,0,0,0.55)]" />
      <div
        className="relative z-10 grid h-[34%] w-[34%] place-items-center rounded-full text-center text-[0.66rem] font-black uppercase tracking-[0.16em] text-black"
        style={{ background: episode.palette.accent }}
      >
        Play
      </div>
    </div>
  );
}

function ExpandableCard({ title }: { title: string }) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.055] px-5 py-4 text-left text-[0.78rem] font-black uppercase tracking-[0.16em] text-white transition hover:bg-white/[0.09]"
    >
      {title}
      <span className="text-xl leading-none text-white/45">+</span>
    </button>
  );
}

function SponsorGrid() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {["WorkOS", "Anthropic", "Statsig", "Sentry"].map((sponsor) => (
        <div
          key={sponsor}
          className="rounded-xl border border-white/10 bg-white/[0.055] px-4 py-5 text-center text-[0.7rem] font-black uppercase tracking-[0.16em] text-white/62"
        >
          {sponsor}
        </div>
      ))}
    </div>
  );
}

function FixedPlayer({ episode }: { episode: AcquiredEpisode }) {
  return (
    <aside className="fixed bottom-5 right-5 z-40 hidden w-[390px] rounded-[1.35rem] border border-white/10 bg-[#111824]/92 p-4 text-white shadow-[0_24px_90px_rgba(0,0,0,0.5)] backdrop-blur-xl lg:block">
      <div className="flex gap-4">
        <div
          className="grid h-16 w-16 shrink-0 place-items-center rounded-md text-lg font-black"
          style={{ background: episode.palette.background, color: episode.palette.color }}
        >
          {episode.mark.slice(0, 2)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-black">{episode.name}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/45">{episode.date}</p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/12">
            <div className="h-full w-[38%] rounded-full bg-white" />
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm font-black">
        <button type="button" className="text-white/60">-15</button>
        <button
          type="button"
          className="grid h-12 w-12 place-items-center rounded-full text-black"
          style={{ background: episode.palette.accent }}
          aria-label="Play episode"
        >
          ▶
        </button>
        <button type="button" className="text-white/60">+15</button>
        <span className="text-xs text-white/42">0:00 / {episode.duration}</span>
      </div>
    </aside>
  );
}

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const episode = getAcquiredEpisode(slug);
  if (!episode) notFound();
  const related = getRelatedAcquiredEpisodes(episode.slug, 3);

  return (
    <main className="min-h-screen bg-[#080d15] pt-[74px] text-white">
      <section className="episode-page-hero relative isolate overflow-hidden px-5 py-10 sm:px-8 lg:min-h-[calc(100svh-74px)] lg:py-12">
        <div
          className="absolute inset-0 -z-10 opacity-50"
          style={{
            background: `radial-gradient(circle at 22% 20%, ${episode.palette.accent}66, transparent 34%), radial-gradient(circle at 78% 8%, ${episode.palette.background}88, transparent 32%)`,
          }}
        />
        <div className="mx-auto grid max-w-[1480px] gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="episode-left-panel">
            <Link
              href="/"
              className="inline-flex text-[0.72rem] font-black uppercase tracking-[0.2em] text-white/48 transition hover:text-white"
            >
              ← All Episodes
            </Link>
            <p className="mt-8 text-[0.68rem] font-black uppercase tracking-[0.2em] text-white/42">
              Presented by {episode.sponsor}
            </p>
            <div className="mt-4">
              <EpisodeArtwork episode={episode} large />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {episode.categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-white/12 bg-white/[0.06] px-3 py-1.5 text-[0.62rem] font-black uppercase tracking-[0.16em] text-white/60"
                >
                  {category}
                </span>
              ))}
            </div>
            <h1 className="mt-6 max-w-xl font-display text-[clamp(3rem,7vw,7.6rem)] leading-[0.78] tracking-[-0.08em]">
              {episode.name}
            </h1>
            <p className="mt-4 text-[0.72rem] font-black uppercase tracking-[0.18em] text-white/42">
              {episode.season} {episode.episode} • {episode.date}
            </p>
            <div className="mt-8 grid gap-3">
              <ExpandableCard title="Transcript" />
              <ExpandableCard title="Sources" />
            </div>
          </aside>

          <article className="episode-copy-panel self-start lg:pt-20">
            <div className="grid gap-10 xl:grid-cols-[1fr_0.62fr]">
              <div>
                <p className="max-w-3xl font-display text-[clamp(2.8rem,7vw,7.8rem)] leading-[0.82] tracking-[-0.08em]">
                  {episode.tagline}
                </p>
                <p className="mt-8 text-[0.76rem] font-black uppercase tracking-[0.2em] text-white/42">
                  Overview
                </p>
                <div className="mt-5 max-w-3xl space-y-6 text-lg leading-8 text-white/72">
                  <p>{episode.dek}</p>
                  {episode.description.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <div className="self-start rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-5">
                <VinylPlayer episode={episode} />
                <button
                  type="button"
                  className="mt-6 w-full rounded-full py-4 text-[0.74rem] font-black uppercase tracking-[0.18em] text-black transition hover:bg-white"
                  style={{ background: episode.palette.accent }}
                >
                  Play Episode
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="acquired-scroll-section border-t border-white/10 bg-[#0b111d] px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="space-y-10">
            <div>
              <p className="text-[0.7rem] font-black uppercase tracking-[0.2em] text-white/42">
                Many thanks to our season partners
              </p>
              <div className="mt-5">
                <SponsorGrid />
              </div>
            </div>
            <div>
              <p className="text-[0.7rem] font-black uppercase tracking-[0.2em] text-white/42">
                Listen
              </p>
              <div className="mt-4 grid gap-3">
                {["Spotify", "Apple Podcasts", "YouTube"].map((platform) => (
                  <button
                    key={platform}
                    type="button"
                    className="rounded-2xl border border-white/10 bg-white/[0.055] px-5 py-4 text-left text-sm font-black uppercase tracking-[0.14em] text-white/72 transition hover:bg-white/[0.09]"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <article>
            <h2 className="font-display text-[clamp(3rem,7vw,7rem)] leading-[0.82] tracking-[-0.08em]">
              More on the episode
            </h2>

            <div className="mt-10 grid gap-10 md:grid-cols-2">
              <section>
                <h3 className="text-[0.74rem] font-black uppercase tracking-[0.2em] text-white/42">
                  Links
                </h3>
                <ul className="mt-5 space-y-4">
                  {episode.links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-lg text-white/76 transition hover:text-white">
                        {link} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-[0.74rem] font-black uppercase tracking-[0.2em] text-white/42">
                  Carve Outs
                </h3>
                <ul className="mt-5 space-y-4">
                  {episode.carveOuts.map((item) => (
                    <li key={item} className="text-lg text-white/76">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="mt-12 rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6">
              <h3 className="text-[0.74rem] font-black uppercase tracking-[0.2em] text-white/42">
                Corrections
              </h3>
              <p className="mt-4 text-white/70">
                {episode.corrections ?? "No corrections yet. Send us notes and source material anytime."}
              </p>
            </section>

            <section className="mt-16">
              <h3 className="text-[0.74rem] font-black uppercase tracking-[0.2em] text-white/42">
                More Episodes
              </h3>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {related.map((item) => (
                  <Link key={item.slug} href={`/episodes/${item.slug}`} className="group">
                    <EpisodeArtwork episode={item} />
                    <p className="mt-3 text-sm font-black uppercase tracking-[0.16em] text-white/42">
                      {item.season}
                    </p>
                    <p className="text-xl font-black tracking-[-0.04em] text-white group-hover:text-white/72">
                      {item.name}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </article>
        </div>
      </section>

      <FixedPlayer episode={episode} />
    </main>
  );
}
