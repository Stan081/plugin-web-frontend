"use client";

import React, { useState } from "react";
import Intro from "../Intro";
import FormContainer from "../FormContainer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { categoriesData } from "@/static-datas/create-event";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { EventCategoryAPI } from "@/pages/api/mutate/create-events/eventCategory";
import Spinner from "@/tw-components/spinner";
import { useGetEventById } from "@/hooks/events/useGetEventById";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";
import { useCreateEventContext } from "@/providers/create_event.provider";

const pageContents = ["Think about the primary audience for your event."];

const StepTwo: React.FC = () => {
  const { data: eventId, isLoading } = useGetEventById();
  const {
    nextStep: next,
  } = useCreateEventContext();
  const [selectedNames, setSelectedNames] = useState<string[]>(
    eventId?.data?.eventCategory || []
  );

  const { toast } = useToast();
  const client = useQueryClient();

  const handleClick = (category: string) => {
    // Toggle selection by checking if the category is already in selectedNames
    setSelectedNames((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((name) => name !== category)
        : [...prevSelected, category]
    );
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => EventCategoryAPI(data),
    onSuccess: (response) => {
      if (response?.message) {
        toast({
          variant: "success",
          title: "Uploaded successfully",
          description: `${response?.message}`,
        });
        client.invalidateQueries({ queryKey: ["eventID"] });
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

  const handleSubmit = () => {
    const data = {
      eventCategory: [...selectedNames],
    };
    mutate(data);
    console.log(data);
  };

  return (
    <div className="flex flex-col lg:flex-row items-start gap-4 md:gap-12">
      {isLoading && <SpinnerOverlay />}
      <div className="w-full lg:w-2/5 px-4 lg:px-0">
        <Intro
          contents={pageContents}
          title="What kind of events do you organize?"
        />
      </div>
      <div className="w-full h-full lg:w-3/5 mb-5">
        <FormContainer formTitle="Basic Information" currPosition={[80, 0, 0]}>
          <div className="flex flex-col justify-between gap-4 w-full h-full">
            <div className="h-[60vh] whitespace-normal overflow-y-auto">
              <h3 className="font-pally-medium md:text-lg">
                Choose the category that best describes your event
              </h3>
              <div className="flex flex-wrap gap-4 mt-5 text-white">
                {categoriesData.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => handleClick(category)}
                    className={`py-2 px-4 rounded-full border ${
                      selectedNames.includes(category)
                        ? "bg-white text-black"
                        : "border-white"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="sticky z-50 bottom-0 bg-[#281E17]">
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
                    disabled={selectedNames.length < 1 || isPending}
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

export default StepTwo;
