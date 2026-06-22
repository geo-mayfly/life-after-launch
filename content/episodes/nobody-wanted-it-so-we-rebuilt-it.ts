import type { Episode } from "../schema";

const episode: Episode = {
  slug: `nobody-wanted-it-so-we-rebuilt-it`,
  episodeTitle: `Nobody wanted it. So we rebuilt it.`,
  hook: `Two years of build. A launch nobody noticed. Then they tore it down to the studs.`,
  season: 2,
  episodeNumber: 1,
  publishDate: `2026-01-31`,
  duration: `52m`,
  tone: `navy`,
  guestName: `Tom Castellano`,
  guestRole: `Co-founder`,
  guestCompany: `Fernweh`,
  guestBio: `Tom Castellano co-founded Fernweh, an Adelaide travel-planning app that, in its first life, almost nobody used. (Placeholder bio.) A former product manager who left a comfortable job to build the thing he was sure the world needed, Tom is dry, self-deprecating and refreshingly clear-eyed about the eighteen months he spent in love with a product the market shrugged at. The Fernweh you'd use today shares a name with that first version and almost nothing else.`,
  image: {
    src: `/episodes/nobody-wanted-it-so-we-rebuilt-it.jpg`,
    alt: `Warm three-quarter studio portrait of Tom Castellano against a textured blue wall, leaning back with a wry, easy grin.`,
  },
  listen: {
    spotify: `https://open.spotify.com/episode/PLACEHOLDER`,
    apple: `https://podcasts.apple.com/podcast/PLACEHOLDER`,
    youtube: `https://youtube.com/watch?v=PLACEHOLDER`,
  },
  overview: [
    `Tom and his co-founder spent two years building a beautiful travel-planning app. It had a slick onboarding, a clever itinerary engine, and a launch day that landed with the soft thud of total indifference. A few hundred signups, a handful of polite emails, and a retention curve that fell off a cliff by day three. The product worked exactly as designed. Almost nobody wanted it.`,
    `This episode is about what you do when the flat launch isn't a marketing problem — it's a "you built the wrong thing" problem. Tom talks through the gut-punch of admitting it, the dozens of customer conversations that finally told him the truth, and the decision to keep the company and the team but throw out nearly all of the product. Same name. New everything.`,
    `The rebuilt Fernweh found its people. But Tom is honest that the rebuild only worked because he stopped defending the old idea long enough to actually listen — and that the hardest part wasn't the engineering. It was the ego.`,
  ],
  pullQuote: {
    text: `We didn't have a growth problem. We had a "nobody asked for this" problem, and no amount of ads fixes that.`,
    attribution: `Tom Castellano`,
  },
  keyTakeaways: {
    question: `How do you pivot after a launch that nobody cared about?`,
    dek: `A flat launch is one of the most disorienting moments in a startup — the temptation is to blame marketing and pour money on the fire. Fernweh launched to a few hundred users and 70% of them gone by day three. The rebuild that saved the company started not with new code but with Tom finally admitting the original product solved a problem nobody had.`,
    tldr: `A flat launch is usually a demand problem, not a distribution problem — and the rebuild only works once you stop defending the idea you fell in love with.`,
    insights: [
      {
        lead: `A flat launch is a demand signal, not a marketing failure — and treating it as the latter wastes the runway you have left.`,
        body: `Tom's first instinct was to assume nobody had heard of Fernweh, so he reached for ads and launch posts. The numbers didn't move because the problem was upstream: the product solved something people didn't feel urgently. Spending on distribution to push a product nobody wanted just bought him a more expensive version of the same silence.`,
        stat: `~70% of day-one users gone by day three`,
      },
      {
        lead: `The truth was sitting in customer conversations he'd been too proud to have.`,
        body: `For two years Tom had validated his idea mostly with people who already agreed with him. The turnaround began when he ran thirty-odd unstructured interviews and actually shut up long enough to hear that the planning pain he'd built around simply wasn't most travellers' real frustration. The market had been telling him the whole time; he'd just been pitching instead of listening.`,
        stat: `~30 customer interviews reframed the entire product`,
      },
      {
        lead: `You can keep the company and the team while throwing out almost all of the product.`,
        body: `Tom didn't shut down and start a new venture — he kept the entity, the cap table and the four people, and rebuilt the product underneath them. Roughly 90% of the original codebase was retired, but the team's hard-won knowledge of the customer carried straight over. The pivot felt less like a death and more like a renovation that kept the foundations and replaced everything you could see.`,
        stat: `~90% of the original product retired; 100% of the team kept`,
      },
      {
        lead: `The hardest part of a rebuild is the ego, not the engineering.`,
        body: `Every line of the old Fernweh was something Tom had argued for, defended in pitches and been proud of. Killing it meant publicly admitting he'd been wrong for two years, which is a far steeper hill than any technical migration. He's blunt that the rebuild only became possible once he stopped tying his identity to the original idea and started tying it to the customer's problem.`,
        stat: `2 years of sunk effort had to be let go before progress`,
      },
    ],
    synthesis: `When a launch lands flat, the seductive lie is that you have a distribution problem you can buy your way out of. Far more often you've built something nobody was asking for — and the only way through is to go back to the customer, listen without selling, and be willing to kill the product while keeping the company. The founders who pull off a rebuild aren't the ones with the best new idea; they're the ones who can let go of the old one fast enough to still have runway left.`,
    faq: [
      {
        q: `Is a flat launch a marketing problem or a product problem?`,
        a: `Usually a product or demand problem. If users sign up and leave fast — especially within the first few days — more marketing just buys you a bigger audience for the same disappointment. Fix whether people want it before you spend to tell more people about it.`,
      },
      {
        q: `Should I pivot or shut down after a failed launch?`,
        a: `If your team has genuine insight into the customer and there's still runway, a pivot that keeps the company and people is often stronger than starting over. You carry forward the hardest-won asset — what you've learned about the market — even when you throw out the code.`,
      },
      {
        q: `How do I know if I'm pivoting for the right reasons?`,
        a: `Ground it in customer conversations, not your own conviction. If you can articulate the new direction in the customer's words rather than your pitch, you're likely listening. If you're defending the old idea, you're probably not ready yet.`,
      },
    ],
  },
  chapters: [
    { time: `00:00`, label: `Cold open: the launch that made no sound` },
    { time: `05:50`, label: `Two years building the wrong thing beautifully` },
    { time: `17:30`, label: `Thirty conversations that told the truth` },
    { time: `28:15`, label: `Keep the team, kill the product` },
    { time: `38:40`, label: `The ego is the hard part` },
    { time: `46:55`, label: `The Fernweh that found its people` },
  ],
  links: [
    { label: `The Mom Test — Rob Fitzpatrick`, url: `https://example.com` },
    { label: `Fernweh's pivot retro write-up`, url: `https://example.com` },
  ],
  related: [
    `i-fired-my-co-founder-then-my-best-mate`,
    `the-rev-kept-coming`,
    `the-raise-that-didnt-save-us`,
  ],
  seo: {
    metaTitle: `Nobody wanted it. So we rebuilt it.`,
    metaDescription: `Fernweh launched and 70% of users vanished by day three. Tom Castellano on killing two years of product, keeping the team, and the rebuild that worked.`,
    ogImage: `/episodes/nobody-wanted-it-so-we-rebuilt-it.jpg`,
    keywords: [
      `startup pivot`,
      `failed launch`,
      `product-market fit`,
      `customer interviews`,
      `rebuilding a product`,
      `founder lessons`,
    ],
  },
  sample: true,
};

export default episode;
