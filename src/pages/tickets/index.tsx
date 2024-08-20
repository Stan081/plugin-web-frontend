"use client";

import GoBack from "@/components/GoBack";
import Layout from "@/components/layout";
import SearchComponent from "@/components/page-components/user-dashboard/SearchComponent";
import TicketComponent from "@/components/TicketComponent";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cardData } from "@/static-datas/cards-data";
import { Section } from "@/tw-components/Section";
import React, { useState } from "react";

const TicketPage = () => {
  const [isActive, setIsActive] = useState<string>("my-tickets");
  return (
    <Layout title="Your tickets" showHeader showFooter showSidebar>
      <Section
        id="user-account-settings"
        className="md:px-10 overflow-y-auto w-full lg:max-w-7xl"
      >
        <div className="flex gap-3">
          <GoBack />
          <h2 className="font-pally-medium text-2xl mb-4">Tickets</h2>
        </div>
        <Separator />

        <div className="flex flex-col-reverse md:flex-row items-center justify-between md:mt-4 mb-4">
          <div className="space-x-4 md:space-x-6">
            <Button
              aria-label="button"
              onClick={() => setIsActive("my-tickets")}
              variant="outline"
              className={isActive === `my-tickets` ? `bg-gray-200` : ``}
            >
              My tickets
            </Button>
            <Button
              aria-label="button"
              onClick={() => setIsActive("past-tickets")}
              variant="outline"
              className={isActive === `past-tickets` ? `bg-gray-200` : ``}
            >
              Past tickets
            </Button>
          </div>
          <SearchComponent placeholder="Search for ticket's name" />
        </div>

        {isActive === "my-tickets" && <TicketComponent tickets={cardData} />}
        {isActive === "past-tickets" && <TicketComponent tickets={cardData} />}
      </Section>
    </Layout>
  );
};

export default TicketPage;
