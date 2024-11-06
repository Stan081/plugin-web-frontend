import Container from "@/tw-components/container";
import Image from "next/image";
import React from "react";

const OrganiserTitle = () => {
  const OrganiserContent = () => {
    return (
      <div className="border-t-4 shadow-md border-[#281E172E] rounded-lg p-4 bg-[#F6F7F8] flex gap-4">
        <Image
          src={"/images/pitch-bg.png"}
          alt="Organiser"
          width={56}
          height={56}
          className="w-16 h-16 pointer-events-none object-cover rounded-md"
        />
        <div className="flex flex-col justify-between">
          <p className="text-lg text-[#101928] font-pally-medium">
            AFRONATION ‘24
          </p>
          <div className="flex items-center gap-4">
            <p className="text-[#667185] font-pally-regular text-base">
              2 Events Hosted
            </p>
            <div className="border border-[#667185] h-4" />
            <p className="text-[#667185] font-pally-regular text-base">
              36 followers
            </p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Container>
      <div className=" flex justify-between pt-9 pb-4 md:pt-20">
        <h1 className="text-[#2E394C] font-pally-bold text-5xl">
          Welcome Olivia
        </h1>
        <OrganiserContent />
      </div>
    </Container>
  );
};

export default OrganiserTitle;
