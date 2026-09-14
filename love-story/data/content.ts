// ─────────────────────────────────────────────
// content.ts — edit all text/data here easily
// ─────────────────────────────────────────────

export const heroContent = {
  title: "A little story about us.",
  subtitle: "There's something I've been meaning to tell you.",
  cta: "Start our story →",
};

export const howWeMetContent = {
  heading: "How we met",
  date: "A day I didn't expect",
  place: "Somewhere I never thought would matter this much",
  paragraphs: [
    "I didn't think much of it at first. Just another ordinary day.",
    "Then somehow, out of all the people I could've met — I met you.",
    "And I think that was the beginning of everything.",
  ],
  // to add a photo: place image in public/images/how-we-met.jpg
  // and uncomment imageSrc below
  // imageSrc: "/images/how-we-met.jpg",
  imageSrc: null as string | null,
};

export type Moment = {
  label: string;
  title: string;
  description: string;
  // to add a photo: place image in public/images/ and set imageSrc
  imageSrc?: string | null;
};

export const momentsData: Moment[] = [
  {
    label: "The beginning",
    title: "First conversation",
    description:
      "I remember thinking — this person is different. There was something about the way you talked that I couldn't quite put into words.",
    imageSrc: null,
  },
  {
    label: "Late nights",
    title: "First late night talk",
    description:
      "We talked until neither of us could remember what we were even talking about anymore. And somehow, that felt like everything.",
    imageSrc: null,
  },
  {
    label: "That moment",
    title: "When I started getting attached",
    description:
      "I didn't notice it happening. One day I just realized — I was looking forward to talking to you more than anything else.",
    imageSrc: null,
  },
  {
    label: "The little things",
    title: "Our random conversations",
    description:
      "Random thoughts, silly topics, things that made no sense — but somehow, every conversation with you felt worth having.",
    imageSrc: null,
  },
  {
    label: "Still remember",
    title: "Little things I remember about you",
    description:
      "The way you respond. The small details you notice. The things you say when you're excited. I remember all of it.",
    imageSrc: null,
  },
];

export type Reason = {
  icon: string;
  title: string;
  description: string;
};

export const reasonsData: Reason[] = [
  {
    icon: "✦",
    title: "Your smile",
    description: "It's the kind of smile that makes everything feel a little lighter.",
  },
  {
    icon: "✦",
    title: "The way you talk",
    description: "There's something about how you express things that I genuinely love listening to.",
  },
  {
    icon: "✦",
    title: "How you get excited about little things",
    description: "The way your eyes light up when you talk about something you love — it's one of my favorite things.",
  },
  {
    icon: "✦",
    title: "Your random stories",
    description: "I never know where they're going, but I always want to hear more.",
  },
  {
    icon: "✦",
    title: "How comfortable you make me feel",
    description: "I don't have to try too hard around you. That means more than I can say.",
  },
  {
    icon: "✦",
    title: "Even your little pouts",
    description: "Okay this one is just genuinely endearing and I have no other explanation.",
  },
];

export const likesQuote = {
  text: "I don't think I fell for one big moment.\nI think I fell for all the little things.",
};

export const neverSaidLines = [
  "There are things I don't always know how to say out loud.",
  "I didn't plan on getting this attached.",
  "But somehow, you became someone I look forward to.",
  "Somewhere along the way, you became my favorite person.",
  "And I thought — maybe it was time I told you.",
];

export type TimelineStep = {
  label: string;
  description: string;
  isLast?: boolean;
};

export const timelineData: TimelineStep[] = [
  {
    label: "We met",
    description: "And it started with just that.",
  },
  {
    label: "We talked",
    description: "More than I expected. More than I planned.",
  },
  {
    label: "We got closer",
    description: "Without even realizing it was happening.",
  },
  {
    label: "I started liking you",
    description: "Quietly. Genuinely. Without meaning to.",
  },
  {
    label: "And now...",
    description: "Here we are.",
    isLast: true,
  },
];

export const questionContent = {
  preText: "Okay... one last question.",
  question: "Will you be my girlfriend?",
  noHoverTexts: [
    "hmm... are you sure? 👀",
    "nice try. 😏",
    "you can't escape this. 🫶",
    "that's not an option. 💀",
  ],
};

export const successContent = {
  heading: "She said yes! ❤️",
  subtext: "Looks like this is the beginning of another chapter of our story.",
  replayCta: "Replay our story",
};
