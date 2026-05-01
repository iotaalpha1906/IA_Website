import Image from "next/image";
import { CrestMark } from "@/components/CrestMark";
import type { ExecutiveBoardMember } from "@/site/content";

export function ExecutiveBoardCarousel({
  members,
}: {
  members: readonly ExecutiveBoardMember[];
}) {
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

      <div className="mt-12 w-full lg:mt-14">
        <div className="-mx-4 overflow-x-auto overflow-y-visible px-4 pb-2 [scrollbar-width:thin] sm:-mx-0 sm:px-0">
          <div
            className="grid w-max min-w-full grid-flow-col gap-2 auto-cols-[minmax(10rem,1fr)] sm:gap-4 sm:auto-cols-[minmax(11rem,1fr)] lg:gap-8 lg:auto-cols-[minmax(12rem,1fr)]"
          >
            {members.map((member, i) => (
              <article
                key={`${member.name}-${member.position}-${i}`}
                className="flex min-w-0 flex-col rounded-2xl border border-gold/40 bg-black/30 p-2 shadow-[0_0_24px_rgba(201,151,0,0.08)] sm:p-4 lg:p-5"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-gold/30 bg-black/50">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={`${member.name} — ${member.position}`}
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
                        Add a <span className="font-mono text-gold/70">Photo</span> column
                        in the sheet or match the name in{" "}
                        <span className="font-mono normal-case text-white/55">
                          executiveBoardHeadshots
                        </span>
                      </span>
                    </div>
                  )}
                </div>

                <p className="mt-3 text-center text-[9px] font-semibold uppercase leading-snug tracking-[0.12em] text-gold sm:mt-5 sm:text-xs sm:tracking-[0.14em]">
                  {member.position}
                </p>

                <h4 className="mt-1 text-center text-[10px] font-bold uppercase leading-tight tracking-wide text-white sm:mt-2 sm:text-base lg:text-lg">
                  {member.name}
                </h4>

                <div className="mt-3 flex items-center gap-1.5 sm:mt-5 sm:gap-3">
                  <div
                    className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/35"
                    aria-hidden
                  />
                  <div className="h-6 w-6 shrink-0 text-gold sm:h-8 sm:w-8 lg:h-9 lg:w-9">
                    <CrestMark className="h-full w-full" />
                  </div>
                  <div
                    className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/35"
                    aria-hidden
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
