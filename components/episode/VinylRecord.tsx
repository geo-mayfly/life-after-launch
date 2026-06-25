import type { Episode } from "@/content/schema";

/**
 * VinylRecord — the audio "play" motif revealed when an episode tile blooms
 * into its full-screen takeover (an on-brand take on acquired.fm's record). A
 * grooved black disc with a marigold centre label carrying the episode number
 * and show name. Decorative (aria-hidden); spins slowly unless reduced motion.
 */
export default function VinylRecord({
  episode,
  size = 460,
  spinning = true,
}: {
  episode: Episode;
  size: number;
  spinning?: boolean;
}) {
  const num = String(episode.episodeNumber).padStart(2, "0");
  const label = size * 0.36;

  return (
    <div
      aria-hidden
      className="relative shrink-0 rounded-full"
      style={{ width: size, height: size }}
    >
      <div
        className={`absolute inset-0 rounded-full ${spinning ? "record-spin" : ""}`}
        style={{
          background:
            "repeating-radial-gradient(circle at 50% 50%, #0b0b0d 0 1.5px, #16161a 1.5px 3px)",
          boxShadow:
            "0 30px 70px rgba(4,18,40,0.55), inset 0 0 40px rgba(0,0,0,0.6)",
        }}
      >
        {/* sheen */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(120% 120% at 32% 26%, rgba(255,255,255,0.18), transparent 42%)",
          }}
        />
        {/* centre label */}
        <div
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full text-center"
          style={{
            width: label,
            height: label,
            background: "linear-gradient(150deg, var(--marigold-bright), var(--marigold-deep))",
            boxShadow: "inset 0 0 0 1px rgba(6,42,82,0.25)",
          }}
        >
          <span
            className="font-display leading-none text-ink-navy"
            style={{ fontSize: size * 0.085 }}
          >
            EP {num}
          </span>
          <span
            className="mt-1 font-semibold uppercase tracking-[0.16em] text-ink-navy"
            style={{ fontSize: size * 0.026 }}
          >
            Life After Launch
          </span>
        </div>
        {/* spindle hole */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink-navy"
          style={{ width: size * 0.028, height: size * 0.028 }}
        />
      </div>
    </div>
  );
}
