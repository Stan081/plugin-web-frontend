"use client";

import OrganiserPlans from "@/components/page-components/organisers/organiser-dashboard/OrganiserPlans";
import OrganiserProfile from "@/components/page-components/organisers/organiser-dashboard/organiser-settings/OrganiserProfile";
import OrganiserHeader from "@/components/page-components/organisers/organiser-dashboard/OrganiserHeader";
import Container from "@/tw-components/container";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useCreateEventContext } from "@/providers/create_event.provider";
import { useMe } from "../api/query/me";
import { getToken } from "@/lib/token";
import { removeCookie } from "@/lib/cookies";

const tabLink = [
  { title: "Organizer profile", key: "profile" },
  { title: "Campaign plans", key: "plans" },
];

const OrganiserSettings = () => {
  const [settingState, setSettingState] = useState<string>("profile");

   const { setCurrentStep } = useCreateEventContext();
    const { data: userData } = useMe();
  
    const token = getToken();
    const router = useRouter();
  
    useEffect(() => {
       if (!token || !userData) return;
   
       if (userData?.data?.isOrganizer) {
         removeCookie("event_id");
         setCurrentStep(1);
       } else {
         router.push("/login");
       }
     }, [router, token, userData, setCurrentStep]);
  return (
    <Fragment>
      <OrganiserHeader />
      <div className="bg-gray-100 pt-6 md:pt-9">
        <Container className="space-y-5">
          <p
            onClick={() => router.back()}
            className="flex cursor-pointer items-center gap-2 font-pally-medium text-lg"
          >
            <span>
              <RiArrowLeftSLine size={20} />
            </span>
            Back
          </p>

          <h1 className="text-[#2E394C] font-pally-medium text-4xl">
            Organiser Settings
          </h1>

          <ul className=" flex justify-start items-center gap-4 align-baseline">
            {tabLink.map((tab) => (
              <li key={tab.key} role="presentation">
                <button
                  className={`font-pally-regular py-2 px-3 ${
                    settingState === tab.key
                      ? "border-b-2 border-[#D9302A] text-[#D9302A] bg-[#f3cac9] rounded-tr-xl rounded-tl-xl"
                      : " text-[#586170]"
                  }`}
                  role="tab"
                  aria-selected={settingState === tab.key}
                  aria-controls={`panel-${tab.key}`}
                  id={`tab-${tab.key}`}
                  onClick={() => setSettingState(tab.key)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSettingState(tab.key);
                    }
                  }}
                >
                  {tab.title}
                </button>
              </li>
            ))}
          </ul>
        </Container>
      </div>
      <div
        id={`panel-${settingState}`}
        role="tabpanel"
        aria-labelledby={`tab-${settingState}`}
        className="mt-6 md:mt-10"
      >
        {settingState === "profile" && <OrganiserProfile />}
        {settingState === "plans" && <OrganiserPlans />}
      </div>
    </Fragment>
  );
};

export default OrganiserSettings;
