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

export type AppEntry = {
  slug: string;
  number: string;
  icon: string;
  name: string;
  tagline: string;
  meta: string;
  stamp: Stamp;
  description: string;
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
    meta: "Family journal · web app · started 2026",
    stamp: { text: "Pre-launch", tone: "positive" },
    description:
      "Most baby journal apps get abandoned by month two — too much friction, one parent carrying it alone, or built for families who only speak one language. Sprout is built differently: voice memos for the nights you're too tired to type, milestones that resurface on \"this day,\" both parents writing to the same journal, and full support in English, Korean, Japanese, Chinese, and Spanish. Private by default — only the people you invite can ever see it. Built for our own son first, and solid enough now that other families are next.",
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
          "Capture more than words — attach a photo or a quick voice memo to any entry.",
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
          "English, Korean, Japanese, Chinese, and Spanish — switch anytime from Settings.",
      },
    ],
  },
  {
    slug: "wordflow",
    number: "001",
    icon: "📖",
    name: "Wordflow",
    tagline: "Bible reading that survives past January.",
    meta: "Daily Bible reading · web app · started 2026",
    stamp: { text: "Awaiting license", tone: "pending" },
    description:
      "Most reading plans ask for more time than most days actually have, so they get abandoned fast. Wordflow breaks it into a few minutes a day — enough to build a real habit, not another app forgotten by February. $3.99/month with a 7-day free trial. Payments and the daily reading flow are built and tested; we're waiting on a commercial license from our translation's publisher before it goes live.",
    cta: null,
    statusItems: [
      { done: true, label: "Daily reading flow — built and tested" },
      {
        done: true,
        label:
          "$3.99/month subscription with a 7-day free trial — built and tested",
      },
      {
        done: false,
        label:
          "Commercial license from our Bible translation's publisher — submitted, awaiting approval",
      },
    ],
  },
];

export function getApp(slug: string): AppEntry | undefined {
  return apps.find((app) => app.slug === slug);
}
