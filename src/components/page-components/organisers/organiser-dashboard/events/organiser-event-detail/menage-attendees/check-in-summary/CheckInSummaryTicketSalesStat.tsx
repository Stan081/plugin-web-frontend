import { Section } from "@/tw-components/Section";
import React from "react";
import ticket from "../../../../../../../../../public/images/ticket.png";
import badge from "../../../../../../../../../public/images/badge.png";
import trend from "../../../../../../../../../public/images/trend.png";
import Image from "next/image";
import { useEventsContext } from "@/providers/events.provider";
import { useGetEventSummary } from "@/hooks/organiser/useGetEventSummary";

const CheckInSummaryTicketSalesStat = () => {
  const { publishedEventId } = useEventsContext();

  const { data: summary, isLoading } = useGetEventSummary(publishedEventId);
  const statDetails = [
    {
      icon: ticket,
      label: "Tickets sold",
      count: summary?.data?.ticketDistribution?.sold,
    },
    {
      icon: badge,
      label: "Total Check-ins",
      count: summary?.data?.checkedInUsers,
    },
    {
      icon: trend,
      label: " Check-in rate",
      count: `${summary?.data?.checkInRate}%`,
    },
  ];

  return (
    <Section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {/* Tickets Sold */}
      {statDetails.map((stat) => {
        return (
          <div
            key={stat.label}
            className="w-full min-w-40 p-4 border border-[#1019280D] rounded-lg flex items-start lg:items-center gap-5"
          >
            <figure className="relative size-9 lg:size-12">
              <Image
                fill={true}
                src={stat.icon}
                alt="Ticket"
                className="object-contain"
              />
            </figure>
            <div>
              <p className="font-pally-medium text-xl lg:text-3xl text-[#101928]">
                {stat.count}
              </p>
              <p className="font-pally-medium text-sm text-[#667185]">
                {stat.label}
              </p>
            </div>
          </div>
        );
      })}
    </Section>
  );
};

export default CheckInSummaryTicketSalesStat;
