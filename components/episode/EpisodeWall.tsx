"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
  animate,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState, type RefObject } from "react";
import type { Episode } from "@/content/schema";
import { ease } from "@/lib/motion";
import EpisodePoster from "@/components/episode/EpisodePoster";

/**
 * The draggable episode wall (set-piece §4.4b) — Palmer's explore canvas,
 * on-brand. Drag horizontally with momentum and gentle rubber-band bounds;
 * posters nearest centre scale up subtly and lift; a custom "drag" cursor
 * appears over the canvas. Keyboard users get arrow-key paging.
 *
 * Non-pointer / reduced-motion fallback: a normal scroll-snap rail.
 */
export default function EpisodeWall({
  episodes,
  itemWidth = 360,
  gap = 28,
  label = "Episodes",
}: {
  episodes: Episode[];
  itemWidth?: number;
  gap?: number;
  label?: string;
}) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [leftBound, setLeftBound] = useState(0);

  const step = itemWidth + gap;
  const trackWidth = episodes.length * step - gap;

  useEffect(() => {
    function measure() {
      const cw = containerRef.current?.clientWidth ?? 0;
      setLeftBound(Math.min(0, cw - trackWidth - 8));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [trackWidth]);

  function page(dir: 1 | -1) {
    const next = Math.max(leftBound, Math.min(0, x.get() - dir * step));
    animate(x, next, { duration: 0.42, ease });
  }

  // Reduced motion → static, natively-scrollable snap rail.
  if (reduced) {
    return (
      <div
        className="no-scrollbar overflow-x-auto focus-visible:outline-none"
        role="group"
        aria-label={`${label} — scroll to browse`}
        tabIndex={0}
        style={{ scrollSnapType: "x mandatory" }}
      >
        <div className="flex px-5 sm:px-8" style={{ gap }}>
          {episodes.map((e) => (
            <div key={e.slug} style={{ scrollSnapAlign: "start" }}>
              <EpisodePoster episode={e} width={itemWidth} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="drag-cursor overflow-hidden px-5 sm:px-8"
      role="group"
      aria-label={`${label} — drag, or use the left and right arrow keys to browse`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          page(1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          page(-1);
        }
      }}
    >
      <motion.div
        className="flex w-max"
        style={{ x, gap }}
        drag="x"
        dragConstraints={{ left: leftBound, right: 0 }}
        dragElastic={0.08}
        dragTransition={{ power: 0.28, timeConstant: 200, bounceStiffness: 300, bounceDamping: 40 }}
      >
        {episodes.map((e, i) => (
          <RailItem
            key={e.slug}
            x={x}
            index={i}
            step={step}
            itemWidth={itemWidth}
            containerRef={containerRef}
          >
            <EpisodePoster episode={e} width={itemWidth} priority={i < 2} />
          </RailItem>
        ))}
      </motion.div>
    </div>
  );
}

function RailItem({
  x,
  index,
  step,
  itemWidth,
  containerRef,
  children,
}: {
  x: MotionValue<number>;
  index: number;
  step: number;
  itemWidth: number;
  containerRef: RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}) {
  // Posters nearest the canvas centre scale up subtly (1.0 vs 0.94) and lift.
  const scale = useTransform(x, (latest) => {
    const cw = containerRef.current?.clientWidth ?? 1;
    const center = cw / 2;
    const itemCenter = latest + index * step + itemWidth / 2;
    const t = Math.min(1, Math.abs(itemCenter - center) / (cw / 2));
    return 1 - t * 0.06;
  });
  const y = useTransform(scale, (s) => (1 - s) * 60); // a touch of lift at centre

  return (
    <motion.div style={{ scale, y }} className="shrink-0">
      {children}
    </motion.div>
  );
}
