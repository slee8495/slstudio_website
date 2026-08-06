export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border py-6 md:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <p className="font-mono text-xs text-ink-soft">
        SL Studio — Sangho Lee. Built one small thing at a time.
      </p>
      <a
        href="mailto:support@sl-studio.dev"
        className="inline-block py-2 -my-2 font-medium text-sm text-ink hover:text-ink-soft transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
      >
        Say hello →
      </a>
    </footer>
  );
}
