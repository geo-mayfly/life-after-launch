"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NAV_LINKS, isActive } from "@/lib/nav";
import { ease } from "@/lib/motion";
import Wordmark from "@/components/brand/Wordmark";
import { Button } from "@/components/ui/Button";
import MobileMenu from "@/components/layout/MobileMenu";

/**
 * Header (brief §5.2) — transparent over heroes; condenses to a translucent
 * ink-navy bar that slides down once the hero passes. Active route shows a
 * marigold tick. Nav and footer stay outside the route transition.
 */
export default function Header() {
  const pathname = usePathname();
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50"
        style={{
          backgroundColor: condensed ? "rgba(6,42,82,0.86)" : "transparent",
          backdropFilter: condensed ? "saturate(140%) blur(10px)" : "none",
          borderBottom: condensed
            ? "1px solid rgba(255,255,255,0.10)"
            : "1px solid transparent",
          transition: "background-color 240ms var(--ease), border-color 240ms var(--ease)",
        }}
      >
        <div className="mx-auto flex h-[72px] max-w-wall items-center justify-between px-5 sm:px-8">
          <Wordmark size="sm" href="/" />

          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-[0.82rem] font-semibold uppercase tracking-eyebrow text-on-blue-soft transition-colors duration-fast hover:text-on-blue"
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-tick"
                      className="absolute -bottom-2 left-0 h-[2px] w-full bg-marigold"
                      transition={{ duration: 0.24, ease }}
                    />
                  )}
                </Link>
              );
            })}
            <Button href="/community" variant="primary" size="md" className="!min-h-[40px] !py-2">
              Join the Club
            </Button>
          </nav>

          {/* Mobile trigger */}
          <button
            className="flex h-11 w-11 items-center justify-center text-on-blue md:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
              <path d="M4 8h18M4 13h18M4 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
