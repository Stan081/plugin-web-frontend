import { StepsProps } from "@/pages/create-event";
import React from "react";
import Intro from "../Intro";
import FormContainer from "../FormContainer";

const pageContents = [
  "Break down the event into segments (e.g., welcome drinks, painting session, cocktail break).",
  "Ensure the agenda flows smoothly and includes buffer times.",
];

const StepFive: React.FC<StepsProps> = ({ next, previous }) => {
  return (
    <div className="flex items-start gap-12">
      <div className="w-full lg:w-1/2">
        <Intro
          contents={pageContents}
          title="Outline the schedule of activities for 
                your event."
        />
      </div>
      <div className="w-full lg:w-1/2">
        <FormContainer formTitle="Event Details" currPosition={[100, 20, 0]}>
          <div className="flex flex-col justify-between gap-4 w-full h-full">
            Step five
          </div>
        </FormContainer>
      </div>
    </div>
  );
};

export default StepFive;
