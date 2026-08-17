export type Stamp = {
  text: string;
  tone: "positive" | "pending";
};

export type Feature = {
  icon: string;
  title: string;
  description: string;
};

export type StatusItem = {
  done: boolean;
  label: string;
};

export type Different = {
  title: string;
  body: string;
};

export type HowToStep = {
  src: string;
  width: number;
  height: number;
  caption: string;
};

export type HowTo = {
  label: string;
  steps: HowToStep[];
};

export type BeforeAfter = {
  label: string;
  images: { src: string; width: number; height: number; alt: string }[];
  bridgeImage: { src: string; width: number; height: number; alt: string };
};

export type IconImage = {
  src: string;
  width: number;
  height: number;
};

export type TextSegment = {
  text: string;
  emphasis?: boolean;
};

export type NameStory = {
  label: string;
  teaser: string;
  paragraphs: TextSegment[][];
};

export type PricingRow = {
  label: string;
  free: string;
  pro: string;
};

export type Pricing = {
  label: string;
  price: string;
  trial: string;
  note: string;
  rows: PricingRow[];
  cta: { label: string; href: string };
};

export type DownloadLink = {
  platform: "ios" | "android" | "web";
  label: string;
  href: string | null;
};

export type Downloads = {
  label: string;
  note: string;
  links: DownloadLink[];
};

export type Referral = {
  title: string;
  body: string;
  email: string;
};

export type Story = {
  label: string;
  paragraphs: string[];
  closing: string;
  email: string;
};

export type AppEntry = {
  slug: string;
  number: string;
  icon: string | IconImage;
  name: string;
  tagline: string;
  catchline: string;
  meta: string;
  stamp: Stamp;
  description: string;
  different: Different;
  cta: { label: string; href: string } | null;
  howTo?: HowTo;
  beforeAfter?: BeforeAfter;
  nameStory?: NameStory;
  story?: Story;
  pricing?: Pricing;
  downloads?: Downloads;
  referral?: Referral;
  features?: Feature[];
  statusItems?: StatusItem[];
  // When true, the public site shows a minimal "coming soon" placeholder instead of the
  // catchline/description/different/features/statusItems content below, on both the homepage
  // card and the detail page. The content itself stays here (not deleted) so flipping this back
  // to false instantly restores the full page.
  comingSoon?: boolean;
};

