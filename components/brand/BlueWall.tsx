import { toneRecipe, type Tone } from "@/content/schema";
import type { CSSProperties, ReactNode } from "react";

/**
 * BlueWall — the studio wall (brief §2.2, §10.3).
 * The ONLY way to make a blue surface. Never a flat fill: every wall is a
 * depth gradient + hand-plaster blotches + a printed-ink grain tooth + a
 * soft, uneven vignette. Carries depth through deeper blues, never greys.
 */

// Fine plaster/ink tooth — a desaturated fractal-noise tile.
const NOISE_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>" +
  "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/>" +
  "<feColorMatrix type='saturate' values='0'/></filter>" +
  "<rect width='100%' height='100%' filter='url(#n)' opacity='0.65'/></svg>";

export const noiseUrl = `url("data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}")`;

// Coarse hand-plaster blotches — big soft clouds of tone for unevenness.
const PLASTER_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'>" +
  "<filter id='p'><feTurbulence type='fractalNoise' baseFrequency='0.012' numOctaves='2' seed='7'/>" +
  "<feColorMatrix type='saturate' values='0'/></filter>" +
  "<rect width='100%' height='100%' filter='url(#p)' opacity='0.5'/></svg>";

const plasterUrl = `url("data:image/svg+xml,${encodeURIComponent(PLASTER_SVG)}")`;

type Props = {
  tone?: Tone;
  children?: ReactNode;
  className?: string;
  as?: "section" | "div" | "header" | "article" | "footer";
  style?: CSSProperties;
  /** Vignette strength 0–1. */
  vignette?: number;
};

export default function BlueWall({
  tone = "launch",
  children,
  className = "",
  as: Tag = "div",
  style,
  vignette = 0.55,
}: Props) {
  const recipe = toneRecipe[tone];

  const wallStyle: CSSProperties = {
    backgroundColor: recipe.base,
    backgroundImage: [
      // lit top-left, sinking into shadow bottom-right
      `radial-gradient(140% 120% at 14% 4%, rgba(255,255,255,0.16), transparent 46%)`,
      `radial-gradient(120% 130% at 92% 100%, ${recipe.to}, transparent 58%)`,
      `linear-gradient(157deg, ${recipe.base} 0%, ${recipe.to} 96%)`,
    ].join(", "),
    position: "relative",
    isolation: "isolate",
    ...style,
  };

  return (
    <Tag className={className} style={wallStyle} data-tone={tone}>
      {/* coarse hand-plaster blotches */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: plasterUrl,
          backgroundSize: "640px 640px",
          mixBlendMode: "soft-light",
          opacity: 0.5,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* fine printed-ink grain tooth */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: noiseUrl,
          backgroundSize: "180px 180px",
          mixBlendMode: "overlay",
          opacity: 0.22,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* soft uneven vignette into shadow */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(135% 115% at 50% 32%, transparent 42%, rgba(4,18,40,${vignette}) 100%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div style={{ position: "relative", zIndex: 1, height: "100%" }}>{children}</div>
    </Tag>
  );
}
