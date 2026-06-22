import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

/** Branded wall-and-wordmark OG for Home / About / Community (brief §9.1). */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0089F5 0%, #0061C4 100%)",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            color: "rgba(255,255,255,0.78)",
            fontSize: 26,
            letterSpacing: 5,
            textTransform: "uppercase",
            marginBottom: 28,
            fontFamily: "sans-serif",
          }}
        >
          An Aussie Founders Club podcast
        </div>
        <div style={{ display: "flex", flexDirection: "column", color: "#F7B01F" }}>
          <span style={{ fontSize: 96, fontStyle: "italic", lineHeight: 1 }}>
            Life After
          </span>
          <span style={{ fontSize: 132, letterSpacing: 4, lineHeight: 1 }}>
            LAUNCH
          </span>
        </div>
        <div style={{ marginTop: 36, color: "#FFFFFF", fontSize: 30, maxWidth: 760, fontFamily: "sans-serif" }}>
          {site.elevatorPitch}
        </div>
      </div>
    ),
    { ...size },
  );
}
