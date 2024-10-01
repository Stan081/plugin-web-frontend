import { InviteeDataProps } from "@/providers/create_event.provider";
import React, { FC } from "react";
import { FiEdit } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi2";

interface InviteeCardProps extends InviteeDataProps {}

const InviteeCard: FC<InviteeCardProps> = ({fullName, phoneNumber, passcode}) => {
  return (
    <div className="bg-[#2F231B] rounded-xl p-3 w-full max-w-sm space-y-5">
      <div className="flex justify-between items-center">
        <p className="font-pally-regular">Invitee</p>

        <div className="text-center text-white mt-4 flex gap-4">
          <button
            type="button"
            // onClick={handleEditClick}
            className="p-1.5 rounded-md"
          >
            <FiEdit size={18} color="#F9B6B1" />
          </button>
          <button
            type="button"
            // onClick={handleImageDelete}
            className="p-1.5 rounded-md"
          >
            <HiOutlineTrash size={18} color="#F9B6B1" />
          </button>
        </div>
      </div>
      <div className="border border-gray-600 w-full" />

      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <p className="font-pally-medium">{fullName}</p>
          <p className="font-pally-regular text-sm">{phoneNumber}</p>
        </div>

        <p className="font-pally-regular rounded-xl bg-[#E7F6EC] text-[#40B869] p-1.5">
          code: {passcode}
        </p>
      </div>
    </div>
  );
};

export default InviteeCard;
