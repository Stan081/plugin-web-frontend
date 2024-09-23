import React from "react";
import { HiOutlineTrash } from "react-icons/hi2";

const SeatCard = () => {
  return (
    <div className="bg-[#fae4e2] rounded-lg p-5">
      <p className="font-pally-regular text-black md:text-lg">kkjjii</p>
      <div className="mt-5 flex justify-between items-center">
        <ul className="flex gap-4">
          <li className="p-1.5 rounded-md border border-black text-black">
            Npon-seated
          </li>
          <li className="p-1.5 rounded-md border border-black text-black">
            Npon-seated
          </li>
          <li className="p-1.5 rounded-md border border-black text-black">
            Npon-seated
          </li>
        </ul>
        <div className="flex justify-end gap-4">
          <div
            // onClick={() => handleEditForm(id)}
            className="cursor-pointer"
          >
            <p className="font-pally-regular text-sm underline destructive">
              Edit Pass
            </p>
          </div>
          <div
            //   onClick={() => handleDelete(id)}
            className="cursor-pointer bg-black/70 rounded p-1"
          >
            <HiOutlineTrash
              size={16}
              className="text-white hover:text-red-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatCard;
