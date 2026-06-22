"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ease } from "@/lib/motion";

/**
 * FAQ accordion (brief §6.3) — items expand/collapse with height + fade.
 * The visible counterpart to the FAQPage JSON-LD. Fully keyboard accessible.
 */
export default function FaqAccordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-hairline border-y border-hairline">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <h4>
              <button
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-trigger-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="font-semibold text-ink">{item.q}</span>
                <motion.span
                  aria-hidden
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.24, ease }}
                  className="shrink-0 text-deep-blue"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </motion.span>
              </button>
            </h4>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease }}
                  style={{ overflow: "hidden" }}
                >
                  <p className="pb-5 pr-8 text-ink-2">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
