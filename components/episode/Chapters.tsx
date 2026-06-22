import type { Episode } from "@/content/schema";

/**
 * Chapters / timestamps (brief §6.3) — a clean, readable list (great for SEO),
 * never a player. Renders as text with [mm:ss]-style stamps.
 */
export default function Chapters({
  chapters,
}: {
  chapters: NonNullable<Episode["chapters"]>;
}) {
  if (!chapters.length) return null;
  return (
    <ol className="divide-y divide-hairline">
      {chapters.map((c, i) => (
        <li key={i} className="flex items-baseline gap-4 py-3">
          <span className="shrink-0 font-mono text-small tabular-nums text-deep-blue">
            [{c.time}]
          </span>
          <span className="text-ink">{c.label}</span>
        </li>
      ))}
    </ol>
  );
}
