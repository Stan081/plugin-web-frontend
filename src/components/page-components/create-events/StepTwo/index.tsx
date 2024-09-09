"use client";

import React, { useState } from "react";
import Intro from "../Intro";
import FormContainer from "../FormContainer";
import { StepsProps } from "@/pages/create-event";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { categoriesData, EventCategory } from "@/static-datas/create-event";
// import Cookies from "js-cookie";

const pageContents = ["Think about the primary audience for your event."];

const StepTwo: React.FC<StepsProps> = ({ next, previous }) => {
  const [categories, setCategories] = useState<EventCategory[]>(categoriesData);
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const handleClick = (name: string) => {
    const updatedCategories = categories.map((category) =>
      category.name === name
        ? { ...category, selected: !category.selected }
        : category
    );
    setCategories(updatedCategories);

    const selectedCategories = updatedCategories
      .filter((category) => category.selected)
      .map((category) => category.name);
    // Cookies.set("selectedCategories", JSON.stringify(selectedCategories));
    setSelectedNames(selectedCategories);
  };

  return (
    <div className="flex items-start gap-12">
      <div className="w-full lg:w-1/2">
        <Intro
          contents={pageContents}
          title="What kind of events do you organize?"
        />
      </div>
      <div className="w-full lg:w-1/2">
        <FormContainer formTitle="Basic Information" currPosition={[40, 0, 0]}>
          <div className="flex flex-col justify-between gap-4 w-full h-full">
            <div className="h-[64vh] whitespace-normal overflow-y-auto">
              <h3 className="font-pally-medium md:text-lg">
                Choose the category that best describes your event
              </h3>
              <div className="flex flex-wrap gap-4 mt-5 text-white">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => handleClick(category.name)}
                    className={`py-2 px-4 rounded-full border ${
                      category.selected ? "bg-white text-black" : "border-white"
                    }`}
                  >
                    {category.name}
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
                    onClick={previous}
                    className="cursor-pointer hover:outline hover:outline-white/50 p-2 rounded-lg"
                  >
                    Back
                  </Button>

                  <Button
                    disabled={selectedNames.length < 1}
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

export default StepTwo;
