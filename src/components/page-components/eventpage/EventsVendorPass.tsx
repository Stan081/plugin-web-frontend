import React from "react";
import EventsVendorPassSlot from "./EventsVendorPassSlot";
import eventsVendorPassData from "@/static-datas/events-vendor-pass-data";

const EventsVendorPass = () => {
  return (
    <section>
      <p className="text-[#2C2B2E] text-base md:text-lg font-pally-medium">
        VENDOR PASS
      </p>

      <div className="mt-4 space-y-5">
        {eventsVendorPassData.map((slot) => (
          <EventsVendorPassSlot
            key={slot.title}
            title={slot.title}
            unitPrice={slot.unitPrice}
            slotsLeft={slot.slotsLeft}
          />
        ))}
      </div>
    </section>
  );
};

export default EventsVendorPass;
