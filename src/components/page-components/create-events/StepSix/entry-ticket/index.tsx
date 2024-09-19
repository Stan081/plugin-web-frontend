import React, { FC, useState } from "react";
import PaidTicketForm from "./PaidTicketForm";
import { StepsProps } from "@/pages/create-event";
import FreeTicketForm from "./FreeTicketForm";

interface EntryTicketProps extends StepsProps {
  selectTicket: string;
}

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

const EntryTicket: FC<EntryTicketProps> = ({
  next,
  previous,
  selectTicket,
}) => {
  const [entryTicket, setEntryTicket] = useState<string>("paid");

  return (
    <div>
      <h3 className="font-pally-bold text-2xl">Entry Ticket</h3>

      <div className="flex items-end gap-3">
        <p className="text-lg font-pally-regular">Specify your ticket type:</p>

        <div className="flex flex-wrap gap-4 mt-5 text-white">
          {entryTicketTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setEntryTicket(type.id)}
              className={`py-1.5 px-3 rounded-full border ${
                entryTicket === type.id ? "bg-white text-black" : "border-white"
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-pally-medium md:text-lg">
          Choose the category that best describes your event
        </h4>

        {entryTicket === "paid" ? (
          <PaidTicketForm
            next={next}
            previous={previous}
            selectTicket={selectTicket}
          />
        ) : entryTicket === "free" ? (
          <FreeTicketForm
            next={next}
            previous={previous}
            selectTicket={selectTicket}
          />
        ) : (
          <div>Donation</div>
        )}
      </div>
    </div>
  );
};

export default EntryTicket;
