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
  tickets: TicketType[];
  createdAt?: string;
  user?: UserType;
}
const TicketSummary = ({ tickets, createdAt, user }: Props) => {
  return (
    <div className="w-auto">
      <h4 className="font-pally-medium text-lg md:text-xl text-[#1A1B25]">
        Order Summary
      </h4>

      <OrderSummary data={tickets} createdAt={createdAt} user={user} />

      <h4 className="mt-8 font-pally-medium text-lg md:text-xl text-[#1A1B25]">
        Your Tickets
      </h4>
      {tickets?.map((item) => (
        <TicketVoucher data={item} key={item?._id} />
      ))}
    </div>
  );
};

export default TicketSummary;
