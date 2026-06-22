import type { CSSProperties } from "react";

/**
 * The Founder Fog — "head in the clouds" made literal (brief §2.2).
 * The one surreal device: the anonymous/abstract guest, the empty state, the
 * loading illustration, the decorative Community drift. Never the named hosts.
 */

type Props = {
  size?: number;
  color?: string;
  /** Slow 12s vertical drift loop (auto-disabled under reduced motion). */
  drift?: boolean;
  className?: string;
  style?: CSSProperties;
  title?: string;
};

export default function CloudHead({
  size = 160,
  color = "var(--on-blue-soft)",
  drift = false,
  className = "",
  style,
  title = "A founder with their head in the clouds",
}: Props) {
  return (
    <svg
      role="img"
      aria-label={title}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      style={{
        color,
        ...(drift ? { animation: "cloud-drift 12s ease-in-out infinite" } : {}),
        ...style,
      }}
    >
      <title>{title}</title>
      {/* shoulders / torso — the body the cloud sits on */}
      <path
        d="M52 200 C52 158 74 142 100 142 C126 142 148 158 148 200 Z"
        fill="currentColor"
        opacity="0.5"
      />
      {/* the fog: overlapping soft blobs forming a head */}
      <g fill="currentColor">
        <ellipse cx="100" cy="92" rx="56" ry="26" opacity="0.85" />
        <circle cx="74" cy="80" r="26" opacity="0.85" />
        <circle cx="104" cy="66" r="33" opacity="0.9" />
        <circle cx="134" cy="82" r="24" opacity="0.85" />
        <circle cx="92" cy="96" r="28" opacity="0.85" />
      </g>
      {/* faint inner light, to read as vapour not a solid blob */}
      <g fill="#FFFFFF" opacity="0.14">
        <circle cx="104" cy="66" r="22" />
        <circle cx="80" cy="82" r="14" />
      </g>
    </svg>
  );
}
