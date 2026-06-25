import type { Episode } from "@/content/schema";
import Chapters from "@/components/episode/Chapters";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Transcript — chapters + timestamps (brief: the readable, SEO-friendly outline,
 * never a player). A full word-for-word transcript drops in here once real audio
 * exists; until then the chapter markers are the structured outline.
 */
export default function Transcript({ episode }: { episode: Episode }) {
  const chapters = episode.chapters ?? [];
  return (
    <Reveal>
      <h2 className="font-display text-h2 text-ink">Transcript</h2>
      <p className="prose-bone mt-3 text-ink-2">
        Chapter markers for this episode. The full word-for-word transcript lands
        here soon — handy for skimming, quoting and search.
      </p>
      {chapters.length > 0 ? (
        <div className="mt-6">
          <Chapters chapters={chapters} />
        </div>
      ) : (
        <p className="mt-6 text-ink-3">Chapters coming soon.</p>
      )}
    </Reveal>
  );
}
