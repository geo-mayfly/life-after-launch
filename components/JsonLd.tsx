/**
 * Renders one or more JSON-LD objects into a <script type="application/ld+json">.
 * Server component — schema is emitted in the initial HTML for crawlers.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const json = Array.isArray(data) ? data : [data];
  return (
    <>
      {json.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Schema is built from trusted in-repo content only.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
    </>
  );
}
