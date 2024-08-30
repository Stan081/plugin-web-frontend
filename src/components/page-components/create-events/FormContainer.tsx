"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import React, { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
  currPosition: number[];
  formTitle: string;
  previousStep: () => void;
  nextStep: () => void;
}
const FormContainer: React.FC<Props> = ({
  children,
  currPosition,
  formTitle,
  previousStep,
  nextStep,
}) => {
  const [currValue] = useState<number[]>(currPosition);

  return (
    <div className="bg-[#281E17] relative rounded-xl h-full text-white">
      <div className="p-6">
        <h2 className="text-lg md:text-xl font-pally-regular">{formTitle}</h2>
      </div>

      <div className="flex gap-4">
        {currValue.map((curr, index) => (
          <Progress key={index} value={curr} />
        ))}
      </div>
      <div className="mt-8 h-[55vh] whitespace-normal overflow-y-auto px-4 md:px-6">
        {children}
      </div>

      <div className="sticky z-50 bottom-0">
        <Separator />
        <div className="p-6 flex justify-between items-center">
          <Button
            onClick={() => {}}
            variant="outline"
            className="text-white border-white hover:bg-[#6c5442]"
          >
            Save Progress
          </Button>

          <div onClick={previousStep}  className="flex items-center gap-8">
            <Button className="cursor-pointer hover:outline hover:outline-white/50 p-2 rounded-lg">
              Back
            </Button>

            <Button onClick={nextStep} variant="destructive">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
