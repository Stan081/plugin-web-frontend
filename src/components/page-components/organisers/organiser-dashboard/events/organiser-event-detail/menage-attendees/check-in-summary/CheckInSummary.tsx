import React from "react";
import CheckInSummaryTicketSalesStat from "./CheckInSummaryTicketSalesStat";
import CheckInSummaryTicketTypeStat from "./CheckInSummaryTicketTypeStat";
import CheckInSummaryTicketDistributionStat from "./CheckInSummaryTicketDistributionStat";

const CheckInSummary = () => {
  return (
    <div className="space-y-5">
      <CheckInSummaryTicketSalesStat />
      <div className="flex flex-col lg:flex-row justify-center gap-5 w-full">
        <CheckInSummaryTicketTypeStat />
        <CheckInSummaryTicketDistributionStat />
      </div>
    </div>
  );
};

export default CheckInSummary;
