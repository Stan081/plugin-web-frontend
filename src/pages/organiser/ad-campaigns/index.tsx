import CampaignHeader from '@/components/page-components/organisers/organiser-dashboard/ad-campaigne/CampaignHeader'
import OurPackages from '@/components/page-components/organisers/organiser-dashboard/ad-campaigne/OurPackages'
import OrganiserHeader from '@/components/page-components/organisers/organiser-dashboard/OrganiserHeader'
import React, { Fragment, useEffect } from 'react'
import { getToken } from "@/lib/token";
import { useCreateEventContext } from "@/providers/create_event.provider";
import { useRouter } from "next/navigation";
import { removeCookie } from "@/lib/cookies";
import { useMe } from '@/pages/api/query/me';

const OrganiserAdCampaigns = () => {
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
      else {router.replace("/")};
    } else {
      router.push("/login");
    }
  }, [router]);
  return (
    <Fragment>
      <OrganiserHeader/>
      <CampaignHeader/>
      <OurPackages/>
    </Fragment>
  )
}

export default OrganiserAdCampaigns