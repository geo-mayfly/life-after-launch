import { ImageResponse } from "next/og";
import { getEpisodeBySlug, getAllSlugs, posterEyebrow } from "@/lib/content";
import { toneRecipe } from "@/content/schema";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Life After Launch episode";

// Hex equivalents of the tone tokens (next/og can't read CSS vars).
const TONE_HEX: Record<string, { base: string; to: string }> = {
  launch: { base: "#0089F5", to: "#0061C4" },
  deep: { base: "#0061C4", to: "#062A52" },
  navy: { base: "#062A52", to: "#041d39" },
};

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);
  const tone = episode ? TONE_HEX[episode.tone] : TONE_HEX.launch;
  void toneRecipe; // tone hexes mirror the token recipe

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: `linear-gradient(135deg, ${tone.base} 0%, ${tone.to} 100%)`,
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "rgba(255,255,255,0.75)",
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            fontFamily: "sans-serif",
          }}
        >
          <span>{episode ? posterEyebrow(episode) : "Life After Launch"}</span>
          <span>{episode?.duration ?? ""}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#F7B01F",
              fontSize: 30,
              fontStyle: "italic",
              marginBottom: 12,
            }}
          >
            Life After Launch
          </div>
          <div
            style={{
              color: "#FFFFFF",
              fontSize: 84,
              lineHeight: 1.02,
              maxWidth: 980,
            }}
          >
            {episode?.episodeTitle ?? site.name}
          </div>
        </div>

        <div
          style={{
            color: "rgba(255,255,255,0.75)",
            fontSize: 24,
            fontFamily: "sans-serif",
          }}
        >
          {episode?.hook ?? site.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
