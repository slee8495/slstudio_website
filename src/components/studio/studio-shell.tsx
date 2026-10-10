import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { NewsletterForm } from "@/components/newsletter-form";

// Fonts for the studio pages only. Product pages (/roun, /wordflow) keep the root layout's.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const navLinkClass =
  "rounded-sm text-sm text-ink-soft transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink";

function StudioHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          <span
            aria-hidden
            className="inline-flex h-5 w-5 items-center justify-center rounded-[5px] bg-ink text-[8.5px] font-semibold tracking-tight text-bg"
          >
            SL
          </span>
          <span className="text-sm font-medium text-ink">SL Studio</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-6">
          <Link href="/#products" className={navLinkClass}>
            Products
          </Link>
          <Link href="/#about" className={navLinkClass}>
            About
          </Link>
          <Link href="/#contact" className={navLinkClass}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

function StudioFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-10 md:grid-cols-[1fr_auto] md:px-8">
        <div className="flex flex-col gap-1.5 font-mono text-xs text-ink-faint">
          <span>© {new Date().getFullYear()} SL Studio</span>
          <span>Orange County, California</span>
          <a
            href="mailto:support@sl-studio.dev"
            className="self-start text-ink-soft transition-colors hover:text-ink"
          >
            support@sl-studio.dev
          </a>
        </div>
        <div id="newsletter" className="flex flex-col gap-2 scroll-mt-24">
          <span className="text-xs text-ink-soft">Product updates by email</span>
          <NewsletterForm />
        </div>
      </div>
    </footer>
  );
}

// Page frame for the studio's own pages: header, footer, dark theme and fonts.
export function StudioShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`theme-studio ${geistSans.variable} ${geistMono.variable} flex min-h-full flex-1 flex-col antialiased`}
    >
      <StudioHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 md:px-8">
        {children}
      </main>
      <StudioFooter />
    </div>
  );
}
