"use client";
import React, { FC, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCreateEventContext } from "@/providers/create_event.provider";
import { useGetEvent } from "@/hooks/events/useGetEvent";

const CongratulationModal: FC<{
  open: boolean;
  close: (key: boolean) => void;
}> = ({ open, close }) => {
  const { clearStep } = useCreateEventContext();
  const { data: event } = useGetEvent();

  useEffect(() => {
    clearStep();
  }, [clearStep]);
  return (
    <div>
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
              className="w-full max-w-4xl rounded-xl bg-[#FDE5E3] p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex flex-col-reverse lg:flex-row items-center justify-between">
                <div className="md:px-5 w-1/2">
                  <p className="text-black text-center font-pally-bold text-4xl ">
                    Congratulations
                  </p>
                  <p className="text-[#586170] text-center font-pally-regular ">
                    Your event has been published, attendees can now see and
                    book tickets for your events
                  </p>

                  <Link
                    href={`/organiser`}
                    className="flex justify-center mt-5"
                  >
                    <Button variant="destructive">Manange Event</Button>
                  </Link>
                </div>
                <div className="h-[40vh] w-1/2">
                  {event?.data?.thumbnail && (
                    <Image
                      src={event?.data?.thumbnail}
                      width={487}
                      height={270}
                      alt={event?.data?.eventName}
                      className="w-full h-full object-cover pointer-events-none rounded-md"
                    />
                  )}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CongratulationModal;
