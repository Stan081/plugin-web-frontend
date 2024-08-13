import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toFiat } from "@/lib/amount";
import React from "react";
import OrderSummary from "./OrderSummary";
import TicketVoucher from "./TicketVoucher";

const TicketSummary = () => {
  return (
    <div className="w-auto">
      <h4 className="font-pally-medium text-lg md:text-xl text-[#1A1B25]">
        Order Summary
      </h4>

      <OrderSummary />

      <h4 className="mt-8 font-pally-medium text-lg md:text-xl text-[#1A1B25]">
        Your Tickets
      </h4>

      <TicketVoucher/>
      <TicketVoucher/>
    </div>
  );
};

export default TicketSummary;
