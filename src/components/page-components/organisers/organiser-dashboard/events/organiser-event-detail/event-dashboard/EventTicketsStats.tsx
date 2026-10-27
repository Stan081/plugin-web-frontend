"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetEventLiveStats } from "@/hooks/organiser/useGetEventLiveStats";
import { toFiat } from "@/lib/amount";
import { useEventsContext } from "@/providers/events.provider";
import React from "react";

const timeOf = (value?: string | null) =>
  value
    ? new Date(value).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

/**
 * Headline numbers for the organiser's event dashboard. Comes from one live
 * endpoint, so sold, earnings and check-ins always agree; it used to combine
 * three endpoints and showed attendees instead of check-ins.
 */
const EventTicketsStats = () => {
  const { publishedEventId } = useEventsContext();
  const { data, isLoading, isError } = useGetEventLiveStats(publishedEventId);
  const stats = data?.data;
  const totals = stats?.totals;
  const isLive = stats?.phase === "live";

  const cards = [
    {
      label: "Tickets sold",
      value: totals ? (
        <>
          {totals.sold.toLocaleString()}{" "}
          <span className="font-pally-regular text-sm md:text-base">
            / {totals.capacity.toLocaleString()}
          </span>
        </>
      ) : null,
      detail: totals
        ? `${totals.paid} paid · ${totals.free} free · ${totals.remaining} left`
        : "",
    },
    {
      label: "Ticket sales",
      value: totals ? toFiat(totals.grossSales) : null,
      detail: stats ? `${stats.sales.last24h} sold in the last 24 hours` : "",
    },
    {
      label: "Your earnings",
      value: totals ? toFiat(totals.organiserShare) : null,
      detail: totals ? `After the ${toFiat(totals.platformFee)} Plugin fee` : "",
    },
    {
      label: "Checked in",
      value: totals ? (
        <>
          {totals.checkedIn.toLocaleString()}{" "}
          <span className="font-pally-regular text-sm md:text-base">
            / {totals.sold.toLocaleString()}
          </span>
        </>
      ) : null,
      detail: stats
        ? isLive
          ? `${totals!.checkInRate}% in · ${stats.checkIns.last15m} in the last 15 min`
          : `${totals!.checkInRate}% of tickets`
        : "",
    },
  ];

  return (
    <div className="mt-5">
      {stats && (
        <p className="mb-3 flex items-center gap-2 font-pally-regular text-sm text-[#515A6A]">
          {isLive && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-0.5 text-green-800">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-600" />
              Live
            </span>
          )}
          Updated {timeOf(stats.generatedAt)}
        </p>
      )}
      {isError && (
        <p className="mb-3 font-pally-regular text-sm text-[#D9302A]">
          Couldn&apos;t load the latest numbers. Retrying…
        </p>
      )}
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
        {cards.map((card) => (
          <li key={card.label} className="border-2 rounded-md p-4 space-y-2">
            {isLoading || !card.value ? (
              <Skeleton className="h-6 w-16" />
            ) : (
              <p className="font-pally-medium text-[#281E17] text-base md:text-xl">
                {card.value}
              </p>
            )}
            <p className="font-pally-regular text-[#515A6A] text-base md:text-lg">
              {card.label}
            </p>
            {card.detail && (
              <p className="font-pally-regular text-xs md:text-sm text-[#828994]">
                {card.detail}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventTicketsStats;
