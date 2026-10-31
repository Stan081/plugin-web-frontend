/**
 * Same rule as the API (utils/eventDays.ts): an event is live for the whole of
 * its event day(s) in Lagos time and past only once its last day is over. Used
 * when an endpoint doesn't return the API's `phase`.
 */
export type EventPhase = "upcoming" | "live" | "past";

const LAGOS_OFFSET_MS = 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

export const eventPhase = (
  event: { phase?: string | null; startDate?: string | Date | null; endDate?: string | Date | null } | null | undefined,
  now: Date = new Date()
): EventPhase | null => {
  if (event?.phase === "upcoming" || event?.phase === "live" || event?.phase === "past") {
    return event.phase;
  }
  if (!event?.startDate) return null;
  const start = new Date(event.startDate);
  const end = event.endDate ? new Date(event.endDate) : start;
  if (Number.isNaN(start.getTime())) return null;
  const local = now.getTime() + LAGOS_OFFSET_MS;
  const startOfToday = local - (local % DAY_MS) - LAGOS_OFFSET_MS;
  const startOfTomorrow = startOfToday + DAY_MS;
  if (start.getTime() >= startOfTomorrow) return "upcoming";
  if (end.getTime() < startOfToday) return "past";
  return "live";
};
