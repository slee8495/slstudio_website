"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          company: data.get("company"),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong.");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-border bg-bg-subtle rounded-lg p-6 md:p-8 text-center">
        <p className="font-display text-xl font-semibold">Message sent.</p>
        <p className="mt-2 text-ink-soft">
          Thanks for reaching out. We reply within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-border bg-bg-subtle rounded-lg p-6 md:p-8 flex flex-col gap-4"
    >
      {/* Honeypot: hidden from real visitors, catches simple bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-name"
            className="font-mono text-xs uppercase tracking-wide text-ink-soft"
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            className="rounded-md border border-border bg-bg px-3 py-2 text-ink placeholder:text-ink-soft/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-email"
            className="font-mono text-xs uppercase tracking-wide text-ink-soft"
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            className="rounded-md border border-border bg-bg px-3 py-2 text-ink placeholder:text-ink-soft/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-message"
          className="font-mono text-xs uppercase tracking-wide text-ink-soft"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className="rounded-md border border-border bg-bg px-3 py-2 text-ink placeholder:text-ink-soft/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink resize-y"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-status-pending">{error}</p>
      )}

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="font-mono text-xs text-ink-soft">
          Response within 48 hours.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-1.5 rounded-md bg-ink text-bg px-5 py-2.5 font-medium text-sm hover:bg-ink/85 transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
