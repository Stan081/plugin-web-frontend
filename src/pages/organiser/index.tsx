"use client"
import CompleteSetUp from "@/components/page-components/organisers/organiser-dashboard/home/CompleteSetUp";
import OrganiserHomeTabs from "@/components/page-components/organisers/organiser-dashboard/home/HomeTabs";
import OrganiserTitle from "@/components/page-components/organisers/organiser-dashboard/home/OrganiserTitle";
import ResourceTips from "@/components/page-components/organisers/organiser-dashboard/home/ResourceTips";
import OrganiserHeader from "@/components/page-components/organisers/organiser-dashboard/OrganiserHeader";
import OrganiserHelpCenter from "@/components/page-components/organisers/organiser-dashboard/OrganiserHelpCenter";
import React, { Fragment } from "react";

const OrganiserPage = () => {
  return (
    <Fragment>
      <OrganiserHeader/>
      <OrganiserTitle/>
      <OrganiserHomeTabs/>
      <CompleteSetUp/>
      <ResourceTips/>
      <OrganiserHelpCenter/>
    </Fragment>
  );
};

export default OrganiserPage;
