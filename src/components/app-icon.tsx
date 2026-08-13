import Image from "next/image";
import type { AppEntry } from "@/lib/apps";

export function AppIcon({
  icon,
  name,
  size = "card",
  accentClass,
}: {
  icon: AppEntry["icon"];
  name: string;
  size?: "card" | "hero";
  accentClass?: string;
}) {
  if (typeof icon === "string") {
    if (size === "hero") {
      return (
        <span
          aria-hidden
          className={`inline-flex h-14 w-14 items-center justify-center rounded-xl border text-2xl shrink-0 ${accentClass ?? ""}`}
        >
          {icon}
        </span>
      );
    }
    return (
      <span aria-hidden className="text-xl leading-none">
        {icon}
      </span>
    );
  }

  const sizeClass = size === "hero" ? "h-14 w-14" : "h-6 w-6";
  return (
    <Image
      src={icon.src}
      width={icon.width}
      height={icon.height}
      alt={`${name} app icon`}
      className={`${sizeClass} rounded-xl object-cover shrink-0`}
    />
  );
}
