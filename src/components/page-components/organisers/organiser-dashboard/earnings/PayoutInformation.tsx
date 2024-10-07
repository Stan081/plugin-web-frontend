import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import { PiPlus } from "react-icons/pi";
import AddAccount from "./AddAccount";

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
