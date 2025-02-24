import OrganiserEventHead from "@/components/page-components/organisers/organiser-dashboard/events/OrganiserEventHead";
import OrganiserEventTab from "@/components/page-components/organisers/organiser-dashboard/events/OrganiserEventTab";
import OrganiserHeader from "@/components/page-components/organisers/organiser-dashboard/OrganiserHeader";
import { removeCookie } from "@/lib/cookies";
import { useCreateEventContext } from "@/providers/create_event.provider";
import React, { Fragment, useEffect } from "react";
import { getToken } from "@/lib/token";
import { useRouter } from "next/navigation";
import { useMe } from "@/pages/api/query/me";

const OrganiserEvent = () => {
  const { setCurrentStep } = useCreateEventContext();
  const { data: userData } = useMe();

  const token = getToken();
  const router = useRouter();

  useEffect(() => {
    if (!token || !userData) return;

    if (userData?.data?.isOrganizer) {
      removeCookie("event_id");
      setCurrentStep(1);
    } else {
      router.push("/login");
    }
  }, [router, token, userData, setCurrentStep]);
  return (
    <Fragment>
      <OrganiserHeader />
      <OrganiserEventHead />
      <OrganiserEventTab />
    </Fragment>
  );
};

export default OrganiserEvent;
