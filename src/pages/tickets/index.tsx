import Layout from "@/components/layout";
import SearchComponent from "@/components/page-components/user-dashboard/SearchComponent";
import TicketComponent from "@/components/TicketComponent";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cardData } from "@/static-datas/cards-data";
import { Section } from "@/tw-components/Seaction";
import React, { useState } from "react";

const TicketPage = () => {
  const [isActive, setIsActive] = useState<string>("my-tickets");
  return (
    <Layout title="Your tickets" showHeader showFooter showSidebar>
      <Section
        id="user-account-settings"
        className="md:px-10 overflow-y-auto w-full lg:max-w-7xl h-[80vh]"
      >
        <h2 className="font-pally-medium text-2xl mb-4">Tickets</h2>
        <Separator />

        <div className="flex items-center justify-between mt-4 mb-4">
          <div className="space-x-4 md:space-x-6">
            <Button
              aria-label="button"
              onClick={() => setIsActive("my-tickets")}
              variant="outline"
            >
              My tickets
            </Button>
            <Button
              aria-label="button"
              onClick={() => setIsActive("past-tickets")}
              variant="outline"
            >
              Past tickets
            </Button>
          </div>
          <SearchComponent placeholder="Search for ticket's name" />
        </div>

        {isActive === "my-tickets" &&
          cardData.map((item) => <TicketComponent key={item.id} {...item} />)}
        {isActive === "past-tickets" &&
          cardData
            .slice(0, 2)
            .map((item) => <TicketComponent key={item.id} {...item} />)}
      </Section>
    </Layout>
  );
};

export default TicketPage;
