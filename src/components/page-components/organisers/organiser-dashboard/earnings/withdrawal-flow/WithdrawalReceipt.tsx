import { Separator } from "@/components/ui/separator";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import React, { FC } from "react";
import { RiCloseLine } from "react-icons/ri";
import { RxInfoCircled } from "react-icons/rx";
import { BsBank2 } from "react-icons/bs";
import Link from "next/link";

interface WithdrawalReceiptProps {
  close: () => void;
  open: boolean;
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
            className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="text-base/7 font-medium flex justify-between items-start pb-3"
            >
              <div className="">
                <p className=" font-pally-medium text-2xl">
                  Withdrawal Summary{" "}
                </p>
              </div>

              <div onClick={close} className="p-1.5 rounded-full bg-gray-200 cursor-pointer">
                <RiCloseLine size={20} />
              </div>
            </DialogTitle>
            <div className="flex flex-col gap-5">
              <Separator />
              <div className="mt-4 border p-2 border-[#FBE2B7] bg-[#FEF6E7] rounded-lg flex items-center gap-3">
                <RxInfoCircled size={20} color="#DD900D" />
                <p className="font-pally-regular text-[#586170]">
                  Withdrawal is processed and approved within 24hrs
                </p>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <BsBank2 className="" size={30} />
                  <div>
                    <h4 className="font-pally-medium text-base md:text-lg">
                      Olivia Magaret
                    </h4>
                    <p className="text-sm text-[#515A6A] font-pally-regular">
                      Acc number - 1234567890
                    </p>
                  </div>
                </div>
                <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Processing
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-[#586170] font-pally-regular text-base">
                    Reference Number
                  </span>
                  <span className="font-pally-medium text-lg">
                    TRX890123456
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#586170] font-pally-regular text-base">
                    Amount
                  </span>
                  <span className="font-pally-medium text-lg">
                    ₦1,089,649.04
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#586170] font-pally-regular text-base">
                    Date
                  </span>
                  <span className="font-pally-medium text-lg">
                    01 September, 2022, 4:00 pm
                  </span>
                </div>
              </div>

              <div className="text-center text-xs mt-9">
                <p className="text-gray-600">
                  Having issues?{" "}
                  <Link href="/#" className="text-red-600 hover:underline">
                    Contact Support
                  </Link>
                </p>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default WithdrawalReceipt;
