"use client";

function isMobileUserAgent(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

export function PricingCta({
  label,
  desktopHref,
  mobileHref,
  className,
}: {
  label: string;
  desktopHref: string;
  mobileHref: string;
  className?: string;
}) {
  return (
    <a
      href={desktopHref}
      className={className}
      onClick={(event) => {
        if (isMobileUserAgent()) {
          event.preventDefault();
          window.location.href = mobileHref;
        }
      }}
    >
      {label}
    </a>
  );
}
