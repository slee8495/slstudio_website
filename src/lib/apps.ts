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

export type Demo = {
  type: "image" | "video";
  src: string;
  width: number;
  height: number;
  alt: string;
  label: string;
  caption: string;
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
};

export type DownloadLink = {
  platform: "ios" | "android";
  label: string;
  href: string | null;
};

export type Downloads = {
  label: string;
  links: DownloadLink[];
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
  demo?: Demo;
  beforeAfter?: BeforeAfter;
  nameStory?: NameStory;
  pricing?: Pricing;
  downloads?: Downloads;
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
    stamp: { text: "Pre-launch", tone: "positive" },
    description:
      "A private, shared journal for our baby: not every photo, just the moments we'll want to remember, the date, and what we were thinking when it happened. A camera roll can hold the photo. It can't hold the memory. Built for our own family first, and private by default: only the people you invite can ever see it.",
    different: {
      title: "Why not just keep the photos on your phone?",
      body: "Ten years of that and you'll have tens of thousands of photos, most of them near duplicates, with no way to find the one that mattered or remember what you were thinking when you took it. Roun only holds the moments you chose to keep: dated, with your own words attached and searchable by keyword, so it becomes one story you can hand back someday, not a camera roll you'd never finish scrolling.",
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
    demo: {
      type: "video",
      src: "/demos/roun-demo.mp4",
      width: 840,
      height: 1446,
      alt: "Screen recording of Roun: browsing the journal calendar, reading Feed entries and milestones, and switching languages in Settings",
      label: "The app",
      caption:
        "A quick look inside: the calendar view, Feed entries with photos and comments, and switching between five languages in Settings.",
    },
    nameStory: {
      label: "The name",
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
      ],
    },
    downloads: {
      label: "Download",
      links: [
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
