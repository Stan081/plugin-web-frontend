import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { RiArrowDownSLine } from "react-icons/ri";
import { toFiat } from "@/lib/amount";

interface WithdrawalData {
  name: string;
  value: number;
  color: string;
}

const initialData: WithdrawalData[] = [
  { name: "Completed", value: 0, color: "#4ade80" },
  { name: "Pending", value: 0, color: "#f87171" },
];

const WithdrawalSummary = () => {
  const [timeFrame, setTimeFrame] = useState("This Month");
  const [data, setData] = useState(initialData);

  const totalAmount = data.reduce((sum, item) => sum + item.value, 0);
  return (
    <div className="border-[#EAEDF0] rounded-xl border p-6 ">
      <div className="flex justify-between items-center mb-1">
        <h1 className="text-[#101928] font-pally-medium text-lg md:text-xl">
          Withdrawal Summary
        </h1>
        <div className="relative">
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
        </div>
      </div>
      <p className="text-gray-500 mb-8">A summary of withdrawal</p>

      <div className="flex items-center justify-between">
        {!data[0].value ? (
          <div className="h-40 w-40 rounded-full border-4 flex justify-center items-center p-8 font-pally-medium text-gray-300">Empty chart</div>
        ) : (
          <ResponsiveContainer width="40%" height={250}>
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
        )}
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className={`w-4 h-4 rounded-full`}
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-gray-500 uppercase">{item.name}: </span>
              <span className="font-pally-medium">{toFiat(item.value)}</span>
            </div>
          ))}
          <div className="mt-8 text-2xl font-pally-regular text-center">
            Total:{" "}
            <span className="font-pally-medium">{toFiat(totalAmount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalSummary;
