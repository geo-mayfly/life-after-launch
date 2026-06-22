import Link from "next/link";
import type { Episode } from "@/content/schema";
import { episodeEyebrow } from "@/lib/content";
import BlueWall from "@/components/brand/BlueWall";
import CloudHead from "@/components/brand/CloudHead";
import Eyebrow from "@/components/ui/Eyebrow";
import Pill from "@/components/ui/Pill";
import ListenButtons from "@/components/episode/ListenButtons";

/**
 * EpisodeHero (brief §6.3) — receives the poster→page morph (shared
 * view-transition-name = the slug). Tone-tinted wall, breadcrumb, eyebrow,
 * editorial title, guest line, primary Listen link-outs, runtime.
 */
export default function EpisodeHero({ episode }: { episode: Episode }) {
  // e.g. "Dana Whitlock — Co-founder, Saltbush"
  const roleCompany = [episode.guestRole, episode.guestCompany]
    .filter(Boolean)
    .join(", ");
  const guest = episode.anonymous
    ? "An anonymous Founder"
    : [episode.guestName, roleCompany].filter(Boolean).join(" — ");

  return (
    <BlueWall
      tone={episode.tone}
      as="header"
      className="pb-sp-9 pt-[120px]"
      style={{ viewTransitionName: `poster-${episode.slug}` }}
      vignette={0.5}
    >
      <div className="mx-auto max-w-content px-5 sm:px-8">
        {/* Breadcrumb (also emitted as BreadcrumbList schema by the page). */}
        <nav aria-label="Breadcrumb" className="mb-7">
          <ol className="flex flex-wrap items-center gap-2 text-small text-on-blue-faint">
            <li>
              <Link href="/" className="spark-link hover:text-on-blue-soft">
                Home
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li>
              <Link href="/episodes" className="spark-link hover:text-on-blue-soft">
                Episodes
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li className="text-on-blue-soft">{episode.episodeTitle}</li>
          </ol>
        </nav>

        <Eyebrow on="dark">{episodeEyebrow(episode)}</Eyebrow>

        <div className="mt-4 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h1 className="max-w-3xl font-display text-h1 leading-[1.02] text-on-blue">
              {episode.episodeTitle}
            </h1>
            <p className="mt-5 flex items-center gap-3 text-lead text-on-blue-soft">
              {episode.anonymous && (
                <CloudHead size={40} color="var(--on-blue-soft)" />
              )}
              {guest}
            </p>
            <p className="mt-5 max-w-2xl text-on-blue-soft">{episode.hook}</p>
          </div>

          {episode.anonymous && (
            <div className="hidden md:block" aria-hidden>
              <CloudHead size={150} color="var(--on-blue-soft)" drift />
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <ListenButtons listen={episode.listen} />
          <Pill on="dark">{episode.duration}</Pill>
        </div>
      </div>
    </BlueWall>
  );
}
