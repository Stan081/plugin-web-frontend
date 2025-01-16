import React, { Fragment } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { calculateDuration } from "@/lib/utils";

const EventsAgenda: React.FC<{ event: any }> = ({ event }) => {
  const accordionStyles = {
    first: "border-[#40B869] bg-[#F2FAF5]",
    second: "border-[#F58B86] bg-[#FFEEED]",
    third: "border-[#F5B546] bg-[#FEF6E7]",
  };

  let mk: string = "llo";

  return (
    <section>
      <p className="text-[#2C2B2E] text-base md:text-lg font-pally-medium">
        AGENDA
      </p>
      <Accordion type="single" collapsible>
        <ul className="space-y-5 mt-4">
          {event.map((agenda) => (
            <li key={agenda._id}>
              <AccordionItem
                value={agenda._id as string}
                className={`
                px-5 border border-t-4 rounded-lg 
                ${agenda._id && accordionStyles.first} 
                ${agenda._id && accordionStyles.second} 
                ${agenda._id && accordionStyles.third} 
                `}
              >
                <AccordionTrigger className=" font-pally-medium text-base md:text-lg">
                  <div className="flex flex-col items-start">
                    <p className="font-pally-medium text-sm text-[#667185]">
                      Duration:{" "}
                      <span className="font-pally-regular">
                        {calculateDuration(agenda?.startTime, agenda?.endTime)}
                      </span>
                    </p>
                    <p className="font-pally-medium text-lg text-[#101928]">
                      {agenda?.title?.slice(0, 1).toLocaleUpperCase() +
                        agenda?.title?.slice(1)}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className=" font-pally-regular text-base md:text-lg">
                  <div className="space-y-3">
                    <p className="font-pally-regular text-base text-[#667185]">
                      {agenda?.description?.slice(0, 1).toLocaleUpperCase() +
                        agenda?.description?.slice(1)}
                    </p>
                    {agenda?.host && (
                      <div className="flex gap-5">
                        <figure
                          className={`${agenda?.host?.photo} relative size-10 border-2 border-[#D9D9D9] rounded-full`}
                        ></figure>
                        <div className="flex flex-col justify-between">
                          <p className="font-pally-regular text-xs text-[#667185]">
                            Host
                          </p>
                          <p className="font-pally-regular text-base text-[#101928]">
                            {agenda?.host?.name}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </li>
          ))}
        </ul>
      </Accordion>
    </section>
  );
};

export default EventsAgenda;
