import React from "react";
import OrderSummary from "./OrderSummary";
import TicketVoucher from "./TicketVoucher";

export type TicketDataProps = {
  price?: number;
  name?: string;
};

export type TicketType = {
  _id: string;
  eventId: string;
  ticketData: TicketDataProps;
  createdAt: string;
  qrCode: string;
};

export type UserType = {
  email?: string;
  name: { firstname: string; lastname: string };
};

interface Props {
  tickets: any;
  eventName: string;
  user?: UserType;
  address: string;
  startDate:string
}
const TicketSummary = ({ tickets, user, eventName, address, startDate}: Props) => {
 
  // console.log(tickets);
  return (
    <div className="w-auto">
      <h4 className="font-pally-medium text-lg md:text-xl text-[#1A1B25]">
        Order Summary
      </h4>

      <OrderSummary data={tickets?.tickets} user={user} eventName={eventName} address={address} startDate={startDate} />

      <h4 className="mt-8 font-pally-medium text-lg md:text-xl text-[#1A1B25]">
        Your Tickets
      </h4>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {tickets?.tickets?.map((item) => (
          <TicketVoucher data={item} key={item?._id} />
        ))}
      </div>
    </div>
  );
};

export default TicketSummary;
