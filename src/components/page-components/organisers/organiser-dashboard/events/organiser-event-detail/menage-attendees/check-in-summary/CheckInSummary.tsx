import React from "react";
import CheckInSummaryTicketSalesStat from "./CheckInSummaryTicketSalesStat";
import CheckInSummaryTicketTypeStat from "./CheckInSummaryTicketTypeStat";
import CheckInSummaryTicketDistributionStat from "./CheckInSummaryTicketDistributionStat";

const CheckInSummary = () => {
  return (
    <div className="space-y-5">
      <CheckInSummaryTicketSalesStat />
      <div className="flex gap-5">
        <CheckInSummaryTicketTypeStat />
        <CheckInSummaryTicketDistributionStat />
      </div>
    </div>
  );
};

export default CheckInSummary;
