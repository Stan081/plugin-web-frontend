import CampaignHeader from '@/components/page-components/organisers/organiser-dashboard/ad-campaigne/CampaignHeader'
import OurPackages from '@/components/page-components/organisers/organiser-dashboard/ad-campaigne/OurPackages'
import OrganiserHeader from '@/components/page-components/organisers/organiser-dashboard/OrganiserHeader'
import React, { Fragment } from 'react'

const OrganiserAdCampaigns = () => {
  return (
    <Fragment>
      <OrganiserHeader/>
      <CampaignHeader/>
      <OurPackages/>
    </Fragment>
  )
}

export default OrganiserAdCampaigns