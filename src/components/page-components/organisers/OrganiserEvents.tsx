import CardComponent from "@/components/CardComponent";
import { useGetOrganiserEvents } from "@/hooks/organiser/userGetOrganiserEvents";
import CardSkeleton from "@/tw-components/skeleton/CardSkeleton";
import React, { FC, Fragment, useState } from "react";

const OrganiserEvents: FC<{ orgId: string }> = ({ orgId }) => {
  console.log(orgId);
  const { data: organiserEvents, isLoading } = useGetOrganiserEvents(orgId);

  // Define state fo tab
  const [isActive, setIsActive] = useState<string>("upcoming");

  const now = new Date();
  console.log("events",organiserEvents)

  const upcomingEvents = organiserEvents?.data?.filter((item) => {
    const startDate = new Date(
      item?.startDate || item?.startDate
    );
    return item.isPublished === true && startDate > now;
  });

  const pastEvents = organiserEvents?.data?.filter((item) => {
    const endDate = new Date(
      item?.endDate || item?.endDate
    );
    return item.isPublished === true && endDate < now;
  });

  const tabLink = [
    { title: "Upcoming event", key: "upcoming" },
    { title: "Past event", key: "past" },
  ];
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start w-full mx-auto gap-8 ">
      <div className="w-[400px] ml-40" />
      <div className="w-full max-w-5xl mt-3 lg:mt-4">
        <ul className="flex justify-start items-start md:items-center gap-4 md:align-baseline">
          {tabLink.map((tab) => (
            <li key={tab.key} role="presentation">
              <button
                className={`border py-1 px-2 md:py-2 md:px-3 rounded-3xl ${
                  isActive === tab.key
                    ? "border-2 border-[#D9302A] text-[#D9302A]"
                    : "border-[#586170] text-[#586170]"
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
        </ul>
        <div
          id={`panel-${isActive}`}
          role="tabpanel"
          aria-labelledby={`tab-${isActive}`}
          className="mt-6 md:pb-20 pb-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto justify-items-center"
        >
          {isLoading ? (
            <CardSkeleton />
          ) : (
            <Fragment>
              {isActive === "upcoming" && (
                <>
                  {upcomingEvents?.length !== 0 ? (
                    upcomingEvents.map((card: any) => (
                      <CardComponent key={card._id} card={card} />
                    ))
                  ) : (
                    <p className="h-96 font-pally-regular text-gray-600">
                      No Upcoming event
                    </p>
                  )}
                </>
              )}
              {isActive === "past" && (
                <>
                  {pastEvents?.length !== 0 ? (
                    pastEvents.map((card: any) => (
                      <CardComponent key={card._id} card={card} />
                    ))
                  ) : (
                    <p className="h-96 font-pally-regular text-gray-600">
                      No past event
                    </p>
                  )}
                </>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganiserEvents;
