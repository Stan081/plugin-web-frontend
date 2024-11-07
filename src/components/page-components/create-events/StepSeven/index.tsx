"use client";
import React, { FC } from "react";
import Side1 from "./Side1";
import FormContainer from "../FormContainer";
import PublishComponent from "./PublishComponent";

const StepSeven: FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-start gap-4 md:gap-12 h-screen">
      <Side1 />
      <div className="w-full lg:w-3/5 lg:px-0">
        <FormContainer formTitle="Publish Event" currPosition={[100, 100, 100]}>
          <div className="overflow-hidden">
            <PublishComponent />
          </div>
        </FormContainer>
      </div>
    </div>
  );
};

export default StepSeven;