export const apps: AppEntry[] = [
  {
    slug: "roun",
    number: "001",
    icon: {
      src: "/roun/icon.png",
      width: 320,
      height: 320,
    },
    name: "Roun",
    tagline: "The moments worth keeping, not another camera roll.",
    catchline: "Save the moments you'll want to hand back to them, someday.",
    meta: "Lifelong memory journal · iOS & Android · started 2026",
    stamp: { text: "Launched", tone: "positive" },
    description:
      "A private, shared journal for our baby: not every photo, just the moments we'll want to remember, the date, and what we were thinking when it happened. A camera roll can hold the photo. It can't hold the memory. Built for our own family first, and private by default: only the people you invite can ever see it.",
    different: {
      title: "Why not just keep the photos on your phone?",
      body: "Ten years of that and you'll have tens of thousands of photos, most of them near duplicates, with no way to find the one that mattered or remember what you were thinking when you took it. Roun only holds the moments you chose to keep: dated, with your own words attached and searchable by keyword, so it becomes one story you can hand back someday, not a camera roll you'd never finish scrolling. And when you're ready to hold it, Roun turns those entries into an actual photo album.",
    },
    cta: null,
    beforeAfter: {
      label: "Before Roun",
      images: [
        {
          src: "/roun/before-01.jpg",
          width: 840,
          height: 815,
          alt: "Illustration: cutting photos to fit the page",
        },
        {
          src: "/roun/before-02.jpg",
          width: 840,
          height: 815,
          alt: "Illustration: printing every single one",
        },
        {
          src: "/roun/before-03.jpg",
          width: 840,
          height: 815,
          alt: "Illustration: writing it all down by hand",
        },
        {
          src: "/roun/before-04.jpg",
          width: 840,
          height: 815,
          alt: "Illustration: one heavy book, always at home",
        },
      ],
      bridgeImage: {
        src: "/roun/before-05-bridge.jpg",
        width: 840,
        height: 575,
        alt: "Illustration: a phone with the Roun app icon, captioned \"Now it's all just... here.\"",
      },
    },
    howTo: {
      label: "The app",
      steps: [
        {
          src: "/roun/howto/howto-01.jpg",
          width: 500,
          height: 970,
          caption:
            "Every kid and pet gets their own calendar. Tap any day to see what happened, or start writing a new entry right below it.",
        },
        {
          src: "/roun/howto/howto-02.jpg",
          width: 500,
          height: 970,
          caption:
            "Got more than one to track? Switch between every kid and pet with a single tap, no separate apps or logins needed.",
        },
        {
          src: "/roun/howto/howto-03.jpg",
          width: 500,
          height: 970,
          caption:
            "Writing about something that happened last week? Pick the actual date on the calendar, and the entry lands exactly where it belongs in the timeline.",
        },
        {
          src: "/roun/howto/howto-04.jpg",
          width: 500,
          height: 970,
          caption:
            "Write it, say it, or show it. Attach a photo, a quick voice memo, or a short video, then tag it as a milestone so it's easy to find later.",
        },
        {
          src: "/roun/howto/howto-05.jpg",
          width: 500,
          height: 970,
          caption:
            "The Feed pulls every entry into one scrollable timeline, laid out like a social feed, except it's just your family, and nobody else can see it.",
        },
        {
          src: "/roun/howto/howto-06.jpg",
          width: 500,
          height: 970,
          caption:
            "Only want to see one kid's or pet's entries? Filter the Feed down to just them with a tap.",
        },
        {
          src: "/roun/howto/howto-07.jpg",
          width: 500,
          height: 970,
          caption:
            "Remember writing about something but not when? Search any entry by keyword and find it in seconds, instead of scrolling back through months.",
        },
        {
          src: "/roun/howto/howto-08.jpg",
          width: 500,
          height: 970,
          caption:
            "Every milestone gets sorted into a category automatically, food, physical, language, and more, so you can see at a glance what's been tracked and what hasn't.",
        },
        {
          src: "/roun/howto/howto-09.jpg",
          width: 500,
          height: 970,
          caption:
            "Tap into any category to see every entry tagged under it, so a milestone isn't just a checkbox, it's the actual moment behind it.",
        },
        {
          src: "/roun/howto/howto-album-01.jpg",
          width: 842,
          height: 1633,
          caption:
            "Every kid and pet gets their own Album: every photo entry you've written, automatically laid out into a real photobook.",
        },
        {
          src: "/roun/howto/howto-album-02.jpg",
          width: 842,
          height: 1633,
          caption:
            "Real page layouts, not a plain grid. Roun groups your photos by date and arranges them into collages, so every page looks intentional.",
        },
        {
          src: "/roun/howto/howto-album-03.jpg",
          width: 842,
          height: 1633,
          caption:
            "Scroll straight down, or flip through page by page like an actual book. Jump to any date range with a built-in calendar.",
        },
        {
          src: "/roun/howto/howto-album-04.jpg",
          width: 842,
          height: 1633,
          caption:
            "One tap and the whole album downloads as a PDF, ready to print or send to grandma.",
        },
        {
          src: "/roun/howto/howto-10.jpg",
          width: 500,
          height: 953,
          caption: "Invite your family with a family code",
        },
        {
          src: "/roun/howto/howto-11.jpg",
          width: 500,
          height: 970,
          caption:
            "Adding a new kid or pet takes seconds: a name, a birth date, and you're set. No limit on how many you can add.",
        },
        {
          src: "/roun/howto/howto-just-us.jpg",
          width: 500,
          height: 983,
          caption: "Keep some moments just between you",
        },
        {
          src: "/roun/howto/howto-family-tiers.jpg",
          width: 852,
          height: 1653,
          caption:
            "Give each family member their own access level: editor or view-only, and full family or extended (limited), so everyone sees exactly what you want them to.",
        },
      ],
    },
    nameStory: {
      label: "The name",
      teaser:
        "means garden (Khmer) · secret, hidden wisdom (Old Norse) · full story below ↓",
      paragraphs: [
        [
          { text: "The name " },
          { text: "Roun", emphasis: true },
          { text: " has its roots in Old Norse, where it means " },
          { text: "mysterious wisdom", emphasis: true },
          { text: ", or a " },
          { text: "secret", emphasis: true },
          { text: ", the same origin as the English word " },
          { text: "rune", emphasis: true },
          { text: ". It's also a word in Khmer, the language of Cambodia, meaning " },
          { text: "garden", emphasis: true },
          { text: "." },
        ],
        [
          { text: "So when we built this app, that's what we wanted it to become: a " },
          { text: "beautifully tended garden", emphasis: true },
          { text: ", a " },
          { text: "precious family secret-book", emphasis: true },
          { text: " recording our " },
          { text: "kids and pets", emphasis: true },
          { text: " as they grow." },
        ],
      ],
    },
    story: {
      label: "Our story",
      paragraphs: [
        "I always end up back in my camera roll, but a photo by itself doesn't always capture the moment the way I actually remember it. Scrolling through thousands of them, what I really wanted wasn't the picture, it was the story behind it.",
        "It wouldn't be easy to pick the right photos out of thousands to make an album, the kind you'd keep as a hardcover book on a shelf somewhere in your room. I wanted that album to come together on its own, curated well enough that it still felt like someone had actually sat down and made it.",
        "I tried many apps looking for exactly this, and never found it anywhere. So I built it myself, for my baby and for a dog who went to heaven, one I still think about all the time. Now I want to share it with you too, so the people and pets you love stay just as vivid.",
      ],
      closing: "If something's ever broken, or you just want to tell me something, email me at",
      email: "support@sl-studio.dev",
    },
    features: [
      {
        icon: "📷",
        title: "Photos & voice memos",
        description:
          "Capture more than words. Attach a photo or a quick voice memo to any entry.",
      },
      {
        icon: "🎉",
        title: "Milestones",
        description:
          'Track firsts, big and small, and revisit them on "On this day."',
      },
      {
        icon: "📖",
        title: "Automatic photo albums",
        description:
          "Every photo entry, already laid out as a real photobook for each kid and pet, with page turns, milestone title pages, and one tap to download as a PDF.",
      },
      {
        icon: "🔒",
        title: "Private by default",
        description:
          "Only the family members you invite can ever see your journal.",
      },
      {
        icon: "🌐",
        title: "5 languages",
        description:
          "English, Korean, Japanese, Chinese, and Spanish. Switch anytime from Settings.",
      },
    ],
    pricing: {
      label: "Pricing",
      price: "$3.99/month",
      trial: "30-day free trial",
      note: "Billed once per family. Invite everyone else in with a family code, free.",
      cta: { label: "Start free trial", href: "https://roun.sl-studio.dev/settings" },
      rows: [
        {
          label: "Storage",
          free: "1GB",
          pro: "5GB (+5GB add-on available on either plan)",
        },
        {
          label: "Kids & pets",
          free: "Up to 1",
          pro: "Unlimited",
        },
        {
          label: "Ads",
          free: "Interstitial",
          pro: "None",
        },
        {
          label: "Monthly album",
          free: "Export anytime",
          pro: "Emailed automatically",
        },
      ],
    },
    referral: {
      title: "Say hi, get extra time",
      body: "Email me, just to say hi. You don't need to know me already, I'd genuinely love to get to know you. Reach out and I'll add some extra free time to your trial.",
      email: "support@sl-studio.dev",
    },
    downloads: {
      label: "Download",
      note: "iOS and Android are in app store review right now, so there's a short wait. The mobile web app gives you the exact same experience today, no need to wait. Please email",
      links: [
        {
          platform: "web",
          label: "Mobile Web App",
          href: "https://roun.sl-studio.dev/get-app",
        },
        { platform: "ios", label: "iOS", href: null },
        { platform: "android", label: "Android", href: null },
      ],
    },
  },
  {
    slug: "wordflow",
    number: "002",
    icon: "📖",
    name: "Wordflow",
    tagline: "Bible reading that survives past January.",
    catchline: "Read the Bible in a few minutes a day.",
    meta: "Daily Bible reading · iOS & Android · started 2026",
    stamp: { text: "Coming soon", tone: "pending" },
    comingSoon: true,
    description:
      "A habit-sized way to read the Bible daily, $3.99/month with a 7-day free trial. Payments and the daily reading flow are built and tested. We're waiting on a commercial license from our translation's publisher before it can go live.",
    different: {
      title: "Why not just use another Bible app?",
      body: "There's no shortage of those either. Most ask for more time than most days actually have: a full chapter, a multi-year read-the-whole-Bible plan. That's exactly why people quit by February. Wordflow breaks it into a few minutes a day, enough to actually build the habit instead of another guilt-inducing streak you eventually break.",
    },
    cta: null,
    statusItems: [
      { done: true, label: "Daily reading flow: built and tested" },
      {
        done: true,
        label:
          "$3.99/month subscription with a 7-day free trial: built and tested",
      },
      {
        done: false,
        label:
          "Commercial license from our Bible translation's publisher: submitted, awaiting approval",
      },
    ],
  },
];

export function getApp(slug: string): AppEntry | undefined {
  return apps.find((app) => app.slug === slug);
}
