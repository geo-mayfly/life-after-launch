import type { ReactNode } from "react";

/** A small static tag pill (duration, topic) — full pill radius (brief §3.5). */
export default function Pill({
  children,
  on = "dark",
  className = "",
}: {
  children: ReactNode;
  on?: "light" | "dark";
  className?: string;
}) {
  const styles =
    on === "dark"
      ? "border-[rgba(255,255,255,0.28)] text-on-blue-soft"
      : "border-hairline text-ink-2";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.78rem] font-medium tracking-wide ${styles} ${className}`}
    >
      {children}
    </span>
  );
}
