import Link from "next/link";
import type { Episode } from "@/content/schema";
import { episodeEyebrow } from "@/lib/content";
import { site } from "@/content/site";
import BlueWall from "@/components/brand/BlueWall";
import Wordmark from "@/components/brand/Wordmark";
import ListenButtons from "@/components/episode/ListenButtons";
import EpisodeCover from "@/components/episode/EpisodeCover";
import MorphLink from "@/components/motion/MorphLink";

/**
 * FeaturedEpisode — the acquired.fm-style content-forward hero. The newest
 * episode IS the hero: big collectible cover on one side; brand wordmark +
 * "the latest" + episode title + meta + listen on the other. Tone-tinted to
 * the featured episode. Keeps the 5-second brand test via the wordmark lockup.
 */
export default function FeaturedEpisode({ episode }: { episode: Episode }) {
  const href = `/episodes/${episode.slug}`;
  const overview = episode.overview[0];

  return (
    <BlueWall
      tone={episode.tone}
      as="section"
      className="overflow-hidden pb-sp-9 pt-[112px]"
      vignette={0.5}
      aria-labelledby="featured-title"
    >
      <div className="mx-auto grid max-w-wall items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Brand + featured episode meta */}
        <div className="order-2 lg:order-1">
          <div className="hero-rise" style={{ animationDelay: "0.05s" }}>
            <Wordmark size="lg" href="/" />
            <p className="mt-3 max-w-md font-display text-h3 italic text-on-blue">
              {site.tagline}
            </p>
          </div>

          <div
            className="hero-rise mt-9 flex items-center gap-3"
            style={{ animationDelay: "0.18s" }}
          >
            <span className="inline-block h-2 w-2 rounded-full bg-marigold" />
            <span className="eyebrow text-on-blue">The latest episode</span>
          </div>

          <p className="hero-rise mt-4 eyebrow text-on-blue-soft" style={{ animationDelay: "0.24s" }}>
            {episodeEyebrow(episode)}
          </p>

          <h1
            id="featured-title"
            className="hero-rise mt-3 max-w-2xl font-display text-h1 leading-[1.02] text-on-blue"
            style={{ animationDelay: "0.3s" }}
          >
            <Link href={href} className="transition-opacity hover:opacity-90">
              {episode.episodeTitle}
            </Link>
          </h1>

          <p
            className="hero-rise mt-5 max-w-xl text-lead text-on-blue"
            style={{ animationDelay: "0.4s" }}
          >
            {episode.hook}
          </p>

          <div
            className="hero-rise mt-8 flex flex-wrap items-center gap-x-5 gap-y-4"
            style={{ animationDelay: "0.5s" }}
          >
            <ListenButtons listen={episode.listen} />
            <Link href={href} className="spark-link font-semibold text-on-blue">
              Read the takeaways →
            </Link>
          </div>

          <p className="sr-only">{overview}</p>
        </div>

        {/* The big collectible cover (clickable, morphs to the episode) */}
        <div className="order-1 mx-auto w-full max-w-[440px] lg:order-2 lg:max-w-none">
          <MorphLink href={href} className="group block" ariaLabel={`Open ${episode.episodeTitle}`}>
            <div
              className="hero-rise aspect-[4/5] overflow-hidden rounded-lg shadow-lg transition-transform duration-base ease-brand group-hover:-translate-y-1"
              style={{ viewTransitionName: `poster-${episode.slug}`, animationDelay: "0.2s" }}
            >
              <EpisodeCover episode={episode} caption={false} />
            </div>
          </MorphLink>
        </div>
      </div>
    </BlueWall>
  );
}
