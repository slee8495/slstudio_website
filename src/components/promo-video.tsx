"use client";

import { useRef, useState } from "react";

export function PromoVideo({
  src,
  poster,
  className,
  variant = "card",
}: {
  src: string;
  poster: string;
  className?: string;
  variant?: "card" | "cover";
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  if (variant === "cover") {
    return (
      <div className={className ?? "absolute inset-0"}>
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          loop
          muted={muted}
          playsInline
          className="block w-full h-full object-cover"
        />
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="absolute bottom-5 right-5 md:bottom-8 md:right-8 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md border border-white/25 transition-colors hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        >
          {muted ? (
            <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
              <path d="M4 9v6h4l5 5V4L8 9H4Z" fill="currentColor" />
              <path
                d="M16.5 8.5a5 5 0 0 1 0 7M19 6a9 9 0 0 1 0 12"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                opacity="0.4"
              />
              <path
                d="M17 7l4 10M21 7l-4 10"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
              <path d="M4 9v6h4l5 5V4L8 9H4Z" fill="currentColor" />
              <path
                d="M16.5 8.5a5 5 0 0 1 0 7M19 6a9 9 0 0 1 0 12"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>
    );
  }

  return (
    <div
      className={`relative mx-auto rounded-2xl overflow-hidden shadow-lg shadow-ink/10 ${className ?? "max-w-[300px] sm:max-w-[340px] w-full"}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        loop
        muted={muted}
        playsInline
        className="block w-full h-auto"
      />
      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink/60 text-white backdrop-blur-sm transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
      >
        {muted ? (
          <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
            <path
              d="M4 9v6h4l5 5V4L8 9H4Z"
              fill="currentColor"
            />
            <path
              d="M16.5 8.5a5 5 0 0 1 0 7M19 6a9 9 0 0 1 0 12"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.4"
            />
            <path
              d="M17 7l4 10M21 7l-4 10"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
            <path d="M4 9v6h4l5 5V4L8 9H4Z" fill="currentColor" />
            <path
              d="M16.5 8.5a5 5 0 0 1 0 7M19 6a9 9 0 0 1 0 12"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
