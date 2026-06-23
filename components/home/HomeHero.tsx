"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import BlueWall from "@/components/brand/BlueWall";
import GuestPortrait from "@/components/brand/GuestPortrait";
import Eyebrow from "@/components/ui/Eyebrow";
import ListenSheet from "@/components/episode/ListenSheet";

const LAUNCH = "LAUNCH".split("");

/**
 * The cinematic hero (set-piece §4.4a). Entrance is CSS-driven, so it ends
 * VISIBLE with or without JS and respects reduced motion — never an empty
 * void on load. The wordmark sets at poster scale (marigold, letter-by-letter
 * reveal on LAUNCH); a collage founder/cloud-head portrait rises on the right
 * and occludes the lettering (the signature brand move) with a slow pointer
 * parallax (the one sanctioned drift, ≤14px) layered on as enhancement.
 */
export default function HomeHero() {
  const driftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = driftRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;
    const onMove = (e: PointerEvent) => {
      cx = ((e.clientX / window.innerWidth) * 2 - 1) * 14;
      cy = ((e.clientY / window.innerHeight) * 2 - 1) * 10;
    };
    const loop = () => {
      tx += (cx - tx) * 0.06;
      ty += (cy - ty) * 0.06;
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <BlueWall
      tone="launch"
      as="section"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
      vignette={0.5}
    >
      <div className="relative z-[2] mx-auto grid w-full max-w-wall items-center gap-8 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="max-w-3xl">
          <div className="hero-rise" style={{ animationDelay: "0.1s" }}>
            <Eyebrow on="dark">AN AUSSIE FOUNDERS CLUB PODCAST</Eyebrow>
          </div>

          <h1 className="mt-5 font-display text-hero leading-[0.92] text-marigold" aria-label="Life After Launch">
            <span
              aria-hidden
              className="hero-rise block italic"
              style={{ animationDelay: "0.25s" }}
            >
              Life After
            </span>
            <span aria-hidden className="hero-mask mt-1 flex tracking-[0.01em]">
              {LAUNCH.map((letter, i) => (
                <span
                  key={i}
                  className="hero-letter"
                  style={{ animationDelay: `${0.4 + i * 0.05}s` }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </h1>

          <p
            className="hero-rise mt-7 max-w-xl text-lead text-on-blue"
            style={{ animationDelay: "0.85s" }}
          >
            {site.elevatorPitch}
          </p>

          <div
            className="hero-rise mt-9 flex flex-wrap items-center gap-6"
            style={{ animationDelay: "1s" }}
          >
            <ListenSheet />
            <Link href="/episodes" className="spark-link text-on-blue hover:text-on-blue">
              Start with the latest →
            </Link>
          </div>
        </div>

        {/* Collage founder + cloud-head — rises, drifts, occludes the wordmark. */}
        <div
          className="pointer-events-none relative z-[1] mx-auto -mt-10 hidden w-[78%] max-w-[360px] lg:-ml-24 lg:mt-0 lg:block"
          aria-hidden
        >
          <div ref={driftRef} className="hero-rise" style={{ animationDelay: "0.5s" }}>
            <GuestPortrait
              tone="deep"
              withCloud
              rotate={-4}
              className="aspect-[4/5] w-full"
            />
          </div>
        </div>
      </div>
    </BlueWall>
  );
}
