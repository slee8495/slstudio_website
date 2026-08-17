export function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.014-.1-.04-.31-.04-.52 0-1.11.542-2.27 1.192-2.99.764-.85 2.084-1.48 3.174-1.53.02.13.038.28.038.42zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.9 1.34-1.85 2.66-3.34 2.68-1.46.03-1.93-.87-3.6-.87-1.665 0-2.185.85-3.58.9-1.44.05-2.54-1.45-3.44-2.78-1.87-2.71-3.3-7.66-1.38-11 .95-1.66 2.65-2.71 4.49-2.74 1.42-.03 2.76.96 3.6.96.85 0 2.46-1.19 4.15-1.02.71.03 2.7.29 3.98 2.16-.1.06-2.38 1.39-2.35 4.14.03 3.29 2.88 4.38 2.91 4.4z" />
    </svg>
  );
}

export function AndroidIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24c-1.44-.65-3.07-1.01-4.47-1.01s-3.03.36-4.47 1.01L5.65 5.67c-.18-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85L6.4 9.48C3.3 11.25 1.28 14.44 1 18h22c-.28-3.56-2.3-6.75-5.4-8.52zM7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" />
    </svg>
  );
}

export function WebAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.4 2.4 3.6 5.4 3.6 9s-1.2 6.6-3.6 9c-2.4-2.4-3.6-5.4-3.6-9S9.6 5.4 12 3z" />
    </svg>
  );
}
