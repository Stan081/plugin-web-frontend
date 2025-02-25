import React from "react";

import Image from "next/image";
import TicketHistoryEmptyState from "./TicketHistoryEmptyState";
import OrganiserTable from "../../../OrganiserTable";
import { useGetEventBookingHistory } from "@/hooks/organiser/useBookingHistory";
import { useEventsContext } from "@/providers/events.provider";

const EventDetailTickets = () => {
  const { publishedEventId } = useEventsContext();
  const { data: bookingHistory } = useGetEventBookingHistory(publishedEventId);
  return (
    <div>
      <h2 className="font-pally-medium text-xl">Booking History</h2>

      <div className="mt-6 mb-3">
        <p className="font-pally-medium text-base text-[#332269]">
          SALES SUMMARY
        </p>
      </div>

      <div>
        {bookingHistory?.data?.length === 0 ? (
          <TicketHistoryEmptyState />
        ) : (
          <OrganiserTable
            tableHead={[
              "Email",
              "Payment Status",
              "PayStack Reference",
              "Date",
            ]}
            tableBody={bookingHistory?.data}
            type="organiserDashboardSales"
          />
        )}
      </div>
    </div>
  );
};

export default EventDetailTickets;
