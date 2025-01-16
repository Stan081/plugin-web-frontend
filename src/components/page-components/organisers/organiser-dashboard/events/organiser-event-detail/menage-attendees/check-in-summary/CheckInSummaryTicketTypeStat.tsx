"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface StatProps {
  name: string;
  value: number;
  color: string;
}

const CheckInSummaryTicketTypeStat = () => {
  const data: StatProps[] = [
    {
      name: "Regular",
      value: 12,
      color: "#7660BE",
    },
    {
      name: "VIP",
      value: 20,
      color: "#FFD2A6",
    },
    {
      name: "VVIP",
      value: 10,
      color: "#000000",
    },
  ];
  return (
    <div className="border border-[#1019280D] rounded-lg w-1/2 p-5">
      <p className="font-pally-medium text-base text-[#667185]">
        Check-ins by Ticket Type
      </p>

      <div className="mt-6 flex flex-col items-center justify-center gap-5">
        {data.length === 0 ? (
          <div className="w-20 h-20 lg:h-40 lg:w-40 rounded-full border-4 flex justify-center items-center p-8 font-pally-medium text-gray-300">
            Empty chart
          </div>
        ) : (
          <div className="w-full h-full">
            <div className=" block lg:hidden">
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
              <span className="text-gray-500 text-sm lg:text-base">
                {item.name}:{" "}
              </span>
              <span className="font-pally-medium text-sm lg:text-base">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CheckInSummaryTicketTypeStat;
