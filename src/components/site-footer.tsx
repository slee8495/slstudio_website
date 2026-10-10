import { NewsletterForm } from "./newsletter-form";

export function SiteFooter() {
  return (
    <footer
      id="newsletter"
      className="mt-auto scroll-mt-24 border-t border-border py-6 md:py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div className="flex flex-col gap-1.5">
        <p className="font-mono text-xs text-ink-soft">
          SL Studio. Built one small thing at a time.
        </p>
        <a
          href="mailto:support@sl-studio.dev"
          className="self-start font-mono text-xs text-ink underline underline-offset-2 hover:text-ink-soft transition-colors"
        >
          support@sl-studio.dev
        </a>
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-xs uppercase tracking-wide text-ink-soft">
          Get the SL Studio newsletter
        </span>
        <NewsletterForm />
      </div>
    </footer>
  );
}
