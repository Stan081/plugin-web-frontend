import EarningComponents from '@/components/page-components/organisers/organiser-dashboard/earnings/EarningComponents'
import EarningHeader from '@/components/page-components/organisers/organiser-dashboard/earnings/EarningHeader'
import OrganiserHeader from '@/components/page-components/organisers/organiser-dashboard/OrganiserHeader'
import React, { Fragment, useEffect } from 'react'
import { getToken } from "@/lib/token";
import { useCreateEventContext } from "@/providers/create_event.provider";
import { useRouter } from "next/navigation";
import { useMe } from "../api/query/me";
import { removeCookie } from "@/lib/cookies";

const OrganiserEarnings = () => {
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
      <OrganiserHeader/>
      <EarningHeader/>
      <EarningComponents/>
    </Fragment>
  )
}

export default OrganiserEarnings