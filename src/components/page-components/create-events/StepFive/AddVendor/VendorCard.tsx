import { toFiat } from "@/lib/amount";
import { VendorListType } from "@/static-datas/create-event";
import React from "react";

interface VendorCardProps extends VendorListType {
  handleEditForm: (id: string) => void;
}

const VendorCard: React.FC<VendorCardProps> = ({
  id,
  slot,
  passTag,
  passCategories,
  pricePass,
  handleEditForm,
}) => {
  return (
    <div className="flex">
      <div className="h-auto w-2 bg-[#F58B86]" />
      <div className="p-1 md:p-4 bg-[#FDE5E3] w-full rounded-tr-lg rounded-br-lg space-y-4">
        <div className="flex justify-between items-center gap-5">
          <div>
            <p className="font-pally-medium text-sm text-[#667185]">
              {slot} <span className="font-pally-regular">Slots created</span>
            </p>
            <p className="font-pally-medium md:text-lg text-[#475367]">
              {passTag}
            </p>
          </div>

          <p className="text-[#475367] font-pally-medium text-xl">
            {toFiat(pricePass)}{" "}
            <span className="font-pally-regular text-base">per pass</span>
          </p>
        </div>
        <div className="flex justify-between gap-5">
          <div className="flex flex-wrap gap-3">
            {passCategories.map((cat, index) => (
              <p
                key={index}
                className="border border-[#344054] rounded-2xl px-2 py-1 font-pally-regular text-[#344054]"
              >
                {cat}
              </p>
            ))}
          </div>
          <div onClick={() => handleEditForm(id)} className="cursor-pointer">
            <p className="font-pally-regular text-sm underline destructive">
              Edit Pass
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;
