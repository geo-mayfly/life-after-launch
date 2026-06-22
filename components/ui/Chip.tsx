"use client";

import type { ReactNode } from "react";

/**
 * Filter chip (brief §6.2) — grotesk caps. Active chip is marigold-on-navy.
 * Presentational; the Episodes filter bar owns the selection state.
 */
export default function Chip({
  children,
  active = false,
  onClick,
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        "shrink-0 rounded-full px-4 py-2 text-[0.8rem] font-semibold uppercase tracking-eyebrow " +
        "transition-[background-color,color,border-color] duration-fast ease-brand " +
        (active
          ? "bg-marigold text-ink-navy"
          : "border border-[rgba(255,255,255,0.28)] text-on-blue-soft hover:text-on-blue hover:border-[rgba(255,255,255,0.6)]")
      }
    >
      {children}
    </button>
  );
}
