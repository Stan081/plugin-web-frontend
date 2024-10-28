import React from "react";
import Image from "next/image";
import { Section } from "@/tw-components/Section";
import ticketingFeesData from "@/static-datas/ticketing-fees-data";

const TicketingFees = () => {
  return (
    <Section className="flex justify-center gap-32 w-[80%] mx-auto py-40">
      <div className="flex items-center">
        <figure className="relative size-[25rem]">
          <Image
            fill={true}
            src="https://res.cloudinary.com/dbhbyikta/image/upload/v1730119374/pricing-images/pie-chart.png"
            alt="Pie Chart"
            className="object-contain"
          />
        </figure>
      </div>
      <div className="w-1/2 flex items-center">
        <div className="space-y-8">
          <h2 className="font-pally-medium text-4xl text-[#020912]">
            Simple And Transparent
            <br /> Ticketing Fees
          </h2>
          <p className="font-pally-regular text-base text-[#212121]">
            Plugin ensures smooth ticketing with a transparent 10% commission on
            paid tickets, while free tickets come at no cost to you,
          </p>
          <div className="flex flex-wrap justify-between gap-y-5">
            {ticketingFeesData.map((data) => {
              return (
                <div key={data.text} className="flex gap-2 w-1/2">
                  <figure className="size-8 bg-black rounded-full"></figure>
                  <p className="font-pally-regular text-base text-[#212121] text-wrap">
                    {data.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default TicketingFees;
