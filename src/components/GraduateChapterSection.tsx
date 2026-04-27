import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { graduateChapter, graduateChapterCopy, images } from "@/site/content";

export function GraduateChapterSection() {
  return (
    <section
      id="graduate-chapter"
      className="scroll-mt-28 relative border-b border-white/10 bg-gradient-to-b from-ink via-[#0b0b0b] to-ink"
    >
      <div className="pointer-events-none absolute inset-0 bg-gold-shine opacity-50" />
      <ScrollReveal className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-gold sm:text-base">
              {graduateChapterCopy.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.35rem]">
              {graduateChapterCopy.heading}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/75 sm:text-lg">
              {graduateChapterCopy.body}
            </p>
            <a
              href={graduateChapter.website}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-gold/70 bg-transparent px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:border-gold hover:bg-white/5 hover:shadow-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
            >
              Learn More
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-panel shadow-card">
              <Image
                src={images.graduateChapter}
                alt="Xi Alpha Lambda graduate chapter"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
