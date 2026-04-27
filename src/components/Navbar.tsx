"use client";

import { useEffect, useRef, useState } from "react";
import { Instagram, Linkedin, Mail, Menu, X } from "lucide-react";
import { CrestMark } from "@/components/CrestMark";
import { InquiryIconTrigger, useInquiryModal } from "@/components/InquiryModal";
import { site } from "@/site/content";

/** Order matches page flow and ends with external donate link. */
const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Chapter Leadership", href: "#chapter-leadership" },
  { label: "Graduate Chapter", href: "#graduate-chapter" },
  { label: "Programs", href: "#programs" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#contact" },
  {
    label: "Donate",
    href: "https://www.zeffy.com/en-US/donation-form/iota-alpha-support",
    external: true as const,
  },
] as const;

export function Navbar() {
  const { openInquiry } = useInquiryModal();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const desktopNavRef = useRef<HTMLElement | null>(null);
  const navLinkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });

  useEffect(() => {
    const syncActiveSection = () => {
      const offset = 140;
      let current = "#home";

      for (const item of navItems) {
        if (!item.href.startsWith("#")) continue;
        const section = document.querySelector(item.href);
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        if (rect.top <= offset && rect.bottom > offset) {
          current = item.href;
          break;
        }
      }

      setActiveSection(current);
    };

    syncActiveSection();
    window.addEventListener("scroll", syncActiveSection, { passive: true });
    window.addEventListener("resize", syncActiveSection);

    return () => {
      window.removeEventListener("scroll", syncActiveSection);
      window.removeEventListener("resize", syncActiveSection);
    };
  }, []);

  useEffect(() => {
    const updateIndicator = () => {
      const navEl = desktopNavRef.current;
      const activeLink = navLinkRefs.current[activeSection];
      if (!navEl || !activeLink) {
        setIndicator((prev) => ({ ...prev, visible: false }));
        return;
      }

      const navRect = navEl.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setIndicator({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
        visible: true,
      });
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    return () => {
      window.removeEventListener("resize", updateIndicator);
    };
  }, [activeSection]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-1 py-1 sm:gap-2 sm:px-2 lg:px-3">
        <a
          href="#home"
          className="group flex min-w-0 shrink items-center gap-1.5 rounded-sm outline-none ring-gold/40 transition focus-visible:ring-2 sm:gap-2"
        >
          <div className="h-24 w-24 shrink-0 drop-shadow-gold transition group-hover:drop-shadow-[0_0_18px_rgba(201,151,0,0.35)] sm:h-28 sm:w-28">
            <CrestMark className="h-full w-full" />
          </div>
          <div className="min-w-0 max-w-[11rem] text-left leading-tight sm:max-w-[12.5rem] lg:max-w-[14rem]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold transition-all duration-300 group-hover:[text-shadow:0_0_10px_rgba(201,151,0,0.55)] sm:text-[11px]">
              {site.chapterLine}
            </p>
            <p className="text-[12px] font-bold uppercase leading-snug tracking-[0.07em] text-white transition-all duration-300 group-hover:text-gold group-hover:[text-shadow:0_0_10px_rgba(201,151,0,0.55)] sm:text-[13px]">
              {site.fraternityLine}
            </p>
            <p className="text-[10px] font-semibold uppercase leading-snug tracking-[0.12em] text-white/75 transition-all duration-300 group-hover:text-gold group-hover:[text-shadow:0_0_10px_rgba(201,151,0,0.55)] sm:text-[11px]">
              {site.universityLine}
            </p>
          </div>
        </a>

        <nav
          ref={desktopNavRef}
          className="relative hidden min-w-0 flex-1 items-center justify-center gap-0 xl:flex xl:px-2"
          aria-label="Primary"
        >
          <span
            aria-hidden
            className={`pointer-events-none absolute bottom-1 h-px bg-gold transition-all duration-500 ease-out ${
              indicator.visible ? "opacity-100" : "opacity-0"
            }`}
            style={{ left: indicator.left, width: indicator.width }}
          />
          {navItems.map((item) => {
            const active = activeSection === item.href;
            return (
              <a
                key={item.href}
                ref={(el) => {
                  navLinkRefs.current[item.href] = el;
                }}
                href={item.href}
                target={"external" in item ? "_blank" : undefined}
                rel={"external" in item ? "noreferrer" : undefined}
                onClick={() => {
                  if (item.href.startsWith("#")) setActiveSection(item.href);
                }}
                className={`shrink-0 whitespace-nowrap rounded-full px-1.5 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] transition xl:px-2 xl:text-xs xl:tracking-[0.11em] ${
                  active ? "text-gold" : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
          <div className="hidden items-center gap-1 sm:flex">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 text-gold transition hover:border-gold hover:bg-gold/10 hover:shadow-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
              aria-label="Instagram"
            >
              <Instagram className="h-[14px] w-[14px]" strokeWidth={1.75} />
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 text-gold transition hover:border-gold hover:bg-gold/10 hover:shadow-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-[14px] w-[14px]" strokeWidth={1.75} />
            </a>
            <InquiryIconTrigger
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 text-gold transition hover:border-gold hover:bg-gold/10 hover:shadow-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
            >
              <Mail className="h-[14px] w-[14px]" strokeWidth={1.75} />
            </InquiryIconTrigger>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-gold/50 hover:text-gold xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Toggle menu</span>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-white/10 bg-[#070707]/95 px-4 py-4 xl:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile primary">
            {navItems.map((item) => {
              const active = activeSection === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target={"external" in item ? "_blank" : undefined}
                  rel={"external" in item ? "noreferrer" : undefined}
                  onClick={() => {
                    if (item.href.startsWith("#")) setActiveSection(item.href);
                    setOpen(false);
                  }}
                  className={`rounded-lg px-3 py-3 text-xs font-semibold uppercase tracking-[0.2em] ${
                    active ? "text-gold" : "text-white/85"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="mt-3 space-y-2 border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openInquiry();
                }}
                className="w-full rounded-lg border border-gold/35 py-3 text-center text-xs font-semibold uppercase tracking-widest text-gold transition hover:bg-gold/10"
              >
                Send an inquiry
              </button>
              <div className="flex gap-2">
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-gold/35 text-xs font-semibold uppercase tracking-widest text-gold"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-gold/35 text-xs font-semibold uppercase tracking-widest text-gold"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
