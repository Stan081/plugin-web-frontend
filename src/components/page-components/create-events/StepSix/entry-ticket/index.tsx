import React, { useState } from "react";
import PaidTicketForm from "./PaidTicketForm";
import FreeTicketForm from "./FreeTicketForm";
import DonationTicketForm from "./DonationTicketForm";
import { useGetEvent } from "@/hooks/events/useGetEvent";

const entryTicketTypes: { id: string; name: string }[] = [
  {
    id: "paid",
    name: "Paid",
  },
  {
    id: "free",
    name: "Free",
  },
  {
    id: "donation",
    name: "Donation",
  },
];

const EntryTicket = () => {
  const { data: eventId } = useGetEvent();
  const [entryTicket, setEntryTicket] = useState<string>(
    eventId?.data?.entryTicket?.entryTicketType || "paid"
  );

  return (
    <div className=" w-full">
      <h3 className="font-pally-bold text-2xl">Entry Ticket</h3>

      <div className="flex flex-wrap items-end gap-3 mt-3">
        <p className="text-lg font-pally-regular">Specify your ticket type:</p>

        <div className="flex flex-wrap gap-4 text-white">
          {entryTicketTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setEntryTicket(type.id)}
              className={`py-1 lg:py-2 px-2 lg:px-3 text-sm lg:text-base rounded-full border ${
                entryTicket === type.id ? "bg-white text-black" : "border-white"
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {entryTicket === "paid" ? (
          <PaidTicketForm entryTicket={entryTicket} />
        ) : entryTicket === "free" ? (
          <FreeTicketForm entryTicket={entryTicket} />
        ) : (
          <DonationTicketForm entryTicket={entryTicket} />
        )}
      </div>
    </div>
  );
};

export default EntryTicket;
