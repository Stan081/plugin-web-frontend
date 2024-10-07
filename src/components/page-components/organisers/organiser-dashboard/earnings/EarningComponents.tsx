import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toFiat } from "@/lib/amount";
import Container from "@/tw-components/container";
import React from "react";
import { BsExclamationCircle } from "react-icons/bs";
import PayoutInformation from "./PayoutInformation";
import WithdrawalSummary from "./WithdrawalSummary";
import WithdrawalHistory from "./WithdrawalHistory";

const TotalEarning = () => {
  return (
    <div className="border border-[#EAEDF0] rounded-xl p-6 flex flex-col justify-between gap-6">
      <div className="flex justify-between">
        <p className="text-[#888D96] font-pally-medium text-sm md:text-base">
          Total Earnings
        </p>

        <div className="rounded-full h-5 w-5 bg-[#40B869]" />
      </div>

      <p className="font-pally-medium text-4xl">{toFiat(0)}</p>

      <p className="font-pally-medium text-[#667185] flex items-center gap-3">
        <span>
          <BsExclamationCircle color="#F3A218" size={16} />
        </span>
        Plugin Charges N50 Per Withdrawal
      </p>
    </div>
  );
};

const AvailableBalance = () => {
  return (
    <div className="border border-[#EAEDF0] rounded-xl p-6 space-y-6">
      <div className="flex justify-between">
        <p className="text-[#888D96] font-pally-medium text-sm md:text-base">
          Available Balance
        </p>

        <div className="rounded-full h-5 w-5 bg-[#FF5752]" />
      </div>

      <p className="font-pally-medium text-4xl">{toFiat(0)}</p>

      <div className="flex justify-between items-center">
        <Select>
          <SelectTrigger className="w-[180px] border-none rounded-full font-pally-regular text text-[#586170] shadow-none">
            <SelectValue placeholder="Select Date" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              <SelectItem value="7">7 days</SelectItem>
              <SelectItem value="30">This month</SelectItem>
              <SelectItem value="60">Last month</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button variant="destructive">Withdraw</Button>
      </div>
    </div>
  );
};

const EarningComponents = () => {
  return (
    <Container>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TotalEarning />
        <AvailableBalance />
        <PayoutInformation />
        <WithdrawalSummary />
      </div>
      <WithdrawalHistory />
    </Container>
  );
};

export default EarningComponents;
