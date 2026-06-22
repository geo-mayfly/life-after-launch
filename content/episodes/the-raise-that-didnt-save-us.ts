import type { Episode } from "../schema";

const episode: Episode = {
  slug: `the-raise-that-didnt-save-us`,
  episodeTitle: `The raise that didn't save us.`,
  hook: `$2M in the bank. The same broken company. Just with more zeros to lose.`,
  season: 1,
  episodeNumber: 6,
  publishDate: `2025-11-22`,
  duration: `1h 02m`,
  tone: `deep`,
  guestName: `Aisha Bello`,
  guestRole: `Founder & CEO`,
  guestCompany: `Veraday`,
  guestBio: `Aisha Bello founded Veraday, a Melbourne healthtech building scheduling tools for allied-health clinics. (Placeholder bio.) A former physiotherapist turned operator, she closed a $2M seed round that the press release called a milestone and she now calls a reprieve she mistook for a cure. Aisha is measured, generous with her own mistakes, and the rare Founder who'll tell you that the best thing that happened to her company came eighteen months after the money she thought would fix it.`,
  image: {
    src: `/episodes/the-raise-that-didnt-save-us.jpg`,
    alt: `Warm three-quarter studio portrait of Aisha Bello against a textured blue wall, calm and direct, hands resting on the table in front of her.`,
  },
  listen: {
    spotify: `https://open.spotify.com/episode/PLACEHOLDER`,
    apple: `https://podcasts.apple.com/podcast/PLACEHOLDER`,
    youtube: `https://youtube.com/watch?v=PLACEHOLDER`,
  },
  overview: [
    `Aisha closed $2M and exhaled for the first time in a year. The round was meant to be the moment the pressure broke — the hires she couldn't make, the runway she didn't have, the validation she'd been chasing. For about six weeks it felt like it had worked. Then the same problems came back, only now they were bigger, faster and burning money she hadn't earned yet.`,
    `This is a clear-eyed conversation about the thing nobody tells you at the term-sheet stage: money doesn't fix a company, it accelerates whatever the company already is. Veraday's underlying problems — a sales motion that didn't repeat, a product loved by users but bought by no one, a founder who confused activity with progress — didn't disappear under $2M. They scaled up with it.`,
    `Aisha is honest that the raise nearly finished the company precisely because it removed the urgency that had been keeping her sharp. The lessons here are for any Founder who thinks the round is the finish line. It's a starting gun, and it's pointed at your weakest assumption.`,
  ],
  pullQuote: {
    text: `The money didn't fix the company. It just gave us a more expensive way to be wrong.`,
    attribution: `Aisha Bello`,
  },
  keyTakeaways: {
    question: `Why doesn't raising money fix a struggling startup?`,
    dek: `A funding round feels like rescue, but capital is an accelerant, not a cure — it makes a working company faster and a broken one fail more expensively. Veraday raised $2M and burned through most of it without fixing the unit economics underneath. Here's what Aisha learned about the problems money hides instead of solves.`,
    tldr: `Funding accelerates whatever your company already is, so raising before you've found a repeatable engine just buys a faster, costlier version of the same problem.`,
    insights: [
      {
        lead: `Capital is an accelerant, not a cure — it scales whatever is already there, including the broken parts.`,
        body: `Veraday's core issue was a sales motion that didn't repeat reliably, and $2M didn't repair it — it just funded more attempts at the same flawed approach. Aisha hired three salespeople against a playbook that didn't yet exist, so she scaled the confusion, not the results. Money multiplied the company's actual state, and its actual state wasn't ready.`,
        stat: `Burned ~$1.4M of $2M before unit economics turned`,
      },
      {
        lead: `The round removed the urgency that had been keeping the company sharp.`,
        body: `When runway is short, every week forces a decision; when the account is full, the same questions can be deferred for months. Aisha admits the first quarter post-raise was the least disciplined of the company's life because the pressure that drove clarity had been switched off. The constraint had been a feature, and the money quietly deleted it.`,
        stat: `~5 months of reduced urgency after the round closed`,
      },
      {
        lead: `Users loving your product and customers buying it are two completely different problems.`,
        body: `Veraday had glowing usage and terrible conversion — clinicians adored the tool, but the people who held the budgets weren't the people using it. No amount of capital closes that gap; only fixing who you sell to and how does. Aisha spent months pouring money into top-of-funnel before realising the leak was at the point of purchase, not awareness.`,
        stat: `High daily usage; sub-2% trial-to-paid conversion`,
      },
      {
        lead: `Raising against a vanity milestone buys you investors who expected a different company.`,
        body: `Aisha raised partly on usage growth she could show rather than revenue she could bank, which set an expectation curve the business couldn't meet. The mismatch turned every board meeting into an apology and pulled her toward short-term moves that hurt the long-term build. The terms of a raise quietly define the company you're now obligated to become.`,
        stat: `Board metrics promised 3x the revenue actually delivered`,
      },
      {
        lead: `The thing that finally saved Veraday was free and available before the raise: focus.`,
        body: `Eighteen months in, Aisha cut the product to one workflow, the target customer to one clinic type, and the sales motion to one repeatable script — none of which cost a cent. The discipline she could have had on day one is what eventually turned the economics, long after most of the money was gone. The cure was never capital; it was clarity she'd outsourced to the bank balance.`,
        stat: `Narrowing to 1 segment lifted conversion ~4x`,
      },
    ],
    synthesis: `Raising money is a powerful tool and a dangerous anaesthetic — it numbs the very pressure that forces a Founder to confront what isn't working. If your company doesn't yet have a repeatable way to win customers and keep them, a round won't manufacture one; it'll just let you run the broken version faster and longer. The founders who use capital well are the ones who fix the engine first and treat the money as fuel, not as the fix.`,
    faq: [
      {
        q: `Will raising money fix my startup's problems?`,
        a: `No. Capital accelerates whatever your company already is. If you have a working engine, money makes it faster; if you don't, it lets you fail more expensively. Fix the core motion first, then raise to scale it.`,
      },
      {
        q: `What should I have figured out before I raise?`,
        a: `A repeatable way to acquire and retain customers profitably — even at small scale. If you can't yet explain why money in reliably produces customers out, more money just amplifies the uncertainty rather than resolving it.`,
      },
      {
        q: `Why is high usage but low conversion a trap?`,
        a: `Because love isn't revenue. If the people using the product aren't the people buying it, you can grow usage forever without growing the business. Solve who pays and why before you spend to grow the top of the funnel.`,
      },
    ],
  },
  chapters: [
    { time: `00:00`, label: `Cold open: the press release and the relief` },
    { time: `07:20`, label: `Six weeks of feeling saved` },
    { time: `19:05`, label: `Scaling the confusion: three hires, no playbook` },
    { time: `33:40`, label: `Loved by users, bought by no one` },
    { time: `46:10`, label: `The board meetings that became apologies` },
    { time: `55:25`, label: `The cure was free all along` },
  ],
  links: [
    { label: `Founders at Work — Jessica Livingston`, url: `https://example.com` },
    { label: `A simple unit-economics worksheet`, url: `https://example.com` },
  ],
  related: [
    `the-rev-kept-coming`,
    `we-ran-out-of-money-on-a-tuesday`,
    `nobody-wanted-it-so-we-rebuilt-it`,
  ],
  seo: {
    metaTitle: `The raise that didn't save us. — Life After Launch`,
    metaDescription: `Veraday raised $2M and burned most of it on the same broken company. Aisha Bello on why capital accelerates problems it can't cure.`,
    ogImage: `/episodes/the-raise-that-didnt-save-us.jpg`,
    keywords: [
      `startup fundraising`,
      `seed round`,
      `unit economics`,
      `product-market fit`,
      `burn rate`,
      `healthtech founder`,
    ],
  },
  sample: true,
};

export default episode;
