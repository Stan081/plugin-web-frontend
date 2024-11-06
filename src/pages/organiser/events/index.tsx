import OrganiserEventHead from "@/components/page-components/organisers/organiser-dashboard/events/OrganiserEventHead";
import OrganiserEventTab from "@/components/page-components/organisers/organiser-dashboard/events/OrganiserEventTab";
import OrganiserHeader from "@/components/page-components/organisers/organiser-dashboard/OrganiserHeader";
import React, { Fragment } from "react";

const OrganiserEvent = () => {
  return (
    <Fragment>
      <OrganiserHeader />
      <OrganiserEventHead />
      <OrganiserEventTab/>
    </Fragment>
  );
};

export default OrganiserEvent;
