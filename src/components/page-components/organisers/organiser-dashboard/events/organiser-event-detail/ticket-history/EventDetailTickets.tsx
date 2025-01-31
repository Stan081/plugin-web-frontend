import React from "react";
import ticket from "../../../../../../../../public/images/ticket.png";
import organiserDashboardSalesData from "@/static-datas/organiser-dashboard-sales-data";

import Image from "next/image";
import TicketHistoryEmptyState from "./TicketHistoryEmptyState";
import OrganiserTable from "../../../OrganiserTable";

const EventDetailTickets = () => {
  return (
    <div>
      <h2 className="font-pally-medium text-xl">Ticket Sales</h2>

      <div className="mt-6">
        <p className="font-pally-medium text-base text-[#332269]">
          SALES SUMMARY
        </p>
        <div className="mt-3 w-full max-w-md p-4 border border-[#1019280D] rounded-lg flex items-center gap-5">
          <figure className="relative size-8">
            <Image
              fill={true}
              src={ticket}
              alt="Ticket"
              className="object-contain"
            />
          </figure>
          <div>
            <p className="font-pally-medium text-base text-[#101928]">
              Individual Package
            </p>
            <p className="font-pally-regular text-sm text-[#667185]">
              4,000/10,000
            </p>
          </div>
        </div>
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
