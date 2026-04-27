import { ArrowRight } from "lucide-react";
import { ScrollForMoreCta } from "@/components/ScrollForMoreCta";
import { ScrollReveal } from "@/components/ScrollReveal";
import { site } from "@/site/content";

export function Hero() {
  return (
    <section id="home" className="scroll-mt-28 relative overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-luxury-radial" aria-hidden />
      <ScrollReveal className="relative mx-auto flex min-h-[min(78vh,760px)] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:min-h-[min(88vh,920px)] lg:px-8 lg:py-28">
        <div className="relative z-10 w-full max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold sm:text-sm">
            {site.chapterLine}
          </p>
          <h1 className="mt-3 text-3xl font-extrabold uppercase leading-[1.08] tracking-tight text-white sm:mt-4 sm:text-4xl md:text-5xl lg:text-[2.85rem] xl:text-6xl">
            {site.fraternityLine}
          </h1>
          <p className="mt-2 text-[11px] font-semibold uppercase leading-snug tracking-[0.14em] text-white/75 sm:text-xs">
            {site.universityLine}
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:mt-8 sm:text-lg">
            Developing Leaders. Building Legacy. Serving the Community.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href="#join"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-black transition hover:-translate-y-0.5 hover:bg-[#d6a512] hover:shadow-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Join Interest List
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#about"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-gold/70 bg-transparent px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:border-gold hover:bg-white/5 hover:shadow-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
            >
              Learn More
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
        <ScrollForMoreCta />
      </ScrollReveal>
    </section>
  );
}
