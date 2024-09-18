import React from "react";
import { LuCalendarDays } from "react-icons/lu";

const AgendaEmptyState: React.FC<{ open: () => void }> = ({ open }) => {
  return (
    <div className=" w-full max-w-72 mx-auto p-6 my-5 flex flex-col gap-5 items-center">
      <div className="bg-[#FFF6F1] rounded-lg px-5 py-3 mx-auto">
        <LuCalendarDays size={38} color="#000" />
      </div>
      <p className="font-pally-regular text-sm text-white/60 text-center">
      You have no Agenda slot for this event 
      </p>

      <button
        onClick={open}
        type="button"
        className="border border-dashed p-3 rounded-lg w-full hover:bg-[#423730]/50"
      >
        Add Slot
      </button>
    </div>
  );
};

export default AgendaEmptyState;
