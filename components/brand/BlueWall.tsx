import { toneRecipe, type Tone } from "@/content/schema";
import type { CSSProperties, ReactNode } from "react";

/**
 * BlueWall — the studio wall (brief §2.2, §10.3).
 * The ONLY way to make a blue surface. Never a flat fill: every wall is the
 * tone gradient + a hand-plaster noise tooth + a soft, uneven vignette.
 *
 * Pure presentational server component. The optional slow wall-drift parallax
 * (hero only) is layered on top by a separate client wrapper.
 */

// Fine plaster tooth — a desaturated fractal-noise tile.
const NOISE_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>" +
  "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/>" +
  "<feColorMatrix type='saturate' values='0'/></filter>" +
  "<rect width='100%' height='100%' filter='url(#n)' opacity='0.6'/></svg>";

export const noiseUrl = `url("data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}")`;

type Props = {
  tone?: Tone;
  children?: ReactNode;
  className?: string;
  /** Render as a section/div with extra style. */
  as?: "section" | "div" | "header" | "article";
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
    // Tone gradient: base lit at top-left, sinking into shadow bottom-right.
    backgroundColor: recipe.base,
    backgroundImage: [
      // soft uneven plaster blotches (two large radial pools)
      `radial-gradient(120% 100% at 18% 8%, rgba(255,255,255,0.10), transparent 55%)`,
      `radial-gradient(120% 120% at 88% 96%, ${recipe.to}, transparent 60%)`,
      // overall depth gradient into shadow
      `linear-gradient(155deg, ${recipe.base} 0%, ${recipe.to} 100%)`,
    ].join(", "),
    position: "relative",
    isolation: "isolate",
    ...style,
  };

  return (
    <Tag className={className} style={wallStyle} data-tone={tone}>
      {/* plaster tooth */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: noiseUrl,
          backgroundSize: "160px 160px",
          mixBlendMode: "overlay",
          opacity: 0.12,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* soft uneven vignette */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(130% 110% at 50% 38%, transparent 45%, rgba(4,21,45,${vignette}) 100%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div style={{ position: "relative", zIndex: 1, height: "100%" }}>
        {children}
      </div>
    </Tag>
  );
}
