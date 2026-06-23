import Link from "next/link";
import type { Episode } from "@/content/schema";
import { episodeEyebrow } from "@/lib/content";
import BlueWall from "@/components/brand/BlueWall";
import CloudHead from "@/components/brand/CloudHead";
import Eyebrow from "@/components/ui/Eyebrow";
import Pill from "@/components/ui/Pill";
import ListenButtons from "@/components/episode/ListenButtons";
import EpisodeCover from "@/components/episode/EpisodeCover";

/**
 * EpisodeHero (brief §6.3) — receives the poster→page morph. The collage cover
 * on the right carries the shared view-transition-name (the slug) and fills
 * what used to be an empty column. Reading-critical copy is full-opacity white.
 */
export default function EpisodeHero({ episode }: { episode: Episode }) {
  const roleCompany = [episode.guestRole, episode.guestCompany]
    .filter(Boolean)
    .join(", ");
  const guest = episode.anonymous
    ? "An anonymous Founder"
    : [episode.guestName, roleCompany].filter(Boolean).join(" — ");

  return (
    <BlueWall tone={episode.tone} as="header" className="pb-sp-9 pt-[120px]" vignette={0.5}>
      <div className="mx-auto max-w-content px-5 sm:px-8">
        {/* Breadcrumb (also emitted as BreadcrumbList schema by the page). */}
        <nav aria-label="Breadcrumb" className="mb-7">
          <ol className="flex flex-wrap items-center gap-2 text-small text-on-blue-soft">
            <li>
              <Link href="/" className="spark-link hover:text-on-blue">
                Home
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li>
              <Link href="/episodes" className="spark-link hover:text-on-blue">
                Episodes
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li className="text-on-blue">{episode.episodeTitle}</li>
          </ol>
        </nav>

        <div className="grid items-center gap-10 md:grid-cols-[1.25fr_0.75fr]">
          <div>
            <Eyebrow on="dark">{episodeEyebrow(episode)}</Eyebrow>
            <h1 className="mt-4 max-w-3xl font-display text-h1 leading-[1.02] text-on-blue">
              {episode.episodeTitle}
            </h1>
            <p className="mt-5 flex items-center gap-3 text-lead text-on-blue">
              {episode.anonymous && <CloudHead size={40} color="var(--on-blue)" />}
              {guest}
            </p>
            <p className="mt-5 max-w-2xl text-lead text-on-blue">{episode.hook}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ListenButtons listen={episode.listen} />
              <Pill on="dark">{episode.duration}</Pill>
            </div>
          </div>

          {/* The collage cover — morph target, fills the column. */}
          <div className="mx-auto w-full max-w-[360px] md:max-w-none">
            <div
              className="aspect-[4/5] overflow-hidden rounded-lg shadow-lg"
              style={{ viewTransitionName: `poster-${episode.slug}` }}
            >
              <EpisodeCover episode={episode} caption={false} />
            </div>
          </div>
        </div>
      </div>
    </BlueWall>
  );
}
