"use client";
import React, { FC, Fragment } from "react";
import Side1 from "./Side1";
import FormContainer from "../FormContainer";
import PublishComponent from "./PublishComponent";
import { useMe } from "@/pages/api/query/me";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";
import StepTracker from "../StepTracker";

const StepSeven: FC = () => {
  const { data: userData, isLoading } = useMe();
  return (
    <div className="flex flex-col lg:flex-row items-start justify-between gap-4 md:gap-12 h-full lg:h-screen">
      <Fragment>
        {isLoading ? (
          <SpinnerOverlay />
        ) : (
          <Fragment>
            {userData?.data?.role === "organizer" &&
            userData?.data?.isOrganizer ? (
              <div className="w-full lg:w-2/5 lg:px-0">
                <StepTracker />
              </div>
            ) : (
              <Fragment>
                <Side1 />
              </Fragment>
            )}
          </Fragment>
        )}
      </Fragment>
      <div className="w-full lg:w-3/5 lg:px-0">
        <FormContainer formTitle="Publish Event" currPosition={[100, 100, 100]}>
          <div className="overflow-hidden p-4">
            <PublishComponent />
          </div>
        </FormContainer>
      </div>
    </div>
  );
};

export default StepSeven;
