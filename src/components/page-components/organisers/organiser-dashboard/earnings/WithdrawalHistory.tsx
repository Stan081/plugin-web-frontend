import React, { useState } from "react";
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
import { useGetWithdrawalHistory } from "@/hooks/organiser/organiser-earnings/useGetWithdrawalHistory";
import WithdrawalReceipt from "./WithdrawalReceipt";

interface Transaction {
  referenceNumber: string;
  amount: string;
  status: "Processing" | "Completed";
  date: string;
}

const WithdrawalHistory = () => {
  const [pageNum, setPageNum] = useState<number>(1);

  const [showReceipt, setShowReceipt] = useState<boolean>(false);
  const [withdrawReceipt, setWithdrawReceipt] = useState<any>();

  const { data: withistory } = useGetWithdrawalHistory(pageNum);

  const formattedDate = (date: any) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formattedTime = (date: any) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleClick = (id: string) => {
    setShowReceipt(!showReceipt);
    const getReceiptById = withistory?.data?.find((item) => item?._id === id);
    setWithdrawReceipt(getReceiptById);
  };

  const handlePrev = () => {
    setPageNum((prevNum) => {
      if (prevNum < 1) {
        return prevNum;
      }
      return prevNum - 1;
    });
  };
  const handleNext = () => {
    if (withistory?.meta?.totalPages >= 1) {
      setPageNum((prevNum) => prevNum + 1);
    }
  };
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl lg:text-2xl font-pally-medium text-gray-800">
          Withdrawal History
        </h2>
        {/* <div className="flex flex-col lg:flex-row space-x-4 gap-3">
          <Select defaultValue="jan-aug-2024">
            <SelectTrigger className="w-[200px]">
              <LuCalendarRange className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent className="font-pally-regular">
              <SelectItem value="jan-aug-2024">
                Jan, 2024 - Aug, 2024
              </SelectItem>
              Add more date range options here
            </SelectContent>
          </Select>
          <Select defaultValue="all-transactions">
            <SelectTrigger className="w-[200px]">
              <RiFilter2Line className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select transaction type" />
            </SelectTrigger>
            <SelectContent className="bg-white font-pally-regular">
              <SelectItem value="all-transactions">All transactions</SelectItem>
              Add more transaction type options here
            </SelectContent>
          </Select>
        </div> */}
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
        {withistory?.data.length !== 0 ? (
          <TableBody>
            {withistory?.data.map((transaction) => (
              <TableRow key={transaction.referenceNumber} className="my-2">
                <TableCell>TRX{transaction._id}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      transaction?.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {transaction?.status}
                  </span>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {formattedDate(transaction?.createdAt)},{" "}
                  {formattedTime(transaction?.createdAt)}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleClick(transaction?._id)}
                    className="text-blue-600 font-pally-medium underline cursor-pointer hover:text-blue-800 hover:shadow-none"
                  >
                    View Receipts
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <div className="h-40 w-full font-pally-medium text-lg flex justify-center items-center">
            No transaction yet
          </div>
        )}
      </Table>
      {withistory?.data.length > 0 && (
        <div className="flex justify-between items-center whitespace-nowrap w-full overflow-x-auto pb-4 mt-6">
          <p className="text-sm text-gray-600">
            Page {withistory?.meta?.currentPage} of{" "}
            {withistory?.meta?.totalPages}
          </p>
          <div className="flex space-x-2">
            <Button onClick={handlePrev} variant="outline" size="icon">
              {"<"}
            </Button>
            {[1, 2, 3, 4].map((page) => (
              <Button
                key={page}
                variant={
                  page === withistory?.meta?.currentPage ? "default" : "outline"
                }
                size="icon"
                className={
                  page === withistory?.meta?.currentPage
                    ? "bg-blue-600 text-white"
                    : ""
                }
              >
                {page}
              </Button>
            ))}
            <Button onClick={handleNext} variant="outline" size="icon">
              {">"}
            </Button>
          </div>
        </div>
      )}
      {showReceipt && (
        <WithdrawalReceipt
          open={showReceipt}
          receipt={withdrawReceipt}
          close={() => setShowReceipt(!showReceipt)}
        />
      )}
    </div>
  );
};

export default WithdrawalHistory;
