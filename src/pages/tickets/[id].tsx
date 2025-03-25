"use client";

import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import Layout from "@/components/layout";
import TicketDetail from "@/components/page-components/user-dashboard/tickets/TicketDetail";
import TicketSummary from "@/components/page-components/user-dashboard/tickets/TicketSummary";
import { ticketbreadcrumbArr } from "@/static-datas/breadcrumb-data";
import Container from "@/tw-components/container";
import { Section } from "@/tw-components/Section";
import { useParams } from "next/navigation";
import React, { useState } from "react";
// import { useRouter } from "next/router";
import { useGetEventTickets } from "@/pages/api/mutate/tickets";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";
import { Button } from "@/components/ui/button";

const TicketDetailPage = () => {
  const param = useParams<{ id: string }>();
  const [page, setPage] = useState<number>(1);
  const { data: response, isLoading } = useGetEventTickets(param?.id, page);
  //   Temporary routing
  if (!param?.id) {
    return <div>Not Found!!</div>;
  }

  const incrementPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const decrementPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <Layout title="Ticket detail page" showHeader showFooter>
      <Section id="ticket-detail-page">
        {isLoading && <SpinnerOverlay />}
        <Container>
          <BreadcrumbComponent
            breadcrumbArr={ticketbreadcrumbArr}
            pageName={response?.data?.event?.eventName}
          />

          <div className="mt-7 flex flex-col md:flex-row gap-8 md:gap-10 w-full">
            <div className="w-full lg:max-w-md">
              <TicketDetail
                event={response?.data?.event}
                tickets={response?.data?.tickets?.tickets}
              />
            </div>
            <div className="w-full">
              <TicketSummary
                user={response?.data?.user}
                eventName={response?.data?.event?.eventName}
                address={response?.data?.event?.address}
                tickets={response?.data?.tickets}
                startDate={response?.data?.event?.startDate}
              />

              {response?.data?.tickets?.total > 0 && (
                <div className="flex justify-end gap-10 items-center whitespace-nowrap w-full overflow-x-auto pb-4 mt-6">
                  <p className="text-sm text-gray-600">
                    Page {response?.data?.tickets?.page} of{" "}
                    {response?.data?.tickets?.totalPages}
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      disabled={response?.data?.tickets?.page <= 1}
                      onClick={decrementPage}
                      variant="outline"
                      size="icon"
                    >
                      {"<"}
                    </Button>

                    <Button
                      disabled={
                        Number(response?.data?.tickets?.page) ===
                        Number(response?.data?.tickets?.totalPages)
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
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
};

export default TicketDetailPage;
