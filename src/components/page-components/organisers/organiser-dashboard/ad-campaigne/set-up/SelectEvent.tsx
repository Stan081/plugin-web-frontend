import { Separator } from "@/components/ui/separator";
import { organiserData } from "@/static-datas/organiser-date";
import React, { useState } from "react";
import EventCardList from "./EventCardList";
import { Button } from "@/components/ui/button";
import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";

const SelectEvent = () => {
  const { handleIsChecked, nextSetUpStep } = useOrganiserDashContext();
  const [checkedEvents, setCheckedEvents] = useState<number>();

  const handleCheckboxChange = (id: number, isChecked: boolean) => {
    if (isChecked) {
      setCheckedEvents(id);
    } else {
      setCheckedEvents(null);
    }
  };

  const handleNext = () => {
    if (checkedEvents) {
      handleIsChecked("selectEventState");
      nextSetUpStep();
    }
  };
  return (
    <div className="w-full md:w-3/5 p-10 rounded-lg h-screen bg-white flex flex-col justify-between">
      <div>
        <div className="space-y-4">
          <h2 className="text-4xl font-pally-medium">
            Review and Start Campaign{" "}
          </h2>
          <p className="text-[#475367] font-pally-regular text-lg">
            Review your preferences before starting a campaign
          </p>
          <Separator />
        </div>

        <div className="mt-6">
          {organiserData[0].organiserEvents.map((item) => (
            <EventCardList
              key={item.id}
              {...item}
              onCheckboxChange={handleCheckboxChange}
            />
          ))}
        </div>
      </div>
      <div className="space-y-5">
        <Separator />
        <Button
          onClick={handleNext}
          disabled={checkedEvents === null}
          variant="destructive"
          className="w-full"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default SelectEvent;
