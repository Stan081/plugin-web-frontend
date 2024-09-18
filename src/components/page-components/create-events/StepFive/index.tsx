import { StepsProps } from "@/pages/create-event";
import React, { useState } from "react";
import Intro from "../Intro";
import FormContainer from "../FormContainer";
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
import RefundPolicy from "./RefundPolicy";
import { pageContents, PageContentsType } from "@/static-datas/create-event";
import GuestList from "./GuestList";
import AddVendor from "./AddVendor";
import PhotoGrid from "./AddPhotos/PhotoGrid";
import AddAgenda from "./AddAgenda";

const StepFive: React.FC<StepsProps> = ({ next, previous }) => {
  const { isChecked } = useCreateEventContext();
  const [changePageContent, setChangePageContent] = useState<PageContentsType>({
    id: "item-1",
    introTitle: "Outline the schedule of activities for your event.",
    content: [
      "Break down the event into segments (e.g., welcome drinks, painting session, cocktail break).",
      "Ensure the agenda flows smoothly and includes buffer times.",
    ],
  });

  const handlePageContentChange = (id: string) => {
    const getClickedAccordion = pageContents.find((page) => page.id === id);
    setChangePageContent(getClickedAccordion);
  };

  return (
    <div className="flex items-start gap-12">
      <div className="w-full lg:w-1/2">
        <Intro
          contents={changePageContent.content}
          title={changePageContent.introTitle}
        />
      </div>
      <div className="w-full lg:w-1/2">
        <FormContainer formTitle="Event Details" currPosition={[100, 20, 0]}>
          <div className="lg:h-[82vh] overflow-x-auto flex flex-col justify-between gap-4 w-full h-full">
            <Accordion type="single" collapsible className="w-full space-y-5">
              <AccordionItem
                onClick={() => handlePageContentChange("item-1")}
                value="item-1"
                className="border border-[#463635] rounded-xl px-4"
              >
                <AccordionTrigger>
                  <div className="flex justify-start items-center gap-4">
                    {!isChecked.addAgender ? (
                      <div className="border border-white rounded-full h-4 w-4" />
                    ) : (
                      <div className="bg-green-600 rounded-full p-0.5">
                        <GrFormCheckmark color="#fff" size={16} />
                      </div>
                    )}
                    <p>ADD AGENDA</p>
                    <p className="text-[12px] font-pally-medium text-[#865503] px-1.5 py-0.5 no-underline bg-[#FBE2B7] rounded-lg">
                      OPTIONAL
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <AddAgenda/>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                onClick={() => handlePageContentChange("item-2")}
                value="item-2"
                className="border border-[#463635] rounded-xl px-4"
              >
                <AccordionTrigger>
                  <div className="flex justify-start items-center gap-4">
                    {!isChecked.addMedia ? (
                      <div className="border border-white rounded-full h-4 w-4" />
                    ) : (
                      <div className="bg-green-600 rounded-full p-0.5">
                        <GrFormCheckmark color="#fff" size={16} />
                      </div>
                    )}
                    <p>ADD PHOTO/VIDEO</p>
                    <p className="text-[12px] font-pally-medium text-[#865503] px-1.5 py-0.5 no-underline bg-[#FBE2B7] rounded-lg">
                      OPTIONAL
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <PhotoGrid maxUploads={6} />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                onClick={() => handlePageContentChange("item-3")}
                value="item-3"
                className="border border-[#463635] rounded-xl px-4"
              >
                <AccordionTrigger>
                  <div className="flex justify-start items-center gap-4">
                    {!isChecked.addGests ? (
                      <div className="border border-white rounded-full h-4 w-4" />
                    ) : (
                      <div className="bg-green-600 rounded-full p-0.5">
                        <GrFormCheckmark color="#fff" size={16} />
                      </div>
                    )}
                    <p>GUEST LIST</p>
                    <p className="text-[12px] font-pally-medium text-[#865503] px-1.5 py-0.5 no-underline bg-[#FBE2B7] rounded-lg">
                      OPTIONAL
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <GuestList />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                onClick={() => handlePageContentChange("item-4")}
                value="item-4"
                className="border border-[#463635] rounded-xl px-4"
              >
                <AccordionTrigger>
                  <div className="flex justify-start items-center gap-4">
                    {!isChecked.addVendors ? (
                      <div className="border border-white rounded-full h-4 w-4" />
                    ) : (
                      <div className="bg-green-600 rounded-full p-0.5">
                        <GrFormCheckmark color="#fff" size={16} />
                      </div>
                    )}
                    <p>ADD VENDORS</p>
                    <p className="text-[12px] font-pally-medium text-[#865503] px-1.5 py-0.5 no-underline bg-[#FBE2B7] rounded-lg">
                      OPTIONAL
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <AddVendor />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                onClick={() => handlePageContentChange("item-5")}
                value="item-5"
                className="border border-[#463635] rounded-xl px-4"
              >
                <AccordionTrigger>
                  <div className="flex justify-start items-center gap-4">
                    {!isChecked.refundPolicy ? (
                      <div className="border border-white rounded-full h-4 w-4" />
                    ) : (
                      <div className="bg-green-600 rounded-full p-0.5">
                        <GrFormCheckmark color="#fff" size={16} />
                      </div>
                    )}
                    <p>REFUND POLICY</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <RefundPolicy />
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
                    disabled={!isChecked.refundPolicy}
                    onClick={() => next()}
                    variant="destructive"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </FormContainer>
      </div>
    </div>
  );
};

export default StepFive;
