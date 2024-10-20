import OrganiserEventHead from "@/components/page-components/organisers/organiser-dashboard/events/OrganiserEventHead";
import OrganiserHeader from "@/components/page-components/organisers/organiser-dashboard/OrganiserHeader";
import React, { Fragment } from "react";

const OrganiserEvent = () => {
  return (
    <Fragment>
      <OrganiserHeader />
      <OrganiserEventHead />
    </Fragment>
  );
};

export default OrganiserEvent;
