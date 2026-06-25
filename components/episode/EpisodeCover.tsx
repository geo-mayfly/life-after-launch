import type { CSSProperties } from "react";
import type { Episode } from "@/content/schema";
import { posterEyebrow } from "@/lib/content";
import BlueWall from "@/components/brand/BlueWall";
import GuestPortrait from "@/components/brand/GuestPortrait";

/**
 * EpisodeCover — a distinctive, generated, collectible cover (brief P1-4 /
 * brand refresh). A numbered series: a big marigold episode numeral with riso
 * misregistration, a pinned collage guest portrait with the cloud-head cut-out,
 * the editorial title, on a tonal textured wall. The cloud is the recognisable
 * "atom" at thumbnail size.
 *
 * Used as the poster art on the wall AND (caption-less, larger) on the episode
 * hero, so the poster→page morph shares one consistent object.
 */
export default function EpisodeCover({
  episode,
  className = "",
  style,
  caption = true,
}: {
  episode: Episode;
  className?: string;
  style?: CSSProperties;
  caption?: boolean;
}) {
  const num = String(episode.episodeNumber).padStart(2, "0");

  return (
    <BlueWall
      tone={episode.tone}
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ containerType: "inline-size", ...style }}
      vignette={0.5}
    >
      {/* the collectible numeral — bleeds off the bottom-left edge */}
      <span
        className="riso pointer-events-none absolute -bottom-[9%] -left-[3%] font-display leading-[0.7] text-marigold"
        data-ghost={num}
        style={{ fontSize: "clamp(7rem, 58cqw, 26rem)", opacity: 0.95 }}
        aria-hidden
      >
        {num}
      </span>

      {/* pinned collage portrait — the head-in-clouds cut-out */}
      <div className="absolute right-[5%] top-[11%] w-[50%]">
        <GuestPortrait
          tone={episode.tone === "navy" ? "deep" : "navy"}
          anonymous={episode.anonymous}
          rotate={-3}
          className="aspect-[4/5] w-full"
        />
      </div>

      {/* top meta */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-[5%]">
        <span className="eyebrow text-on-blue">{posterEyebrow(episode)}</span>
        <span className="rounded-full border border-[rgba(255,255,255,0.35)] px-2.5 py-0.5 text-[0.7rem] font-medium text-on-blue-soft">
          {episode.duration}
        </span>
      </div>

      {/* title + hook (a styled label inside the poster link, not a heading) */}
      {caption && (
        <div className="absolute inset-x-0 bottom-0 p-[5%]">
          <p className="font-display text-[1.5rem] leading-[1.02] text-on-blue [text-shadow:0_2px_10px_rgba(4,18,40,0.55)]">
            {episode.episodeTitle}
          </p>
          <p className="mt-1.5 line-clamp-2 text-[0.85rem] text-on-blue-soft">
            {episode.hook}
          </p>
        </div>
      )}
    </BlueWall>
  );
}
