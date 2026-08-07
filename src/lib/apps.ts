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

export type AppEntry = {
  slug: string;
  number: string;
  icon: string;
  name: string;
  tagline: string;
  catchline: string;
  meta: string;
  stamp: Stamp;
  description: string;
  different: Different;
  cta: { label: string; href: string } | null;
  demo?: { src: string; width: number; height: number; alt: string };
  features?: Feature[];
  statusItems?: StatusItem[];
};

export const apps: AppEntry[] = [
  {
    slug: "sprout",
    number: "002",
    icon: "🌱",
    name: "Sprout",
    tagline: "The multilingual baby journal built to actually stick.",
    catchline: "Record your baby's every milestone, memory, and moment.",
    meta: "Family journal · web app · started 2026",
    stamp: { text: "Pre-launch", tone: "positive" },
    description:
      "A private, shared journal for our son. Built for our own family first, and solid enough now that other families could use it too. Private by default: only the people you invite can ever see it.",
    different: {
      title: "Why not just use another baby journal app?",
      body: "There's no shortage of them. Most get abandoned by month two for one of three reasons: they're English-only, they put all the work on one parent, or typing at 2am is too much friction to keep up. Sprout fixes all three: voice memos for the nights you're too tired to type, both parents writing to the same journal, and full support in English, Korean, Japanese, Chinese, and Spanish.",
    },
    cta: null,
    demo: {
      src: "/demos/sprout-demo.gif",
      width: 1512,
      height: 793,
      alt: "Screen recording of Sprout: writing a journal entry, tagging it as a milestone, and viewing it in the Feed and Milestones tabs",
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
    meta: "Daily Bible reading · web app · started 2026",
    stamp: { text: "Awaiting license", tone: "pending" },
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
