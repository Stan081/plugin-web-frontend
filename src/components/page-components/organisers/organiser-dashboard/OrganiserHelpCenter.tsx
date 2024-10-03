import Container from "@/tw-components/container";
import React from "react";
import { HiOutlineTicket } from "react-icons/hi";
import { TbTargetArrow } from "react-icons/tb";
import { CgFileDocument } from "react-icons/cg";
import { HiOutlineSpeakerphone } from "react-icons/hi";

const helpLinks = [
  {
    icon: <HiOutlineTicket size={32} color="#667185" />,
    title: " Ticket Management",
  },
  {
    icon: <TbTargetArrow size={32} color="#667185" />,
    title: "Check-In Issues",
  },
  {
    icon: <CgFileDocument size={32} color="#667185" />,
    title: " Attendee Management",
  },
  {
    icon: <HiOutlineSpeakerphone size={32} color="#667185" />,
    title: "Setting up Promotions",
  },
];

const OrganiserHelpCenter = () => {
  return (
    <Container className="">
      <div className="bg-[#F6F7F8] rounded-xl p-3 md:p-8 ">
        <div>
          <div className="space-y-1.5">
            <h2 className="text-[#2E394C] font-pally-medium text-2xl">
              Help Center{" "}
            </h2>
            <p className="text-[#2E394C] font-pally-regular text-base mdtext-lg">
              Follow the checklist below to complete profile set-up
            </p>
          </div>

          <ul className="mt-6 flex flex-col lg:flex-row gap-6">
            {helpLinks.map((center, index) => (
              <li
                key={index}
                className="bg-white flex-1 rounded-xl py-8 "
              >
                <div className="flex flex-col items-center justify-center gap-5">
                  <div className="bg-[#F0F2F5] rounded-full p-3 flex justify-center items-center w-16 h-16 space-y-12">
                    {center.icon}
                  </div>
                  <p className="text-[#2E394C] font-pally-medium text-xl">
                    {center.title}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default OrganiserHelpCenter;
