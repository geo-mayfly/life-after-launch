"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

/**
 * MorphLink — drives the poster→page scene transition (brief §4.4c) via the
 * View Transitions API as a progressive enhancement. The clicked poster and
 * the destination hero share a `view-transition-name` (the slug), so the
 * browser morphs one into the other. Falls back to a normal client navigation
 * (with the route-template fade) where VT is unsupported or motion is reduced.
 */
export default function MorphLink({
  href,
  children,
  className,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const router = useRouter();

  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    // Respect modified clicks (open in new tab etc.).
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    const supported =
      typeof document !== "undefined" &&
      typeof document.startViewTransition === "function";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!supported || reduced) return; // let Next handle it normally

    e.preventDefault();
    document.startViewTransition(() => router.push(href));
  }

  return (
    <Link href={href} className={className} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
