import React from 'react'
import SaleTable from './event-dashboard/EventDashboard'

const EventDetailTickets = () => {
  return (
    <div className='space-y-4'>
        <h2 className='font-pally-medium text-xl'>Ticket sales</h2>
        <SaleTable/>
    </div>
  )
}

export default EventDetailTickets