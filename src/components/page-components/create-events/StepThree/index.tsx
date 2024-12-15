"use client";
import React, { Fragment, useState } from "react";
import Intro from "../Intro";
import FormContainer from "../FormContainer";
import OneTimeFormComponent from "./OneTimeForm";
import RecurringForm from "./RecurringForm";
import { Section } from "@/tw-components/Section";

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

const StepThree: React.FC= () => {
  const [eventType, setEventType] = useState<string>("one-time");

  // handle event type change
  const handleClick = (id: string) => {
    setEventType(id);
  };

  return (
    <div className="flex flex-col lg:flex-row items-start gap-4 md:gap-12 md:h-screen">
      <div className="w-full lg:w-2/5 lg:px-0">
        <Intro
          contents={pageContents}
          title="Specify when your event will take place."
        />
      </div>
      <div className="w-full lg:w-3/5 bg-[#f0ded1]">
        <FormContainer formTitle="Basic Information" currPosition={[100, 20, 0]}>
          <Fragment>
            <h3 className="font-pally-medium md:text-lg pt-4 px-4">
              Will this be a one-time event or a recurring one ?
            </h3>

            <div className="flex flex-wrap gap-4 mt-5 text-white px-4">
              {eventTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleClick(type.id)}
                  className={`py-1 lg:py-2 px-1.5 lg:px-4 text-sm lg:text-base rounded-full border ${
                    eventType === type.id
                      ? "bg-white text-black"
                      : "border-white"
                  }`}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </Fragment>

          <div className="mt-6 px-4">
            <p className="font-pally-medium md:text-lg">
              Choose the category that best describes your event
            </p>

            {eventType === "one-time" ? (
              <OneTimeFormComponent eventType={eventType} />
            ) : (
              <RecurringForm eventType={eventType} />
            )}
          </div>
        </FormContainer>
      </div>
    </div>
  );
};

export default StepThree;
