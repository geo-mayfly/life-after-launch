import type { Episode } from "@/content/schema";
import { episodeEyebrow } from "@/lib/content";
import MorphLink from "@/components/motion/MorphLink";
import EpisodeCover from "@/components/episode/EpisodeCover";

/**
 * EpisodeCard — acquired.fm-style: the square cover art on top, with the
 * title / EP·SEASON·date / duration as a caption BELOW the thumbnail. The
 * cover carries the poster→page morph (shared view-transition-name).
 */
export default function EpisodeCard({ episode }: { episode: Episode }) {
  const href = `/episodes/${episode.slug}`;
  return (
    <MorphLink href={href} className="group block w-full">
      <article className="w-full">
        <div
          className="aspect-[4/5] overflow-hidden rounded-md shadow-sm transition-[transform,box-shadow] duration-base ease-brand group-hover:-translate-y-1 group-hover:shadow-lg"
          style={{ viewTransitionName: `poster-${episode.slug}` }}
        >
          <EpisodeCover episode={episode} caption={false} />
        </div>
        <div className="mt-4">
          <p className="eyebrow text-deep-blue">{episodeEyebrow(episode)}</p>
          <h3 className="mt-2 font-display text-h3 leading-[1.04] text-ink transition-colors group-hover:text-deep-blue">
            {episode.episodeTitle}
          </h3>
          <p className="mt-1.5 text-small text-ink-2">{episode.duration}</p>
        </div>
      </article>
    </MorphLink>
  );
}
