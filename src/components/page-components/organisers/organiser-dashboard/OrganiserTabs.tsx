import React, { useState } from 'react';
import { eventData, Event, EventStatus } from '@/static-datas/organiser-cards';
import OrganiserEventCard from './OrganiserEventCard';

const EventTabs = () => {
  const [activeTab, setActiveTab] = useState<EventStatus>('upcoming');

  const filteredEvents = eventData.filter(event => event.status === activeTab);

  return (
    <div className="mt-[32px]">
      {/* Tabs */}
      <div className="flex border-b border-gray-300">
        {(['upcoming', 'drafts', 'past'] as const).map((status) => (
          <button
            key={status}
            className={`py-2 px-4 text-sm font-pally-regular focus:outline-none ${
              activeTab === status ? 'border-b-2 border-red-500 text-red-500 bg-red-50 rounded-t-lg' : ''
            }`}
            onClick={() => setActiveTab(status)}
          >
            {status} ({eventData.filter(event => event.status === status).length})
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((event) => (
          <OrganiserEventCard
            key={event.id}
            title={event.title}
            date={event.date}
            location={event.location}
            visibility={event.visibility}
            ticketsSold={event.ticketsSold}
            totalTickets={event.totalTickets}
            imageUrl={event.imageUrl}
            status={event.status}
          />
        ))}
      </div>
    </div>
  );
};

export default EventTabs;
