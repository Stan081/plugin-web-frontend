import React, { FC } from 'react'
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { RiCloseLine } from "react-icons/ri";
import { Separator } from '@/components/ui/separator';

interface WithdrawalReceiptProps {
    open: boolean;
    close: () => void;
  }

const WithdrawalReceipt: FC<WithdrawalReceiptProps> = ({close, open}) => {
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
            <div>
                <div>
                    
                </div>
                <Separator/>
            </div>
        </DialogPanel>
      </div>
    </div>
  </Dialog>
  )
}

export default WithdrawalReceipt