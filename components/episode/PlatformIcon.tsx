/** Minimal, custom, line-based platform glyphs — functional only (brief §2.4). */
export type Platform = "spotify" | "apple" | "youtube";

export default function PlatformIcon({
  platform,
  size = 18,
}: {
  platform: Platform;
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true as const,
  };

  if (platform === "spotify") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M7.5 9.8c3-0.8 6.3-0.5 9 1M8 12.6c2.4-0.6 5-0.4 7.2 0.9M8.4 15.2c1.9-0.5 3.9-0.3 5.6 0.7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (platform === "apple") {
    return (
      <svg {...common}>
        <circle cx="12" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M6.8 13.5a7 7 0 0 1 10.4 0M9 16.2a4 4 0 0 1 6 0M11 20l1-5 1 5z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  // youtube
  return (
    <svg {...common}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.5 9.2l4.2 2.8-4.2 2.8z" fill="currentColor" />
    </svg>
  );
}

export const PLATFORM_LABELS: Record<Platform, string> = {
  spotify: "Spotify",
  apple: "Apple Podcasts",
  youtube: "YouTube",
};
