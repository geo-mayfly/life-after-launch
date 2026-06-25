import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AcquiredEpisodeNav from "@/components/episode/AcquiredEpisodeNav";
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

function EpisodeArtwork({ episode, small = false }: { episode: AcquiredEpisode; small?: boolean }) {
  const markSize =
    episode.mark.length > 8
      ? small
        ? "text-[clamp(1.25rem,3vw,3rem)]"
        : "text-[clamp(1.75rem,4vw,4.7rem)]"
      : episode.mark.length > 5
        ? small
          ? "text-[clamp(1.6rem,3.4vw,3.8rem)]"
          : "text-[clamp(2.3rem,5vw,5.8rem)]"
        : small
          ? "text-[clamp(2rem,4vw,4.8rem)]"
          : "text-[clamp(3.2rem,7vw,7.2rem)]";

  return (
    <div
      className="episode-transition-card relative isolate grid aspect-square place-items-center overflow-hidden rounded-lg shadow-[0_30px_80px_rgba(41,51,67,0.18)]"
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
      <span className="absolute right-4 top-4 rounded-sm bg-white/20 px-3 py-2 text-[0.58rem] font-black uppercase tracking-[0.18em] opacity-80 backdrop-blur">
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

function ListenButtons({ episode }: { episode: AcquiredEpisode }) {
  return (
    <div className="flex flex-wrap gap-2">
      {["Spotify", "Apple", "YouTube"].map((platform) => (
        <a
          key={platform}
          href="https://www.acquired.fm/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-[#172033]/10 bg-[#ffb21a] px-5 py-3 text-[0.68rem] font-black uppercase tracking-[0.14em] text-[#172033] shadow-[0_12px_26px_rgba(204,126,0,0.18)] transition hover:bg-[#ffc23d]"
          style={{ borderColor: `${episode.palette.accent}33` }}
        >
          {platform}
        </a>
      ))}
    </div>
  );
}

function TakeawayTiles({ episode }: { episode: AcquiredEpisode }) {
  const tiles = [
    {
      title: "The strategic unlock",
      quote: episode.tagline,
      body: episode.dek,
    },
    {
      title: "The operating system",
      quote: "The story compounds when incentives, distribution, and culture reinforce one another.",
      body: episode.description[0],
    },
    {
      title: "The enduring moat",
      quote: "Great companies turn an initial advantage into a repeatable machine.",
      body: episode.description[1] ?? episode.dek,
    },
    {
      title: "What to watch",
      quote: `${episode.categories.join(" + ")} is where the episode's lessons concentrate.`,
      body: "Use this section as the article-style synthesis: the big theme, the useful tension, and the open question that survives the episode.",
    },
  ];

  return (
    <div className="grid gap-10">
      {tiles.map((tile, index) => (
        <article
          key={tile.title}
          className="border-t border-[#d9cfbf] pt-8"
        >
          <div>
            <p
              className="text-[0.7rem] font-bold uppercase tracking-[0.18em] opacity-80"
              style={{ color: episode.palette.accent }}
            >
              0{index + 1}
            </p>
            <h3 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4vw,3.2rem)] leading-[0.98] tracking-[-0.045em] text-[#172033]">
              {tile.title}
            </h3>
          </div>
          <div>
            <blockquote
              className="mt-5 border-l-2 pl-4 font-display text-[1.6rem] leading-8 tracking-[-0.035em] text-[#d99000]"
              style={{ borderColor: episode.palette.accent }}
            >
              “{tile.quote}”
            </blockquote>
            <div className="mt-5 space-y-5 text-[1.04rem] leading-8 text-[#4e5360]">
              <p>{tile.body}</p>
              <p>
                The useful lesson is not the headline outcome. It is the operating
                behavior underneath it: who made the call, what tradeoff became
                unavoidable, and which constraint turned into leverage.
              </p>
            </div>
            {index === 0 && (
              <div className="mt-6 border-l-2 border-[#ffb21a] bg-[#ebe3d3] px-5 py-4">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#d99000]">
                  TL;DR
                </p>
                <p className="mt-2 font-semibold text-[#172033]">
                  The strongest companies turn pressure into clearer priorities.
                </p>
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

function TranscriptBlock({ episode }: { episode: AcquiredEpisode }) {
  const chapters = [
    ["00:00", "Cold open and why this company matters"],
    ["14:22", "Origins, constraints, and the first wedge"],
    ["42:08", "The strategic turn that changed the trajectory"],
    ["1:18:45", "Business model, culture, and capital allocation"],
    ["2:06:10", "Lessons, carve outs, and final synthesis"],
  ];

  return (
    <div className="grid gap-6">
      <div>
        <ol className="mt-5 divide-y divide-[#d9cfbf] border-y border-[#d9cfbf]">
          {chapters.map(([time, label]) => (
            <li key={time} className="grid gap-2 px-5 py-4 sm:grid-cols-[90px_1fr]">
              <span
                className="font-mono text-sm font-bold"
                style={{ color: episode.palette.accent }}
              >
                {time}
              </span>
              <span className="text-[#333948]">{label}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="rounded-xl border border-[#d9cfbf] bg-[#f1eadf] p-6">
        <h3 className="text-xl font-bold tracking-[-0.03em] text-[#172033]">Read full transcript</h3>
        <div className="mt-5 space-y-5 leading-8 text-[#4e5360]">
          <p>
            This is where the long-form transcript begins: the narrative setup,
            the research trail, and the strategic question that makes {episode.name}
            worth studying.
          </p>
          <p>
            Sources live at the end of the transcript, matching the Acquired pattern
            where references support the story without interrupting the listening flow.
          </p>
        </div>
        <div className="mt-8 border-t border-[#d9cfbf] pt-6">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#253047]/42">
            Sources
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[#4e5360]">
            {episode.links.map((link) => (
              <li key={link}>{link}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SectionIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-8">
      <p className="border-y border-[#d9cfbf] py-3 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#d99000]">
        {eyebrow}
      </p>
      <h2 className="mt-7 max-w-3xl font-display text-[clamp(2.35rem,4.6vw,4.4rem)] leading-[0.96] tracking-[-0.055em] text-[#172033]">
        {title}
      </h2>
      {children && <div className="mt-5 max-w-2xl text-[1.04rem] leading-8 text-[#4e5360]">{children}</div>}
    </div>
  );
}

function RelatedCard({ episode }: { episode: AcquiredEpisode }) {
  return (
    <Link href={`/episodes/${episode.slug}`} className="group block">
      <EpisodeArtwork episode={episode} small />
      <p className="mt-4 text-sm font-black uppercase tracking-[0.16em] text-[#253047]/42">
        {episode.season}
      </p>
      <h3 className="mt-1 text-3xl font-black tracking-[-0.05em] text-[#172033] transition group-hover:text-[#172033]/70">
        {episode.name}
      </h3>
      <p className="mt-2 text-[#4e5360]">{episode.tagline}</p>
    </Link>
  );
}

function EmailClubClose() {
  return (
    <section className="bg-[#f7f0e4] px-5 py-16 text-[#172033] sm:px-8 lg:py-24">
      <div className="mx-auto grid max-w-[1380px] gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.6rem] border border-[#d9cfbf] bg-[#eee6d8] p-7 sm:p-10">
          <p className="text-[0.72rem] font-black uppercase tracking-[0.22em] text-[#d99000]">
            Emails from Ben & David
          </p>
          <h2 className="mt-4 font-display text-[clamp(3rem,7vw,7rem)] leading-[0.82] tracking-[-0.08em]">
            Never miss an episode
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#4e5360]">
            Get takeaways, research photos, hints at the next episode, and your
            vote on future topics.
          </p>
          <form className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="episode-email">
              Email address
            </label>
            <input
              id="episode-email"
              type="email"
              placeholder="email address"
              className="h-14 flex-1 rounded-full border border-[#d9cfbf] bg-white px-5 text-black outline-none placeholder:text-black/45 focus:border-[#ffb21a]"
            />
            <button
              type="button"
              className="h-14 rounded-full bg-[#ffb21a] px-7 text-[0.78rem] font-black uppercase tracking-[0.16em] text-[#172033] transition hover:bg-[#ffc23d]"
            >
              Subscribe
            </button>
          </form>
        </div>
        <div className="rounded-[1.6rem] border border-[#d9cfbf] bg-[#eee6d8] p-7 sm:p-10">
          <p className="text-[0.72rem] font-black uppercase tracking-[0.22em] text-[#d99000]">
            Community
          </p>
          <h2 className="mt-4 font-display text-[clamp(3rem,7vw,7rem)] leading-[0.82] tracking-[-0.08em]">
            The conversation keeps going.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#4e5360]">
            Join the Slack community around the world&apos;s greatest company stories.
          </p>
          <Link
            href="#"
            className="mt-8 inline-flex rounded-full bg-[#ffb21a] px-7 py-4 text-[0.74rem] font-black uppercase tracking-[0.18em] text-[#172033] transition hover:bg-[#ffc23d]"
          >
            Join Slack
          </Link>
        </div>
      </div>
    </section>
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
  const eyebrow = `${episode.season} ${episode.episode} • ${episode.date}`;

  return (
    <main
      className="min-h-screen pt-[74px] text-[#172033]"
      style={{
        backgroundColor: "#f7f0e4",
        backgroundImage: `radial-gradient(70% 44% at 72% 0%, ${episode.palette.background}22 0%, transparent 62%)`,
      }}
    >
      <div className="lg:hidden">
        <AcquiredEpisodeNav episode={episode} />
      </div>

      <section className="relative isolate overflow-hidden px-5 py-8 pb-28 sm:px-8 lg:py-14">
        <div className="mx-auto grid max-w-[1180px] gap-16 lg:grid-cols-[230px_minmax(0,640px)] xl:grid-cols-[250px_minmax(0,660px)]">
          <div className="hidden lg:block">
            <AcquiredEpisodeNav episode={episode} />
          </div>

          <article className="episode-copy-panel space-y-24">
            <section id="episode-hero" className="scroll-mt-28">
              <div>
                <div className="mx-auto mb-9 max-w-[330px]">
                  <EpisodeArtwork episode={episode} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-[0.66rem] font-black uppercase tracking-[0.18em] text-[#253047]/42">
                    <Link href="/episodes" className="hover:text-[#172033]">
                      Home
                    </Link>
                    <span>/</span>
                    <span>Episodes</span>
                  </div>
                  <p className="mt-8 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#d99000]">
                    {eyebrow}
                  </p>
                  <h1 className="mt-5 max-w-3xl font-display text-[clamp(3.4rem,7vw,6.2rem)] leading-[0.93] tracking-[-0.06em]">
                    {episode.name}
                  </h1>
                  <p className="mt-7 max-w-2xl font-display text-[clamp(2rem,4vw,3.3rem)] leading-[0.98] tracking-[-0.05em] text-[#172033]">
                    {episode.tagline}
                  </p>
                  <p className="mt-6 max-w-2xl text-[0.9rem] font-semibold uppercase tracking-[0.12em] text-[#253047]/54">
                    {episode.guestLine}
                  </p>
                  <div className="mt-8">
                    <ListenButtons episode={episode} />
                  </div>
                  <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-[#253047]/42">
                    Runtime {episode.duration}
                  </p>
                </div>
              </div>
            </section>

            <section id="overview" className="scroll-mt-32 pt-4">
              <SectionIntro eyebrow="Overview" title={episode.tagline} />
              <div>
                <article>
                  <p className="text-[1.35rem] leading-9 text-[#323847]">{episode.dek}</p>
                  <div className="mt-7 space-y-6 text-[1.05rem] leading-8 text-[#4e5360]">
                    {episode.description.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              </div>
            </section>

            <section id="key-takeaways" className="scroll-mt-32 border-t border-[#d9cfbf] pt-16">
              <SectionIntro eyebrow="Key Takeaways" title="Themes worth stealing">
                Article-style notes that make the episode useful after the listen.
              </SectionIntro>
              <div className="mt-8">
                <TakeawayTiles episode={episode} />
              </div>
            </section>

            <section id="transcript" className="scroll-mt-32 border-t border-[#d9cfbf] pt-16">
              <SectionIntro eyebrow="Transcript" title="Chapters, timestamps, and sources">
                Scan the episode, then use the sources block at the end.
              </SectionIntro>
              <div className="mt-8">
                <TranscriptBlock episode={episode} />
              </div>
            </section>

            <section id="guest-links" className="scroll-mt-32 border-t border-[#d9cfbf] pb-10 pt-16">
              <SectionIntro eyebrow="Guest & links" title="Follow the research trail">
                Hosts, research links, and further reading for the episode.
              </SectionIntro>
              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <div className="rounded-xl border border-[#d9cfbf] bg-[#eee6d8] p-6">
                  <h3 className="text-2xl font-black tracking-[-0.04em] text-[#172033]">{episode.guestLine}</h3>
                  <p className="mt-4 leading-7 text-[#4e5360]">
                    Hosted by the Acquired team, with research focused on {episode.name}
                    and the company-building lessons behind the episode.
                  </p>
                </div>
                <div className="rounded-xl border border-[#d9cfbf] bg-[#eee6d8] p-6">
                  <h3 className="text-2xl font-black tracking-[-0.04em] text-[#172033]">Links</h3>
                  <ul className="mt-5 space-y-3">
                    {episode.links.map((link) => (
                      <li key={link}>
                        <Link href="#" className="text-[#4e5360] underline decoration-[#d99000]/35 underline-offset-4 transition hover:text-[#172033]">
                          {link} →
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </article>
        </div>
      </section>

      <section className="border-t border-[#d9cfbf] bg-[#f7f0e4] px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1480px]">
          <p className="text-[0.74rem] font-bold uppercase tracking-[0.2em] text-[#d99000]">
            More from the series
          </p>
          <h2 className="mt-4 font-display text-[clamp(3rem,7vw,6rem)] leading-[0.9] tracking-[-0.06em] text-[#172033]">
            Related episodes
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <RelatedCard key={item.slug} episode={item} />
            ))}
          </div>
        </div>
      </section>

      <EmailClubClose />
    </main>
  );
}
