import Container from "@/tw-components/container";
import React, { useState } from "react";
import { BsCalendar4Week } from "react-icons/bs";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { PiBankDuotone } from "react-icons/pi";
import { RiArrowRightSLine } from "react-icons/ri";
import Link from "next/link";
import { useMe } from "@/pages/api/query/me";
import { useGetOrganiserEvents } from "@/hooks/organiser/userGetOrganiserEvents";
import AddAccount from "../earnings/AddAccount";
import { useCheckAddedAccount } from "@/hooks/organiser/organiser-earnings/useCheckAddedAccount";

const CompleteSetUp = () => {
  const [isCompleted, setIsComplete] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data: user } = useMe();
  const { data: organiserEvents } = useGetOrganiserEvents(user?.data?._id);
  const { data: checkBankStatus } = useCheckAddedAccount();

  const setUp = [
    {
      id: 1,
      icon: <BsCalendar4Week size={28} color="#667185" />,
      title: " Publish an event",
      description:
        "Create and publish events for attendees all around the world",
      completed: organiserEvents?.data[0]?.isPublished,
      path: "/#",
      button: "Create Event",
    },
    {
      id: 2,
      icon: <HiOutlineUserCircle size={28} color="#667185" />,
      title: "Set-up Organizer Profile",
      description: "Highlight your brand by your name, image and bio",
      completed: user?.data?.isOrganizer,
      path: "/organiser/organiser-settings",
      button: "Set-up Profile",
    },
    {
      id: 3,
      icon: <PiBankDuotone size={28} color="#667185" />,
      title: "Add pay-out account",
      description:
        "Add an account where we can send all your funds to when you make a withdrawal",
      completed: checkBankStatus?.data?.hasAccount,
      path: "action",
      button: "Add Payout Details",
    },
  ];
  return (
    <Container className="my-12">
      {showModal && (
        <AddAccount open={showModal} close={() => setShowModal(!showModal)} />
      )}
      <div className="space-y-2">
        <h2 className="text-[#2E394C] font-pally-medium text-3xl">
          Complete account set-up
        </h2>
        <p className="font-pally-regular text-[#2E394C] text-base">
          Follow the checklist below to complete profile set-up
        </p>
      </div>

      <ul className="mt-5 flex flex-col lg:flex-row gap-6">
        {setUp.map((item) => (
          <li
            key={item.id}
            className="border flex-1 border-[#EBEBEB] rounded-xl p-4 md:p-6 flex gap-5 items-center"
          >
            <div className="rounded-full bg-[#F0F2F5] p-5">{item.icon}</div>
            <div className="space-y-1.5">
              <p className="font-pally-medium text-[#2E394C] text-base">
                {item.title}
              </p>
              <p className="font-pally-regular text-[#2E394C] text-sm">
                {item.description}
              </p>
              {!isCompleted === item.completed ? (
                <p className="font-pally-regular  text-[#40B869] text-sm flex items-center gap-2">
                  Completed{" "}
                  <span className="inline">
                    {" "}
                    <RiCheckboxCircleFill />
                  </span>
                </p>
              ) : (
                <>
                  {item.path === "action" ? (
                    <p
                      onClick={() => setShowModal(!showModal)}
                      className="font-pally-regular cursor-pointer text-[#D9302A] text-sm flex items-center gap-2"
                    >
                      {item.button}
                      <span className="inline">
                        {" "}
                        <RiArrowRightSLine />
                      </span>
                    </p>
                  ) : (
                    <Link href={item.path} className="block">
                      <p className="font-pally-regular text-[#D9302A] text-sm flex items-center gap-2">
                        {item.button}
                        <span className="inline">
                          {" "}
                          <RiArrowRightSLine />
                        </span>
                      </p>
                    </Link>
                  )}
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default CompleteSetUp;
