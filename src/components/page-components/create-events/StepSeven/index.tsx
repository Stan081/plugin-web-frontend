import React, { useCallback } from "react";
import Side1 from "./Side1";
import FormContainer from "../FormContainer";
import PublishComponent from "./PublishComponent";

const StepSeven = () => {
  return (
    <div className="flex items-start gap-12 overflow-hidden">
      <Side1 />
      <div className="w-full lg:w-1/2">
        <FormContainer
          formTitle="Basic Information"
          currPosition={[100, 100, 50]}
        >
          <div className="overflow-hidden">
            <PublishComponent />
          </div>
        </FormContainer>
      </div>
    </div>
  );
};

export default StepSeven;
