import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { MoreHorizontal } from "lucide-react"

interface Ticket {
  email: string;
  name: string;
  checkInQuantity: string;
  status: "Pending" | "Checked-in";
  date: string;
}

const tickets: Ticket[] = [
  {
    email: "Ester123@gmail.com",
    name: "Individual package",
    checkInQuantity: "3/4",
    status: "Pending",
    date: "01/09/2022",
  },
  {
    email: "Joneshighman@gmail.c...",
    name: "Individual package",
    checkInQuantity: "3/4",
    status: "Pending",
    date: "01/09/2022",
  },
  {
    email: "Ester123@gmail.com",
    name: "Individual package",
    checkInQuantity: "3/4",
    status: "Pending",
    date: "01/09/2022",
  },
  {
    email: "Savannahbae@yahoo.c...",
    name: "Individual package",
    checkInQuantity: "4/4",
    status: "Checked-in",
    date: "01/09/2022",
  },
  {
    email: "Janecooper@gmail.com",
    name: "Individual package",
    checkInQuantity: "4/4",
    status: "Checked-in",
    date: "01/09/2022",
  },
  {
    email: "Fisherman12@gmail.com",
    name: "Individual package",
    checkInQuantity: "4/4",
    status: "Checked-in",
    date: "01/09/2022",
  },
];

const AttendeesList = () => {
  return (
    <div className="">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Email address</TableHead>
            <TableHead>Ticket name</TableHead>
            <TableHead>Check-in quantity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket, index) => (
            <TableRow key={index}>
              <TableCell className="">{ticket.email}</TableCell>
              <TableCell>{ticket.name}</TableCell>
              <TableCell>{ticket.checkInQuantity}</TableCell>
              <TableCell>
                <Badge
                  variant={ticket.status === "Pending" ? "pending" : "success"}
                  className="rounded-full"
                >
                  {ticket.status}
                </Badge>
              </TableCell>
              <TableCell>{ticket.date}</TableCell>
              {/* <TableCell>
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AttendeesList;
