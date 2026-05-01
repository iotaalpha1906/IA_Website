import { ChevronDown } from "lucide-react";
import type { ChapterLineageEntry } from "@/site/content";

/** Ordinal label by crossing order (no Tail override). */
function linePositionOnly(index: number): string {
  switch (index) {
    case 0:
      return "Ace";
    case 1:
      return "Deuce";
    case 2:
      return "Tre";
    case 3:
      return "Quad";
    case 4:
      return "5";
    case 5:
      return "6";
    case 6:
      return "Jewel";
    default:
      return String(index + 1);
  }
}

/**
 * Display label: single line → Ace only. Last brother (2+) → `Pos/Tail` when that slot
 * would be Deuce, Tre, Quad, etc. (e.g. Tre/Tail). Never `Ace/Tail` — use `Tail` only.
 */
function linePositionLabel(index: number, total: number): string {
  if (total === 1) {
    return "Ace";
  }
  if (index === total - 1) {
    const base = linePositionOnly(index);
    if (base === "Ace") {
      return "Tail";
    }
    return `${base}/Tail`;
  }
  return linePositionOnly(index);
}

export function ChapterLineagePanel({
  entries,
}: {
  entries: readonly ChapterLineageEntry[];
}) {
  return (
    <aside
      id="chapter-lineage"
      className="min-w-0 lg:col-span-6"
      aria-labelledby="chapter-lineage-heading"
    >
      {entries.length === 0 ? (
        <>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-gold sm:text-base">
            Chapter Lineage
          </p>
          <h2
            id="chapter-lineage-heading"
            className="mt-4 text-2xl font-extrabold leading-snug tracking-tight text-white sm:text-3xl"
          >
            {"Click to view the history of Iota Alpha's Lines"}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
            A record of lines chartered through Iota Alpha Chapter and the
            brothers who crossed on each line.
          </p>
          <p className="mt-8 rounded-xl border border-white/10 bg-black/30 px-4 py-6 text-sm text-white/55">
            The detailed line history will be listed here as records are added.
            Reach out to the chapter for lineage questions in the meantime.
          </p>
        </>
      ) : (
        <details className="group mt-4 rounded-xl border border-white/10 bg-black/25 transition-[border-color,background-color] duration-300 ease-out open:border-gold/35 open:bg-black/40 motion-reduce:transition-none">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 sm:px-5 sm:py-5 [&::-webkit-details-marker]:hidden">
            <div className="min-w-0 pr-2">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-gold sm:text-base">
                Chapter Lineage
              </p>
              <h2
                id="chapter-lineage-heading"
                className="mt-3 text-xl font-extrabold leading-snug tracking-tight text-white sm:text-2xl"
              >
                {"Click to view the history of Iota Alpha's Lines"}
              </h2>
            </div>
            <ChevronDown
              className="h-6 w-6 shrink-0 text-gold transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-open:rotate-180 motion-reduce:transition-none motion-reduce:group-open:rotate-180"
              strokeWidth={2}
              aria-hidden
            />
          </summary>

          <div
            className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none group-open:grid-rows-[1fr]"
          >
            <div className="min-h-0 overflow-hidden">
              <div className="border-t border-white/10 px-4 pb-5 pt-2 sm:px-5">
                <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                  A record of lines chartered through Iota Alpha Chapter and the
                  brothers who crossed on each line.
                </p>

                <ul className="mt-6 space-y-6">
                  {entries.map((line, lineIndex) => (
                    <li key={`${line.lineName}-${lineIndex}`}>
                      <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-gold sm:text-base">
                        {line.lineName}
                      </h3>
                      <ul className="mt-3 space-y-2 text-sm text-white/80 sm:text-base">
                        {line.members.map((name, mi) => {
                          const label = linePositionLabel(mi, line.members.length);
                          return (
                            <li
                              key={`${line.lineName}-${mi}-${name}`}
                              className="leading-snug"
                            >
                              <span className="font-semibold text-white/95">
                                {label}
                                {": "}
                              </span>
                              {name}
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </details>
      )}
    </aside>
  );
}
