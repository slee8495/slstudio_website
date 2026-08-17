"use client";

export function PricingCta({ href, label }: { href: string; label: string }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!/iphone|ipad|ipod|android/i.test(navigator.userAgent)) return;
    e.preventDefault();
    window.location.href = `${new URL(href).origin}/get-app`;
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-accent-roun px-5 py-2.5 text-sm font-semibold text-bg transition-opacity hover:opacity-90"
    >
      {label}
    </a>
  );
}
