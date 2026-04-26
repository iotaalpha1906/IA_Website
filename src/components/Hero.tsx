import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { images } from "@/site/content";

export function Hero() {
  return (
    <section id="home" className="scroll-mt-28 relative overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-luxury-radial" aria-hidden />
      <ScrollReveal className="relative mx-auto grid max-w-7xl gap-0 lg:min-h-[min(88vh,920px)] lg:grid-cols-2">
        <div className="relative z-10 flex flex-col justify-center px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
          {/* End with solid ink at the right edge so it matches the column seam (not transparent to radial). */}
          <div className="pointer-events-none absolute inset-0 lg:bg-gradient-to-r lg:from-black lg:via-black/88 lg:to-ink" />
          <div className="relative max-w-xl">
            <h1 className="text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[2.85rem] xl:text-6xl">
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

        <div className="relative min-h-[320px] bg-ink isolate lg:min-h-full">
          <Image
            src={images.hero}
            alt=""
            fill
            priority
            className="object-cover [transform:scale(1.01)] [transform-origin:center]" 
            sizes="(min-width: 1024px) 50vw, 100vw"
            aria-hidden
          />
          {/* Match left column: start from solid ink on the seam, then let the photo read through rightward. */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/30 lg:bg-gradient-to-r lg:from-ink lg:from-0% lg:via-black/30 lg:via-35% lg:to-transparent"
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4 py-6 lg:px-6">
            <div className="w-[96%] max-w-[860px]">
              <Image
                src="/branding/GMU_Sign.jpg"
                alt="George Mason University sign"
                width={1120}
                height={620}
                className="h-auto w-full border-0 object-contain opacity-55 saturate-75"
              />
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
