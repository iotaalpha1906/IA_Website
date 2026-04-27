import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { GraduateChapterSection } from "@/components/GraduateChapterSection";
import { ProgramsSection } from "@/components/ProgramsSection";
import { EventsSection } from "@/components/EventsSection";
import { Footer } from "@/components/Footer";

/** Home page regenerates periodically so the calendar can pick up new Google events. */
export const revalidate = 300;

function EventsSectionFallback() {
  return (
    <section
      id="events"
      className="scroll-mt-28 border-b border-white/10 bg-[#070707]"
      aria-busy
      aria-label="Events loading"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <h2 className="text-xs font-semibold uppercase tracking-[0.35em] text-gold/70 sm:text-sm">
          Upcoming Events
        </h2>
        <div className="mt-12">
          <p className="rounded-2xl border border-white/10 bg-panel-elevated/40 py-14 text-center text-sm text-white/50 sm:py-16 sm:text-base">
            Loading events…
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-ink bg-luxury-radial">
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <GraduateChapterSection />
        <ProgramsSection />
        <Suspense fallback={<EventsSectionFallback />}>
          <EventsSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
