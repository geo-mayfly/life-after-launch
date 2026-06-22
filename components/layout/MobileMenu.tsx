"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { NAV_LINKS } from "@/lib/nav";
import { ease } from "@/lib/motion";
import BlueWall from "@/components/brand/BlueWall";
import { Button } from "@/components/ui/Button";

/**
 * Full-screen blue-wall overlay menu (brief §5.2). Links stagger in (big serif),
 * one marigold CTA at the base. 44px targets. Locks body scroll while open.
 */
export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease }}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <BlueWall tone="navy" className="h-full w-full" vignette={0.65}>
            <div className="flex h-full flex-col px-6 pb-10 pt-6">
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  aria-label="Close menu"
                  className="flex h-11 w-11 items-center justify-center rounded-full text-on-blue"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.07, duration: 0.42, ease }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="block py-3 font-display text-[2.5rem] leading-none text-on-blue"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto">
                <Button href="/community" variant="primary" size="lg" className="w-full">
                  Join the Club
                </Button>
              </div>
            </div>
          </BlueWall>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
