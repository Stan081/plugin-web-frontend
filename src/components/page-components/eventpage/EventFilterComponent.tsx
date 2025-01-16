"use client";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterParams } from "@/hooks/events/useFilterEvents";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EventFilterComponent = ({
  onApplyFilters,
}: {
  onApplyFilters: (filters: any) => void;
}) => {
  // State variables for each dropdown
  const [isEventTypeOpen, setIsEventTypeOpen] = useState<boolean>(true);
  const [isSelectDate, setIsSelectDate] = useState<boolean>(true);
  const [isPriceRange, setIsPriceRange] = useState<boolean>(true);
  const [isEventLocation, setIsEventLocation] = useState<boolean>(true);

  const [filters, setFilters] = useState({
    minPrice: null,
    maxPrice: null,
    locationType: "",
    eventType: "",
    startDate: null,
    endDate: null,
  });

  const handleEventTypeToggle = () => {
    setIsEventTypeOpen((prevState) => !prevState);
  };


  const handleSelectDateToggle = () => {
    setIsSelectDate((prevState) => !prevState);
  };

  const handlePriceRangeToggle = () => {
    setIsPriceRange((prevState) => !prevState);
  };

  const handleEventLocationToggle = () => {
    setIsEventLocation((prevState) => !prevState);
  };

  // Handle checkbox change for locationType and eventType
  const handleCheckboxChange = (
    type: "locationType" | "eventType",
    value: string
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: prevFilters[type] === value ? "" : value,
    }));
  };

  // Handle input change for minPrice and maxPrice
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "minPrice" | "maxPrice" | "startDate" | "endDate"
  ) => {
    const { value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value ? parseInt(value, 10) : 0,
      startDate: value,
      endDate: value,
    }));
  };

  const handleDateInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "startDate" | "endDate"
  ) => {
    const { value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value,
    }));
  };

  // Handle filter submission
  const applyFilters = () => {
    onApplyFilters(filters);
  };

  return (
    <div className="w-[230px] hidden lg:block ">
      {/* Event Type Section */}
      <div className="border-b flex-col pb-4">
        <div className="flex justify-between items-center mt-3">
          <p className="text-lg md:text-lg font-light font-pally-medium">
            Event Type
          </p>
          <div onClick={handleEventTypeToggle} className="cursor-pointer">
            {isEventTypeOpen ? (
              <IoIosArrowUp size={20} />
            ) : (
              <IoIosArrowDown size={20} />
            )}
          </div>
        </div>
        {/* Toggleable content for Event Type */}
        {isEventTypeOpen && (
          <div className="mt-2">
            <div className="flex gap-4 pb-3">
              <Checkbox
                checked={filters.eventType === "one-time"}
                onCheckedChange={() =>
                  handleCheckboxChange("eventType", "one-time")
                }
              />
              <p className="text-sm font-pally-regular">One-time</p>
            </div>
            <div className="flex gap-4">
              <Checkbox
                checked={filters.eventType === "recurring"}
                onCheckedChange={() =>
                  handleCheckboxChange("eventType", "recurring")
                }
              />
              <p className="text-sm font-pally-regular">Recurring</p>
            </div>
          </div>
        )}
      </div>

      
      <div className="border-b flex-col pb-4">
        <div
          onClick={handlePriceRangeToggle}
          className="flex justify-between items-center mt-3"
        >
          <p className="text-sm md:text-base font-light font-pally-medium">
            Price Range
          </p>
          <div className="cursor-pointer">
            {isPriceRange ? (
              <IoIosArrowUp size={20} />
            ) : (
              <IoIosArrowDown size={20} />
            )}
          </div>
        </div>
        {/* Toggleable content for Sort By */}
        {isPriceRange && (
          <div className="flex flex-col gap-3 mt-2">
            <div className="flex items-center gap-2">
              <label
                htmlFor="minPrice"
                className="text-sm font-pally-regular whitespace-nowrap"
              >
                Min Price:
              </label>
              <Input
                id="minPrice"
                type="number"
                value={filters.minPrice}
                onChange={(e) => handleInputChange(e, "minPrice")}
                className="w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="maxPrice"
                className="text-sm font-pally-regular whitespace-nowrap"
              >
                Max Price:
              </label>
              <Input
                id="maxPrice"
                type="number"
                value={filters.maxPrice}
                onChange={(e) => handleInputChange(e, "maxPrice")}
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>
      {/* Event Location */}
      <div className="border-b flex-col pb-4">
        <div className="flex justify-between items-center mt-3">
          <p className="text-lg md:text-lg font-light font-pally-medium">
            Event Location
          </p>
          <div onClick={handleEventLocationToggle} className="cursor-pointer">
            {isEventLocation ? (
              <IoIosArrowUp size={20} />
            ) : (
              <IoIosArrowDown size={20} />
            )}
          </div>
        </div>
        {/* Toggleable content for Sort By */}
        {isEventLocation && (
          <div className="mt-2">
            <div className="flex gap-4 pb-3">
              <Checkbox
                checked={filters.locationType === "physical"}
                onCheckedChange={() =>
                  handleCheckboxChange("locationType", "physical")
                }
              />
              <p className="text-sm font-pally-regular">Physical</p>
            </div>
            <div className="flex gap-4">
              <Checkbox
                checked={filters.locationType === "online"}
                onCheckedChange={() =>
                  handleCheckboxChange("locationType", "online")
                }
              />
              <p className="text-sm font-pally-regular">Virtual</p>
            </div>
          </div>
        )}
      </div>
      {/* All Category */}
      <div className="pb-6 mt-4">
        <div className="flex justify-between items-center mt-3">
          <p className="text-lg md:text-lg font-light font-pally-medium">
            Event Date
          </p>
          <div onClick={handleSelectDateToggle} className="cursor-pointer">
            {isSelectDate ? (
              <IoIosArrowUp size={20} />
            ) : (
              <IoIosArrowDown size={20} />
            )}
          </div>
        </div>
        {isSelectDate && (
          <div className="flex flex-col gap-3 mt-5">
            <div className="flex items-center gap-2">
              <label
                htmlFor="startDate"
                className="text-sm font-pally-regular whitespace-nowrap"
              >
                Start date:
              </label>
              <Input
                id="startDate"
                type="date"
                value={filters.startDate}
                onChange={(e) => handleDateInput(e, "startDate")}
                className="w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="endDate"
                className="text-sm font-pally-regular whitespace-nowrap"
              >
                End date:
              </label>
              <Input
                id="endDate"
                type="date"
                value={filters.endDate}
                onChange={(e) => handleDateInput(e, "endDate")}
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>

      <Button onClick={applyFilters} variant="destructive">
        Apply Filters
      </Button>
    </div>
  );
};

export default EventFilterComponent;
