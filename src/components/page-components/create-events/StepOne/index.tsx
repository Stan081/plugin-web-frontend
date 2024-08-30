"use client";
import React from "react";
import Intro from "../Intro";
import FormContainer from "../FormContainer";
import { StepsProps } from "@/pages/create-event";
import { Button } from "@/components/ui/button";

const pageContents = [
  "Make your event name short and memorable.",
  "Focus on unique aspects to make your description engaging.",
];

const StepOne: React.FC<StepsProps> = ({ next, previous }) => {

    const handleClick =() => {
        next()
    }
  return (
    <div className="flex items-start">
      <div className="w-full lg:w-1/2">
        <Intro contents={pageContents} title="Tell us about your event " />
      </div>
      <div className="w-full lg:w-1/2">
        <FormContainer
          formTitle="Basic Information"
          currPosition={[20, 0, 0]}
          nextStep={next}
          previousStep={previous}
        >
          <div onClick={handleClick}>
            <Button>hi</Button>
          </div>
        </FormContainer>
      </div>
    </div>
  );
};

export default StepOne;
