import React from "react";
import Image from "next/image";
import { Section } from "@/tw-components/Section";
import ticketingFeesData from "@/static-datas/ticketing-fees-data";

const TicketingFees = () => {
  return (
    <Section className="flex xs:max-md:flex-col justify-center gap-[5vw] xs:max-md:gap-5 w-[80%] xs:max-md:w-[90%] mx-auto py-20 xs:max-md:pt-0">
      <div className="flex items-center xs:max-md:justify-center">
        <figure className="relative size-[25rem] xs:max-md:size-80">
          <Image
            fill={true}
            src="https://res.cloudinary.com/dbhbyikta/image/upload/v1730119374/pricing-images/pie-chart.png"
            alt="Pie Chart"
            className="object-contain"
          />
        </figure>
      </div>
      <div className="w-1/2 xs:max-md:w-full xs:max-md:text-center flex items-center xs:max-md:justify-center">
        <div className="space-y-8 xs:max-md:space-y-6 ">
          <div className="w-full xs:max-md:space-y-3">
            <h2 className="font-pally-medium text-4xl xs:max-md:text-3xl xs:max-md:w-[25rem] xs:max-md:mx-auto text-[#020912]">
              Simple And Transparent Ticketing Fees
            </h2>
            <p className="font-pally-regular xs:max-md:w-[80%] xs:max-md:mx-auto text-base text-[#212121]">
              Plugin ensures smooth ticketing with a transparent 10% commission
              on paid tickets, while free tickets come at no cost to you,
            </p>
          </div>

          <div className="flex w-full xs:max-md:flex-col flex-wrap justify-between gap-y-5">
            {ticketingFeesData.map((data) => {
              return (
                <div
                  key={data.text}
                  className="flex xs:max-md:items-center xs:max-md:ml-16 gap-2 xs:max-md:gap-4 w-1/2 min-w-[200px] xs:max-md:w-full"
                >
                  <figure className="size-8 min-w-8 xs:max-md:size-10 bg-black rounded-full"></figure>
                  <p className="font-pally-regular text-base xs:max-md:text-lg text-[#212121] text-wra">
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
