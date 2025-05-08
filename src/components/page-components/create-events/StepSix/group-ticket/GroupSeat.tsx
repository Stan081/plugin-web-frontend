import React, { FC, useState } from "react";
import PaidGroupSeatsForm from "./PaidGroupSeatsForm";
import { SeatSectionListsType } from "@/static-datas/create-event";
import FreeGroupSeatsForm from "./FreeGroupSeatsForm";
import { useCreateEventContext } from "@/providers/create_event.provider";
import { useGetEvent } from "@/hooks/events/useGetEvent";

export interface GroupSeatProps {
  handleReturnToList: () => void;
}

const GroupSeat: FC<GroupSeatProps> = ({ handleReturnToList }) => {
  const { seatType, handleClick } = useCreateEventContext();
  const { data: eventId } = useGetEvent();

  const getGroupTicketTypes = (): { id: string; name: string }[] => {
    switch (eventId?.data) {
      case "free":
        return [
          {
            id: "free",
            name: "Free Ticket",
          },
        ];
      case "paid":
        return [
          {
            id: "paid",
            name: "Paid Ticket",
          },
        ];
      default:
        return [
          { id: "paid", name: "Paid Ticket" },
          { id: "free", name: "Free Ticket" },
        ];
    }
  };

  // Usage:
  const groupTicketTypes = getGroupTicketTypes();
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-start md:items-end gap-5 mb-6">
        <h3 className="font-pally-medium md:text-xl">
          Specify your ticket type
        </h3>

        <div className="flex flex-wrap gap-4">
          {groupTicketTypes?.map((seat) => (
            <button
              key={seat.id}
              onClick={() => handleClick(seat.id)}
              className={`py-2 px-4 rounded-full border ${
                seatType === seat.id ? "bg-white text-black" : "border-white"
              }`}
            >
              {seat.name}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6">
        {seatType === "paid" ? (
          <PaidGroupSeatsForm handleReturnToList={handleReturnToList} />
        ) : (
          <FreeGroupSeatsForm handleReturnToList={handleReturnToList} />
        )}
      </div>
    </div>
  );
};

export default GroupSeat;
