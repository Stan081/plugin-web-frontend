import React from "react";
import { LuClipboardList } from "react-icons/lu";

const GuestEmptyState: React.FC<{open: () => void}> = ({open}) => {
  return (
    <div className="border border-[#423730] rounded-xl w-full max-w-sm mx-auto p-6 my-5 space-y-5">
      <div className="flex gap-4">
        <div className="bg-[#FFF6F1] rounded-lg px-5 py-3">
          <LuClipboardList size={30} color="#000" />
        </div>
        <div className="space-y-0.5">
          <p className="font-pally-medium">Create a guest list </p>
          <p className="font-pally-regular text-sm text-white/60">
            Add a guest list to your event for more controlled access
          </p>
        </div>
      </div>

      <button
        onClick={open}
        type="button"
        className="border border-dashed p-3 rounded-lg w-full hover:bg-[#423730]/50"
      >
        New Guest
      </button>
    </div>
  );
};

export default GuestEmptyState;
