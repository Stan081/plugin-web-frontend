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

type StatusLabelType = "pending" | "checked-in";
type AttendeeListTableBodyType = {
  email: string;
  ticketName: string;
  checkinQty: string;
  status: string;
  date: string;
  more: string;
};
type OrganiserDashboardSalesTableBodyType = {
  ticketID: string;
  ticketName: string;
  price: string;
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
  return (
    <Section>
      <Table className="">
        <TableHeader className="bg-[#F2F2F7] rounded-3xl">
          <TableRow className="text-[#586170] font-pally-regular text-base ">
            {tableHead.map((column) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {type === "attendeListTable" &&
            (tableBody as AttendeeListTableBodyType[]).map((tableRow) => {
              return (
                <TableRow
                  key={tableRow.email}
                  className="text-[#2C2B2E] font-pally-regular text-base"
                >
                  <TableCell>{tableRow.email}</TableCell>
                  <TableCell>
                    <OrganiserTableTicketLabel text={tableRow.ticketName} />
                  </TableCell>
                  <TableCell>{tableRow.checkinQty}</TableCell>
                  <TableCell>
                    <AttendeeListTableStatusLabel
                      status={tableRow.status as StatusLabelType}
                    />
                  </TableCell>
                  <TableCell>{tableRow.date}</TableCell>
                  <TableCell>{tableRow.more}</TableCell>
                </TableRow>
              );
            })}

          {type === "organiserDashboardSales" &&
            (tableBody as OrganiserDashboardSalesTableBodyType[]).map(
              (tableRow) => {
                return (
                  <TableRow
                    key={tableRow.ticketID}
                    className="text-[#2C2B2E] font-pally-regular text-base"
                  >
                    <TableCell>{tableRow.ticketID}</TableCell>
                    <TableCell>
                      <OrganiserTableTicketLabel text={tableRow.ticketName} />
                    </TableCell>
                    <TableCell>{tableRow.price}</TableCell>
                    <TableCell>{tableRow.date}</TableCell>
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
