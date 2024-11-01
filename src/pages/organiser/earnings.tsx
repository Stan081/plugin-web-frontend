import EarningComponents from '@/components/page-components/organisers/organiser-dashboard/earnings/EarningComponents'
import EarningHeader from '@/components/page-components/organisers/organiser-dashboard/earnings/EarningHeader'
import OrganiserHeader from '@/components/page-components/organisers/organiser-dashboard/OrganiserHeader'
import React, { Fragment } from 'react'

const OrganiserEarnings = () => {
  return (
    <Fragment>
      <OrganiserHeader/>
      <EarningHeader/>
      <EarningComponents/>
    </Fragment>
  )
}

export default OrganiserEarnings