"use client";

import { useState } from "react";

// Pulls the numeric amount out of a formatted price label like "$3.99/month" — used only to
// compute the "save X%" hint, so an unparseable label just means no hint, not an error.
function parsePriceAmount(label: string): number | null {
  const match = label.match(/[\d.]+/);
  return match ? Number(match[0]) : null;
}

export function PricingToggle({
  price,
  annualPrice,
}: {
  price: string;
  annualPrice: string;
}) {
  const [interval, setIntervalValue] = useState<"month" | "year">("month");

  const monthlyAmount = parsePriceAmount(price);
  const annualAmount = parsePriceAmount(annualPrice);
  const savingsPercent =
    monthlyAmount && annualAmount
      ? Math.round((1 - annualAmount / (monthlyAmount * 12)) * 100)
      : null;

  return (
    <div className="mt-2">
      <div className="flex gap-1.5">
        <button
          type="button"
          onClick={() => setIntervalValue("month")}
          className={`rounded-full px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wide transition-colors ${
            interval === "month"
              ? "bg-accent-roun text-bg"
              : "border border-border text-ink-soft hover:text-ink"
          }`}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => setIntervalValue("year")}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wide transition-colors ${
            interval === "year"
              ? "bg-accent-roun text-bg"
              : "border border-border text-ink-soft hover:text-ink"
          }`}
        >
          Annual
          {savingsPercent !== null && (
            <span
              className={
                interval === "year" ? "text-bg/80" : "text-accent-highlight"
              }
            >
              save {savingsPercent}%
            </span>
          )}
        </button>
      </div>
      <p className="mt-3 font-display text-3xl font-semibold tracking-tight">
        {interval === "month" ? price : annualPrice}
      </p>
    </div>
  );
}
