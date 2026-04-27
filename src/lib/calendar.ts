import "server-only";

import ical from "node-ical";
import type { CalendarResponse, EventInstance, ParameterValue, VEvent } from "node-ical";

export type UpcomingEvent = {
  title: string;
  when: string;
  description: string;
  month: string;
  day: string;
  key: string;
};

const MAX_EVENTS = 9;

function paramText(v: ParameterValue | undefined | string | EventInstance["summary"]): string {
  if (v == null) return "";
  if (typeof v === "string") return v.trim();
  if (typeof v === "object" && "val" in v && v.val != null) return String(v.val).trim();
  return String(v).trim();
}

function stripHtml(s: string): string {
  return s
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Fetches a public Google Calendar iCal feed and returns upcoming event cards.
 * Set GOOGLE_CALENDAR_ICAL_URL in the environment; events are edited in Google only.
 */
export async function getUpcomingEvents(): Promise<UpcomingEvent[]> {
  const icalUrl = process.env.GOOGLE_CALENDAR_ICAL_URL?.trim();
  if (!icalUrl) return [];

  const tz = process.env.CALENDAR_TIMEZONE?.trim() || "America/New_York";

  let ics: string;
  try {
    const res = await fetch(icalUrl, {
      next: { revalidate: 300 },
      headers: { "User-Agent": "IotaAlpha-Website/1.0" },
    });
    if (!res.ok) return [];
    ics = await res.text();
  } catch {
    return [];
  }

  let data: CalendarResponse;
  try {
    data = ical.parseICS(ics);
  } catch {
    return [];
  }

  const from = new Date();
  const to = new Date();
  to.setFullYear(to.getFullYear() + 1);

  const flat: {
    start: Date;
    isFullDay: boolean;
    summary: string;
    description: string;
    uid: string;
    key: string;
  }[] = [];

  for (const k of Object.keys(data)) {
    if (k === "vcalendar") continue;
    const comp = data[k];
    if (!comp || typeof comp !== "object" || (comp as { type?: string }).type !== "VEVENT") {
      continue;
    }
    const ev = comp as VEvent;
    if (ev.status === "CANCELLED") continue;

    let instances: ReturnType<typeof ical.expandRecurringEvent>;
    try {
      instances = ical.expandRecurringEvent(ev, { from, to });
    } catch {
      continue;
    }

    for (const inst of instances) {
      const start = inst.start instanceof Date ? inst.start : new Date(inst.start);
      const v = inst.event as VEvent;
      const title =
        paramText(inst.summary as ParameterValue) || paramText(v.summary) || "Event";
      const descRaw = paramText(v.description);
      const plain = descRaw ? stripHtml(descRaw) : "";
      const description =
        plain.length > 500 ? `${plain.slice(0, 500)}…` : plain;
      flat.push({
        start,
        isFullDay: inst.isFullDay,
        summary: title,
        description,
        uid: v.uid,
        key: `${v.uid}-${start.getTime()}`,
      });
    }
  }

  flat.sort((a, b) => a.start.getTime() - b.start.getTime());

  const seen = new Set<string>();
  const out: UpcomingEvent[] = [];
  for (const row of flat) {
    if (seen.has(row.key)) continue;
    seen.add(row.key);
    out.push({
      key: row.key,
      title: row.summary,
      description: row.description,
      month: new Intl.DateTimeFormat("en-US", { timeZone: tz, month: "short" }).format(
        row.start,
      ),
      day: new Intl.DateTimeFormat("en-US", { timeZone: tz, day: "numeric" }).format(
        row.start,
      ),
      when: formatWhen(row.start, tz, row.isFullDay),
    });
    if (out.length >= MAX_EVENTS) break;
  }

  return out;
}

function formatWhen(d: Date, tz: string, isAllDay: boolean): string {
  if (isAllDay) {
    const full = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(d);
    return `All day · ${full}`;
  }
  return new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}

/** Optional: Google Calendar web URL for “View all events”. */
export function getCalendarPublicUrl(): string | null {
  const u = process.env.GOOGLE_CALENDAR_PUBLIC_URL?.trim();
  if (u) return u;
  return null;
}
