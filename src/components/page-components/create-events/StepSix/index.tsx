import { StepsProps } from "@/pages/create-event";
import React, { FC } from "react";
import Intro from "../Intro";
import FormContainer from "../FormContainer";

const contents = [
  "Break down the event into segments (e.g., welcome drinks, painting session, cocktail break).",
  "Ensure the agenda flows smoothly and includes buffer times.",
];

const StepSix: FC<StepsProps> = ({ next, previous }) => {
  return (
    <div className="flex items-start gap-12">
      <div className="w-full lg:w-1/2">
        <Intro
          contents={contents}
          title={"Set up your ticketing options for attendees."}
        />
      </div>
      <div className="w-full lg:w-1/2">
        <FormContainer
          formTitle="Setting up Tickets"
          currPosition={[100, 50, 0]}
        >
          <div className="lg:h-[82vh] overflow-x-auto flex flex-col justify-between gap-4 w-full h-full">
            hello
          </div>
        </FormContainer>
      </div>
    </div>
  );
};

export default StepSix;
