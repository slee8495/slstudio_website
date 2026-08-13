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

export type NameMeaning = {
  language: string;
  word: string;
  meaning: string;
  detail: string;
};

export type NameStory = {
  label: string;
  intro: string;
  meanings: NameMeaning[];
  closing: string;
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
    number: "002",
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
    },
    nameStory: {
      label: "The name",
      intro:
        "We didn't want a name that just sounded nice. So instead of brainstorming, we went looking through languages that had never spoken to each other, and asked what they'd call something like this.",
      meanings: [
        {
          language: "Khmer (Cambodian)",
          word: "suon",
          meaning: "garden",
          detail:
            "Not a lawn you plant once and mow. A garden is something you keep coming back to, one season at a time, that only really shows what it's worth after years of it. That's the same shape as a journal you actually keep: not one perfect entry, just years of small ones adding up.",
        },
        {
          language: "Old Norse",
          word: "rún",
          meaning: "hidden wisdom, a secret",
          detail:
            'It\'s where English got the word "rune" from: not just any secret, but one kept quietly on purpose, meant to be passed on when the time is right. That\'s the plan here too. Everything stays private until you decide your kid is ready to have it.',
        },
      ],
      closing:
        "Neither language knew about the other. Both were describing this app before we'd even built it.",
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
  },
  {
    slug: "wordflow",
    number: "001",
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
