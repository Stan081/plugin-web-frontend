"use client";
import Container from "@/tw-components/container";
import React from "react";
import { BsExclamationCircle } from "react-icons/bs";
import PayoutInformation from "./PayoutInformation";
import WithdrawalSummary from "./WithdrawalSummary";
import WithdrawalHistory from "./WithdrawalHistory";
import { toFiat } from "@/lib/amount";
import AvailableBalance from "./AvailableBalance";
import { useGetWithdrawalStats } from "@/hooks/organiser/organiser-earnings/useGetWithdrawalStats";

const TotalEarning = () => {
  const { data: withdrawalStatistic } = useGetWithdrawalStats();
  return (
    <div className="border border-[#EAEDF0] rounded-xl p-6 flex flex-col justify-between gap-6">
      <div className="flex justify-between">
        <p className="text-[#888D96] font-pally-medium text-sm md:text-base">
          Total Earnings
        </p>

        <div className="rounded-full h-5 w-5 bg-[#40B869]" />
      </div>

      <p className="font-pally-medium text-4xl">
        {toFiat(withdrawalStatistic?.data?.completedSum)}
      </p>

      <p className="font-pally-medium text-[#667185] flex items-center gap-3">
        <span>
          <BsExclamationCircle color="#F3A218" size={16} />
        </span>
        Plugin Charges N50 Per Withdrawal
      </p>
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
