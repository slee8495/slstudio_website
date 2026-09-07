"use client";

function mobilePlatform(): "ios" | "android" | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  // iPadOS 13+ reports a desktop Safari user agent, so touch points are the
  // only reliable tell. No Mac reports more than one.
  if (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) return "ios";
  if (/Android/i.test(ua)) return "android";
  return null;
}

export function PricingCta({
  label,
  desktopHref,
  iosHref,
  androidHref,
  className,
}: {
  label: string;
  desktopHref: string;
  // Where a phone should land instead of desktopHref. The two platforms differ:
  // iOS has a live App Store listing, Android does not yet and still needs the
  // web-app install walkthrough. Pass null for either to fall through to
  // desktopHref rather than sending a visitor somewhere useless.
  iosHref?: string | null;
  androidHref?: string | null;
  className?: string;
}) {
  return (
    <a
      href={desktopHref}
      className={className}
      onClick={(event) => {
        const platform = mobilePlatform();
        const target =
          platform === "ios"
            ? iosHref
            : platform === "android"
              ? androidHref
              : null;
        if (target) {
          event.preventDefault();
          window.location.href = target;
        }
      }}
    >
      {label}
    </a>
  );
}
