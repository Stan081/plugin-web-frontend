"use client";
import CompleteSetUp from "@/components/page-components/organisers/organiser-dashboard/home/CompleteSetUp";
import OrganiserHomeTabs from "@/components/page-components/organisers/organiser-dashboard/home/HomeTabs";
import OrganiserTitle from "@/components/page-components/organisers/organiser-dashboard/home/OrganiserTitle";
import ResourceTips from "@/components/page-components/organisers/organiser-dashboard/home/ResourceTips";
import OrganiserHeader from "@/components/page-components/organisers/organiser-dashboard/OrganiserHeader";
import OrganiserHelpCenter from "@/components/page-components/organisers/organiser-dashboard/OrganiserHelpCenter";
import { getToken } from "@/lib/token";
import { useCreateEventContext } from "@/providers/create_event.provider";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect } from "react";
import { useMe } from "../api/query/me";
import { removeCookie } from "@/lib/cookies";

const OrganiserPage = () => {
  const { setCurrentStep } = useCreateEventContext();
  const { data: userData } = useMe();

  const token = getToken();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      if (userData?.data?.isOrganizer) {
        setCurrentStep(1);
        removeCookie('event_id')
      }
      return;
    } else {
      router.push("/login");
    }
  }, [router]);
  return (
    <Fragment>
      <OrganiserHeader />
      <OrganiserTitle />
      <OrganiserHomeTabs />
      <CompleteSetUp />
      <ResourceTips />
      <OrganiserHelpCenter />
    </Fragment>
  );
};

export default OrganiserPage;
