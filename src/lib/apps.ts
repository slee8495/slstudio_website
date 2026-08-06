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
    tagline: "A private, lifelong journal for our son.",
    meta: "Family journal · web app · started 2026",
    stamp: { text: "Pre-launch", tone: "positive" },
    description:
      'A private, shared journal for our son — milestones, photos, growth charts, and a chatbot that can answer "when did he first walk?" before we forget. Built for our own family first, and architected well enough that other families could use it too.',
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
        title: "English & Korean",
        description: "Switch the app's language anytime from Settings.",
      },
    ],
  },
  {
    slug: "wordflow",
    number: "001",
    icon: "📖",
    name: "Wordflow",
    tagline: "A habit-sized way to read the Bible daily.",
    meta: "Daily Bible reading · web app · started 2026",
    stamp: { text: "Awaiting license", tone: "pending" },
    description:
      "A habit-sized way to read the Bible daily, $3.99/month. Payments and the reading flow are built and tested — we're waiting on a commercial license from our translation's publisher before it can go live.",
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
