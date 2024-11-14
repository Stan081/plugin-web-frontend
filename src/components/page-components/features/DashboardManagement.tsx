import { Section } from "@/tw-components/Section";
import Image from "next/image";
import React from "react";

const DashboardManagement = () => {
  return (
    <Section className="xs:max-md:h-auto w-full">
      <div className="bg-custom-gradient size-full text-center flex items-center justify-center">
        <div className="py-20 xs:max-md:py-10 size-full flex flex-col gap-[10%] items-center justify-center">
          <h2 className="font-pally-medium text-4xl xs:max-md:text-2xl leading-10 text-[#020912] w-[60%] xs:max-md:w-[90%] mx-auto">
            Create, Manage, And Analyze Your Marketing
            Efforts Directly From The Dashboard
          </h2>
          {/* image */}
          <div className="mt-20 xs:max-md:mt-10 w-[50%] aspect-square max-h-[600px] xs:max-md:h-[40vh] xs:max-md:min-w-auto xs:max-md:w-[90%] mx-auto">
            <figure className="relative size-full">
              <Image
                fill={true}
                src="https://res.cloudinary.com/dbhbyikta/image/upload/v1731568275/features-images/manage-dashboard.png"
                alt="Pen Tablet"
                className="object-contain"
              />
            </figure>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default DashboardManagement;
