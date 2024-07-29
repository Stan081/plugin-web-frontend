import { Button } from "@/components/ui/button";
import Container from "@/tw-components/container";
import Image from "next/image";
import React from "react";


const TestUI = () => {
  return (
      <Container className="py-8 md:py-16">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-pinkNoise bg-cover backdrop-blur-md w-full md:w-1/2 rounded-lg px-4 pt-4 md:px-8 md:pt-8">
            <h2 className="font-pally-medium text-3xl">
              List your next event <br /> with Plugin
            </h2>
            <p className="font-pally-regular text-base md:text-lg w-full max-w-lg">
              Our user-friendly software selects event listings based on your
              location or top priorities, making your search much more fun.
            </p>
            <div className="mt-6 flex justify-between items-start">
              <Button variant="destructive" className="w-[200px] md:w-auto">
                List an event
              </Button>
              <div>
                <Image
                  src={"/images/listing-event-illustration.svg"}
                  width={345}
                  height={528}
                  alt="listing event illustration"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 w-full md:w-1/2">
            <div className="relative bg-blueNoise backdrop-blur-md col-span-2 rounded-lg flex items-center justify-between">
              <div className="pl-4 md:pl-8">
                <h3 className="text-lg md:text-xl font-pally-medium">
                  Event Ticketing
                </h3>
                <p className="text-base md:text-lg font-pally-regular">
                  Create, promote and sell tickets for <br /> your events
                  without stress.
                </p>
              </div>

              <div className="pr-1 h-[295px]">
                <Image
                  src={"/images/ticket-band.svg"}
                  width={379}
                  height={555}
                  alt="ticket illustration"
                  className="w-72 h-72"
                />
              </div>
            </div>
            <div className=" bg-seagreenNoise backdrop-blur-md col-span-1 rounded-lg p-4 md:p-8 flex flex-col">
              <div className="flex justify-center">
                <Image
                  src={"/images/sales-dash.svg"}
                  width={222}
                  height={198}
                  alt="sales dashboard illustration"
                  className="w-auto h-auto"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg md:text-xl font-pally-medium">
                  Sales Dashboard
                </h3>
                <p className="text-base md:text-lg font-pally-regular">
                  Track ticket sales, orders, revenues, event reports in a quick
                  glance.
                </p>
              </div>
            </div>
            <div className="bg-creamNoise backdrop-blur-md col-span-1 bg-blue-400 rounded-lg pt-4 px-4 md:pt-8 md:px-8 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-lg md:text-xl font-pally-medium">
                  Sales Dashboard
                </h3>
                <p className="text-base md:text-lg font-pally-regular">
                  Track ticket sales, orders, revenues, event reports in a quick
                  glance.
                </p>
              </div>
              <div className="flex justify-center">
                <Image
                  src={"/images/team.svg"}
                  width={222}
                  height={198}
                  alt="team management illustration"
                  className="w-auto h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
  );
};

export default TestUI;
