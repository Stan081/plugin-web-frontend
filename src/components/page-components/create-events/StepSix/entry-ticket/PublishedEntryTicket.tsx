import React, { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toFiat } from "@/lib/amount";
import { useCreateEventContext } from "@/providers/create_event.provider";
import GroupSeat from "../group-ticket/GroupSeat";
import TicketSaleToggle from "../TicketSaleToggle";

type EntryTicketData = {
  _id?: string;
  ticketName?: string;
  entryTicketType?: "paid" | "free" | "donation";
  ticketPrice?: number;
  ticketQuantity?: number;
  startDate?: string;
  endDate?: string;
  ticketSaleActive?: boolean;
};

const when = (value?: string) =>
  value
    ? new Date(value).toLocaleString("en-GB", {
        timeZone: "Africa/Lagos",
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

/**
 * The entry ticket of a published event: read-only (buyers paid for it as it
 * is), with a switch to stop or resume its sales and a way to add more ticket
 * types. Adding one turns the event into a grouped-ticket event on the API,
 * keeping this ticket as the first type; the step then shows the grouped list.
 */
const PublishedEntryTicket: FC<{ ticket: EntryTicketData }> = ({ ticket }) => {
  const { nextStep, previousStep } = useCreateEventContext();
  const [adding, setAdding] = useState(false);
  const onSale = ticket?.ticketSaleActive !== false;
  const isDonation = ticket?.entryTicketType === "donation";

  if (adding) {
    return <GroupSeat handleReturnToList={() => setAdding(false)} />;
  }

  return (
    <div className="flex flex-col justify-between gap-4 w-full lg:h-[82vh]">
      <div className="my-3 flex flex-col gap-4 w-full">
        <p className="text-sm font-pally-regular text-white/80">
          This event is published, so its existing ticket can&apos;t be
          changed. You can add new ticket types, or stop sales of this one.
        </p>

        <div className="bg-[#fae4e2] rounded-lg p-3 lg:p-5 text-black">
          <div className="flex justify-between gap-4">
            <p className="font-pally-medium md:text-lg">{ticket?.ticketName}</p>
            <p className="font-pally-medium md:text-lg">
              {ticket?.entryTicketType === "free"
                ? "Free ticket"
                : isDonation
                  ? "Donation"
                  : toFiat(ticket?.ticketPrice ?? 0)}
            </p>
          </div>
          <p className="mt-2 text-sm font-pally-regular">
            {ticket?.ticketQuantity} available · sales {when(ticket?.startDate)}{" "}
            to {when(ticket?.endDate)}
          </p>
          <div className="mt-4 flex justify-end items-center gap-4">
            <p className="text-xs font-pally-regular">
              {onSale ? "On sale" : "Sales stopped"}
            </p>
            {ticket?._id && (
              <TicketSaleToggle ticketId={String(ticket._id)} onSale={onSale} />
            )}
          </div>
        </div>

        {isDonation ? (
          <p className="text-sm font-pally-regular text-white/70">
            Donation tickets can&apos;t be combined with other ticket types.
          </p>
        ) : (
          <button
            onClick={() => setAdding(true)}
            type="button"
            className="border border-dashed p-3 rounded-lg w-full hover:bg-[#423730]/50"
          >
            Add a new ticket type
          </button>
        )}
      </div>

      <div className="sticky bottom-0 bg-[#281E17]">
        <Separator />
        <div className="py-5 flex justify-end items-center gap-8">
          <Button
            onClick={previousStep}
            className="cursor-pointer hover:outline hover:outline-white/50 p-2 rounded-lg"
          >
            Back
          </Button>
          <Button onClick={nextStep} variant="destructive">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PublishedEntryTicket;
