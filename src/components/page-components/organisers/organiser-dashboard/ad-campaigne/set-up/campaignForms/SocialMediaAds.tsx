import { useOrganiserDashContext } from '@/providers/organiser_dashboard.provider';
import React from 'react'

const SocialMediaAds = () => {
    const { clickedCampaignId, nextSetUpStep } = useOrganiserDashContext();
  return (
    <div >{clickedCampaignId}</div>
  )
}

export default SocialMediaAds