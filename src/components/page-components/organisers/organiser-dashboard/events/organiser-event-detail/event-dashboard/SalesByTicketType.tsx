"use client";
import { useGetEventLiveStats } from "@/hooks/organiser/useGetEventLiveStats";
import { toFiat } from "@/lib/amount";
import { useEventsContext } from "@/providers/events.provider";
import React from "react";

const Bar = ({ value, color }: { value: number; color: string }) => (
  <div className="h-1.5 w-full rounded-full bg-gray-100">
    <div
      className="h-1.5 rounded-full"
      style={{ width: `${Math.min(100, value)}%`, backgroundColor: color }}
    />
  </div>
);

const when = (value?: string | null) =>
  value
    ? new Date(value).toLocaleString("en-GB", {
        timeZone: "Africa/Lagos",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

// Whether each ticket type is on sale, from its own sale window.
const saleLabel = (t: {
  saleState?: string;
  saleOpensAt?: string | null;
  saleClosesAt?: string | null;
}) => {
  switch (t.saleState) {
    case "on_sale":
      return t.saleClosesAt ? `On sale until ${when(t.saleClosesAt)}` : "On sale";
    case "not_started":
      return `Opens ${when(t.saleOpensAt)}`;
    case "sold_out":
      return "Sold out";
    case "paused":
      return "Sales paused";
    case "ended":
      return "Sales ended";
    default:
      return "";
  }
};

// Sold, checked in and sales per ticket type, from the live stats endpoint.
const SalesByTicketType = () => {
  const { publishedEventId } = useEventsContext();
  const { data } = useGetEventLiveStats(publishedEventId);
  const types = data?.data?.ticketTypes ?? [];

  if (!types.length) {
    return (
      <p className="font-pally-regular text-[#828994] py-6">
        No ticket types yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto border rounded-xl">
      <table className="w-full font-pally-regular text-sm md:text-base">
        <thead className="bg-[#F9FAFB] text-left text-[#515A6A]">
          <tr>
            <th className="px-4 py-3">Ticket</th>
            <th className="px-4 py-3 min-w-[150px]">Sold</th>
            <th className="px-4 py-3 min-w-[150px]">Checked in</th>
            <th className="px-4 py-3">Sales</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {types.map((t) => (
            <tr key={t.name}>
              <td className="px-4 py-3 text-[#281E17]">
                {t.name}
                <span className="block text-xs text-[#828994]">
                  {t.price ? toFiat(t.price) : "Free"}
                </span>
                {saleLabel(t) && (
                  <span className="block text-xs text-[#515A6A]">
                    {saleLabel(t)}
                  </span>
                )}
              </td>
              <td className="px-4 py-3">
                <p className="mb-1">
                  {t.sold} / {t.capacity}
                </p>
                <Bar value={t.soldRate} color="#D9302A" />
              </td>
              <td className="px-4 py-3">
                <p className="mb-1">
                  {t.checkedIn}{" "}
                  <span className="text-xs text-[#828994]">({t.checkInRate}%)</span>
                </p>
                <Bar value={t.checkInRate} color="#16A34A" />
              </td>
              <td className="px-4 py-3 text-[#281E17]">{toFiat(t.grossSales)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesByTicketType;
