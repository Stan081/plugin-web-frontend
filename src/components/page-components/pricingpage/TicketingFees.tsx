import React from "react";
import Image from "next/image";
import { Section } from "@/tw-components/Section";
import ticketingFeesData from "@/static-datas/ticketing-fees-data";
import Container from "@/tw-components/container";

const TicketingFees = () => {
  return (
    <Container className="flex xs:max-lg:flex-col gap-6 lg:gap-10 xs:max-md:gap-5 py-8 justify-center items-center lg:py-20 xs:max-md:pt-0">
      <figure className="relative size-[12rem] md:size-80 flex w-full justify-center">
        <Image
          fill={true}
          src="https://res.cloudinary.com/dbhbyikta/image/upload/v1730119374/pricing-images/pie-chart.png"
          alt="Pie Chart"
          className="object-contain"
        />
      </figure>
      <div className="overflow-hidden  mx-10 lg:px-0 flex">
        <div className="space-y-6 ">
          <div className="w-full xs:max-md:space-y-3 text-center lg:text-start ">
            <h2 className=" whitespace-nowrap font-pally-medium text-2xl lg:text-3xl text-[#020912]">
              Simple And Transparent <br /> Ticketing Fees
            </h2>
            <p className="font-pally-regular md:mx-auto pt-2 text-base text-[#464646]">
              Plugin ensures smooth ticketing with a transparent 10% commission
              on paid tickets, while free tickets come at no cost to you,
            </p>
          </div>

          <div className="flex xs:max-md:flex-col lg:flex-wrap gap-5">
            {ticketingFeesData.map((data) => {
              return (
                <div
                  key={data.text}
                  className="flex xs:max-md:items-center xs:max-md:ml-6 gap-2"
                >
                  <figure className="h-5 w-5 bg-black rounded-full"></figure>
                  <p className="font-pally-regular text-sm lg:text-base text-[#212121] text-wra">
                    {data.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TicketingFees;
