import { Award, CalendarDays, GraduationCap } from "lucide-react";
import { ExecutiveBoardCarousel } from "@/components/ExecutiveBoardCarousel";
import { ScrollReveal } from "@/components/ScrollReveal";
import { aboutCopy, aboutMeta } from "@/site/content";

const aboutMetaIcons = [Award, CalendarDays, GraduationCap] as const;

export function AboutSection() {
  return (
    <>
      <section
        id="about"
        className="scroll-mt-28 relative border-b border-white/10 bg-gradient-to-b from-ink via-[#0b0b0b] to-ink"
      >
        <div className="pointer-events-none absolute inset-0 bg-gold-shine opacity-70" />
        <ScrollReveal className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-6">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-gold sm:text-base">
                {aboutCopy.eyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.35rem]">
                {aboutCopy.heading}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-white/75 sm:text-lg">
                {aboutCopy.body}
              </p>

              <ul className="mt-10 space-y-4">
                {aboutMeta.map((item, i) => {
                  const Icon = aboutMetaIcons[i]!;
                  return (
                    <li
                      key={item.label}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-gold/10 text-gold">
                        <Icon className="h-4 w-4" strokeWidth={1.75} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-base leading-relaxed sm:text-lg">
                          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-gold sm:text-base">
                            {item.label}
                            {": "}
                          </span>
                          <span className="break-words text-white/75">
                            {item.value}
                          </span>
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section
        id="chapter-leadership"
        className="scroll-mt-28 relative border-b border-white/10 bg-gradient-to-b from-ink via-[#0b0b0b] to-ink"
      >
        <div className="pointer-events-none absolute inset-0 bg-gold-shine opacity-50" />
        <ScrollReveal className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <ExecutiveBoardCarousel />
        </ScrollReveal>
      </section>
    </>
  );
}
