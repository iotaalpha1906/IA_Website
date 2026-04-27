import { Instagram, Linkedin } from "lucide-react";
import { CrestMark } from "@/components/CrestMark";
import { site } from "@/site/content";

export function Footer() {
  return (
    <footer id="contact" className="scroll-mt-28 border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="flex justify-center md:justify-start">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 shrink-0 text-gold">
                <CrestMark className="h-full w-full" />
              </div>
              <div className="leading-tight">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold sm:text-sm">
                  {site.chapterLine}
                </p>
                <p className="text-lg font-bold uppercase tracking-[0.12em] text-white sm:text-xl">
                  {site.fraternityLine}
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70 sm:text-sm">
                  {site.universityLine}
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-gold">Connect with us</h3>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/60">
              Follow the chapter for updates, events, and how to get involved.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-13 w-13 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-gold hover:bg-gold/10 hover:text-gold hover:shadow-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/45"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-13 w-13 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-gold hover:bg-gold/10 hover:text-gold hover:shadow-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/45"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/45">
          © {new Date().getFullYear()} Iota Alpha Chapter, Alpha Phi Alpha Fraternity, Inc. All Rights
          Reserved.
        </div>
      </div>
    </footer>
  );
}
