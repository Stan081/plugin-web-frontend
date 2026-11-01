import React, { FC } from "react";
import { useSetTicketSale } from "@/hooks/events/useSetTicketSale";

interface TicketSaleToggleProps {
  ticketId: string;
  onSale: boolean;
  eventId?: string;
  className?: string;
}

// "Stop sales" / "Resume sales" for one ticket type.
const TicketSaleToggle: FC<TicketSaleToggleProps> = ({
  ticketId,
  onSale,
  eventId,
  className = "",
}) => {
  const { mutate, isPending } = useSetTicketSale(eventId);

  const onClick = () => {
    if (
      onSale &&
      !window.confirm(
        "Stop selling this ticket type? Tickets already sold stay valid. You can resume sales later."
      )
    )
      return;
    mutate({ ticketId, active: !onSale });
  };

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={onClick}
      className={`text-sm font-pally-regular underline disabled:opacity-50 ${className}`}
    >
      {isPending ? "Saving…" : onSale ? "Stop sales" : "Resume sales"}
    </button>
  );
};

export default TicketSaleToggle;
