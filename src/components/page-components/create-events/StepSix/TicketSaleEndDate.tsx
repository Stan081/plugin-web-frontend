import React, { FC, useState } from "react";
import { useSetTicketSaleWindow } from "@/hooks/events/useSetTicketSaleWindow";

interface TicketSaleEndDateProps {
  ticketId: string;
  closesAt?: string | Date | null;
  eventId?: string;
  // Sales have closed: the action reads "Reopen sales".
  ended?: boolean;
  className?: string;
}

// "YYYY-MM-DDTHH:mm" in Lagos time, for a datetime-local input.
const toLagosInput = (value?: string | Date | null) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return new Date(d.getTime() + 60 * 60 * 1000).toISOString().slice(0, 16);
};
const fromLagosInput = (value: string) =>
  new Date(`${value}:00+01:00`).toISOString();

/**
 * Change when sales of one ticket type close. Allowed on published and live
 * events, so a ticket type whose sales have ended can be reopened for more
 * buyers (or closed early). Price and quantity stay as they are.
 */
const TicketSaleEndDate: FC<TicketSaleEndDateProps> = ({
  ticketId,
  closesAt,
  eventId,
  ended,
  className = "",
}) => {
  const { mutate, isPending } = useSetTicketSaleWindow(eventId);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("");

  const open = () => {
    // Reopening: start from now + 1 day rather than the past close date.
    const start =
      ended || !closesAt ? new Date(Date.now() + 24 * 60 * 60 * 1000) : closesAt;
    setValue(toLagosInput(start));
    setEditing(true);
  };

  if (!editing) {
    return (
      <button
        type="button"
        onClick={open}
        className={`text-sm font-pally-regular underline ${className}`}
      >
        {ended ? "Reopen sales" : "Change end date"}
      </button>
    );
  }

  const save = () => {
    if (!value) return;
    mutate(
      { ticketId, saleClosesAt: fromLagosInput(value) },
      { onSuccess: () => setEditing(false) }
    );
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <label className="text-xs font-pally-regular">
        Sales close (Lagos time)
        <input
          type="datetime-local"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="block mt-1 rounded border px-2 py-1 text-black text-sm"
        />
      </label>
      <button
        type="button"
        disabled={isPending || !value}
        onClick={save}
        className="text-sm font-pally-regular underline disabled:opacity-50"
      >
        {isPending ? "Saving…" : "Save"}
      </button>
      <button
        type="button"
        disabled={isPending}
        onClick={() => setEditing(false)}
        className="text-sm font-pally-regular underline disabled:opacity-50"
      >
        Cancel
      </button>
    </div>
  );
};

export default TicketSaleEndDate;
