import React, { FC, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { RiCloseLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import WithdrawalInput from "./WithdrawalInput";

interface WithdrawalProcessProps {
  open: boolean;
  close: () => void;
}

const WithdrawalProcess: FC<WithdrawalProcessProps> = ({ open, close }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <WithdrawalInput close={close} next={nextStep} previous={previousStep}/>;
      case 2:
        return <div>hkk</div>;
      default:
        return;
    }
  };
  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="flex min-h-full items-center justify-center p-4">
          {renderStepContent()}
        </div>
      </div>
    </Dialog>
  );
};

export default WithdrawalProcess;
