import { Button } from "@/components/ui/button";
import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";
import Container from "@/tw-components/container";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { LuCalendarPlus } from "react-icons/lu";

const tabLink = [
  { title: "Upcoming  events", key: "upcoming" },
  { title: "Drafts", key: "draft" },
  { title: "Past events", key: "past_event" },
];

const OrganiserEventHead = () => {
  const { eventState, setEventState } = useOrganiserDashContext();

  const router = useRouter();

  return (
    <div className="bg-gray-100 pt-6 md:pt-9">
      <Container className="flex justify-between items-start lg:items-center gap-4">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-[#2E394C] font-pally-medium text-xl lg:text-4xl">
                Events
              </h1>
              <p className="font-pally-regular w-full max-w-xl text-sm lg:text-base text-[#515A6A]">
                View and manage all your events here, from drafts to past events
              </p>
            </div>

            <Link href={"/create-event"} className="lg:hidden flex">
              <Button
                variant="destructive"
                className=" flex items-center gap-3"
              >
                <LuCalendarPlus size={26} className="hidden lg:flex" />
                Create event
              </Button>
            </Link>
          </div>

          <ul className=" flex justify-start items-center gap-4 align-baseline">
            {tabLink.map((tab) => (
              <li key={tab.key} role="presentation">
                <button
                  className={`font-pally-regular py-2 px-3 whitespace-nowrap ${
                    eventState === tab.key
                      ? "border-b-2 border-[#D9302A] text-[#D9302A] bg-[#f3cac9] rounded-tr-xl rounded-tl-xl"
                      : " text-[#586170]"
                  }`}
                  role="tab"
                  aria-selected={eventState === tab.key}
                  aria-controls={`panel-${tab.key}`}
                  id={`tab-${tab.key}`}
                  onClick={() => setEventState(tab.key)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setEventState(tab.key);
                    }
                  }}
                >
                  {tab.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <Link href={"/create-event"} className="hidden lg:flex">
          <Button variant="destructive" className=" flex items-center gap-3">
            <LuCalendarPlus size={26} className="hidden lg:flex" />
            Create event
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default OrganiserEventHead;
