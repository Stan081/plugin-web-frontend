"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { HiOutlineMinus } from "react-icons/hi2";
import { HiPlus } from "react-icons/hi";
import { toFiat } from "@/lib/amount";
import ToolTipComponent from "@/components/ToolTipComponent";
import TicketPlacement from "./TicketPlacement";
import Cookies from "js-cookie";
import { useEventsContext } from "@/providers/events.provider";

const setCookie = (key: string, value: any, options = {}) => {
  try {
    Cookies.set(key, encodeURIComponent(JSON.stringify(value)), options);
  } catch (error) {
    console.error("Error setting cookie:", error);
  }
};

const GroupedTicket = ({ groupedTicket, id }) => {
  const [counter, setCounter] = useState(0);

  const { tickets, setTickets } = useEventsContext();

  // console.log(groupedTicket);

  // Update counter when tickets or ticket name changes
  useEffect(() => {
    const ticket = tickets.find((t) => t.name === groupedTicket.ticketName);
    setCounter(ticket ? ticket.quantity : 0);
  }, [tickets, groupedTicket.ticketName]);

  const getRemainingTicket =
    groupedTicket?.ticketQuantity - groupedTicket?.ticketsSold;

  const now = Date();

  // Update tickets array and persist to cookies
  const updateTickets = (
    ticketName: string,
    price: number,
    quantity: number,
    ticketId: string
  ) => {
    setTickets((prevTickets) => {
      const updatedTickets = [...prevTickets];
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
        updatedTickets.push({ name: ticketName, price, quantity, ticketId });
      }

      // Save updated tickets to cookies
      setCookie("tickets", updatedTickets, { expires: 7 });
      return updatedTickets;
    });
  };

  // Increment ticket quantity
  const incrementTicket = () => {
    const newQuantity = counter + 1;
    updateTickets(
      groupedTicket.ticketName,
      groupedTicket.ticketPrice,
      newQuantity,
      groupedTicket?._id
    );
  };

  // Decrement ticket quantity
  const decrementTicket = () => {
    const newQuantity = counter - 1;
    updateTickets(
      groupedTicket.ticketName,
      groupedTicket.ticketPrice,
      newQuantity,
      groupedTicket?._id
    );
  };

  const checkIfStartDateReached = (startDate: Date) => {
    if (startDate) {
      const date = new Date(startDate);

      // Validate startDate
      if (isNaN(date.getTime())) {
        console.error("Invalid startDate format.");
        return false;
      }

      // Get the current date and time
      const now = new Date();

      // Compare dates
      const isSameDay =
        now.getUTCFullYear() === date.getUTCFullYear() &&
        now.getUTCMonth() === date.getUTCMonth() &&
        now.getUTCDate() === date.getUTCDate();

      return isSameDay;
    }

    return false;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      month: "long",
      day: "numeric",
      timeZone: "Africa/Lagos",
    });
  };

  return (
    <div className="border border-[#CFD9E8] rounded-lg flex justify-between items-start">
      <div className="flex gap-2">
        <div
          style={{
            backgroundColor: groupedTicket?.color
              ? groupedTicket?.color
              : "#646267",
          }}
          className="w-6 lg:w-8 h-24 rounded-tl-lg rounded-bl-lg"
        ></div>
        <div className="p-2 flex flex-col gap-4 justify-between">
          <p className="text-[#646267] font-pally-medium">
            {groupedTicket?.ticketName}
          </p>

          <div className="flex items-center gap-4">
            <p className="text-[#2C2B2E] font-pally-medium text-2xl">
              {groupedTicket?.groupedTicketType === "paid"
                ? toFiat(groupedTicket?.ticketPrice)
                : toFiat(0)}
            </p>
            {groupedTicket?.ticketQuantity === groupedTicket?.ticketsSold ||
              (groupedTicket?.ticketsSold >= groupedTicket?.ticketQuantity && (
                <p className="bg-red-500 text-white py-0.5 px-1 rounded-3xl text-xs">
                  Sold out
                </p>
              ))}
            {new Date() < new Date(groupedTicket?.startDate) && (
              <p className="text-xs text-yellow-700 font-pally-regular">
                Available from {formatDate(groupedTicket?.startDate)}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="p-2 space-y-4 flex flex-col justify-between items-end">
        <div className="flex items-center gap-3">
          <button
            onClick={decrementTicket}
            className="border border-[#555A6E] text-[#555A6E] p-1 rounded-full cursor-pointer"
            disabled={counter === 0}
          >
            <HiOutlineMinus size={20} />
          </button>
          <p className="font-pally-medium text-lg">{counter}</p>
          <button
            onClick={incrementTicket}
            type="button"
            disabled={
              groupedTicket?.ticketsSold >= groupedTicket?.ticketQuantity ||
              groupedTicket.ticketSaleActive === false ||
              counter >= getRemainingTicket ||
              new Date() < new Date(groupedTicket?.startDate)
            }
            className={`${
              groupedTicket?.ticketsSold >= groupedTicket?.ticketQuantity ||
              groupedTicket.ticketSaleActive === false ||
              counter >= getRemainingTicket ||
              new Date() < new Date(groupedTicket?.startDate)
                ? `bg-gray-300 cursor-not-allowed`
                : `bg-destructive`
            } text-white rounded-full p-1`}
          >
            <HiPlus size={20} />
          </button>
        </div>
        <ToolTipComponent
          button={
            <p className="font-pally-regular text-sm destructive">Learn more</p>
          }
          content={
            <TicketPlacement
              color={groupedTicket?.color}
              seatmap={groupedTicket?.seatMap}
              text={groupedTicket?.ticketPeaks}
            />
          }
        />
      </div>
    </div>
  );
};

export default GroupedTicket;
