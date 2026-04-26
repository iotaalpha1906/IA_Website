import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { ScrollReveal } from "@/components/ScrollReveal";
import { images } from "@/site/content";

export function BrotherhoodSection() {
  return (
    <section
      id="brotherhood"
      className="scroll-mt-28 relative border-b border-white/10 bg-ink"
    >
      <div className="pointer-events-none absolute inset-0 bg-luxury-radial opacity-50" />
      <ScrollReveal className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
              Brotherhood
            </p>
            <h2 className="mt-4 text-3xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-4xl">
              A Brotherhood Like No Other
            </h2>
            <a
              href="#brotherhood"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-gold/60 px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-white transition hover:border-gold hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
            >
              View Gallery
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="lg:col-span-5">
            <div className="grid gap-4 sm:grid-cols-3">
              {images.brotherhood.map((src, idx) => (
                <div
                  key={src}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-panel shadow-card transition duration-500 hover:border-gold/35 hover:shadow-gold"
                >
                  <Image
                    src={src}
                    alt={`Brotherhood gallery image ${idx + 1}`}
                    fill
                    className="object-cover transition duration-700 hover:scale-[1.04]"
                    sizes="(min-width: 1024px) 22vw, 90vw"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-80"
                    aria-hidden
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 lg:justify-self-end lg:self-center">
            <CTASection />
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
