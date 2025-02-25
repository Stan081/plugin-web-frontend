import React from "react";
import organiserDashboardSalesData from "@/static-datas/organiser-dashboard-sales-data";

import Image from "next/image";
import TicketHistoryEmptyState from "./TicketHistoryEmptyState";
import OrganiserTable from "../../../OrganiserTable";
import { useGetEventBookingHistory } from "@/hooks/organiser/useBookingHistory";
import { useEventsContext } from "@/providers/events.provider";

const EventDetailTickets = () => {
    const { publishedEventId } = useEventsContext();
  const {data: bookingHistory} = useGetEventBookingHistory(publishedEventId);
  return (
    <div>
      <h2 className="font-pally-medium text-xl">Ticket Sales</h2>

      <div className="mt-6">
        <p className="font-pally-medium text-base text-[#332269]">
          SALES SUMMARY
        </p>
        
      </div>

      <div>
        <TicketHistoryEmptyState />
        {/* <OrganiserTable
          tableHead={["Ticket ID", "Ticket name", "Price", "Date"]}
          tableBody={organiserDashboardSalesData}
          type="organiserDashboardSales"
        /> */}
      </div>
    </div>
  );
};

export default EventDetailTickets;
