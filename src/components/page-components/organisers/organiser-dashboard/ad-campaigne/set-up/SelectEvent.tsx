import { Separator } from "@/components/ui/separator";
import { organiserData } from "@/static-datas/organiser-date";
import React, { useState } from "react";
import EventCardList from "./EventCardList";
import { Button } from "@/components/ui/button";
import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";

const SelectEvent = () => {
  const { handleIsChecked, nextSetUpStep } = useOrganiserDashContext();
  const [checkedEvent, setCheckedEvent] = useState<number | null>();

  const handleCheckboxChange = (id: number, isChecked: boolean) => {
    if (isChecked) {
      setCheckedEvent(id);
    } else {
      setCheckedEvent(null);
    }
  };

  const handleNext = () => {
    if (checkedEvent) {
      handleIsChecked("selectEventState");
      nextSetUpStep();
    }
  };
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
          {organiserData[0].organiserEvents.map((item) => (
            <EventCardList
              key={item.id}
              {...item}
              onCheckboxChange={handleCheckboxChange}
              checkedEvent={checkedEvent}
            />
          ))}
        </div>
      </div>

      <div className="w-full">
        <Separator />
        <div className="mt-5 flex justify-end ">
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
