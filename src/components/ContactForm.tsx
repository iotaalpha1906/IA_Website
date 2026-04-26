"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

type ContactFormProps = {
  /** Hide the gold "Send an inquiry" line (e.g. when the modal provides its own header) */
  hideTitle?: boolean;
};

export function ContactForm({ hideTitle = false }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };

      if (!res.ok) {
        setErrorMessage(
          data.error ?? "Something went wrong. Please try again in a few minutes."
        );
        setStatus("error");
        return;
      }
      if (data.ok) {
        setName("");
        setEmail("");
        setMessage("");
        setStatus("success");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMessage("Network error. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p
        className="rounded-lg border border-gold/40 bg-white/5 px-4 py-3 text-sm text-white/90"
        role="status"
      >
        Thank you. Your message has been sent. A brother will get back to you when possible.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {hideTitle ? null : (
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">Send an inquiry</p>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-left text-sm text-white/80">
          <span className="mb-1.5 block text-xs uppercase tracking-wider text-white/50">Name</span>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={120}
            autoComplete="name"
            className="w-full rounded-md border border-white/15 bg-black/50 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
            placeholder="Your name"
          />
        </label>
        <label className="block text-left text-sm text-white/80">
          <span className="mb-1.5 block text-xs uppercase tracking-wider text-white/50">Email</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={254}
            autoComplete="email"
            className="w-full rounded-md border border-white/15 bg-black/50 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label className="block text-left text-sm text-white/80">
        <span className="mb-1.5 block text-xs uppercase tracking-wider text-white/50">Message</span>
        <textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          minLength={10}
          maxLength={5000}
          rows={4}
          className="w-full resize-y rounded-md border border-white/15 bg-black/50 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
          placeholder="How can we help?"
        />
      </label>
      <div className="sr-only" aria-hidden>
        <label>
          Company
          <input
            tabIndex={-1}
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            autoComplete="off"
          />
        </label>
      </div>
      {status === "error" && errorMessage && (
        <p className="text-left text-sm text-red-300" role="alert">
          {errorMessage}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full border border-gold/70 bg-gold/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-gold transition hover:border-gold hover:bg-gold/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
