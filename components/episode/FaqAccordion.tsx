"use client";

import { useState } from "react";

/**
 * FAQ accordion (brief §6.3) — items expand/collapse with a CSS grid-rows
 * height transition (no JS animation library, so the episode route stays
 * framer-free and fast). The visible counterpart to the FAQPage JSON-LD.
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
                <span
                  aria-hidden
                  className="shrink-0 text-deep-blue transition-transform duration-base ease-brand"
                  style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
            </h4>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-trigger-${i}`}
              className="grid transition-[grid-template-rows] duration-base ease-brand"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="pb-5 pr-8 text-ink-2">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
