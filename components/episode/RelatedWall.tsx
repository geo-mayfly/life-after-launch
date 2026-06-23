import type { Episode } from "@/content/schema";
import EpisodePoster from "@/components/episode/EpisodePoster";
import { Stagger, RevealItem } from "@/components/motion/Reveal";

/**
 * Related mini-wall (brief §6.3 §8) — "More from the series / You may also
 * enjoy". 3–6 related posters that carry the same morph transition.
 */
export default function RelatedWall({ episodes }: { episodes: Episode[] }) {
  if (!episodes.length) return null;
  return (
    <Stagger className="grid grid-cols-2 gap-6 lg:grid-cols-3">
      {episodes.map((e) => (
        <RevealItem key={e.slug}>
          <EpisodePoster episode={e} />
        </RevealItem>
      ))}
    </Stagger>
  );
}
