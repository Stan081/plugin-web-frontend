import React, { FC } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCreateEventContext } from "@/providers/create_event.provider";
import { GrFormCheckmark } from "react-icons/gr";
import { StepsProps } from "@/pages/create-event";
import SeatDetails from "./SeatDetails";

interface GroupTicketProps extends StepsProps{}

const GroupTicket: FC<GroupTicketProps> = ({
  next,
  previous,
}) => {
  const {isCheckedGroup } = useCreateEventContext();
  return (
    <div className="lg:h-[82vh] overflow-x-auto flex flex-col justify-between gap-4 w-full h-full">
      <Accordion type="single" collapsible className="w-full space-y-5">
        <AccordionItem
          value="item-1"
          className="border border-[#463635] rounded-xl px-4"
        >
          <AccordionTrigger>
            <div className="flex justify-start items-center gap-4">
              {!isCheckedGroup.sectionDetail ? (
                <div className="border border-white rounded-full h-4 w-4" />
              ) : (
                <div className="bg-green-600 rounded-full p-0.5">
                  <GrFormCheckmark color="#fff" size={16} />
                </div>
              )}
              <p className="font-pally-regular">SEATS/SECTION DEATAILS</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <SeatDetails/>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-2"
          className="border border-[#463635] rounded-xl px-4"
        >
          <AccordionTrigger>
            <div className="flex justify-start items-center gap-4">
              {!isCheckedGroup.labelling ? (
                <div className="border border-white rounded-full h-4 w-4" />
              ) : (
                <div className="bg-green-600 rounded-full p-0.5">
                  <GrFormCheckmark color="#fff" size={16} />
                </div>
              )}
              <p className="font-pally-regular">LABELLING</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div>okkh</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="sticky bottom-0 bg-[#281E17]">
        <Separator />
        <div className="py-5 flex justify-between items-center">
          <Button
            onClick={() => {}}
            variant="outline"
            className="text-white border-white hover:bg-[#6c5442]"
          >
            Save Progress
          </Button>

          <div className="flex items-center gap-8">
            <Button
              onClick={previous}
              className="cursor-pointer hover:outline hover:outline-white/50 p-2 rounded-lg"
            >
              Back
            </Button>

            <Button
              disabled={
                !isCheckedGroup.sectionDetail &&
                !isCheckedGroup.labelling
              }
              onClick={() => next()}
              variant="destructive"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupTicket;
