/** The four in-pane sections the "On this page" nav targets (brief: Related and
 *  the email/footer deliberately sit OUTSIDE this nav). */
export const EPISODE_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "key-takeaways", label: "Key takeaways" },
  { id: "transcript", label: "Transcript" },
  { id: "guest-links", label: "Guest & links" },
] as const;

export type EpisodeSectionId = (typeof EPISODE_SECTIONS)[number]["id"];
