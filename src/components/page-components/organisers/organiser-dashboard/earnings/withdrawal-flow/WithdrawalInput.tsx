import { Separator } from "@/components/ui/separator";
import { StepsProps } from "@/pages/create-event";
import { DialogPanel, DialogTitle } from "@headlessui/react";
import React, { FC } from "react";
import { RiCloseLine } from "react-icons/ri";
import { RxInfoCircled } from "react-icons/rx";

interface WithdrawalInputProps extends StepsProps {
  close: () => void;
}

const WithdrawalInput: FC<WithdrawalInputProps> = ({
  next,
  previous,
  close,
}) => {
  return (
    <DialogPanel
      transition
      className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
    >
      <DialogTitle
        as="h3"
        className="text-base/7 font-medium flex justify-between items-start"
      >
        <div className="">
          <p className=" font-pally-medium text-2xl">Make withdrawal</p>
        </div>

        <div onClick={close} className="p-1.5 rounded-full bg-gray-200">
          <RiCloseLine size={20} />
        </div>
      </DialogTitle>
      <div>
        <Separator />
        
      </div>
    </DialogPanel>
  );
};

export default WithdrawalInput;
