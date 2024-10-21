import React, { FC } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface DeleteEventProps {
  open: boolean;
  close: () => void;
}

const conditions: string[] = [
  "All event data, including tickets and attendee information, will be permanently removed.",
  "Attendees will lose access to the event",
  "The deletion cannot be undone",
  "Any ongoing or upcoming promotions linked to the event will be canceled.",
];

const DelectEvent: FC<DeleteEventProps> = ({ open, close }) => {
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
            className="w-full max-w-xl rounded-xl bg-white backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="text-base/7 font-medium items-center flex justify-between p-4 rounded-xl"
            >
              <p className="text-2xl font-pally-medium text-center">
                Are you sure you want to delete this event?
              </p>
              <div
                onClick={close}
                className="p-1.5 rounded-full bg-gray-200 cursor-pointer"
              >
                <RiCloseLine size={20} />
              </div>
            </DialogTitle>
            <div className="p-5">
              <p className="text-sm md:text-base text-[#586170] font-pally-regular">
                Continuing with deletion will lead to the following{" "}
              </p>
              <ul className="mt-4 px-5">
                {conditions.map((item, index) => (
                  <li
                    key={index}
                    className=" list-disc text-sm md:text-base text-[#586170] font-pally-regular"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex items-start gap-3 mt-8 bg-gray-100 rounded p-2.5">
                <input
                  type="checkbox"
                  id="terms"
                  // checked={isChecked.refundPolicy}
                  // onChange={() => handleIsChecked("refundPolicy")}
                  className="h-4 w-4 shrink-0 border rounded bg-[#D9302A] text-white"
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium text-[#586170] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I accept the terms of Event Deletion as mentioned on the{" "}
                  <Link href={"/#"} className="underline text-black">
                    Privacy policy
                  </Link>
                </label>
              </div>

              <div className="flex justify-end items-center gap-5 mt-8">
                <p className="destructive  hover:underline cursor-pointer rounded font-pally-regular flex gap-2 items-center">
                  <HiOutlineTrash size={18} /> Delete Event
                </p>
                <Button onClick={close} variant="outline">Keep event</Button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DelectEvent;
