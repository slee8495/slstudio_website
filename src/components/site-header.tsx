import Link from "next/link";
import { apps } from "@/lib/apps";

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between py-6 md:py-8">
      <Link href="/" className="flex items-center gap-2.5">
        <span
          aria-hidden
          className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-ink/20 font-mono text-[10px] font-medium shrink-0"
        >
          SL
        </span>
        <span className="font-display font-semibold tracking-tight text-sm uppercase">
          SL Studio
        </span>
      </Link>
      <nav className="flex items-center gap-6">
        {apps.map((app) => (
          <Link
            key={app.slug}
            href={`/${app.slug}`}
            className="inline-block py-2 -my-2 font-mono text-xs uppercase tracking-wide text-ink-soft hover:text-ink transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
          >
            {app.name}
          </Link>
        ))}
        <a
          href="mailto:support@sl-studio.dev"
          className="inline-block py-2 -my-2 font-mono text-xs uppercase tracking-wide text-ink-soft hover:text-ink transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
