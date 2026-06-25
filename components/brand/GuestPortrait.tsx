import type { CSSProperties } from "react";
import { toneRecipe, type Tone } from "@/content/schema";
import CloudHead from "@/components/brand/CloudHead";

/**
 * GuestPortrait — an intentional, collaged placeholder for guest photography
 * (brand refresh: cut-paper + halftone + "head in the clouds"). A duotone bust
 * on a printed-ink field, with the collage cloud cut-out occluding the head.
 * Reads as a real-but-stylised portrait until actual photos land.
 *
 * TODO(owner §12.4): pass real photography here; swap the placeholder bust for
 * <Image>. The cloud-occlusion stays as the signature brand move (guests only).
 */

type Props = {
  tone?: Tone;
  anonymous?: boolean;
  /** Render the cloud-head occluding the head (the signature move). */
  withCloud?: boolean;
  cloudColor?: string;
  className?: string;
  style?: CSSProperties;
  rotate?: number;
};

export default function GuestPortrait({
  tone = "deep",
  anonymous = false,
  withCloud = true,
  cloudColor = "rgba(255,255,255,0.92)",
  className = "",
  style,
  rotate = 0,
}: Props) {
  const recipe = toneRecipe[tone];

  return (
    <div
      className={`relative ${className}`}
      style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined, ...style }}
      aria-hidden
    >
      {/* a strip of collage "tape" pinning the photo to the wall */}
      <span
        className="absolute -top-2 left-1/2 z-10 h-5 w-[34%] -translate-x-1/2 -rotate-2"
        style={{
          background:
            "linear-gradient(180deg, rgba(246,242,233,0.42), rgba(246,242,233,0.26))",
          boxShadow: "0 1px 2px rgba(6,42,82,0.18)",
        }}
      />
      <div
        className="cut-edge relative h-full w-full overflow-hidden"
        style={{
          background: `linear-gradient(160deg, ${recipe.base}, ${recipe.to})`,
          boxShadow: "var(--shadow-lg)",
        }}
      >
        {/* printed-photo halftone */}
        <span
          className="halftone absolute inset-0"
          style={{ color: "rgba(255,255,255,0.10)" }}
        />

        {/* duotone bust silhouette (skipped for anonymous) */}
        {!anonymous && (
          <svg
            viewBox="0 0 100 120"
            preserveAspectRatio="xMidYMax meet"
            className="absolute inset-x-0 bottom-0 mx-auto h-[88%]"
          >
            <defs>
              <linearGradient id="bust" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="rgba(255,255,255,0.22)" />
                <stop offset="1" stopColor="rgba(255,255,255,0.05)" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="44" r="23" fill="url(#bust)" />
            <path
              d="M12 120 C12 84 30 72 50 72 C70 72 88 84 88 120 Z"
              fill="url(#bust)"
            />
          </svg>
        )}

        {/* the collage cloud cut-out — occludes the head */}
        {(withCloud || anonymous) && (
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: anonymous ? "26%" : "12%" }}
          >
            <CloudHead size={anonymous ? 150 : 120} color={cloudColor} />
          </div>
        )}
      </div>
    </div>
  );
}
