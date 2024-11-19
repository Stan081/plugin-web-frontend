import { Section } from "@/tw-components/Section";
import React from "react";
import ticket from "../../../../../../../../../public/images/ticket.png";
import badge from "../../../../../../../../../public/images/badge.png";
import trend from "../../../../../../../../../public/images/trend.png";
import Image from "next/image";

const CheckInSummaryTicketSalesStat = () => {
  const statDetails = [
    {
      icon: ticket,
      label: "Tickets sold",
      count: "345",
    },
    {
      icon: badge,
      label: "Total Check-ins",
      count: "45",
    },
    {
      icon: trend,
      label: " Check-in rate",
      count: "45%",
    },
  ];

  return (
    <Section className="flex justify-between gap-5">
      {/* Tickets Sold */}
      {statDetails.map((stat) => {
        return (
          <div
            key={stat.label}
            className="w-[34%] p-4 border border-[#1019280D] rounded-lg flex items-center gap-5"
          >
            <figure className="relative size-12">
              <Image
                fill={true}
                src={stat.icon}
                alt="Ticket"
                className="object-contain"
              />
            </figure>
            <div>
              <p className="font-pally-medium text-3xl text-[#101928]">
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
