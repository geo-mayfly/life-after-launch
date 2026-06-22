import type { ReactNode } from "react";

/**
 * Eyebrow / kicker (brief §3.4) — grotesk caps, wide tracking, deep-blue or ink.
 * NEVER marigold (the discipline rule). Optional marigold "tick" wipes in.
 */

type Props = {
  children: ReactNode;
  /** "light" surface → deep-blue text; "dark" wall → on-blue-soft. */
  on?: "light" | "dark";
  tick?: boolean;
  className?: string;
  as?: "p" | "div" | "span";
};

export default function Eyebrow({
  children,
  on = "light",
  tick = true,
  className = "",
  as: Tag = "p",
}: Props) {
  const color = on === "dark" ? "var(--on-blue-soft)" : "var(--deep-blue)";
  return (
    <Tag
      className={`eyebrow ${className}`}
      style={{ color, display: "inline-flex", alignItems: "center", gap: "0.6em" }}
    >
      {tick && (
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: "1.6em",
            height: "2px",
            background: "var(--marigold)",
            borderRadius: "2px",
          }}
        />
      )}
      {children}
    </Tag>
  );
}
