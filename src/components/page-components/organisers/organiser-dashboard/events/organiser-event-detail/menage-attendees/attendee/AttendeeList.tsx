import { Section } from "@/tw-components/Section";
import React from "react";
import OrganiserTable from "../../../../OrganiserTable";
import { useFilteredAttendeeList } from "@/hooks/events/useFilterAttendeeList";
import { useEventsContext } from "@/providers/events.provider";
import Image from "next/image";

const AttendeeList = () => {
  const { publishedEventId } = useEventsContext();
  const { data: attendeeListData } = useFilteredAttendeeList(publishedEventId);

  const filterConfirmTicket = attendeeListData?.data?.filter((item) => item?.status === "confirmed");

  console.log(publishedEventId)

  return (
    <Section className="space-y-5">
      {/* Attendee List Header */}
      {/* <div className="flex justify-between">
        <div className="w-full lg:w-1/2 flex justify-between">
          <div className="lg:hidden flex">
            <AttendeeListCTAButton
              icon={<FiFilter size="16" color="#101928" />}
              text="Filter"
            />
          </div>
          <AttendeeListEventSearch />
        </div>
        <div className="hidden lg:flex items-center gap-[5%]">
          <AttendeeListCTAButton
            icon={<FiFilter size="16" color="#101928" />}
            text="Filter"
          />
        </div>
      </div> */}

      {/* Attendee List Table */}
      <div>
        {filterConfirmTicket?.length != 0 ? (
          <OrganiserTable
            tableHead={["Email address", "Ticket name", "Price", "Status", "Date", ]}
            tableBody={filterConfirmTicket}
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
    </Section>
  );
};

export default AttendeeList;
