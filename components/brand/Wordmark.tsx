import Link from "next/link";
import type { CSSProperties } from "react";

/**
 * The wordmark — "Life After / LAUNCH" (brief §4.4a, §5.2).
 * The logotype carries the brand's expressive licence: marigold display serif,
 * "Life After" in the italic register, "LAUNCH" in caps. Always full marigold.
 *
 * NOTE: the real brand ships a custom lettering lockup (logo-marigold.png).
 * Until that master is in /public/brand, this is a faithful type-set stand-in.
 */

type Props = {
  /** poster = hero scale, lg = section, sm = nav/footer. */
  size?: "poster" | "lg" | "sm";
  /** Stack the two lines (poster) or keep inline (nav). */
  stacked?: boolean;
  href?: string | null;
  className?: string;
  /** Single-colour override (e.g. on-blue footer can stay marigold). */
  color?: string;
};

const sizeStyles: Record<NonNullable<Props["size"]>, CSSProperties> = {
  poster: { fontSize: "var(--t-hero)", lineHeight: 0.92 },
  lg: { fontSize: "var(--t-h1)", lineHeight: 0.96 },
  sm: { fontSize: "1.35rem", lineHeight: 1 },
};

export default function Wordmark({
  size = "sm",
  stacked = false,
  href = "/",
  className = "",
  color = "var(--marigold)",
}: Props) {
  const inner = (
    <span
      className={className}
      style={{
        fontFamily: "var(--font-display)",
        color,
        display: "inline-block",
        letterSpacing: "-0.01em",
        ...sizeStyles[size],
      }}
      aria-label="Life After Launch"
    >
      <span aria-hidden style={{ display: stacked ? "block" : "inline" }}>
        <em style={{ fontStyle: "italic", fontWeight: 400 }}>Life After</em>
      </span>{" "}
      <span
        aria-hidden
        style={{
          display: stacked ? "block" : "inline",
          textTransform: "uppercase",
          letterSpacing: stacked ? "0.02em" : "0.01em",
        }}
      >
        Launch
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} aria-label="Life After Launch — home" style={{ display: "inline-block" }}>
        {inner}
      </Link>
    );
  }
  return inner;
}
