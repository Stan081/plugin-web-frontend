import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import eventsAgendaData from "@/static-datas/events-agenda-data";

const EventsAgenda = () => {
  const accordionStyles = {
    first: "border-[#40B869] bg-[#F2FAF5]",
    second: "border-[#F58B86] bg-[#FFEEED]",
    third: "border-[#F5B546] bg-[#FEF6E7]",
  };
  return (
    <section>
      <p className="text-[#2C2B2E] text-base md:text-lg font-pally-medium">
        AGENDA
      </p>

      <Accordion type="single" collapsible>
        <ul className="space-y-5 mt-4">
          {eventsAgendaData.map((agenda, index) => (
            <li key={agenda.hostName}>
              <AccordionItem
                value={agenda.hostName as string}
                className={`
                px-5 border border-t-4 rounded-lg 
                ${index % 3 === 0 && accordionStyles.first} 
                ${index % 3 === 1 && accordionStyles.second} 
                ${index % 3 === 2 && accordionStyles.third} 
                `}
              >
                <AccordionTrigger className=" font-pally-medium text-base md:text-lg">
                  <div className="flex flex-col items-start">
                    <p className="font-pally-regular text-sm text-[#667185]">
                      Duration: {agenda.duration}
                    </p>
                    <p className="font-pally-medium text-lg text-[#101928]">
                      Opening speech
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className=" font-pally-regular text-base md:text-lg">
                  <div className="space-y-3">
                    <p className="font-pally-regular text-base text-[#667185]">
                      {agenda.details}
                    </p>
                    <div className="flex gap-5">
                      <figure
                        className={`${agenda.hostAvatar} relative size-10 border-2 border-[#D9D9D9] rounded-full`}
                      ></figure>
                      <div className="flex flex-col justify-between">
                        <p className="font-pally-regular text-xs text-[#667185]">
                          Host
                        </p>
                        <p className="font-pally-regular text-base text-[#101928]">
                          {agenda.hostName}
                        </p>
                      </div>
                    </div>
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
