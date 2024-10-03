"use client"
import OrganiserHeader from "@/components/page-components/organisers/organiser-dashboard/OrganiserHeader";
import OrganiserHelpCenter from "@/components/page-components/organisers/organiser-dashboard/OrganiserHelpCenter";
import React, { Fragment } from "react";

const OrganiserPage = () => {
  return (
    <Fragment>
      <OrganiserHeader/>
      <OrganiserHelpCenter/>
    </Fragment>
  );
};

export default OrganiserPage;
