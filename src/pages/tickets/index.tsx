"use client";

import GoBack from "@/components/GoBack";
import Layout from "@/components/layout";
import SearchComponent from "@/components/page-components/user-dashboard/SearchComponent";
import TicketComponent from "@/components/TicketComponent";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Section } from "@/tw-components/Section";
import React, { Fragment, useEffect, useState } from "react";
import { useGetTicketEvents } from "../api/mutate/tickets";
import { Skeleton } from "@/components/ui/skeleton";
import { getToken } from "@/lib/token";
import { useRouter } from "next/router";
import { TbTicketOff } from "react-icons/tb";

const TicketPage = () => {
  const [isActive, setIsActive] = useState<string>("my-tickets");
  const [page, setPage] = useState<number>(1);
  const { data: ticketData, isLoading } = useGetTicketEvents(page);
  const token = getToken();
  const router = useRouter();
  const eventList = ticketData?.data?.events;

  useEffect(() => {
    if (token) {
      return;
    } else {
      router.replace("/login");
    }
  }, [router]);


  const incrementPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const decrementPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <Layout title="Your tickets" showHeader showFooter showSidebar>
      <Section
        id="user-account-settings"
        className="md:px-10 overflow-y-auto flex flex-col justify-between w-full lg:max-w-7xl"
      >
        <div>
          <div className="mt-4 flex gap-3">
            <GoBack />
            <h2 className="font-pally-medium text-2xl mb-4">Tickets</h2>
          </div>
          {ticketData?.data?.length !== 0 ? (
            <Fragment>
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

              {isLoading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <>
                  {isActive === "my-tickets" && (
                    <TicketComponent tickets={eventList?.activeEvents} />
                  )}
                  {isActive === "past-tickets" && (
                    <TicketComponent tickets={eventList?.pastEvents} />
                  )}
                </>
              )}
            </Fragment>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <TbTicketOff size={60} />
              <p className="font-pally-regular destructive w-full h-full flex justify-center">
                No ticket receipt yet
              </p>
            </div>
          )}
        </div>

        {ticketData?.data?.total > 0 && (
          <div className="flex justify-end gap-10 items-center whitespace-nowrap w-full overflow-x-auto pb-4 mt-6">
            <p className="text-sm text-gray-600">
              Page {ticketData?.data?.page} of {ticketData?.data?.totalPages}
            </p>
            <div className="flex space-x-2">
              <Button
                disabled={ticketData?.data?.page <= 1}
                onClick={decrementPage}
                variant="outline"
                size="icon"
              >
                {"<"}
              </Button>

              <Button
                disabled={
                  Number(ticketData?.data?.page) ===
                  Number(ticketData?.data?.totalPages)
                }
                onClick={incrementPage}
                variant="outline"
                size="icon"
              >
                {">"}
              </Button>
            </div>
          </div>
        )}
      </Section>
    </Layout>
  );
};

export default TicketPage;
