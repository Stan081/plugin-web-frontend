import { toFiat } from "@/lib/amount";
import { VendorType } from "@/lib/types/EventType";
import { VendorListType } from "@/static-datas/create-event";
import React from "react";
import { HiOutlineTrash } from "react-icons/hi2";

interface VendorCardProps extends VendorType {
  handleEditForm: (id: number) => void;
  handleDelete: (id: number) => void;
  _id: number;
}

const VendorCard: React.FC<VendorCardProps> = ({
  _id,
  slots,
  price,
  isPass,
  vendorTag,
  handleEditForm,
  handleDelete,
}) => {
 
  return (
    <div className="flex">
      <div className="h-auto w-2 bg-[#F58B86]" />
      <div className="p-2 md:p-4 bg-[#FDE5E3] w-full rounded-tr-lg rounded-br-lg space-y-4">
        <div className="flex justify-between items-center gap-5">
          <div>
            <p className="font-pally-medium text-sm text-[#667185]">
              {isPass ? "Single Pass" : "Shared Pass"}
            </p>
            <p className="font-pally-medium md:text-lg text-[#475367]">
              {vendorTag}
            </p>
          </div>

          <p className="text-[#475367] font-pally-medium text-base lg:text-xl">
            {toFiat(price)}{" "}
            <span className="font-pally-regular text-base">per pass</span>
          </p>
        </div>
        <div className="flex justify-between items-center gap-5">
          <p className="border border-[#344054] rounded-2xl px-2 py-1 font-pally-regular text-[#344054]">
            {slots} Slot created
          </p>
          <div className="flex ju gap-4">
            <div onClick={() => handleEditForm(_id)} className="cursor-pointer">
              <p className="font-pally-regular text-sm underline destructive">
                Edit Pass
              </p>
            </div>
            <div onClick={() => handleDelete(_id)} className="cursor-pointer bg-black/70 rounded p-1">
              <HiOutlineTrash size={16} className="text-white hover:text-red-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;
