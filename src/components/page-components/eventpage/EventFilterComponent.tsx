import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterParams } from "@/hooks/events/useFilterEvents";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FiltersProps {
  onChange: (newFilters: Partial<FilterParams>) => void;
  currentFilters: FilterParams;
}

const EventFilterComponent = ({
  onApplyFilters,
}: {
  onApplyFilters: (filters: any) => void;
}) => {
  // State variables for each dropdown
  const [isEventTypeOpen, setIsEventTypeOpen] = useState<boolean>(true);
  const [isSortByOpen, setIsSortByOpen] = useState<boolean>(true);
  const [isSelectDate, setIsSelectDate] = useState<boolean>(true);
  const [isPriceRange, setIsPriceRange] = useState<boolean>(true);
  const [isEventLocation, setIsEventLocation] = useState<boolean>(true);
  const [isAllCategory, setIsAllCategory] = useState<boolean>(true);

  const [filters, setFilters] = useState({
    minPrice: null,
    maxPrice: null,
    locationType: "",
    eventType: "",
  });

  const handleEventTypeToggle = () => {
    setIsEventTypeOpen((prevState) => !prevState);
  };

  const handleSortByToggle = () => {
    setIsSortByOpen((prevState) => !prevState);
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
    <div className="w-[230px] border-r pr-4">
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

      {/* Sort By Section */}
      <div>
        {/* <div className="flex justify-between items-center mt-3">
          <p className="text-lg md:text-lg font-light font-pally-medium">
            Sort By
          </p>
          <div onClick={handleSortByToggle} className="cursor-pointer">
            {isSortByOpen ? (
              <IoIosArrowUp size={20} />
            ) : (
              <IoIosArrowDown size={20} />
            )}
          </div>
        </div> */}
        {/* Toggleable content for Sort By */}
        {/* {isSortByOpen && (
          <div className="mt-2">
            <div className="flex gap-4 pb-3">
              <Checkbox />
              <p className="text-lg md:text-sm font-normal font-pally-normal">
                New to Old
              </p>
            </div>
            <div className="flex gap-4">
              <Checkbox />
              <p className="text-lg md:text-sm font-normal font-pally-normal">
                Old to New
              </p>
            </div>
          </div>
        )} */}
      </div>

      {/* Select Date */}
      <div>
        <div className="flex justify-between items-center">
          {/* <p className="text-lg md:text-lg font-light font-pally-medium">
            Select date
          </p>
          <div onClick={handleSelectDateToggle} className="cursor-pointer">
            {isSelectDate ? (
              <IoIosArrowUp size={20} />
            ) : (
              <IoIosArrowDown size={20} />
            )}
          </div> */}
        </div>
        {/* Toggleable content for Sort By */}
        {/* {isSelectDate && (
          <div className="mt-2">
            <div className="flex gap-4 pb-3">
              <Checkbox />
              <p className="text-lg md:text-sm font-normal font-pally-normal">
                Today
              </p>
            </div>
            <div className="flex gap-4 pb-3">
              <Checkbox />
              <p className="text-lg md:text-sm font-normal font-pally-normal">
                This Weekend
              </p>
            </div>
            <div className="flex gap-4 pb-3">
              <Checkbox />
              <p className="text-lg md:text-sm font-normal font-pally-normal">
                Next Month
              </p>
            </div>
            <div>
              <p className=" text-sm md:text-sm font-normal font-pally-normal underline cursor-pointer">
                Custom
              </p>
            </div>
          </div>
        )} */}
      </div>
      {/* Price Range */}
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
              <label htmlFor="maxPrice" className="text-sm font-pally-regular whitespace-nowrap">
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
      <div className="pb-6">
        {/* <div className="flex justify-between items-center mt-3">
          <p className="text-lg md:text-lg font-light font-pally-medium">
            All Category
          </p>
          <div onClick={handleAllCategoryToggle} className="cursor-pointer">
            {isAllCategory ? (
              <IoIosArrowUp size={20} />
            ) : (
              <IoIosArrowDown size={20} />
            )}
          </div>
        </div> */}
        {/* Toggleable content for Sort By */}
        {/* {isAllCategory && (
          <div className="mt-2">
            <div className="flex gap-4 pb-3">
              <Checkbox />
              <p className="text-lg md:text-sm font-normal font-pally-normal">
                All
              </p>
            </div>
            <div className="flex gap-4 pb-3">
              <Checkbox />
              <p className="text-lg md:text-sm font-normal font-pally-normal">
                Concerts
              </p>
            </div>
            <div className="flex gap-4 pb-3">
              <Checkbox />
              <p className="text-lg md:text-sm font-normal font-pally-normal">
                Religious
              </p>
            </div>
            <div className="flex gap-4 pb-3">
              <Checkbox />
              <p className="text-lg md:text-sm font-normal font-pally-normal">
                Education
              </p>
            </div>
            <div className="flex gap-4 pb-3">
              <Checkbox />
              <p className="text-lg md:text-sm font-normal font-pally-normal">
                Lifestyle
              </p>
            </div>
            <div className="flex gap-4 pb-3">
              <Checkbox />
              <p className="text-lg md:text-sm font-normal font-pally-normal">
                Campaign
              </p>
            </div>
            <div className="flex gap-4 pb-3">
              <Checkbox />
              <p className="text-lg md:text-sm font-normal font-pally-normal">
                Business
              </p>
            </div>
            <div className="flex gap-4 pb-3">
              <Checkbox />
              <p className="text-lg md:text-sm font-normal font-pally-normal">
                Parties
              </p>
            </div>
            <div className="flex gap-4 pb-3">
              <Checkbox />
              <p className="text-lg md:text-sm font-normal font-pally-normal">
                Health
              </p>
            </div>
            <div className="flex gap-4 pb-3">
              <Checkbox />
              <p className="text-lg md:text-sm font-normal font-pally-normal">
                Hangouts
              </p>
            </div>
            <div className="flex gap-4 pb-3">
              <Checkbox />
              <p className="text-lg md:text-sm font-normal font-pally-normal">
                Corporate
              </p>
            </div>
            <div className="flex gap-4 pb-3">
              <Checkbox />
              <p className="text-lg md:text-sm font-normal font-pally-normal">
                Others
              </p>
            </div>
          </div>
        )} */}
      </div>

      <Button onClick={applyFilters} variant="destructive">
        Apply Filters
      </Button>
    </div>
  );
};

export default EventFilterComponent;
