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
      className="episode-transition-card relative isolate grid aspect-square place-items-center overflow-hidden rounded-[1.15rem] shadow-[0_30px_110px_rgba(0,0,0,0.38)]"
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

function ListenButtons({ episode }: { episode: AcquiredEpisode }) {
  return (
    <div className="flex flex-wrap gap-2">
      {["Spotify", "Apple", "YouTube"].map((platform) => (
        <a
          key={platform}
          href="https://www.acquired.fm/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/12 bg-white/[0.055] px-5 py-3 text-[0.68rem] font-black uppercase tracking-[0.16em] text-white/72 transition hover:bg-white hover:text-[#080d15]"
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
    <div className="grid gap-5">
      {tiles.map((tile, index) => (
        <article
          key={tile.title}
          className="grid gap-5 rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_18px_70px_rgba(0,0,0,0.18)] md:grid-cols-[0.34fr_1fr]"
        >
          <div>
            <p
            className="text-[0.64rem] font-black uppercase tracking-[0.2em] opacity-70"
              style={{ color: episode.palette.accent }}
            >
              0{index + 1}
            </p>
            <h3 className="mt-4 text-2xl font-black tracking-[-0.05em] text-white">
              {tile.title}
            </h3>
          </div>
          <div>
            <blockquote
              className="border-l-2 pl-4 text-[1.35rem] leading-8 text-white/88"
              style={{ borderColor: episode.palette.accent }}
            >
              “{tile.quote}”
            </blockquote>
            <p className="mt-5 leading-7 text-white/62">{tile.body}</p>
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
        <ol className="mt-5 divide-y divide-white/10 rounded-[1.25rem] border border-white/10 bg-white/[0.045]">
          {chapters.map(([time, label]) => (
            <li key={time} className="grid gap-2 px-5 py-4 sm:grid-cols-[90px_1fr]">
              <span
                className="font-mono text-sm font-bold"
                style={{ color: episode.palette.accent }}
              >
                {time}
              </span>
              <span className="text-white/72">{label}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-6">
        <h3 className="text-2xl font-black tracking-[-0.04em]">Transcript excerpt</h3>
        <div className="mt-5 space-y-5 leading-8 text-white/68">
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
        <div className="mt-6 rounded-xl bg-black/24 p-4">
          <p className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-white/38">
            Sources
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-white/62">
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
      <p className="text-[0.72rem] font-black uppercase tracking-[0.2em] text-white/42">
        {eyebrow}
      </p>
      <h2 className="mt-3 max-w-3xl font-display text-[clamp(2.4rem,5vw,5.25rem)] leading-[0.88] tracking-[-0.07em]">
        {title}
      </h2>
      {children && <div className="mt-5 max-w-2xl text-lg leading-8 text-white/60">{children}</div>}
    </div>
  );
}

function RelatedCard({ episode }: { episode: AcquiredEpisode }) {
  return (
    <Link href={`/episodes/${episode.slug}`} className="group block">
      <EpisodeArtwork episode={episode} small />
      <p className="mt-4 text-sm font-black uppercase tracking-[0.16em] text-white/42">
        {episode.season}
      </p>
      <h3 className="mt-1 text-3xl font-black tracking-[-0.05em] text-white transition group-hover:text-white/70">
        {episode.name}
      </h3>
      <p className="mt-2 text-white/54">{episode.tagline}</p>
    </Link>
  );
}

function EmailClubClose() {
  return (
    <section className="bg-[#081f1a] px-5 py-16 text-white sm:px-8 lg:py-24">
      <div className="mx-auto grid max-w-[1380px] gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-7 sm:p-10">
          <p className="text-[0.72rem] font-black uppercase tracking-[0.22em] text-[#00e1c6]">
            Emails from Ben & David
          </p>
          <h2 className="mt-4 font-display text-[clamp(3rem,7vw,7rem)] leading-[0.82] tracking-[-0.08em]">
            Never miss an episode
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/68">
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
              className="h-14 flex-1 rounded-full border border-white/15 bg-white px-5 text-black outline-none placeholder:text-black/45 focus:border-[#00e1c6]"
            />
            <button
              type="button"
              className="h-14 rounded-full bg-[#00e1c6] px-7 text-[0.78rem] font-black uppercase tracking-[0.16em] text-black transition hover:bg-white"
            >
              Subscribe
            </button>
          </form>
        </div>
        <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-7 sm:p-10">
          <p className="text-[0.72rem] font-black uppercase tracking-[0.22em] text-[#00e1c6]">
            Community
          </p>
          <h2 className="mt-4 font-display text-[clamp(3rem,7vw,7rem)] leading-[0.82] tracking-[-0.08em]">
            The conversation keeps going.
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/68">
            Join the Slack community around the world&apos;s greatest company stories.
          </p>
          <Link
            href="#"
            className="mt-8 inline-flex rounded-full bg-[#00e1c6] px-7 py-4 text-[0.74rem] font-black uppercase tracking-[0.18em] text-black transition hover:bg-white"
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
    <main className="min-h-screen bg-[#080d15] pt-[74px] text-white">
      <div className="lg:hidden">
        <AcquiredEpisodeNav episode={episode} />
      </div>

      <section className="episode-page-hero relative isolate overflow-hidden px-5 py-8 sm:px-8 lg:py-14">
        <div
          className="absolute inset-0 -z-10 opacity-50"
          style={{
            background: `radial-gradient(circle at 18% 18%, ${episode.palette.accent}55, transparent 32%), radial-gradient(circle at 78% 4%, ${episode.palette.background}88, transparent 34%)`,
          }}
        />
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[340px_minmax(0,1fr)] xl:grid-cols-[370px_minmax(0,1fr)]">
          <div className="hidden lg:block">
            <AcquiredEpisodeNav episode={episode} />
          </div>

          <article className="episode-copy-panel space-y-24">
            <section id="episode-hero" className="scroll-mt-28">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.24)] sm:p-8 xl:grid xl:grid-cols-[minmax(0,1fr)_300px] xl:gap-10">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-[0.7rem] font-black uppercase tracking-[0.18em] text-white/42">
                    <Link href="/episodes" className="hover:text-white">
                      Episodes
                    </Link>
                    <span>/</span>
                    <span>{episode.label}</span>
                  </div>
                  <p className="mt-8 text-[0.72rem] font-black uppercase tracking-[0.2em] text-white/42">
                    {eyebrow}
                  </p>
                  <h1 className="mt-4 max-w-4xl font-display text-[clamp(4rem,8vw,7.75rem)] leading-[0.82] tracking-[-0.075em]">
                    {episode.name}
                  </h1>
                  <p
                    className="mt-5 max-w-3xl font-display text-[clamp(2.1rem,4.2vw,4.5rem)] leading-[0.92] tracking-[-0.06em]"
                    style={{ color: episode.palette.accent }}
                  >
                    {episode.tagline}
                  </p>
                  <p className="mt-6 max-w-2xl text-xl leading-8 text-white/68">
                    {episode.guestLine}
                  </p>
                  <div className="mt-8">
                    <ListenButtons episode={episode} />
                  </div>
                  <p className="mt-5 text-sm font-black uppercase tracking-[0.18em] text-white/42">
                    Runtime {episode.duration}
                  </p>
                </div>
                <div className="mt-8 max-w-[320px] xl:mt-0 xl:self-end">
                  <EpisodeArtwork episode={episode} />
                </div>
              </div>
            </section>

            <section id="overview" className="scroll-mt-32 border-t border-white/10 pt-16">
              <SectionIntro eyebrow="Overview" title="What this episode explains">
                A cleaner synthesis up front, followed by the longer editorial read.
              </SectionIntro>
              <div className="grid gap-6 xl:grid-cols-[0.72fr_0.28fr]">
                <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-7">
                  <p className="text-2xl leading-9 text-white/88">{episode.dek}</p>
                  <div className="mt-7 space-y-6 text-lg leading-8 text-white/68">
                    {episode.description.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
                <aside className="rounded-[1.5rem] border border-white/10 bg-black/18 p-6">
                  <p className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-white/36">
                    Episode lens
                  </p>
                  <p className="mt-5 text-2xl leading-8 text-white/82">
                    “{episode.categories.join(" + ")} is the frame for the story.”
                  </p>
                </aside>
              </div>
            </section>

            <section id="key-takeaways" className="scroll-mt-32 border-t border-white/10 pt-16">
              <SectionIntro eyebrow="Key Takeaways" title="Themes worth stealing">
                Article-style notes that make the episode useful after the listen.
              </SectionIntro>
              <div className="mt-8">
                <TakeawayTiles episode={episode} />
              </div>
            </section>

            <section id="transcript" className="scroll-mt-32 border-t border-white/10 pt-16">
              <SectionIntro eyebrow="Transcript" title="Chapters, timestamps, and sources">
                Scan the episode, then use the sources block at the end.
              </SectionIntro>
              <div className="mt-8">
                <TranscriptBlock episode={episode} />
              </div>
            </section>

            <section id="guest-links" className="scroll-mt-32 border-t border-white/10 pb-10 pt-16">
              <SectionIntro eyebrow="Guest & links" title="Follow the research trail">
                Hosts, research links, and further reading for the episode.
              </SectionIntro>
              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.045] p-6">
                  <h3 className="text-2xl font-black tracking-[-0.04em]">{episode.guestLine}</h3>
                  <p className="mt-4 leading-7 text-white/62">
                    Hosted by the Acquired team, with research focused on {episode.name}
                    and the company-building lessons behind the episode.
                  </p>
                </div>
                <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.045] p-6">
                  <h3 className="text-2xl font-black tracking-[-0.04em]">Links</h3>
                  <ul className="mt-5 space-y-3">
                    {episode.links.map((link) => (
                      <li key={link}>
                        <Link href="#" className="text-white/72 transition hover:text-white">
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

      <section className="border-t border-white/10 bg-[#0b111d] px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1480px]">
          <p className="text-[0.74rem] font-black uppercase tracking-[0.2em] text-white/42">
            More from the series
          </p>
          <h2 className="mt-4 font-display text-[clamp(3rem,7vw,7rem)] leading-[0.82] tracking-[-0.08em]">
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
