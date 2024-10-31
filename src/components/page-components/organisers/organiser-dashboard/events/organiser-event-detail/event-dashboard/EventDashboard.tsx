import Image from "next/image";
import { useState } from "react";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";

interface Sale {
  ticketId: string;
  ticketName: string;
  price: number;
  date: string;
}

const salesData: Sale[] = [
    {
      ticketId: "#124801",
      ticketName: "Individual package",
      price: 3000,
      date: "01/09/2022 04:00pm",
    },
    {
      ticketId: "#124801",
      ticketName: "Individual package",
      price: 3000,
      date: "01/09/2022 04:00pm",
    },
    {
      ticketId: "#124801",
      ticketName: "Individual package",
      price: 3000,
      date: "01/09/2022 04:00pm",
    },
    {
      ticketId: "#124801",
      ticketName: "Individual package",
      price: 3000,
      date: "01/09/2022 04:00pm",
    },
    {
      ticketId: "#124801",
      ticketName: "Individual package",
      price: 3000,
      date: "01/09/2022 04:00pm",
    },
];

const SaleTable = () => {
  const [sortColumn, setSortColumn] = useState<keyof Sale>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const sortedSales = [...salesData].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const toggleSort = (column: keyof Sale) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <div className=" mt-7">
      <div className="flex justify-start gap-5 items-center mb-4">
        <p className="text-sm font-pally-medium border rounded-3xl py-1 px-2 text-gray-700">
          Recent sales
        </p>
        <p className="text-sm text-gray-500 font-pally-medium">
          Sales by ticket type
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 cursor-pointer font-pally-medium text-base"
                onClick={() => toggleSort("ticketId")}
              >
                Ticket ID
                {sortColumn === "ticketId" &&
                  (sortDirection === "asc" ? (
                    <MdOutlineKeyboardArrowUp
                      className="inline ml-1"
                      size={14}
                    />
                  ) : (
                    <MdOutlineKeyboardArrowDown
                      className="inline ml-1"
                      size={14}
                    />
                  ))}
              </th>
              <th
                className="px-6 py-3 cursor-pointer font-pally-medium text-base"
                onClick={() => toggleSort("ticketName")}
              >
                Ticket name
                {sortColumn === "ticketName" &&
                  (sortDirection === "asc" ? (
                    <MdOutlineKeyboardArrowUp
                      className="inline ml-1"
                      size={14}
                    />
                  ) : (
                    <MdOutlineKeyboardArrowDown
                      className="inline ml-1"
                      size={14}
                    />
                  ))}
              </th>
              <th
                className="px-6 py-3 cursor-pointer font-pally-medium text-base"
                onClick={() => toggleSort("price")}
              >
                Price
                {sortColumn === "price" &&
                  (sortDirection === "asc" ? (
                    <MdOutlineKeyboardArrowUp
                      className="inline ml-1"
                      size={14}
                    />
                  ) : (
                    <MdOutlineKeyboardArrowDown
                      className="inline ml-1"
                      size={14}
                    />
                  ))}
              </th>
              <th
                className="px-6 py-3 cursor-pointer font-pally-medium text-base"
                onClick={() => toggleSort("date")}
              >
                Date
                {sortColumn === "date" &&
                  (sortDirection === "asc" ? (
                    <MdOutlineKeyboardArrowUp
                      className="inline ml-1"
                      size={14}
                    />
                  ) : (
                    <MdOutlineKeyboardArrowDown
                      className="inline ml-1"
                      size={14}
                    />
                  ))}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedSales.length !== 0 ? (
              sortedSales.map((sale, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-pally-regular font-medium text-gray-900 whitespace-nowrap">
                    {sale.ticketId}
                  </td>
                  <td className="px-6 py-4 font-pally-regular">
                    {sale.ticketName}
                  </td>
                  <td className="px-6 py-4 font-pally-regular">
                    ₦{sale.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 font-pally-regular">{sale.date}</td>
                </tr>
              ))
            ) : (
              <div className="flex justify-center w-full">
                <div className="mt-8 flex flex-col mx-auto w-full justify-center items-center gap-6">
                  <Image
                    src={"/images/smallticket.svg"}
                    width={98}
                    height={45}
                    alt="ticket svg"
                  />

                  <p className="font-pally-regular text-center text-[#969CA5]">
                    You have no ticket sale, your sales will be recorded here{" "}
                  </p>
                </div>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SaleTable;
