"use client"
import { StepsProps } from "@/pages/create-event";
import React, { useState } from "react";
import Intro from "../Intro";
import FormContainer from "../FormContainer";
import OneTimeForm from "./OneTimeForm";
import RecurringForm from "./RecurringForm";

const pageContents = [
  "Double-check dates and times to avoid scheduling conflicts.",
  "Clearly indicate if the event has multiple occurrences.",
];

const eventTypes: { id: string; name: string }[] = [
  {
    id: "one-time",
    name: "One-time",
  },
  {
    id: "recurring",
    name: "Recurring",
  },
];

const StepThree: React.FC<StepsProps> = ({ next, previous }) => {
  const [eventType, setEventType] = useState<string>("one-time");

  // handle event type change
  const handleClick = (id: string) => {
    setEventType(id);
  };

  return (
    <div className="flex items-start gap-12">
      <div className="w-full lg:w-1/2">
        <Intro
          contents={pageContents}
          title="Specify when your event will take place."
        />
      </div>
      <div className="w-full lg:w-1/2">
        <FormContainer formTitle="Basic Information" currPosition={[60, 0, 0]}>
          <div>
            <h3 className="font-pally-medium md:text-lg">
              Will this be a one-time event or a recurring one ?
            </h3>

            <div className="flex flex-wrap gap-4 mt-5 text-white">
              {eventTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleClick(type.id)}
                  className={`py-2 px-4 rounded-full border ${
                    eventType === type.id
                      ? "bg-white text-black"
                      : "border-white"
                  }`}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-pally-medium md:text-lg">
              Choose the category that best describes your event
            </h4>

            {eventType === "one-time" ? (
              <OneTimeForm next={next} previous={previous} />
            ) : (
              <RecurringForm next={next} previous={previous}  />
            )}
          </div>
        </FormContainer>
      </div>
    </div>
  );
};

export default StepThree;
