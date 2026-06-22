import { episodeSchema, type Episode } from "../schema";

// One file per episode. Adding an episode = drop a file here + add it below.
import theRevKeptComing from "./the-rev-kept-coming";
import weRanOutOfMoneyOnATuesday from "./we-ran-out-of-money-on-a-tuesday";
import iFiredMyCoFounder from "./i-fired-my-co-founder-then-my-best-mate";
import nobodyWantedIt from "./nobody-wanted-it-so-we-rebuilt-it";
import theRaiseThatDidntSaveUs from "./the-raise-that-didnt-save-us";
import theFounderWhoWalkedAway from "./the-founder-who-walked-away";

const raw: Episode[] = [
  theRevKeptComing,
  weRanOutOfMoneyOnATuesday,
  iFiredMyCoFounder,
  nobodyWantedIt,
  theRaiseThatDidntSaveUs,
  theFounderWhoWalkedAway,
];

// Validate every episode at module load. Throws (build-time) on bad data.
export const episodes: Episode[] = raw.map((e, i) => {
  const parsed = episodeSchema.safeParse(e);
  if (!parsed.success) {
    throw new Error(
      `Invalid episode at index ${i} (${e?.slug ?? "unknown"}):\n${parsed.error.toString()}`,
    );
  }
  return parsed.data;
});
