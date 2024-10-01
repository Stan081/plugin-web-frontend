import React, { FC } from "react";
import { IoTicketOutline } from "react-icons/io5";

const CreateTicketEmptyState: FC<{ open: () => void }> = ({ open }) => {
  return (
    <div className=" w-full max-w-72 mx-auto h-[50vh] lg:h-[82vh] justify-center p-6 flex flex-col gap-5 items-center">
      <div className="bg-[#FFF6F1] rounded-lg px-5 py-3 mx-auto">
        <IoTicketOutline size={38} color="#000" />
      </div>
      <div>
        <p className="font-pally-medium text-lg text-white text-center">
          Let’s create tickets
        </p>
        <p className="font-pally-regular text-sm text-white/60 text-center">
          Create a section if you want to sell multiple ticket that share the
          same inventory. i.e
        </p>
      </div>

      <button
        onClick={open}
        type="button"
        className="border border-dashed p-3 rounded-lg w-full hover:bg-[#423730]/50"
      >
        Add tickets
      </button>
    </div>
  );
};

export default CreateTicketEmptyState;
