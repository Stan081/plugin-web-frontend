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
      <OrganiserHeader/>
      <EarningHeader/>
      <EarningComponents/>
    </Fragment>
  )
}

export default OrganiserEarnings