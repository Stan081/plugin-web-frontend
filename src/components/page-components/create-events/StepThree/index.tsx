import { StepsProps } from "@/pages/create-event";
import React from "react";
import Intro from "../Intro";
import FormContainer from "../FormContainer";

const pageContents = [
  "Double-check dates and times to avoid scheduling conflicts.",
  "Clearly indicate if the event has multiple occurrences.",
];

const StepThree: React.FC<StepsProps> = ({ next, previous }) => {
  return (
    <div className="flex items-start gap-12">
      <div className="w-full lg:w-1/2">
        <Intro
          contents={pageContents}
          title="Specify when your event will take place."
        />
      </div>
      <div className="w-full lg:w-1/2">
        <FormContainer
          formTitle="Basic Information"
          currPosition={[60, 0, 0]}
        >
            <div className="flex flex-col justify-between gap-4 w-full h-full">
            step three
            </div>
        </FormContainer>
      </div>
    </div>
  );
};

export default StepThree;
