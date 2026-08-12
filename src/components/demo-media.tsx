import type { Demo } from "@/lib/apps";

export function DemoMedia({
  demo,
  className,
}: {
  demo: Demo;
  className?: string;
}) {
  if (demo.type === "video") {
    return (
      <video
        src={demo.src}
        width={demo.width}
        height={demo.height}
        aria-label={demo.alt}
        className={className}
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- animated GIF, next/image would strip animation
    <img
      src={demo.src}
      width={demo.width}
      height={demo.height}
      alt={demo.alt}
      className={className}
    />
  );
}
