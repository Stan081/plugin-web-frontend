import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import { PiPlus } from "react-icons/pi";
import AddAccount from "./AddAccount";
import { FiEdit3 } from "react-icons/fi";
import { RiCloseFill } from "react-icons/ri";

const PayoutInformation = () => {
  const [showAccount, setShowAccount] = useState<boolean>(false);
  return (
    <Fragment>
      <div className="border border-[#EAEDF0] rounded-xl px-6 pt-6 space-y-6">
        <div className="space-y-1">
          <p className="text-[#101928] font-pally-medium text-lg md:text-xl">
            Add Payout Information
          </p>
          <p className="text-[#667185] font-pally-regular text-sm md:text-base">
            Add a bank account to receive payouts
          </p>
        </div>

        {true ? (
          <div className="bg-[#F7F8F9] flex flex-col gap-4 items-center justify-center rounded-tl-xl rounded-tr-xl py-5 px-4">
            <div className="bg-white w-full flex items-center gap-4">
              <Image
                src={"/images/bank-vector.svg"}
                width={123}
                height={118}
                alt="bank vector"
                className="pointer-events-none"
              />
              <div>
                <p className="font-pally-medium text-base lg:text-lg">
                  123456789
                </p>
                <p className="font-pally-medium text-base lg:text-lg">
                  ffffffff
                </p>
                <p className="font-pally-regular text-base lg:text-lg">ccdd</p>
              </div>
            </div>
            <div className="flex items-center gap-6 bg-white p-2 rounded-lg w-full">
              <p className="font-pally-regular cursor-pointer text-gray-500 flex items-center gap-2">
                <FiEdit3 />
                Edit
              </p>
              <p className="font-pally-regular cursor-pointer destructive flex items-center gap-1">
                <RiCloseFill />
                Remove
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-[#F7F8F9] flex flex-col gap-4 items-center justify-center rounded-tl-xl rounded-tr-xl py-12">
            <Image
              src={"/images/bank.svg"}
              height={71}
              width={56}
              alt="bank icon"
              className="pointer-events-none w-14 h-16 object-cover"
            />
            <p className="text-[#667185] font-pally-medium text-base">
              No bank account found{" "}
            </p>

            <Button
              onClick={() => setShowAccount(!showAccount)}
              variant="outline"
              className="flex gap-3"
            >
              <PiPlus />
              Add bank account
            </Button>
          </div>
        )}
      </div>
      {showAccount && (
        <AddAccount
          open={showAccount}
          close={() => setShowAccount(!showAccount)}
        />
      )}
    </Fragment>
  );
};

export default PayoutInformation;
