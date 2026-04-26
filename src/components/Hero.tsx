import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { images } from "@/site/content";

export function Hero() {
  return (
    <section
      id="home"
      className="scroll-mt-28 relative overflow-hidden border-b border-white/10 bg-ink"
    >
      <div className="absolute inset-0 bg-luxury-radial" aria-hidden />
      <ScrollReveal className="relative mx-auto grid max-w-7xl gap-0 lg:min-h-[min(88vh,920px)] lg:grid-cols-2">
        <div className="relative z-10 flex flex-col justify-center px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
          <div className="pointer-events-none absolute inset-0 lg:bg-gradient-to-r lg:from-black lg:via-black/92 lg:to-transparent" />
          <div className="relative max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold sm:text-base lg:text-lg">
              Iota Alpha Chapter —
            </p>
            <h1 className="mt-4 text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[2.85rem] xl:text-6xl">
              Alpha Phi Alpha Fraternity, Inc.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
              Developing Leaders. Building Legacy. Serving the Community.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
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
        </div>

        <div className="relative min-h-[320px] lg:min-h-full">
          <Image
            src={images.hero}
            alt="Brothers representing Iota Alpha Chapter"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25 lg:bg-gradient-to-l lg:from-transparent lg:via-black/55 lg:to-black/90"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(201,151,0,0.12),transparent_55%)]"
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4 py-6 lg:px-6">
            <div className="w-[96%] max-w-[860px]">
              <Image
                src="/branding/GMU_Sign.jpg"
                alt="George Mason University sign"
                width={1120}
                height={620}
                className="h-auto w-full rounded-[2px] object-contain opacity-62 mix-blend-screen saturate-75"
              />
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
