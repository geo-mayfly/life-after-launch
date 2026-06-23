import type { Episode } from "@/content/schema";
import MorphLink from "@/components/motion/MorphLink";
import EpisodeCover from "@/components/episode/EpisodeCover";

/**
 * EpisodePoster (brief §6.1) — a collectible cover pinned to the wall. The whole
 * tile is a crawlable <a>; its cover shares a view-transition-name with the
 * episode hero for the poster→page morph.
 */
export default function EpisodePoster({
  episode,
  width,
}: {
  episode: Episode;
  /** Fixed px (for horizontal rails) or omit to fill the grid cell. */
  width?: number;
  /** kept for call-site compatibility; images are generated, not loaded */
  priority?: boolean;
}) {
  const href = `/episodes/${episode.slug}`;
  const vtName = `poster-${episode.slug}`;

  return (
    <MorphLink
      href={href}
      className="group block w-full"
      ariaLabel={`${episode.episodeTitle} — ${episode.hook}`}
    >
      <article
        style={width ? { width } : undefined}
        className="w-full transition-transform duration-base ease-brand group-hover:-translate-y-1"
      >
        <div
          className="aspect-[4/5] overflow-hidden rounded-md shadow-sm transition-shadow duration-base group-hover:shadow-lg"
          style={{ viewTransitionName: vtName }}
        >
          <EpisodeCover episode={episode} />
        </div>
      </article>
    </MorphLink>
  );
}
