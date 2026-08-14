"use client";

import { useState } from "react";
import Image from "next/image";
import type { HowTo } from "@/lib/apps";

export function HowToCarousel({ howTo }: { howTo: HowTo }) {
  const [index, setIndex] = useState(0);
  const total = howTo.steps.length;
  const step = howTo.steps[index];

  const go = (delta: number) => {
    setIndex((i) => (i + delta + total) % total);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,440px)_1fr] gap-8 lg:gap-16 items-center">
      <div className="relative mx-auto w-full max-w-[360px] sm:max-w-[400px]">
        <div className="rounded-md border border-border overflow-hidden bg-bg">
          <Image
            src={step.src}
            width={step.width}
            height={step.height}
            alt={step.caption}
            className="w-full h-auto block"
          />
        </div>
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous screen"
          className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg/90 text-ink-soft shadow-sm backdrop-blur hover:text-ink hover:border-ink/30 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
        >
          <span aria-hidden>←</span>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next screen"
          className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg/90 text-ink-soft shadow-sm backdrop-blur hover:text-ink hover:border-ink/30 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
        >
          <span aria-hidden>→</span>
        </button>
      </div>
      <div className="max-w-xl">
        <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
          {index + 1} / {total}
        </p>
        <p className="mt-3 text-base md:text-lg text-ink-soft leading-relaxed">
          {step.caption}
        </p>
      </div>
    </div>
  );
}
