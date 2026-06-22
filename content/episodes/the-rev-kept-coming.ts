import type { Episode } from "../schema";

const episode: Episode = {
  slug: `the-rev-kept-coming`,
  episodeTitle: `The rev kept coming.`,
  hook: `Revenue 5x'd in a year. It nearly killed the company — and the founder.`,
  season: 2,
  episodeNumber: 4,
  publishDate: `2026-03-14`,
  duration: `1h 04m`,
  tone: `navy`,
  guestName: `Dana Whitlock`,
  guestRole: `Co-founder`,
  guestCompany: `Saltbush`,
  guestBio: `Dana Whitlock co-founded Saltbush, a B2B logistics SaaS, after a decade moving freight the hard way — clipboards, spreadsheets and 5am depot calls. (Placeholder bio.) She's the kind of Founder who can read a P&L and a loading dock with equal ease, talks faster than she means to when she's excited, and still keeps the first hand-written invoice the company ever sent pinned above her desk in Brunswick.`,
  image: {
    src: `/episodes/the-rev-kept-coming.jpg`,
    alt: `Warm three-quarter studio portrait of Dana Whitlock against a textured blue wall, mid-laugh, leaning slightly toward the camera.`,
  },
  listen: {
    spotify: `https://open.spotify.com/episode/PLACEHOLDER`,
    apple: `https://podcasts.apple.com/podcast/PLACEHOLDER`,
    youtube: `https://youtube.com/watch?v=PLACEHOLDER`,
  },
  overview: [
    `Dana Whitlock had the growth chart every founder posts on LinkedIn: up and to the right, 5x in twelve months, a logo wall filling out fast. What the chart didn't show was the founder sleeping four hours a night, a cash balance that went down as revenue went up, and a churn number nobody on the team wanted to say out loud.`,
    `This one's about the gap between the story you tell investors and the one you live on a Tuesday morning. Dana walks us through the month it all caught up — the near-miss on payroll, the contract she finally turned down, and the unglamorous hire that actually saved the business. No sanding off the rough bits. The rev kept coming. That was the problem.`,
  ],
  pullQuote: {
    text: `Everyone was congratulating me on the growth. I was in the car park trying to remember how to breathe.`,
    attribution: `Dana Whitlock`,
  },
  keyTakeaways: {
    question: `What happens when revenue grows faster than your company can handle?`,
    dek: `Fast revenue growth is the outcome every founder chases — but unmanaged, it hides cash, churn and capacity problems that can sink a company that looks like it's winning. Saltbush 5x'd revenue in a year and came within three days of missing payroll. Here's what Dana learned pulling the business back from the edge.`,
    tldr: `Revenue growth is a vanity metric until it's matched by cash discipline, retention and the operational hires that make growth survivable.`,
    insights: [
      {
        lead: `Growth and financial health are not the same thing — and conflating them is the trap.`,
        body: `Saltbush's revenue went up while its bank balance went down, because every new enterprise contract demanded onboarding, headcount and tooling spend months before the cash landed. Dana was reading the top line as a health check when it was actually a liability gauge. The fix started the day she put cash position, not bookings, at the top of the Monday dashboard.`,
        stat: `Revenue 5x'd; cash reserves fell 40%`,
      },
      {
        lead: `The hire that saved the company wasn't a salesperson.`,
        body: `With a pipeline already overflowing, the instinct to hire another closer was exactly wrong. The first genuinely de-risking hire was an operations and finance lead who built collections, forecasting and a delivery process. Boring on a poster; existential in practice.`,
        stat: `Days-sales-outstanding cut from 74 to 38`,
      },
      {
        lead: `Churn was the real story the growth chart was hiding.`,
        body: `New logos masked the fact that some of the earliest, worst-fit customers were leaving as fast as new ones arrived. Net revenue retention — not new bookings — was the number that actually predicted the company's future. Once Dana tracked it weekly, the priorities reordered themselves.`,
        stat: `Gross churn was running at 3.5%/month`,
      },
      {
        lead: `Founder burnout is a business risk, not a personal weakness.`,
        body: `Four hours of sleep wasn't a badge of honour; it was a single point of failure sitting on top of the org chart. Dana reframes wellbeing as risk management — the company's most concentrated dependency was its exhausted founder, and protecting that capacity was a board-level concern, not a self-care afterthought.`,
        stat: `One founder owned 60% of critical processes`,
      },
      {
        lead: `The turning point was saying no to revenue.`,
        body: `The clearest signal of control wasn't a deal won — it was a large, badly-fit contract Dana finally turned down. Narrowing to the ideal-customer profile slowed top-line growth on paper and made every downstream number — margin, delivery, retention, sanity — healthier.`,
        stat: `Turning down one ~$180k contract lifted gross margin 11 points`,
      },
    ],
    synthesis: `The lesson isn't "growth is bad" — it's that revenue is a result, not a strategy, and a number that grows faster than your cash, your retention and your team is borrowing against the company's future. The founders who survive their own growth are the ones who measure the unglamorous things early and treat their own capacity as critical infrastructure.`,
    faq: [
      {
        q: `Is fast revenue growth bad for a startup?`,
        a: `No — but unmanaged growth is dangerous. If revenue outpaces cash collection, retention and operational capacity, a fast-growing company can run out of money while looking successful.`,
      },
      {
        q: `What's the first operational hire a scaling founder should make?`,
        a: `Often a finance/operations lead rather than another salesperson — someone to build collections, forecasting and delivery so growth doesn't outrun the company's ability to fund and service it.`,
      },
      {
        q: `Why is net revenue retention more important than new bookings?`,
        a: `Because new logos can mask churn. Retention shows whether existing customers stay and expand — the real driver of durable growth.`,
      },
    ],
  },
  chapters: [
    { time: `00:00`, label: `Cold open: the car park` },
    { time: `04:12`, label: `The growth chart everyone loved` },
    { time: `19:40`, label: `The Tuesday we nearly missed payroll` },
    { time: `31:05`, label: `The hire nobody claps for` },
    { time: `44:18`, label: `Saying no to $180k` },
    { time: `58:02`, label: `What I'd tell year-one me` },
  ],
  links: [
    { label: `The Messy Middle — Scott Belsky`, url: `https://example.com` },
    { label: `Saltbush's open metrics dashboard`, url: `https://example.com` },
  ],
  related: [
    `we-ran-out-of-money-on-a-tuesday`,
    `the-raise-that-didnt-save-us`,
    `nobody-wanted-it-so-we-rebuilt-it`,
  ],
  seo: {
    metaTitle: `The rev kept coming. — Life After Launch`,
    metaDescription: `Saltbush 5x'd revenue in a year and came three days from missing payroll. Dana Whitlock on surviving the growth that nearly killed the company.`,
    ogImage: `/episodes/the-rev-kept-coming.jpg`,
    keywords: [
      `revenue growth`,
      `startup cash flow`,
      `net revenue retention`,
      `founder burnout`,
      `scaling SaaS`,
      `B2B logistics`,
    ],
  },
  sample: true,
};

export default episode;
