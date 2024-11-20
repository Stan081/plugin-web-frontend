"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { HiOutlineMinus } from "react-icons/hi2";
import { HiPlus } from "react-icons/hi";
import { toFiat } from "@/lib/amount";
import ToolTipComponent from "@/components/ToolTipComponent";
import TicketPlacement from "./TicketPlacement";
import Cookies from "js-cookie";

export const getCookie = (key: string) => {
  const cookie = Cookies.get(key);
  try {
    return cookie ? JSON.parse(decodeURIComponent(cookie)) : null;
  } catch (error) {
    console.error("Error parsing cookie:", error);
    return null; // Return null if cookie is invalid
  }
};

export const setCookie = (key: string, value: any, options = {}) => {
  try {
    Cookies.set(key, encodeURIComponent(JSON.stringify(value)), options);
  } catch (error) {
    console.error("Error setting cookie:", error);
  }
};

const GroupedTicket = ({ groupedTicket, id }) => {
  const [counter, setCounter] = useState(0);

  const [tickets, setTickets] = useState(() => {
    const savedTickets = getCookie("tickets");
    return Array.isArray(savedTickets) ? savedTickets : [];
  });

  useEffect(() => {
    console.log("Tickets updated:", tickets);
    console.log("Counter updated:", counter);
  }, [tickets, counter]);

  useEffect(() => {
    const ticket = tickets.find((t) => t.name === groupedTicket.ticketName);
    setCounter(ticket ? ticket.quantity : 0);
  }, [groupedTicket.ticketName, tickets]);

  const updateTickets = (ticketName, price, quantity) => {
    const updatedTickets = [...tickets];
    const ticketIndex = updatedTickets.findIndex(
      (ticket) => ticket.name === ticketName
    );

    if (ticketIndex > -1) {
      if (quantity > 0) {
        updatedTickets[ticketIndex].quantity = quantity;
      } else {
        updatedTickets.splice(ticketIndex, 1);
      }
    } else if (quantity > 0) {
      updatedTickets.push({ name: ticketName, price, quantity });
    }

    setTickets(updatedTickets);
    setCookie("tickets", updatedTickets, { expires: 7 });
  };

  const incrementTicket = (ticketName, price) => {
    const ticket = tickets.find((t) => t.name === ticketName);
    const newQuantity = ticket ? ticket.quantity + 1 : 1;
    updateTickets(ticketName, price, newQuantity);
  };

  const decrementTicket = (ticketName, price) => {
    const ticket = tickets.find((t) => t.name === ticketName);
    if (ticket) {
      const newQuantity = ticket.quantity - 1;
      updateTickets(ticketName, price, newQuantity);
    }
  };

  return (
    <div className="border border-[#CFD9E8] rounded-lg flex justify-between items-start">
      <div className="flex gap-2">
        <div className="w-16 lg:w-28 h-24">
          <Image
            src={groupedTicket?.seatMap || "/images/seagreen-bg.png"}
            width={456}
            height={280}
            alt={groupedTicket?.ticketName}
            className="pointer-events-none w-full h-full object-cover rounded-tl-lg rounded-bl-lg"
          />
        </div>
        <div className="p-2 flex flex-col gap-4 justify-between">
          <p className="text-[#646267] font-pally-medium">
            {groupedTicket?.ticketName}
          </p>
          <p className="text-[#2C2B2E] font-pally-bold text-2xl">
            {groupedTicket?.groupedTicketType === "paid"
              ? toFiat(groupedTicket?.ticketPrice)
              : toFiat(0)}
          </p>
        </div>
      </div>
      <div className="p-2 space-y-4 flex flex-col justify-between items-end">
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              decrementTicket(
                groupedTicket?.ticketName,
                groupedTicket?.ticketPrice || 0
              )
            }
            className="border border-[#555A6E] text-[#555A6E] p-1 rounded-full cursor-pointer"
            disabled={counter === 0}
          >
            <HiOutlineMinus size={20} />
          </button>
          <p className="font-pally-medium text-lg">{counter}</p>
          <button
            onClick={() =>
              incrementTicket(
                groupedTicket?.ticketName,
                groupedTicket?.ticketPrice || 0
              )
            }
            className="bg-destructive text-white p-1 rounded-full cursor-pointer"
          >
            <HiPlus size={20} />
          </button>
        </div>
        <ToolTipComponent
          button={
            <p className="font-pally-regular text-sm destructive">Learn more</p>
          }
          content={<TicketPlacement text={groupedTicket?.ticketPeaks} />}
        />
      </div>
    </div>
  );
};

export default GroupedTicket;
