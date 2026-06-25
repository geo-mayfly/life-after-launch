/**
 * Smooth-scroll to a section, using the shared Lenis instance when present
 * (exposed by SmoothScroll) so it doesn't fight the smooth-scroll loop; falls
 * back to native scrollIntoView (and honours reduced motion).
 */
export function scrollToId(id: string, offset = -88) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { lenis?: { scrollTo: (t: Element, o?: object) => void } })
    .lenis;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (lenis?.scrollTo && !reduced) {
    lenis.scrollTo(el, { offset });
  } else {
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }
}
