"use client";

export function PricingCta({ href, label }: { href: string; label: string }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!/iphone|ipad|ipod|android/i.test(navigator.userAgent)) return;
    e.preventDefault();
    window.location.href = `${new URL(href).origin}/get-app`;
  };

  return (
    <div className="mt-6">
      <a
        href={href}
        onClick={handleClick}
        className="inline-flex w-full items-center justify-center rounded-full bg-accent-roun px-5 py-2.5 text-sm font-semibold text-bg transition-opacity hover:opacity-90"
      >
        {label}
      </a>
      <a
        href={href}
        className="mt-2 block text-center text-xs text-ink-soft underline underline-offset-2 hover:text-ink"
      >
        Continue in your browser
      </a>
    </div>
  );
}
