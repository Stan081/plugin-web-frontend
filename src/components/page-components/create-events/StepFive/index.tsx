import { StepsProps } from "@/pages/create-event";
import React, { useCallback, useState } from "react";
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
import { GrFormCheckmark } from "react-icons/gr";
import RefundPolicy from "./RefundPolicy";
import { pageContents, PageContentsType } from "@/static-datas/create-event";
import GuestList from "./GuestList";
import AddVendor from "./AddVendor";
import PhotoGrid from "./AddPhotos/PhotoGrid";
import AddAgenda from "./AddAgenda";
import { useMutation } from "@tanstack/react-query";
import { EventAgreedPolicy } from "@/pages/api/mutate/create-events/eventPolicy";
import { useToast } from "@/components/ui/use-toast";
import Spinner from "@/tw-components/spinner";
import { useGetEventAgenda } from "@/hooks/events/useGetEventAgendas";
import { useGetEventVendors } from "@/hooks/events/useGetEventVendors";
import { useGetEventGuests } from "@/hooks/events/useGetEventGuests";
import { useGetEventPhotos } from "@/hooks/events/useGetEventPhotos";
import { useGetEvent } from "@/hooks/events/useGetEvent";

const StepFive: React.FC<StepsProps> = ({ next, previous }) => {
  const { data: allAgenda } = useGetEventAgenda();
  const { data: allVendor } = useGetEventVendors();
  const { data: allGuests } = useGetEventGuests();
  const { data: allPhotos } = useGetEventPhotos();
  const { data: eventById } = useGetEvent();
  const [changePageContent, setChangePageContent] = useState<PageContentsType>({
    id: "item-1",
    introTitle: "Outline the schedule of activities for your event.",
    content: [
      "Break down the event into segments (e.g., welcome drinks, painting session, cocktail break).",
      "Ensure the agenda flows smoothly and includes buffer times.",
    ],
  });

  const { toast } = useToast();
  console.log(eventById?.data)

  const handlePageContentChange = (id: string) => {
    const getClickedAccordion = pageContents.find((page) => page.id === id);
    setChangePageContent(getClickedAccordion);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => EventAgreedPolicy(data),
    onSuccess: (response) => {
      if (response?.message) {
        toast({
          variant: "success",
          title: "Policy has been submitted!",
          description: `${response?.message}`,
        });
        next();
      }
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
      });
    },
  });

  const handleSubmit = useCallback(() => {
    const data = {
      refundPolicyAgreed: true,
    };
    mutate(data);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-12 h-full lg:h-screen">
      <div className="w-full lg:w-2/5  px-4 lg:px-0">
        <Intro
          contents={changePageContent.content}
          title={changePageContent.introTitle}
        />
      </div>
      <div className="w-full lg:w-3/5 bg-[#f0ded1]">
        <FormContainer formTitle="Event Details" currPosition={[100, 100, 0]}>
          <div className="flex flex-col justify-between gap-4 w-full h-full">
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-5 lg:h-[72vh] overflow-y-auto"
            >
              <AccordionItem
                onClick={() => handlePageContentChange("item-1")}
                value="item-1"
                className="border border-[#463635] rounded-xl px-2 md:px-4"
              >
                <AccordionTrigger>
                  <div className="flex justify-start items-center gap-4">
                    {!allAgenda?.data.length ? (
                      <div className="border border-white rounded-full h-4 w-4" />
                    ) : (
                      <div className="bg-green-600 rounded-full p-0.5">
                        <GrFormCheckmark color="#fff" size={16} />
                      </div>
                    )}
                    <p className="font-pally-regular">ADD AGENDA</p>
                    <p className="text-[12px] font-pally-medium text-[#865503] px-1.5 py-0.5 no-underline bg-[#FBE2B7] rounded-lg">
                      OPTIONAL
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <AddAgenda />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                onClick={() => handlePageContentChange("item-2")}
                value="item-2"
                className="border border-[#463635] rounded-xl px-2 md:px-4"
              >
                <AccordionTrigger>
                  <div className="flex justify-start items-center gap-4">
                    {!allPhotos?.data.length ? (
                      <div className="border border-white rounded-full h-4 w-4" />
                    ) : (
                      <div className="bg-green-600 rounded-full p-0.5">
                        <GrFormCheckmark color="#fff" size={16} />
                      </div>
                    )}
                    <p className="font-pally-regular">ADD PHOTO/VIDEO</p>
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
                className="border border-[#463635] rounded-xl px-2 md:px-4"
              >
                <AccordionTrigger>
                  <div className="flex justify-start items-center gap-4">
                    {!allGuests?.data.length ? (
                      <div className="border border-white rounded-full h-4 w-4" />
                    ) : (
                      <div className="bg-green-600 rounded-full p-0.5">
                        <GrFormCheckmark color="#fff" size={16} />
                      </div>
                    )}
                    <p className="font-pally-regular">GUEST LIST</p>
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
                className="border border-[#463635] rounded-xl px-2 md:px-4"
              >
                <AccordionTrigger>
                  <div className="flex justify-start items-center gap-4">
                    {!allVendor?.data.length ? (
                      <div className="border border-white rounded-full h-4 w-4" />
                    ) : (
                      <div className="bg-green-600 rounded-full p-0.5">
                        <GrFormCheckmark color="#fff" size={16} />
                      </div>
                    )}
                    <p className="font-pally-regular">ADD VENDORS</p>
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
                className="border border-[#463635] rounded-xl px-2 md:px-4"
              >
                <AccordionTrigger>
                  <div className="flex justify-start items-center gap-4">
                    {!eventById?.data?.refundPolicyAgreed ? (
                      <div className="border border-white rounded-full h-4 w-4" />
                    ) : (
                      <div className="bg-green-600 rounded-full p-0.5">
                        <GrFormCheckmark color="#fff" size={16} />
                      </div>
                    )}
                    <p className="font-pally-regular">REFUND POLICY</p>
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
                    disabled={ isPending}
                    onClick={handleSubmit}
                    variant="destructive"
                  >
                    {isPending ? <Spinner /> : "Next"}
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
