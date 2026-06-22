import type { Episode } from "@/content/schema";
import PlatformIcon, {
  PLATFORM_LABELS,
  type Platform,
} from "@/components/episode/PlatformIcon";

/**
 * ListenButtons (brief §6.3) — primary platform link-outs on the episode hero.
 * Order: Spotify · Apple · YouTube. Link-out first, never an on-site player.
 */
const ORDER: Platform[] = ["spotify", "apple", "youtube"];

export default function ListenButtons({
  listen,
  size = "md",
}: {
  listen: Episode["listen"];
  size?: "md" | "sm";
}) {
  const available = ORDER.filter((p) => listen[p]);
  if (available.length === 0) return null;

  const pad = size === "sm" ? "px-3.5 py-2 text-[0.85rem]" : "px-5 py-2.5";

  return (
    <ul className="flex flex-wrap gap-3" aria-label="Listen on">
      {available.map((p) => (
        <li key={p}>
          <a
            href={listen[p]!}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-[44px] items-center gap-2 rounded-full bg-paper font-semibold text-ink shadow-sm transition-[transform,box-shadow] duration-fast hover:-translate-y-px hover:shadow-lg ${pad}`}
          >
            <PlatformIcon platform={p} />
            {PLATFORM_LABELS[p]}
          </a>
        </li>
      ))}
    </ul>
  );
}
