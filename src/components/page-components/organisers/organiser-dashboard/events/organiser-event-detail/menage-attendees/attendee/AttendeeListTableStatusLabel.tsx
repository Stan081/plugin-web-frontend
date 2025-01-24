import React from "react";

const AttendeeListTableStatusLabel = ({
  status,
}: {
  status: "pending" | "checked-in";
}) => {
  const pendingClass = "bg-[#FEF6E7] border-[#DD900D] text-[#DD900D]";
  const checkedInClass = "bg-[#E7F6EC] border-[#0F973D] text-[#0F973D]";
  return (
    <div className="flex">
      <p
        className={`${
          status === "pending" ? pendingClass : checkedInClass
        } border-2 py-0.5 px-2 leading-none rounded-3xl text-sm`}
      >
        {`${status === "pending" ? "pending" : "checked-in"}`}
      </p>
    </div>
  );
};
export default AttendeeListTableStatusLabel;
