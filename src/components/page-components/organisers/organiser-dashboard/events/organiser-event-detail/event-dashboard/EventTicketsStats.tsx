"use client";
import { useGetSalesRecord } from "@/hooks/organiser/useGetSalesRecord";
import { useEventsContext } from "@/providers/events.provider";
import React from "react";

const EventTicketsStats = () => {
  const { publishedEventId } = useEventsContext();
  const { data: sales, isLoading } = useGetSalesRecord(publishedEventId);

  const totalSold = sales?.data?.reduce((acc, item) => acc + item?.sold, 0);
  const totalAvailable = sales?.data?.reduce(
    (acc, item) => acc + item?.total,
    0
  );
  return (
    <ul className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      <li className="border-2 rounded-md p-4 space-y-2">
        <p className="font-pally-medium text-[#281E17] text-base md:text-xl">
          {totalSold}{" "}
          <span className="font-pally-regular text-sm md:text-base">
            / {totalAvailable}
          </span>
        </p>
        <p className="font-pally-regular text-[#515A6A] text-base md:text-lg">
          Tickets sold
        </p>
      </li>
      <li className="border-2 rounded-md p-4 space-y-2">
        <p className="font-pally-medium text-[#281E17] text-base md:text-xl">
          N24.4k
        </p>
        <p className="font-pally-regular text-[#515A6A] text-base md:text-lg">
          Net Sale
        </p>
      </li>
      <li className="border-2 rounded-md p-4 space-y-2">
        <p className="font-pally-medium text-[#281E17] text-base md:text-xl">
          N24.4k
        </p>
        <p className="font-pally-regular text-[#515A6A] text-base md:text-lg">
          Sale Profits
        </p>
      </li>
      <li className="border-2 rounded-md p-4 space-y-2">
        <p className="font-pally-medium text-[#281E17] text-base md:text-xl">
          4.4k
        </p>
        <p className="font-pally-regular text-[#515A6A] text-base md:text-lg">
          Attendees
        </p>
      </li>
    </ul>
  );
};

export default EventTicketsStats;
