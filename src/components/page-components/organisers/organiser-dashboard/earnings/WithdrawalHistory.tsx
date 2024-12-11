import React from "react";
import { LuCalendarRange } from "react-icons/lu";
import { RiFilter2Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Transaction {
  referenceNumber: string;
  amount: string;
  status: "Processing" | "Completed";
  date: string;
}

const transactions: Transaction[] = [
  {
    referenceNumber: "TRX890123456",
    amount: "₦1,089,649.04",
    status: "Processing",
    date: "01 September, 2022 , 4:00 pm",
  },
  {
    referenceNumber: "TRX567890123",
    amount: "₦239,479.12",
    status: "Completed",
    date: "01 September, 2022 , 4:00 pm",
  },
  {
    referenceNumber: "TRX123456789",
    amount: "₦1,850,820.32",
    status: "Completed",
    date: "01 September, 2022 , 4:00 pm",
  },
  {
    referenceNumber: "TRX98765431",
    amount: "₦968,075.18",
    status: "Completed",
    date: "01 September, 2022 , 4:00 pm",
  },
  {
    referenceNumber: "TRX987654321",
    amount: "₦629,792.38",
    status: "Completed",
    date: "01 September, 2022 , 4:00 pm",
  },
];

const WithdrawalHistory = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl lg:text-2xl font-pally-medium text-gray-800">
          Withdrawal History
        </h2>
        <div className="flex flex-col lg:flex-row space-x-4 gap-3">
          <Select defaultValue="jan-aug-2024">
            <SelectTrigger className="w-[200px]">
              <LuCalendarRange className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent className="font-pally-regular">
              <SelectItem value="jan-aug-2024">
                Jan, 2024 - Aug, 2024
              </SelectItem>
              {/* Add more date range options here */}
            </SelectContent>
          </Select>
          <Select defaultValue="all-transactions">
            <SelectTrigger className="w-[200px]">
              <RiFilter2Line className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select transaction type" />
            </SelectTrigger>
            <SelectContent className="bg-white font-pally-regular">
              <SelectItem value="all-transactions">All transactions</SelectItem>
              {/* Add more transaction type options here */}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="font-pally-medium text-sm md:text-base">
            <TableHead>Reference Number</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.referenceNumber} className="my-2">
              <TableCell>{transaction.referenceNumber}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    transaction.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {transaction.status}
                </span>
              </TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>
                <Button className="text-blue-600 font-pally-medium underline cursor-pointer hover:text-blue-800 hover:shadow-none">
                  View Receipts
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center whitespace-nowrap w-full overflow-x-auto pb-4 mt-6">
        <p className="text-sm text-gray-600">Page 1 of 30</p>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon">
            {"<"}
          </Button>
          {[1, 2, 3, 4, 5, 6].map((page) => (
            <Button
              key={page}
              variant={page === 3 ? "default" : "outline"}
              size="icon"
              className={page === 3 ? "bg-blue-600 text-white" : ""}
            >
              {page}
            </Button>
          ))}
          <Button variant="outline" size="icon">
            {">"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalHistory;
