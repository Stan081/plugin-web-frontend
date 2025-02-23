import { useFilteredAttendeeList } from "@/hooks/events/useFilterAttendeeList";
import { useEventsContext } from "@/providers/events.provider";
import React from "react";
import OrganiserTable from "../../../../OrganiserTable";
import Image from "next/image";

const EventTickets = () => {
  const { publishedEventId } = useEventsContext();
  const { data: attendeeListData } = useFilteredAttendeeList(publishedEventId);

  return (
    <div>
      {attendeeListData?.data.length != 0 ? (
        <OrganiserTable
          tableHead={["Email address", "Ticket name", "Price", "Status", "Date",]}
          tableBody={attendeeListData?.data}
          type="attendeListTable"
        />
      ) : (
        <>
          <div className="bg-gray-100 rounded-lg py-5 md:py-9 w-full flex flex-col items-center justify-center gap-5">
            <Image
              src={"/images/calendar.svg"}
              width={200}
              height={200}
              alt="calemder"
              className="w-20 h-20 object-cover pointer-events-none"
            />

            <p className="font-pally-regular text-sm md:text-lg text-[#828994]">
              No Attendee yet
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default EventTickets;
