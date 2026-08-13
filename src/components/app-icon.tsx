import Image from "next/image";
import type { AppEntry } from "@/lib/apps";

const heroSizeClasses: Record<"hero" | "xl", string> = {
  hero: "h-14 w-14 text-2xl",
  xl: "h-20 w-20 text-4xl",
};

export function AppIcon({
  icon,
  name,
  size = "card",
  accentClass,
}: {
  icon: AppEntry["icon"];
  name: string;
  size?: "card" | "hero" | "xl";
  accentClass?: string;
}) {
  if (typeof icon === "string") {
    if (size === "hero" || size === "xl") {
      return (
        <span
          aria-hidden
          className={`inline-flex items-center justify-center rounded-xl border shrink-0 ${heroSizeClasses[size]} ${accentClass ?? ""}`}
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

  const sizeClass =
    size === "xl" ? "h-20 w-20" : size === "hero" ? "h-14 w-14" : "h-6 w-6";
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
