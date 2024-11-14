import React from "react";
import { Section } from "@/tw-components/Section";
import Image from "next/image";

const DashboardFeatures = () => {
  const features = [
    {
      title: "Event Overview",
      details:
        "Get a snapshot of your event’s key metrics: ticket sales, attendance rate, campaign performance, and more — all in one place",
      bgColor: "bg-[#FFF1F0]",
      imageURL:
        "https://res.cloudinary.com/dbhbyikta/image/upload/v1729599910/features-images/event-overview.png",
    },
    {
      title: "Ticket Sales Monitoring",
      details:
        "Track real-time sales across different ticket types. Customize seating and pricing easily",
      bgColor: "bg-[#FBF1E1]",
      imageURL:
        "https://res.cloudinary.com/dbhbyikta/image/upload/v1729602804/features-images/ticket-distribution.png",
      extraImgURL:
        "https://res.cloudinary.com/dbhbyikta/image/upload/v1729603109/features-images/ticket-sold.png",
    },
    {
      title: "Check-in Managment",
      details:
        "Efficiently manage guest check-ins with QR codes, see who’s checked in, and view the remaining expected attendees",
      bgColor: "bg-[#E7ECF8]",
      imageURL:
        "https://res.cloudinary.com/dbhbyikta/image/upload/v1729603012/features-images/check-in.png",
    },
  ];

  return (
    <Section className="py-20 xs:max-md:py-10 px-28 xs:max-md:px-5 space-y-20 xs:max-md:space-y-10">
      <div className="text-center space-y-3 xs:max-md:space-y-1">
        <h2 className="font-pally-medium text-4xl xs:max-md:text-3xl text-[#020912]">
          Dashboard Features
        </h2>
        <p className="font-pally-regular text-lg text-[#212121]">
          Discover how our amazing customers create unforgettable events with us
        </p>
      </div>
      <div className="flex overflow-auto no-scrollbar py-5 xs:max-md:flex-col gap-10">
        {features.map((card, index) => {
          return (
            <div
              key={card.title}
              className={`${card.bgColor} w-1/3 xs:max-md:w-full xs:max-md:mx-auto features-card-shadow rounded-lg flex flex-col gap-5 justify-between`}
            >
              {/* text section */}
              <div className="px-5 py-6 space-y-4">
                <p className="font-pally-medium text-xl text-[#020912]">
                  {card.title}
                </p>
                <p className="font-pally-regular text-base text-[#586170]">
                  {card.details}
                </p>
              </div>

              {/* image section */}
              <div className="relative h-[40vh] xs:max-md:max-h-[300px] w-fulls xs:max-md:jusify-end flex items-center justify-center">
                {index % 2 === 0 && (
                  <figure className="absolute right-0 w-full left-5 h-full rounded-tl-xl overflow-hidden">
                    <Image
                      fill={true}
                      src={card.imageURL}
                      alt={`${card.title} Image`}
                      className="object-cover xs:max-md:object-right"
                    />
                  </figure>
                )}
                {index % 2 === 1 && (
                  <figure className="relative w-[70%] min-w-[350px] xs:max-md:w-[90%] h-full rounded-xl">
                    {/* extra image */}
                    <figure className="absolute z-10 w-[70%] left-[40%] xs:max-md:left-[47%] xs:max-md:w-44 -top-1 h-[20%] rounded-xl">
                      <Image
                        fill={true}
                        src={card.extraImgURL}
                        alt="extra image card"
                        className="object-cover "
                      />
                    </figure>

                    <Image
                      fill={true}
                      src={card.imageURL}
                      alt={`${card.title} Image`}
                      className="object-cover xs:max-md:object-contain -mt-2"
                    />
                  </figure>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default DashboardFeatures;
