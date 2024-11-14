import React from "react";
import EventsVendorPassSlot from "./EventsVendorPassSlot";
import eventsVendorPassData from "@/static-datas/events-vendor-pass-data";

const EventsVendorPass: React.FC<{ vendor: any }> = ({ vendor }) => {
  return (
    <section>
      <p className="text-[#2C2B2E] text-base md:text-lg font-pally-medium">
        VENDOR PASS
      </p>

      {vendor?.length !== 0 ? (
        <div className="mt-4 space-y-5">
          {vendor?.map((slot) => (
            <EventsVendorPassSlot
              key={slot?._id}
              title={slot?.vendorTag}
              unitPrice={slot?.price}
              slotsLeft={slot?.slot}
              thumbnail={slot?.thumbnail}
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
