import Image from "next/image";
import React, { FC, useState } from "react";

const SeatMap: FC<{ groupedTicket: any[] }> = ({ groupedTicket }) => {
  const [isActive, setIsActive] = useState<string>(groupedTicket?.[0]?._id);

  const map = groupedTicket?.find((item) => {
    return item?._id === isActive;
  });

  return (
    <div>
      <ul className="flex justify-start items-center gap-4 align-baseline">
        {groupedTicket?.map((tab) => (
          <li key={tab?._id} role="presentation">
            <button
              className={`border flex gap-2 items-center py-1 px-2 md:py-2 md:px-3 rounded-3xl ${
                isActive === tab?._id
                  ? "border-2 border-black text-black"
                  : "border-[#586170] text-[#586170]"
              }`}
              role="tab"
              aria-selected={isActive === tab?._id}
              aria-controls={`panel-${tab?.ticketName}`}
              id={`tab-${tab?.ticketName}`}
              onClick={() => setIsActive(tab?._id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setIsActive(tab?._id);
                }
              }}
            >
              {tab?.color && (
                <span
                  style={{ backgroundColor: tab?.color }}
                  className="w-4 h-4 rounded-full"
                />
              )}
              {tab?.ticketName}
            </button>
          </li>
        ))}
      </ul>

      <div
        id={`panel-${isActive}`}
        role="tabpanel"
        aria-labelledby={`tab-${isActive}`}
        className="mt-6 md:mt-10 flex lg:flex-row gap-5 overflow-x-auto w-full pb-8"
      >
        {isActive === map?._id && map?.seatMap.length > 0 ? (
          <Image
            src={map?.seatMap ?? "/images/pitch-bg.png"}
            width={200}
            height={200}
            alt="map"
            className="w-auto h-auto"
          />
        ) : (
          <p className="font-pally-regular text-gray-400">Empty seat map</p>
        )}
      </div>
    </div>
  );
};

export default SeatMap;
