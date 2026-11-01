import { EVENT_LIVE_STATS } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type EventLiveStats = {
  generatedAt: string;
  phase: "upcoming" | "live" | "ended" | "no_date";
  totals: {
    capacity: number;
    sold: number;
    paid: number;
    free: number;
    remaining: number;
    checkedIn: number;
    notCheckedIn: number;
    checkInRate: number;
    grossSales: number;
    platformFee: number;
    organiserShare: number;
  };
  ticketTypes: {
    id?: string | null;
    name: string;
    price: number | null;
    capacity: number;
    sold: number;
    paid: number;
    free: number;
    checkedIn: number;
    remaining: number;
    grossSales: number;
    soldRate: number;
    checkInRate: number;
    saleState?: "on_sale" | "not_started" | "ended" | "paused" | "sold_out";
    saleOpensAt?: string | null;
    saleClosesAt?: string | null;
  }[];
  sales: { lastHour: number; last24h: number; lastSaleAt: string | null };
  checkIns: { last15m: number; lastHour: number; lastCheckInAt: string | null };
};

// Sales and check-ins for one event, recomputed by the API on every call.
// Refreshes every 15s while the event is on, every minute otherwise.
export const useGetEventLiveStats = (eventId: string) => {
  const token = getToken();

  return useQuery<{ data: EventLiveStats }>({
    queryKey: ["organiserEventLiveStats", eventId],
    queryFn: () =>
      axios
        .get(`${EVENT_LIVE_STATS}/${eventId}`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res?.data)
        .catch((err) => {
          throw err?.response?.data || err.message;
        }),
    enabled: !!eventId,
    refetchInterval: (query) =>
      query.state.data?.data?.phase === "live" ? 15_000 : 60_000,
    refetchOnWindowFocus: true,
  });
};
