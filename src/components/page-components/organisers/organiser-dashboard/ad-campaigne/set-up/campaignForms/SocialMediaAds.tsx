import { useOrganiserDashContext } from '@/providers/organiser_dashboard.provider';
import React from 'react'

const SocialMediaAds = () => {
    const { isClickedCampaign, nextSetUpStep } = useOrganiserDashContext();
  return (
    <div >{isClickedCampaign}</div>
  )
}

export default SocialMediaAds