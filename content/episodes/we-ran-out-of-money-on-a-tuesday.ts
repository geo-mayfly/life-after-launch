import type { Episode } from "../schema";

const episode: Episode = {
  slug: `we-ran-out-of-money-on-a-tuesday`,
  episodeTitle: `We ran out of money on a Tuesday.`,
  hook: `Payroll was due Friday. The account said no. He had three days.`,
  season: 2,
  episodeNumber: 3,
  publishDate: `2026-02-28`,
  duration: `58m`,
  tone: `deep`,
  guestName: `Marcus Trent`,
  guestRole: `Founder & CEO`,
  guestCompany: `Kindling`,
  guestBio: `Marcus Trent founded Kindling, a Perth-based marketplace connecting tradies with last-minute job leads, after watching his old man lose a fortnight of work to a busted phone and no shopfront. (Placeholder bio.) He's blunt, allergic to spin, and the sort of Founder who'll tell you the exact dollar figure in the bank on the worst day — partly because he still remembers it, and partly because he thinks pretending otherwise is how good companies die quietly.`,
  image: {
    src: `/episodes/we-ran-out-of-money-on-a-tuesday.jpg`,
    alt: `Warm three-quarter studio portrait of Marcus Trent against a textured blue wall, arms folded, a tired half-smile that's seen the worst of it.`,
  },
  listen: {
    spotify: `https://open.spotify.com/episode/PLACEHOLDER`,
    apple: `https://podcasts.apple.com/podcast/PLACEHOLDER`,
    youtube: `https://youtube.com/watch?v=PLACEHOLDER`,
  },
  overview: [
    `Most founders have a number they never say out loud. For Marcus it was $11,400 — the balance in Kindling's account on the Tuesday he realised Friday's payroll of $46,000 wasn't going to clear. No villain in this story, no single bad decision. Just a slow, ordinary drift of optimistic forecasts and invoices that took longer to pay than the spreadsheet promised.`,
    `This is the hour-by-hour of the worst week of his founding life. The 6am call to his co-founder, the spreadsheet rebuilt from scratch on a kitchen bench, the customer he begged to pay early and the supplier he had to ring and ask to wait. He made payroll with three days to spare. What he learned in the seventy-two hours either side of it changed how he runs the company.`,
    `If you've ever stared at a bank balance and felt your stomach drop, this one's for you. It's not a cautionary tale about failure. It's about what you actually do when the number says no.`,
  ],
  pullQuote: {
    text: `I didn't tell anyone for two days. That was the real mistake — not the money, the silence.`,
    attribution: `Marcus Trent`,
  },
  keyTakeaways: {
    question: `What do you actually do when you can't make payroll?`,
    dek: `Running out of cash is the quietest emergency in a startup — it builds for months, then arrives on an ordinary Tuesday. Kindling came within three days of missing a $46k payroll. Here's the playbook Marcus wishes he'd had before the account said no, and the habits he built so it never gets that close again.`,
    tldr: `A cash crisis is survivable if you act in days not weeks, tell your people early, and treat collections as a founder job, not an admin one.`,
    insights: [
      {
        lead: `A cash crisis almost never arrives as a surprise — it arrives as a forecast you stopped believing.`,
        body: `Marcus had a thirteen-week cash model. The trouble was he'd stopped updating it weekly, so it drifted out of date right when it mattered most. The wake-up call wasn't the empty account — it was realising he'd let the one document that could have warned him go stale. He now rebuilds the model every Monday before he reads a single email.`,
        stat: `The forecast was 5 weeks out of date when it broke`,
      },
      {
        lead: `Collecting cash you're already owed beats raising cash you don't have yet.`,
        body: `The fastest money in a crunch isn't a loan or a bridge round — it's the invoices already sitting in someone else's accounts-payable queue. Marcus rang four customers personally and offered a small early-payment discount on two of them. Two of the four paid within forty-eight hours, and that, not heroics, is what cleared payroll.`,
        stat: `Personal calls pulled forward $38k in 48 hours`,
      },
      {
        lead: `Telling your team early is a leadership move, not a confession of failure.`,
        body: `Marcus sat on the news for two days, convinced that protecting the team meant hiding the danger. When he finally told his co-founder and lead engineer, they immediately found a deferrable supplier bill and a contractor happy to delay an invoice. The silence cost him forty-eight hours he couldn't afford; the honesty bought him room he didn't know he had.`,
        stat: `2 days lost to silence; 1 conversation found 3 levers`,
      },
      {
        lead: `Your suppliers would rather wait than lose you — if you ask before you default.`,
        body: `The conversation Marcus dreaded most, ringing a supplier to ask for an extension, turned out to be the easiest. A vendor who's paid on time for a year will almost always grant thirty days to a Founder who calls in advance and is straight about it. Defaulting silently burns the relationship; asking openly usually deepens it.`,
        stat: `A 30-day extension on $22k, granted in one phone call`,
      },
      {
        lead: `The point of surviving the crisis is the discipline you keep afterwards.`,
        body: `Plenty of founders make payroll once and then exhale straight back into the same habits. Marcus did the opposite: a six-week minimum cash floor, a weekly call where collections is the first agenda item, and a rule that no forecast goes more than seven days without a refresh. The Tuesday didn't make Kindling fragile — the response made it durable.`,
        stat: `Now holds a 6-week minimum cash buffer at all times`,
      },
    ],
    synthesis: `Running out of money rarely kills a company on its own — what kills companies is the founder freezing, hiding it, or treating cash as someone else's job. The week you nearly miss payroll is the week you learn that collections is a CEO responsibility, that your team and your suppliers are allies if you let them be, and that the only forecast worth trusting is the one you updated this morning.`,
    faq: [
      {
        q: `What's the fastest way to find cash in a payroll emergency?`,
        a: `Collect what you're already owed. Ring your biggest debtors personally, offer a small early-payment discount if you must, and chase the invoices closest to due. It's faster and cheaper than any loan.`,
      },
      {
        q: `Should I tell my team if we might miss payroll?`,
        a: `Tell your leadership team early — they often see levers you've missed, like deferrable bills or contractors happy to wait. Hiding it costs you days you can't afford. Be measured, but be honest.`,
      },
      {
        q: `How much cash buffer should a startup keep?`,
        a: `There's no universal number, but many founders aim for six to twelve weeks of runway in reserve and refuse to dip below it. The exact figure matters less than having a hard floor you treat as untouchable.`,
      },
    ],
  },
  chapters: [
    { time: `00:00`, label: `Cold open: $11,400 and a Friday deadline` },
    { time: `06:30`, label: `How a healthy-looking company runs dry` },
    { time: `18:55`, label: `The 6am call and the kitchen-bench spreadsheet` },
    { time: `29:10`, label: `Begging the customer, ringing the supplier` },
    { time: `41:20`, label: `Three days to spare` },
    { time: `50:45`, label: `The habits I'll never drop now` },
  ],
  links: [
    { label: `A 13-week cash flow template`, url: `https://example.com` },
    { label: `Profit First — Mike Michalowicz`, url: `https://example.com` },
  ],
  related: [
    `the-rev-kept-coming`,
    `the-raise-that-didnt-save-us`,
    `i-fired-my-co-founder-then-my-best-mate`,
  ],
  seo: {
    metaTitle: `We ran out of money on a Tuesday. — Life After Launch`,
    metaDescription: `Payroll was $46k. The account said $11,400. Marcus Trent on the 72 hours that saved Kindling — and the cash habits he'll never drop again.`,
    ogImage: `/episodes/we-ran-out-of-money-on-a-tuesday.jpg`,
    keywords: [
      `startup cash crisis`,
      `making payroll`,
      `cash flow management`,
      `13-week forecast`,
      `founder survival`,
      `collections`,
    ],
  },
  sample: true,
};

export default episode;
