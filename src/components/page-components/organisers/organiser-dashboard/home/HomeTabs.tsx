import React, { Fragment, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Container from "@/tw-components/container";
import HomeTabCard from "./HomeTabCard";
import { useMe } from "@/pages/api/query/me";
import { useGetOrganiserEvents } from "@/hooks/organiser/userGetOrganiserEvents";
import { Skeleton } from "@/components/ui/skeleton";
import CardEmptyState from "./CardEmptyState";

const tabLink = [
  { title: "Upcoming Events", key: "upcoming" },
  { title: "Currently Happening", key: "current" },
];

const HomeTabs = () => {
  const { data: user } = useMe();
  const {
    data: organiserEvents,
    isError,
    isLoading,
  } = useGetOrganiserEvents(user?.data?._id);

  const [isActive, setIsActive] = useState<string>("upcoming");

  const now = new Date();

  const upcomingEvents = organiserEvents?.data?.filter((item) => {
    const startDate = new Date(
      item?.startDate || item?.startDate
    );
    return item.isPublished === true && startDate > now;
  });

  const currentEvents = organiserEvents?.data?.filter((item) => {
    const startDate = new Date(
      item?.startDate || item?.startDate
    );
    const endDate = new Date(
      item?.endDate || item?.endDate
    );
    return item.isPublished === true && now >= startDate && now <= endDate;
  });

  if (isError) {
    return <p>An error occurred when fetching events</p>;
  }

  return (
    <Container>
      <ul className="flex justify-start items-center gap-4 align-baseline whitespace-nowrap overflow-x-auto pb-4">
        {tabLink.map((tab) => (
          <li key={tab.key} role="presentation">
            <button
              className={`font-pally-regular p-1.5 md:py-2 md:px-3 rounded-3xl ${
                isActive === tab.key
                  ? "border border-[#101928]  text-[#101928]"
                  : " text-[#586170] "
              }`}
              role="tab"
              aria-selected={isActive === tab.key}
              aria-controls={`panel-${tab.key}`}
              id={`tab-${tab.key}`}
              onClick={() => setIsActive(tab.key)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setIsActive(tab.key);
                }
              }}
            >
              {tab.title}
            </button>
          </li>
        ))}
        {/* <Select onValueChange={(value) => setIsActive(value)}>
          <SelectTrigger className="w-[180px] border-none rounded-full font-pally-regular text text-[#586170] shadow-none">
            <SelectValue placeholder="Select Date" className="" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              <SelectLabel>Select date</SelectLabel>
              <SelectItem value="7">7 days</SelectItem>
              <SelectItem value="30">This month</SelectItem>
              <SelectItem value="60">Last month</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> */}
      </ul>

      <div
        id={`panel-${isActive}`}
        role="tabpanel"
        aria-labelledby={`tab-${isActive}`}
        className="mt-6 md:mt-10 flex flex-col gap-5 overflow-x-auto w-full pb-8"
      >
        {isLoading ? (
          <div className="flex gap-5">
            <Skeleton className="h-32 w-32 rounded-lg" />
            <div className="space-y-4">
              <Skeleton className=" h-7 w-56" />
              <Skeleton className=" h-7 w-40" />
              <Skeleton className=" h-7 w-28" />
            </div>
          </div>
        ) : (
          <Fragment>
            {isActive === "upcoming" && (
              <>
                {upcomingEvents?.length !== 0 ? (
                  upcomingEvents?.map((card) => (
                    <HomeTabCard key={card._id} card={card} />
                  ))
                ) : (
                  <CardEmptyState
                    text="You don’t have any events , Let’s create one"
                    isShow
                  />
                )}
              </>
            )}
            {isActive === "current" && (
              <>
                {currentEvents?.length !== 0 ? (
                  currentEvents?.map((card) => (
                    <HomeTabCard key={card._id} card={card} />
                  ))
                ) : (
                  <CardEmptyState text="No current event" />
                )}
              </>
            )}
          </Fragment>
        )}
      </div>
    </Container>
  );
};

export default HomeTabs;
