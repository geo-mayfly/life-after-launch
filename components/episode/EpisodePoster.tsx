import type { Episode } from "@/content/schema";
import { posterEyebrow } from "@/lib/content";
import BlueWall from "@/components/brand/BlueWall";
import CloudHead from "@/components/brand/CloudHead";
import MorphLink from "@/components/motion/MorphLink";

/**
 * EpisodePoster (brief §6.1) — a poster pinned to the wall. Tone-tinted art,
 * EP · SEASON, editorial title, one-line hook. The whole tile is a crawlable
 * <a>; its art shares a view-transition-name with the episode hero for the morph.
 */
export default function EpisodePoster({
  episode,
  width = 300,
  priority = false,
}: {
  episode: Episode;
  width?: number;
  priority?: boolean;
}) {
  const href = `/episodes/${episode.slug}`;
  const vtName = `poster-${episode.slug}`;

  return (
    <MorphLink
      href={href}
      className="group block"
      ariaLabel={`${episode.episodeTitle} — ${episode.hook}`}
    >
      <article
        style={{ width }}
        className="transition-transform duration-base ease-brand group-hover:-translate-y-1"
      >
        <BlueWall
          tone={episode.tone}
          className="relative aspect-[4/5] overflow-hidden rounded-md shadow-sm transition-shadow duration-base group-hover:shadow-lg"
          style={{ viewTransitionName: vtName }}
          vignette={0.5}
        >
          <div className="flex h-full flex-col justify-between p-5">
            <div className="flex items-start justify-between">
              <span className="eyebrow text-on-blue-soft">{posterEyebrow(episode)}</span>
              <span className="rounded-full border border-[rgba(255,255,255,0.28)] px-2.5 py-0.5 text-[0.7rem] font-medium text-on-blue-soft">
                {episode.duration}
              </span>
            </div>

            {episode.anonymous && (
              <div className="flex flex-1 items-center justify-center">
                <CloudHead size={Math.round(width * 0.42)} color="var(--on-blue-soft)" />
              </div>
            )}

            <div className={episode.anonymous ? "" : "mt-auto"}>
              <h3 className="font-display text-[1.5rem] leading-[1.05] text-on-blue">
                {episode.episodeTitle}
              </h3>
              <p className="mt-2 line-clamp-2 text-[0.9rem] text-on-blue-soft">
                {episode.hook}
              </p>
            </div>
          </div>
        </BlueWall>
      </article>
    </MorphLink>
  );
}
