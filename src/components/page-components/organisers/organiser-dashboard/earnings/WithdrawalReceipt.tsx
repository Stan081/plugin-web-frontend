import React, { FC } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { RiCloseLine } from "react-icons/ri";
import { Separator } from "@/components/ui/separator";
import { BsBank2 } from "react-icons/bs";
import { toFiat } from "@/lib/amount";

interface WithdrawalReceiptProps {
  open: boolean;
  close: () => void;
}

const WithdrawalReceipt: FC<WithdrawalReceiptProps> = ({ close, open }) => {
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
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-3xl data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="text-base/7 font-medium flex justify-between items-start"
            >
              <div className="">
                <p className=" font-pally-medium text-xl ">
                  Withdrawal Summary
                </p>
              </div>

              <div
                onClick={close}
                className="p-1.5 cursor-pointer rounded-full bg-gray-200"
              >
                <RiCloseLine size={20} />
              </div>
            </DialogTitle>
            <div className="flex flex-col gap-4 py-5">
              <Separator />
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                  <BsBank2 size={30} />
                  <div>
                    <p className="font-pally-medium text-sm lg:text-base">
                      Olivia Ada
                    </p>
                    <p className="font-pally-regular text-sm lg:text-base">
                      Acc number: 23456789098
                    </p>
                  </div>
                </div>
                <p className="text-green-600 bg-green-100 border border-green-600 text-sm py-0.5 px-1.5 text-center rounded-3xl">
                  Completed
                </p>
              </div>
              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="font-pally-regular text-sm lg:text-base">
                    Reference Number:
                  </p>
                  <p className="font-medium text-sm lg:text-base">
                    TX3498765678909876
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-pally-regular text-sm lg:text-base">
                    Amount:
                  </p>
                  <p className="font-medium text-sm lg:text-base">
                    {toFiat(234000)}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-pally-regular text-sm lg:text-base">
                    Date:
                  </p>
                  <p className="font-medium text-sm lg:text-base">
                    1 september, 20222, 4:00pm
                  </p>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default WithdrawalReceipt;
