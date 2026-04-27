import { ExternalLink } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getCalendarPublicUrl, getUpcomingEvents } from "@/lib/calendar";

export async function EventsSection() {
  const events = await getUpcomingEvents();
  const viewAllUrl = getCalendarPublicUrl();

  return (
    <section id="events" className="scroll-mt-28 border-b border-white/10 bg-[#070707]">
      <ScrollReveal className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <h2 className="text-xs font-semibold uppercase tracking-[0.35em] text-gold sm:text-sm">
            Upcoming Events
          </h2>
          {viewAllUrl ? (
            <a
              href={viewAllUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-gold transition hover:text-[#d6a512] hover:drop-shadow-[0_0_10px_rgba(201,151,0,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070707]"
            >
              <span className="inline-flex items-center gap-1">
                View in Google Calendar
                <ExternalLink className="h-3.5 w-3.5 opacity-80" aria-hidden />
              </span>
            </a>
          ) : null}
        </div>

        <div className="mt-12">
          {events.length === 0 ? (
            <p className="rounded-2xl border border-white/10 bg-panel-elevated/40 py-14 text-center text-sm text-white/65 sm:py-16 sm:text-base">
              No upcoming events. Stay Tuned!
            </p>
          ) : (
            <div className="grid gap-5 lg:grid-cols-3">
              {events.map((event) => (
                <article
                  key={event.key}
                  className="group flex overflow-hidden rounded-2xl border border-white/10 bg-panel-elevated shadow-card transition hover:border-gold/35 hover:shadow-gold"
                >
                  <div className="flex w-[92px] shrink-0 flex-col items-center justify-center border-r border-white/10 bg-[#101010] px-3 py-6 text-center sm:w-[104px]">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/55">
                      {event.month}
                    </p>
                    <p className="mt-2 text-3xl font-black tabular-nums text-white sm:text-4xl">
                      {event.day}
                    </p>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-center px-5 py-6 sm:px-6">
                    <h3 className="text-base font-bold text-white sm:text-lg">{event.title}</h3>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold/90">
                      {event.when}
                    </p>
                    {event.description ? (
                      <p className="mt-3 text-sm leading-relaxed text-white/60">{event.description}</p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}
