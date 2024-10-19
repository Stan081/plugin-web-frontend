"use client";

import { StepsProps } from "@/pages/create-event";
import React, { useState } from "react";
import Intro from "../Intro";
import FormContainer from "../FormContainer";
import PhysicalForm from "./PhysicalForm";
import OnlineForm from "./OnlineForm";

const pageContents = [
  "For physical events, ensure the address is correct to avoid confusion and use the map pin to give attendees a visual location.",
  "For virtual events, double-check the link and access instructions to ensure they are correct and easily understandable.",
  "Clearly indicate if your event has both physical and virtual attendance options, and provide details for both.",
];

const locationTypes: { id: string; name: string }[] = [
  {
    id: "physical",
    name: "Physical",
  },
  {
    id: "online",
    name: "Online",
  },
];

const StepFour: React.FC<StepsProps> = ({ next, previous }) => {
  const [locationType, setLocationType] = useState<string>("physical");

  // handle event type change
  const handleClick = (id: string) => {
    setLocationType(id);
  };

  return (
    <div
      className="flex flex-col lg:flex-row items-start gap-4 md:gap-12
    "
    >
      <div className="w-full lg:w-1/2  px-4 lg:px-0">
        <Intro
          contents={pageContents}
          title="Where will your event take place?"
        />
      </div>
      <div className="w-full lg:w-1/2">
        <FormContainer formTitle="Basic Information" currPosition={[80, 0, 0]}>
          <div className="flex flex-wrap justify-start items-end gap-5">
            <h3 className="font-pally-medium md:text-xl">
              What’s your location type:
            </h3>

            <div className="flex flex-wrap gap-4 text-white">
              {locationTypes.map((location) => (
                <button
                  key={location.id}
                  onClick={() => handleClick(location.id)}
                  className={`py-2 px-4 rounded-full border ${
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

          <div className="mt-6">
            {locationType === "physical" ? (
              <PhysicalForm
                locationType={locationType}
                next={next}
                previous={previous}
              />
            ) : (
              <OnlineForm
                locationType={locationType}
                next={next}
                previous={previous}
              />
            )}
          </div>
        </FormContainer>
      </div>
    </div>
  );
};

export default StepFour;
