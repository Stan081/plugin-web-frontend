import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Checkbox } from "@/components/ui/checkbox";

const EventFilterComponent = () => {
  // State variables for each dropdown
  const [isEventTypeOpen, setIsEventTypeOpen] = useState<boolean>(true);
  const [isSortByOpen, setIsSortByOpen] = useState<boolean>(true);
  const [isSelectDate, setIsSelectDate] = useState<boolean>(true);
  const [isPriceRange, setIsPriceRange] = useState<boolean>(true);
  const [isEventLocation, setIsEventLocation] = useState<boolean>(true);
  const [isAllCategory, setIsAllCategory] = useState<boolean>(true);

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

  const handleAllCategoryToggle = () => {
    setIsAllCategory((prevState) => !prevState);
  };

  return (
    <div className="w-[230px]">
      {/* Event Type Section */}
      <div className="flex-col pb-4">
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
              <Checkbox />
              <p className="text-lg md:text-sm font-normal font-pally-normal">
                One-time
              </p>
            </div>
            <div className="flex gap-4">
              <Checkbox />
              <p className="text-lg md:text-sm font-normal font-pally-normal">
                Recurring
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Sort By Section */}
      <div className="border-b flex-col pb-4">
        <div className="flex justify-between items-center mt-3">
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
        </div>
        {/* Toggleable content for Sort By */}
        {isSortByOpen && (
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
        )}
      </div>
      {/* Select Date */}
      <div className="border-b flex-col pb-4">
        <div className="flex justify-between items-center mt-3">
          <p className="text-lg md:text-lg font-light font-pally-medium">
            Select date
          </p>
          <div onClick={handleSelectDateToggle} className="cursor-pointer">
            {isSelectDate ? (
              <IoIosArrowUp size={20} />
            ) : (
              <IoIosArrowDown size={20} />
            )}
          </div>
        </div>
        {/* Toggleable content for Sort By */}
        {isSelectDate && (
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
        )}
      </div>
      {/* Price Range */}
      <div className="border-b flex-col pb-4">
        <div className="flex justify-between items-center mt-3">
          <p className="text-lg md:text-lg font-light font-pally-medium">
            Price Range
          </p>
          <div onClick={handlePriceRangeToggle} className="cursor-pointer">
            {isPriceRange ? (
              <IoIosArrowUp size={20} />
            ) : (
              <IoIosArrowDown size={20} />
            )}
          </div>
        </div>
        {/* Toggleable content for Sort By */}
        {isPriceRange && (
          <div className="mt-2">
            <div className="flex gap-4 pb-3">
              <Checkbox />
              <p className="text-lg md:text-sm font-normal font-pally-normal">
                NGN 3k -30k
              </p>
            </div>
            <div className="flex gap-4 pb-3">
              <Checkbox />
              <p className="text-lg md:text-sm font-normal font-pally-normal">
                NGN 30k - 50k
              </p>
            </div>
            <div className="flex gap-4 pb-3">
              <Checkbox />
              <p className="text-lg md:text-sm font-normal font-pally-normal">
                NGN 50k - 250k
              </p>
            </div>
            <div>
              <p className=" text-sm md:text-sm font-normal font-pally-normal underline cursor-pointer">
                Custom
              </p>
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
              <Checkbox />
              <p className="text-lg md:text-sm font-normal font-pally-normal">
                Physical
              </p>
            </div>
            <div className="flex gap-4">
              <Checkbox />
              <p className="text-lg md:text-sm font-normal font-pally-normal">
                Virtual
              </p>
            </div>
          </div>
        )}
      </div>
      {/* All Category */}
      <div className="border-b flex-col pb-4">
        <div className="flex justify-between items-center mt-3">
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
        </div>
        {/* Toggleable content for Sort By */}
        {isAllCategory && (
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
        )}
      </div>
    </div>
  );
};

export default EventFilterComponent;
