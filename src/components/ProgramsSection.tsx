import { BookOpen, Handshake, Trophy, Users } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

const programs = [
  {
    title: "Go-to-Highschool, Go-to-College",
    description:
      "The “Go-to-High-School, Go-to-College” program, established in 1922, concentrates on the importance of completing secondary and collegiate education as a road to advancement.",
    icon: BookOpen,
  },
  {
    title: "A Voteless People is a Hopeless People",
    description:
      "“A Voteless People is a Hopeless People” (aka VPHP) was initiated as a National Program of Alpha during the 1930’s when many African-Americans had the right to vote but were prevented from voting because of poll taxes, threats of reprisal, and lack of education about the voting process. Voter education and registration have remained a dominant focus of this outreach activity for over 65 years. In the 1990’s, the focus shifted to include political awareness and empowerment, delivered most frequently through town meetings and candidate forums.",
    icon: Trophy,
  },
  {
    title: "Project ALPHA",
    description:
      "This collaborative project, which is symbolized by both genders signs side by side, is designed to provide education, motivation, and skill-building on issues of responsibility, relationships, teen pregnancy, and sexually transmitted diseases for young males ages 12-15 years. Designed to provide young men with current and accurate information about teen pregnancy prevention, Project Alpha™ consists of a series of workshops and informational sessions conducted by Alpha Phi Alpha Fraternity brothers.",
    icon: Handshake,
  },
  {
    title: "Brother's Keeper",
    description:
      "Formally called the A. Charles Haston Brother’s Keeper program, this service program developed with the mission of advocating and improving the quality of life for Alpha Phi Alpha Fraternity, Inc.’s senior brothers, their spouses and widows; brothers who are retired and have disabilities or ailments; and vulnerable community members.",
    icon: Users,
  },
] as const;

export function ProgramsSection() {
  return (
    <section
      id="programs"
      className="scroll-mt-28 relative border-b border-white/10 bg-ink"
    >
      <div className="pointer-events-none absolute inset-0 bg-luxury-radial opacity-60" />
      <ScrollReveal className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <h2 className="text-center text-base font-semibold uppercase tracking-[0.2em] text-gold sm:text-lg lg:text-xl">
          National Programs
        </h2>

        <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 xl:grid-cols-4">
          {programs.map((program) => (
            <article
              key={program.title}
              className="group relative overflow-hidden rounded-2xl border border-gold/20 bg-panel-elevated p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-gold/45 hover:shadow-gold"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at 20% 0%, rgba(201,151,0,0.14), transparent 55%)",
                }}
              />
              <div className="relative text-center">
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold transition group-hover:border-gold/55 group-hover:shadow-gold">
                  <program.icon className="h-6 w-6" strokeWidth={1.65} />
                </div>
                <h3 className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-gold">
                  {program.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  {program.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
