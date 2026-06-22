import { site } from "@/content/site";
import { getAllEpisodes } from "@/lib/content";

export const dynamic = "force-static";

/**
 * llms.txt (brief §9.3) — a plain-text map of the site for LLMs: the show's
 * description, hosts, and links to every episode and its Key Takeaways.
 */
export function GET() {
  const episodes = getAllEpisodes();

  const lines: string[] = [];
  lines.push(`# ${site.name}`);
  lines.push(`> ${site.elevatorPitch}`);
  lines.push("");
  lines.push(
    `${site.name} is an interview-led podcast — the public face of the ${site.club}, a Slack community of ${site.memberCount.toLocaleString("en-AU")} founders. Hosts: ${site.hosts
      .map((h) => h.name)
      .join(" and ")}. Tagline: ${site.tagline}`,
  );
  lines.push("");
  lines.push("## Pages");
  lines.push(`- [Home](${site.url}/): the show, latest episodes, join the Club.`);
  lines.push(`- [Episodes](${site.url}/episodes): the full archive.`);
  lines.push(`- [About](${site.url}/about): the show and the hosts.`);
  lines.push(`- [Community](${site.url}/community): join the Aussie Founders Club Slack.`);
  lines.push("");
  lines.push("## Episodes");
  for (const e of episodes) {
    const guest = e.anonymous
      ? "an anonymous Founder"
      : [e.guestName, e.guestCompany].filter(Boolean).join(", ");
    lines.push(
      `- [${e.episodeTitle}](${site.url}/episodes/${e.slug}) — EP ${e.episodeNumber}, S${e.season}${
        guest ? `, with ${guest}` : ""
      }. ${e.hook}`,
    );
    lines.push(`  Key takeaways: ${e.keyTakeaways.question}`);
    if (e.keyTakeaways.tldr) lines.push(`  TL;DR: ${e.keyTakeaways.tldr}`);
  }
  lines.push("");
  lines.push(`## Listen`);
  lines.push(`- Spotify: ${site.listen.spotify}`);
  lines.push(`- Apple Podcasts: ${site.listen.apple}`);
  lines.push(`- YouTube: ${site.listen.youtube}`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
