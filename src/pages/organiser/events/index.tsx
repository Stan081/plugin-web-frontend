import OrganiserEventHead from "@/components/page-components/organisers/organiser-dashboard/events/OrganiserEventHead";
import OrganiserEventTab from "@/components/page-components/organisers/organiser-dashboard/events/OrganiserEventTab";
import OrganiserHeader from "@/components/page-components/organisers/organiser-dashboard/OrganiserHeader";
import { removeCookie } from "@/lib/cookies";
import { useCreateEventContext } from "@/providers/create_event.provider";
import React, { Fragment, useEffect } from "react";

const OrganiserEvent = () => {
  const { currentStep, setCurrentStep } = useCreateEventContext();
  useEffect(() => {
    removeCookie("event_id");
    setCurrentStep(1);
  }, [setCurrentStep]);
  return (
    <Fragment>
      <OrganiserHeader />
      <OrganiserEventHead />
      <OrganiserEventTab />
    </Fragment>
  );
};

export default OrganiserEvent;

