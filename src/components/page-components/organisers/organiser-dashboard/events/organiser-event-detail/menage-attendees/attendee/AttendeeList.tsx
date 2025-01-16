import { Section } from "@/tw-components/Section";
import React from "react";
import AttendeeListEventSearch from "./AttendeeListEventSearch";
import AttendeeListCTAButton from "./AttendeeListCTAButton";
import { FiFilter } from "react-icons/fi";
import { CiFileOn } from "react-icons/ci";
import { GrGrid } from "react-icons/gr";
import OrganiserTable from "../../../../OrganiserTable";
import attendeeListTableData from "@/static-datas/attendee-list-table-data";

const AttendeeList = () => {
  return (
    <Section className="space-y-10">
      {/* Attendee List Header */}
      <div className="flex flex-col lg:flex-row gap-3 justify-between">
        <div className="w-full lg:w-1/2">
          <AttendeeListEventSearch />
        </div>
        <div className="flex items-center justify-center lg:justify-start gap-[5%]">
          <AttendeeListCTAButton
            icon={<FiFilter size="16" color="#101928" />}
            text="Filter"
          />
          <AttendeeListCTAButton
            icon={<CiFileOn size="16" color="#101928" />}
            text="PDF"
          />
          <AttendeeListCTAButton
            icon={<GrGrid size="13" color="#101928" />}
            text="CSV"
          />
        </div>
      </div>

      {/* Attendee List Table */}
      <div>
        <OrganiserTable
          tableHead={[
            "Email address",
            "Ticket name",
            "Check-in quantity",
            "Status",
            "Date",
            "..",
          ]}
          tableBody={attendeeListTableData}
          type="attendeListTable"
        />
      </div>
    </Section>
  );
};

export default AttendeeList;
