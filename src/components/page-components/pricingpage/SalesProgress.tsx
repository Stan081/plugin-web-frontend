import React from "react";
import Image from "next/image";
import { Section } from "@/tw-components/Section";
import benefitsData from "@/static-datas/benefits-data";

const SalesProgress = () => {
  return (
    <Section className="bg-whiteNoise py-40">
      <div className="w-[80%] mx-auto space-y-28">
        {benefitsData.map((benefits) => {
          return (
            <div
              key={benefits.title}
              className="flex even:flex-row-reverse gap-24 "
            >
              <div className="w-[40%] space-y-5">
                <h2 className="font-pally-medium text-4xl text-[#020912]">
                  {benefits.title}
                </h2>
                <p className="font-pally-regular text-lg text-[#475367]">
                  {benefits.body}
                </p>
              </div>
              <div className={`relative w-[60%] h-[60vh] `}>
                <Image
                  fill={true}
                  src={benefits.imageURL}
                  alt="Studio Display"
                  className="object-cover"
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
