"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * CTA to scroll — hides after the user scrolls so it only nudges the first view.
 */
export function ScrollForMoreCta() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 48) setDismissed(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed) return null;

  return (
    <a
      href="#about"
      className="group pointer-events-auto absolute bottom-6 left-0 right-0 z-20 flex flex-col items-center justify-center gap-1.5 text-gold/90 transition-opacity duration-500 motion-reduce:transition-none sm:bottom-8"
    >
      <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold/85 drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)] sm:text-xs sm:tracking-[0.28em]">
        Scroll for more!
      </span>
      <ChevronDown
        className="h-6 w-6 animate-scroll-hint text-gold drop-shadow-[0_0_12px_rgba(201,151,0,0.35)] motion-reduce:animate-none sm:h-7 sm:w-7"
        strokeWidth={2.5}
        aria-hidden
      />
    </a>
  );
}
