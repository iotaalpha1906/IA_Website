"use client";

import { useState } from "react";
import { site } from "@/site/content";

type Status = "idle" | "opening" | "success" | "error";

type ContactFormProps = {
  /** Hide the gold "Send an inquiry" line (e.g. when the modal provides its own header) */
  hideTitle?: boolean;
};

const emailOk = (s: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim()) && s.length <= 254;

function buildMailto(to: string, name: string, fromEmail: string, message: string) {
  const subject = `Website message from ${name}`;
  const body = `From: ${name} <${fromEmail}>\n\n${message}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm({ hideTitle = false }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    if (company.trim() !== "") {
      setStatus("success");
      return;
    }

    if (!name.trim() || name.length > 120) {
      setErrorMessage("Please enter your name (1–120 characters).");
      setStatus("error");
      return;
    }
    if (!emailOk(email)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    if (message.trim().length < 10 || message.length > 5000) {
      setErrorMessage("Please enter a message of at least 10 characters (max 5,000).");
      setStatus("error");
      return;
    }

    const to = site.inquiryInbox;
    if (!to || !emailOk(to)) {
      setErrorMessage("Inquiry email is not configured. Set site.inquiryInbox in content.");
      setStatus("error");
      return;
    }

    setStatus("opening");
    const href = buildMailto(to, name.trim(), email.trim(), message.trim());
    if (href.length > 8000) {
      setErrorMessage("Message is too long for a mail link. Please shorten the text and try again.");
      setStatus("error");
      return;
    }

    setName("");
    setEmail("");
    setMessage("");
    setStatus("success");
    const a = document.createElement("a");
    a.href = href;
    a.rel = "noopener noreferrer";
    a.click();
  }

  if (status === "success") {
    return (
      <p
        className="rounded-lg border border-gold/40 bg-white/5 px-4 py-3 text-sm text-white/90"
        role="status"
      >
        If your email app opened, send the message there to contact the chapter. If nothing
        opened, set up a mail program or add this site to the allowed list for your browser.
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
        disabled={status === "opening"}
        className="w-full rounded-full border border-gold/70 bg-gold/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-gold transition hover:border-gold hover:bg-gold/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "opening" ? "Opening email…" : "Send message"}
      </button>
    </form>
  );
}
