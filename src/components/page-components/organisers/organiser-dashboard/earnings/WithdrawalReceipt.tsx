import React, { FC } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { RiCloseLine } from "react-icons/ri";
import { Separator } from "@/components/ui/separator";
import { BsBank2 } from "react-icons/bs";
import { toFiat } from "@/lib/amount";

interface WithdrawalReceiptProps {
  open: boolean;
  close: () => void;
  receipt: any;
}

const WithdrawalReceipt: FC<WithdrawalReceiptProps> = ({
  close,
  open,
  receipt,
}) => {
  const formattedDate = new Date(receipt?.createdAt).toLocaleDateString(
    "en-GB",
    {
      weekday: "short",
      month: "long",
      day: "numeric",
      timeZone: "Africa/Lagos",
    }
  );

  const formattedTime = new Date(receipt?.createdAt).toLocaleTimeString(
    "en-GB",
    {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "Africa/Lagos",
    }
  );
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
                      {receipt?.accountHolderName}
                    </p>
                    <p className="font-pally-regular text-sm lg:text-base">
                      Acc number: {receipt?.accountNumber}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-pally-semibold ${
                    receipt?.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {receipt?.status}
                </span>
              </div>
              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="font-pally-regular text-sm">
                    Reference Number:
                  </p>
                  <p className="font-pally-medium text-sm">TRX{receipt?._id}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-pally-regular text-sm">Amount:</p>
                  <p className="font-pally-medium text-sm">
                    {toFiat(receipt?.amount)}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-pally-regular text-sm">Date:</p>
                  <p className="font-pally-medium text-sm">
                    {formattedDate}, {formattedTime}
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
