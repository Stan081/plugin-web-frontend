import React from "react";

const green = "bg-[#E7F6EC] border-[#0F973D] text-[#0F973D]";
const amber = "bg-[#FEF6E7] border-[#DD900D] text-[#DD900D]";
const grey = "bg-[#F2F2F7] border-[#828994] text-[#515A6A]";
const red = "bg-[#FBEAE9] border-[#D42620] text-[#D42620]";

// Covers ticket statuses (attendee list) and booking payment statuses (sales).
// Anything that wasn't "pending" used to be shown as "confirmed", including
// failed payments and refunded tickets.
const LABELS: Record<string, { text: string; className: string }> = {
  checked_in: { text: "checked in", className: green },
  confirmed: { text: "confirmed", className: green },
  complimentary: { text: "free", className: green },
  pending: { text: "pending", className: amber },
  failed: { text: "failed", className: red },
  refunded: { text: "refunded", className: grey },
};

const AttendeeListTableStatusLabel = ({
  status,
  checkedIn,
}: {
  status: string;
  checkedIn?: boolean;
}) => {
  const label = LABELS[checkedIn ? "checked_in" : status] ?? {
    text: status,
    className: grey,
  };
  return (
    <div className="flex">
      <p
        className={`${label.className} border-2 py-0.5 px-2 leading-none rounded-3xl text-sm whitespace-nowrap`}
      >
        {label.text}
      </p>
    </div>
  );
};
export default AttendeeListTableStatusLabel;
