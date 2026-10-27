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
