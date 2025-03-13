"use client";

import React, { useState } from "react";
import Intro from "../Intro";
import FormContainer from "../FormContainer";
import PhysicalForm from "./PhysicalForm";
import OnlineForm from "./OnlineForm";
import { useGetEvent } from "@/hooks/events/useGetEvent";

const pageContents = [
  "For physical events, ensure the address is correct to avoid confusion and use the map pin to give attendees a visual location.",
  "For virtual events, double-check the link and access instructions to ensure they are correct and easily understandable.",
  "Clearly indicate if your event has both physical and virtual attendance options, and provide details for both.",
];

const StepFour: React.FC = () => {
  const { data: event } = useGetEvent();
  const [locationType, setLocationType] = useState<string>(
    event?.data?.locationType || "physical"
  );

  const locationTypes = () => {
    if (event?.data?.locationType === "physical") {
      return [
        {
          id: "physical",
          name: "Physical",
        },
      ];
    } else if (event?.data?.locationType === "online") {
      return [
        {
          id: "online",
          name: "Online",
        },
      ];
    } else {
      return [
        {
          id: "physical",
          name: "Physical",
        },
        {
          id: "online",
          name: "Online",
        },
      ];
    }
  };

  // handle event type change
  const handleClick = (id: string) => {
    setLocationType(id);
  };

  return (
    <div
      className="flex w-full flex-col lg:flex-row items-start gap-4 md:gap-12
    "
    >
      <div className="w-full lg:w-2/5 lg:px-0">
        <Intro
          contents={pageContents}
          title="Where will your event take place?"
        />
      </div>
      <div className="w-full lg:w-3/5">
        <FormContainer
          formTitle="Basic Information"
          currPosition={[100, 60, 0]}
        >
          <div className="flex flex-wrap justify-start items-end gap-5 p-4">
            <h3 className="font-pally-medium md:text-xl">
              What’s your location type:
            </h3>

            <div className="flex flex-wrap gap-4 text-white">
              {locationTypes().map((location) => (
                <button
                  key={location.id}
                  onClick={() => handleClick(location.id)}
                  className={`py-1 lg:py-2 px-1.5 lg:px-4 text-sm lg:text-base rounded-full border ${
                    locationType === location.id
                      ? "bg-white text-black"
                      : "border-white"
                  }`}
                >
                  {location.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 px-4">
            {locationType === "physical" ? (
              <PhysicalForm locationType={locationType} />
            ) : (
              <OnlineForm locationType={locationType} />
            )}
          </div>
        </FormContainer>
      </div>
    </div>
  );
};

export default StepFour;
