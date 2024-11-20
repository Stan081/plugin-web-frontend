import React from "react";
import Image from "next/image";
import { Section } from "@/tw-components/Section";
import benefitsData from "@/static-datas/benefits-data";

const SalesProgress = () => {
  return (
    <Section className=" bg-whiteNoise py-40 xs:max-md:py-10">
      <div className="w-[90%] mx-auto space-y-28 xs:max-md:space-y-10">
        {benefitsData.map((benefits) => {
          return (
            <div
              key={benefits.title}
              className="flex xs:max-md:flex-col even:xs:max-md:flex-col even:flex-row-reverse gap-24 xs:max-md:gap-3 "
            >
              <div className="w-[40%] xs:max-md:w-full xs:max-md:space-y-2 space-y-5">
                <h2 className="font-pally-medium text-4xl xs:max-md:text-3xl text-[#020912]">
                  {benefits.title}
                </h2>
                <p className="font-pally-regular text-lg xs:max-md:text-base text-[#475367]">
                  {benefits.body}
                </p>
              </div>
              <div className={`relative w-[70%] xs:max-md:w-full aspect-[1/0.6]`}>
                <Image
                  fill={true}
                  src={benefits.imageURL}
                  alt="Studio Display"
                  className="object-cover xs:max-md:object-contain object-top xs:max-md:object-left rounded-2xl"
                />
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default SalesProgress;
