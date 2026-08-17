import { NewsletterForm } from "./newsletter-form";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border py-6 md:py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <p className="font-mono text-xs text-ink-soft">
        SL Studio. Built one small thing at a time.
      </p>
      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-xs uppercase tracking-wide text-ink-soft">
          Get the SL Studio newsletter
        </span>
        <NewsletterForm />
      </div>
    </footer>
  );
}
