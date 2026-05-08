"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const NAV_SCROLL_OFFSET = 112;

/**
 * Fixed “back to About” control on the left while the user scrolls long chapter lineage.
 * Hidden until the lineage details panel is open, and when Chapter Leadership enters view.
 */
export function AboutLineageBackToTop() {
  const [visible, setVisible] = useState(false);

  const sync = useCallback(() => {
    const lineage = document.getElementById("chapter-lineage");
    const leadership = document.getElementById("chapter-leadership");
    const about = document.getElementById("about");
    if (!lineage || !leadership || !about) {
      setVisible(false);
      return;
    }

    const details = lineage.querySelector("details");
    if (!details) {
      setVisible(false);
      return;
    }

    if (!details.open) {
      setVisible(false);
      return;
    }

    const l = lineage.getBoundingClientRect();
    const nextTop = leadership.getBoundingClientRect().top;
    const scrollY = window.scrollY ?? window.pageYOffset;

    const lineageInView = l.bottom > NAV_SCROLL_OFFSET && l.top < window.innerHeight;
    const beforeNextSection = nextTop > NAV_SCROLL_OFFSET + 12;
    const scrolledPastAboutIntro =
      scrollY + NAV_SCROLL_OFFSET > about.offsetTop + 180;

    setVisible(lineageInView && beforeNextSection && scrolledPastAboutIntro);
  }, []);

  useEffect(() => {
    const lineage = document.getElementById("chapter-lineage");
    const details = lineage?.querySelector("details");
    if (!lineage || !details) return;

    sync();

    const onScroll = () => sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    details.addEventListener("toggle", sync);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      details.removeEventListener("toggle", sync);
    };
  }, [sync]);

  const goAbout = () => {
    document.getElementById("about")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
      aria-hidden={!visible}
    >
      <div
        className={`pointer-events-auto absolute left-[max(0.75rem,calc((100vw-80rem)/2+0.25rem))] top-[min(42vh,28rem)] flex -translate-y-1/2 flex-col items-center transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
          visible
            ? "translate-x-0 opacity-100"
            : "pointer-events-none -translate-x-2 opacity-0"
        }`}
      >
        <button
          type="button"
          tabIndex={visible ? undefined : -1}
          onClick={goAbout}
          className="group flex flex-col items-center gap-1.5 rounded-xl border border-gold/40 bg-black/70 px-3 py-2.5 text-gold shadow-lg shadow-black/40 backdrop-blur-md transition-[border-color,background-color,color] duration-200 ease-out hover:border-gold/70 hover:bg-black/85 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/55"
        >
          <ArrowUp
            className="h-5 w-5 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
            strokeWidth={2.25}
            aria-hidden
          />
          <span className="max-w-[4.25rem] text-center text-[0.625rem] font-semibold uppercase leading-tight tracking-[0.12em] text-gold group-hover:text-white sm:text-[0.65rem] sm:tracking-[0.14em]">
            Back to top
          </span>
          <span className="sr-only">Jump to About — start of About section</span>
        </button>
      </div>
    </div>
  );
}
