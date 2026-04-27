import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { GraduateChapterSection } from "@/components/GraduateChapterSection";
import { ProgramsSection } from "@/components/ProgramsSection";
import { EventsSection } from "@/components/EventsSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-ink bg-luxury-radial">
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <GraduateChapterSection />
        <ProgramsSection />
        <EventsSection />
      </main>
      <Footer />
    </div>
  );
}
