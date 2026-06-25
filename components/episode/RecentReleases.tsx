import Link from "next/link";
import type { Episode } from "@/content/schema";
import Eyebrow from "@/components/ui/Eyebrow";
import EpisodeCard from "@/components/episode/EpisodeCard";
import { Stagger, RevealItem } from "@/components/motion/Reveal";

/**
 * RecentReleases — acquired.fm-style tidy grid of recent episode covers with
 * captions below. Content-forward; a clean grid (the draggable wall lives on
 * the Episodes index).
 */
export default function RecentReleases({
  episodes,
  heading = "Recent releases",
}: {
  episodes: Episode[];
  heading?: string;
}) {
  return (
    <section className="mx-auto max-w-wall px-5 sm:px-8" aria-labelledby="recent-heading">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <Eyebrow>THE LIBRARY</Eyebrow>
          <h2 id="recent-heading" className="mt-3 font-display text-h2 text-ink">
            {heading}
          </h2>
        </div>
        <Link
          href="/episodes"
          className="spark-link shrink-0 font-semibold text-deep-blue"
        >
          All episodes →
        </Link>
      </div>

      <Stagger className="grid grid-cols-2 gap-x-6 gap-y-9 lg:grid-cols-4">
        {episodes.map((e) => (
          <RevealItem key={e.slug}>
            <EpisodeCard episode={e} />
          </RevealItem>
        ))}
      </Stagger>
    </section>
  );
}
