"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
} from "react";
import { X } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

type InquiryContextValue = {
  openInquiry: () => void;
  closeInquiry: () => void;
};

const InquiryContext = createContext<InquiryContextValue | null>(null);

export function useInquiryModal() {
  const ctx = useContext(InquiryContext);
  if (!ctx) {
    throw new Error("useInquiryModal must be used within InquiryModalProvider");
  }
  return ctx;
}

export function InquiryModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const titleId = useId();

  const openInquiry = useCallback(() => {
    setFormKey((k) => k + 1);
    setOpen(true);
  }, []);

  const closeInquiry = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeInquiry();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, closeInquiry]);

  return (
    <InquiryContext.Provider value={{ openInquiry, closeInquiry }}>
      {children}
      {open ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={closeInquiry}
            aria-hidden
          />
          <div
            className="relative z-10 flex max-h-[min(90dvh,720px)] w-full max-w-lg flex-col overflow-y-auto rounded-2xl border border-gold/25 bg-[#0a0a0a] p-5 shadow-2xl shadow-black/50 sm:p-7"
          >
            <div className="mb-4 flex items-start justify-between gap-3 border-b border-white/10 pb-4">
              <h2
                id={titleId}
                className="pt-0.5 text-left text-xs font-bold uppercase leading-snug tracking-[0.24em] text-gold"
              >
                Send an inquiry
              </h2>
              <button
                type="button"
                onClick={closeInquiry}
                className="inline-flex shrink-0 items-center justify-center rounded-full border border-white/20 p-2 text-white/90 transition hover:border-gold/50 hover:bg-white/5 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
                aria-label="Close"
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>
            <div className="pr-0">
              <ContactForm key={formKey} hideTitle />
            </div>
          </div>
        </div>
      ) : null}
    </InquiryContext.Provider>
  );
}

export function InquiryTextTrigger({ className, children }: { className?: string; children: React.ReactNode }) {
  const { openInquiry } = useInquiryModal();
  return (
    <button
      type="button"
      onClick={openInquiry}
      className={
        className ??
        "text-inherit underline decoration-gold/50 underline-offset-2 transition hover:text-white"
      }
    >
      {children}
    </button>
  );
}

export function InquiryIconTrigger({
  className,
  children,
  "aria-label": ariaLabel = "Send an inquiry",
}: {
  className: string;
  children: React.ReactNode;
  "aria-label"?: string;
}) {
  const { openInquiry } = useInquiryModal();
  return (
    <button
      type="button"
      onClick={openInquiry}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
