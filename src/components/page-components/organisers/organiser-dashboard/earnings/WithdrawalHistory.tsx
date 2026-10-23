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
import { toFiat } from "@/lib/amount";

/**
 * How each payout status reads to the organiser.
 *
 * "Pending" means the money has already left their available balance and is waiting
 * on the admin to remit it — worth naming precisely, since it is the state people
 * write in about.
 */
const WITHDRAWAL_STATUS = {
  initiated: {
    label: "Awaiting verification",
    className: "bg-gray-100 text-gray-700",
  },
  pending: {
    label: "Processing",
    className: "bg-yellow-100 text-yellow-800",
  },
  paid: { label: "Paid", className: "bg-green-100 text-green-800" },
  rejected: { label: "Declined", className: "bg-red-100 text-red-800" },
  failed: { label: "Failed", className: "bg-orange-100 text-orange-800" },
} as const;
import WithdrawalReceipt from "./WithdrawalReceipt";

const WithdrawalHistory = () => {
  const [pageNum, setPageNum] = useState<number>(1);

  const [showReceipt, setShowReceipt] = useState<boolean>(false);
  const [withdrawReceipt, setWithdrawReceipt] = useState<any>();

  const { data: withistory } = useGetWithdrawalHistory(pageNum);

  const formattedDate = (date: any) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: "Africa/Lagos",
    });
  };

  const formattedTime = (date: any) => {
    return new Date(date).toLocaleTimeString("en-GB", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "Africa/Lagos",
    });
  };

  const handleClick = (id: string) => {
    setShowReceipt(!showReceipt);
    const getReceiptById = withistory?.data?.find((item) => item?._id === id);
    setWithdrawReceipt(getReceiptById);
  };

  const handlePrev = () => {
    setPageNum((prevNum) => Math.max(prevNum - 1, 1));
  };
  const handleNext = () => {
    setPageNum((prevNum) => prevNum + 1);
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
                <TableCell>{toFiat(transaction.amount)}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      WITHDRAWAL_STATUS[
                        transaction?.status as keyof typeof WITHDRAWAL_STATUS
                      ]?.className ?? "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {WITHDRAWAL_STATUS[
                      transaction?.status as keyof typeof WITHDRAWAL_STATUS
                    ]?.label ?? transaction?.status}
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
            <Button
              disabled={pageNum <= 1}
              onClick={handlePrev}
              variant="outline"
              size="icon"
            >
              {"<"}
            </Button>

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
