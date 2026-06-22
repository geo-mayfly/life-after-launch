/**
 * Stat callout (brief §7.4) — the one concrete data point per insight, as a
 * marigold-on-ink-navy chip (~7.7:1, clears AA). Renders as real text.
 */
export default function StatCallout({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mt-4 inline-flex items-center gap-3 rounded-md bg-ink-navy px-4 py-3"
      role="note"
    >
      <span
        aria-hidden
        className="inline-block h-2 w-2 shrink-0 rounded-full bg-marigold"
      />
      <span className="font-semibold text-marigold">{children}</span>
    </p>
  );
}
