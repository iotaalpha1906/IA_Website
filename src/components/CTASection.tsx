import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <div id="join" className="scroll-mt-28 w-full max-w-xl lg:max-w-none">
      <div className="overflow-hidden rounded-2xl border border-black/20 bg-gold p-8 text-black shadow-[0_24px_80px_rgba(201,151,0,0.35)] sm:p-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-black/70">
          Join Our Legacy
        </p>
        <h2 className="mt-3 text-2xl font-extrabold uppercase leading-tight tracking-tight sm:text-3xl lg:text-[1.65rem] xl:text-4xl">
          Be Part of Something Greater
        </h2>
        <p className="mt-5 text-sm leading-relaxed text-black/80 sm:text-base">
          If you are committed to leadership, service, scholarship, and brotherhood, we invite you to
          learn more about the Iota Alpha experience at George Mason University—and step into a lineage
          built to transcend.
        </p>
        <a
          href="#contact"
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-7 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white transition hover:-translate-y-0.5 hover:bg-black/90 hover:shadow-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-gold sm:w-auto"
        >
          Join Interest List
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
