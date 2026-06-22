/**
 * Skeleton — blue field + soft bone shimmer. Keeps exact aspect ratio so
 * layout never shifts (CLS 0). Shimmer disabled under reduced motion (CSS).
 */
export default function Skeleton({
  aspect = "3 / 4",
  className = "",
  radius = "var(--r-md)",
}: {
  aspect?: string;
  className?: string;
  radius?: string;
}) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ aspectRatio: aspect, borderRadius: radius, width: "100%" }}
      aria-hidden
    />
  );
}
