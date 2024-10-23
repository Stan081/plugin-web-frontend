import { Section } from "@/tw-components/Section";
import Image from "next/image";
import React from "react";

const DashboardManagement = () => {
  return (
    <Section className="h-screen w-full bg-[#211913]">
      <div className="trapezium size-full text-center flex items-center justify-center">
        <div className="py-20 size-full flex flex-col gap-[10%] items-center justify-center">
          <h2 className="font-pally-medium text-4xl leading-10 text-[#020912] w-[60%] mx-auto">
            Create, Manage, And Analyze Your Marketing
            <br /> Efforts Directly From The Dashboard
          </h2>
          {/* image */}
          <div className="w-[50%] h-full">
            <figure className="relative size-full">
              <Image
                fill={true}
                src="https://res.cloudinary.com/dbhbyikta/image/upload/v1729604919/features-images/pen-tablet.png"
                alt="Pen Tablet"
                className="object-scale-down object-top object-"
              />
            </figure>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default DashboardManagement;
