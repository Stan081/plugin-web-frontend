import React from "react";
import EventsVendorPassSlot from "./EventsVendorPassSlot";

const EventsVendorPass: React.FC<{ vendor: any }> = ({ vendor }) => {
  return (
    <section>
      <p className="text-[#2C2B2E] text-base md:text-lg font-pally-medium">
        VENDOR PASS
      </p>

      {vendor?.length !== 0 ? (
        <div className="mt-4 flex overflow-x-auto whitespace-nowrap w-full pb-4 gap-4">
          {vendor?.map((slot) => (
            <EventsVendorPassSlot
              key={slot?._id}
              title={slot?.vendorTag}
              unitPrice={slot?.price}
              slotsLeft={slot?.slots}
            />
          ))}
        </div>
      ) : (
        <p className="font-pally-regular mt-5 text-gray-500">
          Event vendor has not been added
        </p>
      )}
    </section>
  );
};

export default EventsVendorPass;
