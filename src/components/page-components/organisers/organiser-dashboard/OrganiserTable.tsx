import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Section } from "@/tw-components/Section";
import React from "react";
import OrganiserTableTicketLabel from "./OrganiserTableTicketLabel";
import AttendeeListTableStatusLabel from "./events/organiser-event-detail/menage-attendees/attendee/AttendeeListTableStatusLabel";
import { toFiat } from "@/lib/amount";

type AttendeeListTableBodyType = {
  id: string;
  email: string;
  ticketName: string;
  status: string;
  checkedIn?: boolean;
  date: string;
  price: number;
};
type OrganiserDashboardSalesTableBodyType = {
  bookingId: string;
  userEmail: string;
  paymentStatus: string;
  paystackReference: string;
  date: string;
};
type TablePropsType = {
  tableHead: string[];
  tableBody:
    | AttendeeListTableBodyType[]
    | OrganiserDashboardSalesTableBodyType[];
  type: "attendeListTable" | "organiserDashboardSales";
};

const OrganiserTable = ({ tableHead, tableBody, type }: TablePropsType) => {
  const formattedDate = (date: any) => {
    return new Date(date).toLocaleDateString("en-GB", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "Africa/Lagos",
    });
  };
  return (
    <Section>
      <Table className="">
        <TableHeader className="bg-[#F2F2F7] rounded-3xl">
          <TableRow className="text-[#586170] font-pally-regular text-base ">
            {tableHead.map((column) => (
              <TableHead key={column} className="whitespace-nowrap">{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {type === "attendeListTable" &&
            (tableBody as AttendeeListTableBodyType[])?.map((tableRow) => {
              return (
                <TableRow
                  key={tableRow?.id}
                  className="text-[#2C2B2E] font-pally-regular text-base"
                >
                  <TableCell>{tableRow?.email}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <OrganiserTableTicketLabel text={tableRow.ticketName} />
                  </TableCell>
                  <TableCell>{tableRow.price ? toFiat(tableRow.price) : "Free"}</TableCell>
                  <TableCell>
                    <AttendeeListTableStatusLabel
                      status={tableRow.status}
                      checkedIn={tableRow.checkedIn}
                    />
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{formattedDate(tableRow.date)}</TableCell>
                  {/* <TableCell>{tableRow.more}</TableCell> */}
                </TableRow>
              );
            })}

          {type === "organiserDashboardSales" &&
            (tableBody as OrganiserDashboardSalesTableBodyType[])?.map(
              (tableRow) => {
                return (
                  <TableRow
                    key={tableRow.bookingId}
                    className="text-[#2C2B2E] font-pally-regular text-base"
                  >
                    <TableCell>{tableRow?.userEmail}</TableCell>
                    <TableCell>
                      <AttendeeListTableStatusLabel
                        status={tableRow?.paymentStatus}
                      />
                    </TableCell>
                    <TableCell>{tableRow?.paystackReference}</TableCell>
                    <TableCell className="whitespace-nowrap">{formattedDate(tableRow?.date)}</TableCell>
                  </TableRow>
                );
              }
            )}
        </TableBody>
      </Table>
    </Section>
  );
};

export default OrganiserTable;
