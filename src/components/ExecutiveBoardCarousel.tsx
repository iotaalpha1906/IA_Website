import Image from "next/image";
import { CrestMark } from "@/components/CrestMark";
import { executiveBoard } from "@/site/content";

export function ExecutiveBoardCarousel() {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center text-center">
        <p className="text-center text-base font-semibold uppercase tracking-[0.2em] text-gold sm:text-lg lg:text-xl">
          Leadership
        </p>
        <h3 className="mt-3 text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl lg:text-4xl">
          Executive Board
        </h3>
        <div
          className="mt-5 h-px w-full max-w-lg bg-gradient-to-r from-transparent via-gold/80 to-transparent shadow-[0_0_12px_rgba(201,151,0,0.35)]"
          aria-hidden
        />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:grid-cols-3 lg:gap-8">
        {executiveBoard.map((member) => (
          <article
            key={member.name}
            className="flex flex-col rounded-2xl border border-gold/40 bg-black/30 p-4 shadow-[0_0_24px_rgba(201,151,0,0.08)] sm:p-5"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-gold/30 bg-black/50">
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt={`${member.name} — ${member.positions.join(", ")}`}
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
                />
              ) : (
                <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-2 px-4 text-center">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold/80">
                    Headshot
                  </span>
                  <span className="max-w-[200px] text-[10px] uppercase leading-relaxed tracking-wider text-white/40">
                    Set <span className="font-mono text-gold/70">photo</span> in{" "}
                    <span className="font-mono normal-case text-white/55">src/site/content.ts</span>
                  </span>
                </div>
              )}
            </div>

            <h4 className="mt-5 text-center text-base font-bold uppercase leading-tight tracking-wide text-white sm:text-lg">
              {member.name}
            </h4>

            <div className="mt-5 flex items-center gap-3">
              <div
                className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/35"
                aria-hidden
              />
              <div className="h-8 w-8 shrink-0 text-gold sm:h-9 sm:w-9">
                <CrestMark className="h-full w-full" />
              </div>
              <div
                className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/35"
                aria-hidden
              />
            </div>

            <ul className="mt-4 divide-y divide-white/10">
              {member.positions.map((role) => (
                <li
                  key={role}
                  className="py-3 text-center text-[11px] font-semibold uppercase leading-snug tracking-[0.14em] text-gold sm:text-xs"
                >
                  {role}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
