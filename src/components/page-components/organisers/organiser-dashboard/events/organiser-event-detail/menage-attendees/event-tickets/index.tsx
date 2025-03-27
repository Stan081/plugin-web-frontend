import { useFilteredAttendeeList } from "@/hooks/events/useFilterAttendeeList";
import { useEventsContext } from "@/providers/events.provider";
import React from "react";
import OrganiserTable from "../../../../OrganiserTable";
import Image from "next/image";
import { useGetSalesRecord } from "@/hooks/organiser/useGetSalesRecord";

const EventTickets = () => {
  const { publishedEventId } = useEventsContext();
  const { data: attendeeListData } = useFilteredAttendeeList(publishedEventId);

  const { data: salesRecord } = useGetSalesRecord(publishedEventId);

  return (
    <div>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-7">
        {salesRecord?.data?.length !== 0 &&
          salesRecord?.data.map((item) => (
            <li className="mt-3 w-full p-4 border rounded-lg flex items-start gap-3">
              <figure className="relative size-8 hidden lg:block">
                <Image
                  fill={true}
                  src={"/images/ticket.png"}
                  alt="Ticket"
                  className="object-contain"
                />
              </figure>
              <div>
                <p className="font-pally-medium whitespace-nowrap text-base text-[#101928]">
                  {item?.name}
                </p>
                <p className="font-pally-regular text-sm text-[#667185]">
                  {item?.sold}/{item?.total}
                </p>
              </div>
            </li>
          ))}
      </ul>

      {attendeeListData?.data.length != 0 ? (
        <OrganiserTable
          tableHead={[
            "Email address",
            "Ticket name",
            "Price",
            "Check-in Status",
            "Date",
          ]}
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
