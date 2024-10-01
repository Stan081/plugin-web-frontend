import { GuestListType } from "@/static-datas/create-event";
import Image from "next/image";
import React from "react";

interface GuestsComponentProps extends GuestListType {
  handleEditGuest: (id: string) => void;
}

const GuestsComponent: React.FC<GuestsComponentProps> = ({
  id,
  guestName,
  role,
  image,
  handleEditGuest,
}) => {
  return (
    <div className="rounded-lg p-4 border border-[#423730] flex items-center justify-between">
      <div className="flex items-center gap-5">
        {image && (
          <Image
            src={image}
            alt={guestName}
            width={51}
            height={50}
            className="pointer-events-none object-cover w-16 h-16 rounded-lg"
          />
        )}
        <div className="space-y-1.5">
          <p className="font-pally-regular text-lg">{guestName}</p>
          <p className="font-pally-regular text-sm text-white/70">{role}</p>
        </div>
      </div>
      <div onClick={() => handleEditGuest(id)} className="cursor-pointer">
        <p className="font-pally-regular text-[#F9B6B1] text-sm underline">
          Edit Details
        </p>
      </div>
    </div>
  );
};

export default GuestsComponent;
