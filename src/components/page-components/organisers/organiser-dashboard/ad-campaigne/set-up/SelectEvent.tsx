"use client";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import EventCardList from "./EventCardList";
import { Button } from "@/components/ui/button";
import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";
import { useMe } from "@/pages/api/query/me";
import { useGetOrganiserEvents } from "@/hooks/organiser/userGetOrganiserEvents";
import { Skeleton } from "@/components/ui/skeleton";

const SelectEvent = () => {
  const { handleIsChecked, nextSetUpStep, setCheckedEvent, checkedEvent } =
    useOrganiserDashContext();
  const { data: user } = useMe();
  const {
    data: organiserEvents,
    isLoading,
    isError,
  } = useGetOrganiserEvents(user?.data?._id);


  const handleCheckboxChange = (id: string, isChecked: boolean) => {
    setCheckedEvent(isChecked ? id : null);
  };

  const handleNext = () => {
    if (checkedEvent === null) {
      alert("Please select an event before proceeding.");
    } else {
      handleIsChecked("selectEventState");
      nextSetUpStep();
      console.log("eventId:", checkedEvent);
    }
  };

  const now = new Date();

  const currentEvents = organiserEvents?.data?.data.filter((item) => {
    const startDate = new Date(
      item?.oneTimeEvent?.startDate || item?.recurringEvent?.startDate
    );
    return item.isPublished === true && startDate > now;
  });

  if (isError) {
    return (
      <div className="w-full md:w-3/5 p-10 rounded-lg h-screen bg-white flex flex-col justify-center items-center">
        <p className="text-red-500 text-center">
          An error occurred while fetching events.
        </p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="w-full md:w-3/5 p-10 rounded-lg h-screen bg-white flex flex-col justify-between">
      <div>
        <div className="space-y-4">
          <h2 className="text-4xl font-pally-medium">Select event</h2>
          <p className="text-[#475367] font-pally-regular text-lg">
            Choose an event to start this campaign
          </p>
          <Separator />
        </div>

        <div className="mt-6">
          {isLoading ? (
            Array(3)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} className="w-full h-16 my-2" />
              ))
          ) : (
            <>
              {currentEvents?.length !== 0 ? (
                currentEvents?.map((item) => (
                  <EventCardList
                    key={item._id}
                    event={item}
                    checkedEvent={checkedEvent}
                    onCheckboxChange={handleCheckboxChange}
                  />
                ))
              ) : (
                <p className="font-pally-regular underline text-red-500">
                  You don’t have any current events.
                </p>
              )}
            </>
          )}
        </div>
      </div>

      <div className="w-full">
        <Separator />
        <div className="mt-5 flex justify-end">
          <Button
            onClick={handleNext}
            disabled={checkedEvent === null}
            variant="destructive"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectEvent;
