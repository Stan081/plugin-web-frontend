"use client";
import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { RiFilter2Line } from "react-icons/ri";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const FilterEventComponent = ({
  onApplyFilters,
}: {
  onApplyFilters: (filters: any) => void;
}) => {
  const [filters, setFilters] = useState({
    minPrice: null,
    maxPrice: null,
    locationType: "",
    eventType: "",
  });

  // Handle checkbox change for locationType and eventType
  const handleCheckboxChange = (
    type: "locationType" | "eventType",
    value: string
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: prevFilters[type] === value ? "" : value, // Toggle between selected and unselected
    }));
  };

  // Handle input change for minPrice and maxPrice
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "minPrice" | "maxPrice"
  ) => {
    const { value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value ? parseInt(value, 10) : 0, // Parse value as number
    }));
  };

  // Handle filter submission
  const applyFilters = () => {
    onApplyFilters(filters);
  };

  return (
    <Drawer>
      <DrawerTrigger>
        <div className="lg:hidden flex items-center gap-3 py-1.5 px-2.5 border rounded-full ">
          <p className="text-sm text-gray-500 font-pally-regular">
            filter events
          </p>
          <RiFilter2Line size={16} />
        </div>
      </DrawerTrigger>
      <DrawerContent className="bg-white h-4/6 px-4">
        <DrawerHeader>
          <DrawerTitle>Filter Events</DrawerTitle>
        </DrawerHeader>
        <div className="border-b flex-col pb-4">
          <div className="flex justify-between items-center mt-3">
            <p className="text-sm md:text-base font-light font-pally-medium">
              Price Range
            </p>
          </div>
          <div className="flex gap-3 mt-2">
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
        </div>
        <div className="border-b flex-col pb-4">
          <div className="flex justify-between items-center mt-3">
            <p className="text-sm md:text-base font-light font-pally-medium">
              Event Type
            </p>
          </div>

          <div className="mt-2 flex gap-5">
            <div className="flex gap-4 pb-3">
              <Checkbox
                id="one_time"
                checked={filters.eventType === "one-time"}
                onCheckedChange={() =>
                  handleCheckboxChange("eventType", "one-time")
                }
              />
              <label htmlFor="one_time" className="text-sm font-pally-regular">
                One-time
              </label>
            </div>
            <div className="flex gap-4">
              <Checkbox
                id="recurring"
                checked={filters.eventType === "recurring"}
                onCheckedChange={() =>
                  handleCheckboxChange("eventType", "recurring")
                }
              />
              <label className="text-sm font-pally-regular" htmlFor="recurring">
                Recurring
              </label>
            </div>
          </div>
        </div>
        <div className="border-b flex-col pb-4">
          <div className="flex justify-between items-center mt-3">
            <p className="text-sm md:text-base font-light font-pally-medium">
              Event Location
            </p>
          </div>
          {/* Toggleable content for Sort By */}
          <div className="mt-2 flex gap-5">
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
        </div>
        <DrawerFooter>
          <DrawerClose>
            <Button
              onClick={applyFilters}
              variant="destructive"
              className="w-full"
            >
              Apply Filters
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterEventComponent;
