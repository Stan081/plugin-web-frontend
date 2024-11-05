import CardComponent from "@/components/CardComponent";
import GoBack from "@/components/GoBack";
import Layout from "@/components/layout";
import SearchComponent from "@/components/page-components/user-dashboard/SearchComponent";
import TicketComponent from "@/components/TicketComponent";
import { Separator } from "@/components/ui/separator";
import { cardData } from "@/static-datas/cards-data";
import { Section } from "@/tw-components/Section";
import React from "react";

const SavedEvents = () => {
  return (
    <Layout title="Saved events" showHeader showFooter showSidebar>
      <Section
        id="saved-events"
        className="md:px-10 overflow-y-auto w-full lg:max-w-7xl"
      >
        <div className="mt-4 flex gap-3">
          <GoBack />
          <h2 className="font-pally-medium text-2xl mb-4">Saved Events</h2>
        </div>
        <Separator />

        <div className="flex items-center justify-between gap-4">
          <p className="text-[#AFB2B9] font-pally-regular text-sm md:text-base whitespace-nowrap">
            10 saved events
          </p>
          <SearchComponent placeholder="Search for saved events by name" />
        </div>

        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-9 py-6">
          {/* {cardData.map((card) => (
            <CardComponent key={card.id} {...card} />
          ))} */}
        </div>
        <div className="block md:hidden">
          <TicketComponent tickets={cardData} />
        </div>
      </Section>
    </Layout>
  );
};

export default SavedEvents;
