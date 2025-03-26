"use client";
import React, { FC } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCreateEventContext } from "@/providers/create_event.provider";
import { useGetEvent } from "@/hooks/events/useGetEvent";
import { useRouter } from "next/navigation";

const CongratulationModal: FC<{
  open: boolean;
  close: (key: boolean) => void;
}> = ({ open, close }) => {
  const { clearStep } = useCreateEventContext();
  const { data: event } = useGetEvent();

  const router = useRouter();

  const date = new Date(event?.data?.eventSchedule?.startDate);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "Africa/Lagos",
  };

  const formattedDate = date.toLocaleDateString("en-GB", options);

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
              <div className="flex gap-4 flex-col-reverse lg:flex-row lg:items-center justify-between">
                <DialogTitle className="md:px-5 w-full lg:w-1/2 space-y-2">
                  <p className="text-black text-center font-pally-medium lg:font-pally-bold text-2xl lg:text-4xl ">
                    Congratulations
                  </p>
                  {event?.data?.eventSchedule ? (
                    <p className="text-[#586170] text-center font-pally-regular ">
                      Your event has been schedule to publish, users will be
                      able to see eventand purchase ticket on{" "}
                      <span className="font-pally-medium">{formattedDate}</span>
                    </p>
                  ) : (
                    <p className="text-[#586170] text-center font-pally-regular ">
                      Your event has been published, attendees can now see and
                      book tickets for your events
                    </p>
                  )}

                  <div
                    onClick={() => {
                      router.push(`/organiser`);
                      clearStep();
                    }}
                    className="flex justify-center mt-5"
                  >
                    <Button variant="destructive">Manange Event</Button>
                  </div>
                </DialogTitle>
                <div className="h-40 lg:h-[40vh] w-full lg:w-1/2">
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
