import { site } from "@/content/site";
import PlatformIcon, {
  PLATFORM_LABELS,
  type Platform,
} from "@/components/episode/PlatformIcon";

/**
 * ProvidersRow — acquired.fm-style "listen on" platform row. Show-level
 * link-outs (Spotify / Apple / YouTube).
 */
const ORDER: Platform[] = ["spotify", "apple", "youtube"];

export default function ProvidersRow({
  on = "light",
}: {
  on?: "light" | "dark";
}) {
  const available = ORDER.filter((p) => site.listen[p]);
  const text = on === "dark" ? "text-on-blue" : "text-ink";
  const sub = on === "dark" ? "text-on-blue-soft" : "text-ink-2";

  return (
    <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
      <span className={`eyebrow ${sub}`}>Listen on</span>
      <ul className="flex flex-wrap items-center gap-6">
        {available.map((p) => (
          <li key={p}>
            <a
              href={site.listen[p]}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 font-semibold ${text} transition-opacity hover:opacity-70`}
            >
              <PlatformIcon platform={p} size={20} />
              {PLATFORM_LABELS[p]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
