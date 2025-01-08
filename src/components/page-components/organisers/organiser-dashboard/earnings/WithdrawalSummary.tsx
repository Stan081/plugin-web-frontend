import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { RiArrowDownSLine } from "react-icons/ri";
import { toFiat } from "@/lib/amount";
import { useGetWithdrawalStats } from "@/hooks/organiser/organiser-earnings/useGetWithdrawalStats";

interface WithdrawalData {
  name: string;
  value: number;
  color: string;
}

const WithdrawalSummary = () => {
  // const [timeFrame, setTimeFrame] = useState("This Month");
  const { data: withdrawalStatistic } = useGetWithdrawalStats();

  const data: WithdrawalData[] = [
    {
      name: "Completed",
      value: withdrawalStatistic?.data?.completedSum,
      color: "#4ade80",
    },
    {
      name: "Pending",
      value: withdrawalStatistic?.data?.pendingSum,
      color: "#f87171",
    },
  ];

  return (
    <div className="border-[#EAEDF0] rounded-xl border p-6 ">
      <div className="flex justify-between items-center mb-1">
        <h1 className="text-[#101928] font-pally-medium text-lg md:text-xl">
          Withdrawal Summary
        </h1>
        {/* <div className="relative">
          <select
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
            className="appearance-none border text-gray-500 py-2 px-4 pr-8 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Year</option>
          </select>
          <RiArrowDownSLine
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div> */}
        <div />
      </div>
      <p className="text-gray-500 mb-8">A summary of withdrawal</p>

      <div className="flex items-center justify-between gap-5">
        {withdrawalStatistic?.data?.totalSum <= 1 ? (
          <div className="w-20 h-20 lg:h-40 lg:w-40 rounded-full border-4 flex justify-center items-center p-8 font-pally-medium text-gray-300">
            Empty chart
          </div>
        ) : (
          <div className="w-full h-full">
            <div className="flex lg:hidden">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="hidden lg:flex">
              <ResponsiveContainer width="80%" height={250}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        <div className=" block">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className={`w-4 h-4 rounded-full`}
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-gray-500 uppercase text-sm lg:text-base">
                {item.name}:{" "}
              </span>
              <span className="font-pally-medium text-sm lg:text-base">
                {toFiat(item.value)}
              </span>
            </div>
          ))}
          <div className="mt-8 text-base lg:text-2xl font-pally-regular text-center">
            Total:{" "}
            <span className="font-pally-medium">
              {toFiat(
                withdrawalStatistic?.data?.completedSum +
                  withdrawalStatistic?.data?.pendingSum
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalSummary;
