import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toFiat } from "@/lib/amount";
import { Fragment, useState } from "react";
import WithdrawalInput from "./withdrawal-flow/WithdrawalInput";
import WithdrawalOTP from "./withdrawal-flow/WithdrawalOTP";
import WithdrawalReceipt from "./withdrawal-flow/WithdrawalReceipt";

export type StepsProps = {
  next?: () => void,
  previous?: () => void
}

const AvailableBalance = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [currentStep, setCurrentStep] = useState<number>(1);

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const closeModal = () => {
    setShowModal(!showModal);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <WithdrawalInput close={closeModal} next={nextStep} open={showModal} />
        );
      case 2:
        return (
          <WithdrawalOTP close={closeModal} next={nextStep} open={showModal} />
        );
      case 3:
        return (
          <WithdrawalReceipt close={closeModal} open={showModal} />
        );
      default:
        return;
    }
  };

  return (
    <Fragment>
      <div className="border border-[#EAEDF0] rounded-xl p-6 space-y-6">
        <div className="flex justify-between">
          <p className="text-[#888D96] font-pally-medium text-sm md:text-base">
            Available Balance
          </p>

          <div className="rounded-full h-5 w-5 bg-[#FF5752]" />
        </div>

        <p className="font-pally-medium text-4xl">{toFiat(0)}</p>

        <div className="flex justify-between items-center">
          {/* <Select>
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
          </Select> */}
          <div/>

          <Button onClick={closeModal} variant="destructive">
            Withdraw
          </Button>
        </div>
      </div>
      {showModal && <>{renderStepContent()}</>}
    </Fragment>
  );
};

export default AvailableBalance;
