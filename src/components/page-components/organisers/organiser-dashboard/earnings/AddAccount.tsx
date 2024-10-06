import React, { FC } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { RiCloseLine } from "react-icons/ri";

interface AddAccountProps {
  open: boolean;
  close: () => void;
}

const AddAccount: FC<AddAccountProps> = ({ close, open }) => {
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
              className="text-base/7 font-medium flex justify-between items-start"
            >
              <p className="px-3 py-1.5 bg-[#DAF0E1] flex items-center gap-2 p rounded-3xl text-[#04802E]">
                Ticket Confirmed
              </p>
              <div onClick={close} className="p-1.5 rounded-full bg-gray-200">
                <RiCloseLine size={20} />
              </div>
            </DialogTitle>
            <div>ff</div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AddAccount;
