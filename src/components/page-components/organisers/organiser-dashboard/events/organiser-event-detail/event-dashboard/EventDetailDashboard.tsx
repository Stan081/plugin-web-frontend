import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { RiInformationLine } from "react-icons/ri";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { GoCopy } from "react-icons/go";
import { useToast } from "@/components/ui/use-toast";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
// import SaleTable from "./EventDashboard";
import EventTicketsStats from "./EventTicketsStats";
import SalesByTicketType from "./SalesByTicketType";
import OrganiserTable from "../../../OrganiserTable";
import { useEventsContext } from "@/providers/events.provider";
import { WEB_URL } from "@/lib/constants";
import { useFilteredAttendeeList } from "@/hooks/events/useFilterAttendeeList";

const tabLink = [
  { title: "Recent Sales", key: "recent_sales" },
  { title: "Sales by ticket type", key: "sales_by_ticket_type" },
];

const EventDetailDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("recent_sales");
  const { toast } = useToast();
  const { publishedEventId } = useEventsContext();
  const { data: attendeeListData } = useFilteredAttendeeList(publishedEventId);
  const handleCopyLink = async (saveLink: string) => {
    try {
      // Copy the link to the clipboard
      await navigator.clipboard.writeText(saveLink);

      toast({
        variant: "success",
        title: "Link copied to clipboard!",
      });
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Failed to copy link.",
      });
    }
  };
  const sharedLink: string = `${WEB_URL}/explore-events/${publishedEventId}`;

  return (
    <div>
      <div className="flex justify-between">
        <p className="font-pally-medium text-2xl">Dashboard</p>
        <p className="destructive font-pally-medium text-sm md:text-lg flex items-center gap-2">
          <RiInformationLine size={24} /> Plugin takes 10% Per ticket
        </p>
      </div>

      <EventTicketsStats />

      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
        <li className="border-2 border-[#C7E2FC] rounded-xl bg-[#F2F8FE] flex items-start gap-6 p-5">
          <Image
            src={"/images/speakerImg.svg"}
            width={82}
            height={86}
            alt="speaker"
            className="pointer-events-none w-20 h-20 "
          />
          <div className=" space-y-12">
            <div className="space-y-3 block">
              <p className="font-pally-medium text-xl ">Promotion Campaign </p>
              <p className="font-pally-regular text-sm md:text-base text-[#667185]">
                Increase your sales by 63% with a marketing campaign
              </p>
            </div>

            <Link
              href={"/organiser/ad-campaigns"}
              className="destructive flex items-center gap-2 font-pally-medium text-sm md:text-base"
            >
              Start campaign
              <MdOutlineKeyboardArrowRight size={22} />
            </Link>
          </div>
        </li>
        <li className="border-2 border-[#CFECD9] rounded-xl bg-[#F4FEF7] flex items-start gap-6 p-5">
          <div className="space-y-6 w-full">
            <div className="space-y-3">
              <p className="font-pally-medium text-xl w-full">
                Share Event Link
              </p>
              <div className="flex items-center justify-between gap-4 border border-[#667185] p-3 w-full rounded-md">
                <p className="font-pally-regular text-[#667185] text-sm">
                  {sharedLink.length > 30
                    ? sharedLink.slice(0, 30).concat("...")
                    : sharedLink}
                </p>
                <div
                  onClick={() => handleCopyLink(sharedLink)}
                  className="cursor-pointer"
                >
                  <GoCopy size={20} color="#D9302A" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <p className="font-pally-medium text-sm md:text-base">
                Share on :
              </p>
              <div className="p-2 rounded-full border">
                <FaGoogle size={20} />
              </div>
              <div className="p-2 rounded-full border">
                <FaFacebook size={20} />
              </div>
              <div className="p-2 rounded-full border">
                <FaXTwitter size={20} />
              </div>
            </div>
          </div>
        </li>
      </ul>

      {/* Organiser Sales Table */}
      <div className="space-y-5 mt-10">
        {/* Tabs */}
        <ul className="mt-6 flex justify-start items-center gap-4 align-baseline">
          {tabLink.map((tab) => (
            <li key={tab.key} role="presentation">
              <button
                className={`font-pally-regular py-2 px-3 ${
                  activeTab === tab.key
                    ? "border border-[#D9302A] text-[#D9302A] bg-[#f3cac9] rounded-xl"
                    : " text-[#586170]"
                }`}
                role="tab"
                aria-selected={activeTab === tab.key}
                aria-controls={`panel-${tab.key}`}
                id={`tab-${tab.key}`}
                onClick={() => setActiveTab(tab.key)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setActiveTab(tab.key);
                  }
                }}
              >
                {tab.title}
              </button>
            </li>
          ))}
        </ul>
        {activeTab === "sales_by_ticket_type" ? (
          <SalesByTicketType />
        ) : attendeeListData?.data.length != 0 ? (
          <OrganiserTable
            tableHead={[
              "Email address",
              "Ticket name",
              "Price",
              "Check-in Status",
              "Date",
            ]}
            tableBody={attendeeListData?.data?.slice(0, 5)}
            type="attendeListTable"
          />
        ) : (
          <>
            <div className="bg-gray-100 rounded-lg py-5 md:py-9 w-full flex flex-col items-center justify-center gap-5">
              <Image
                src={"/images/calendar.svg"}
                width={200}
                height={200}
                alt="calemder"
                className="w-20 h-20 object-cover pointer-events-none"
              />

              <p className="font-pally-regular text-sm md:text-lg text-[#828994]">
                No Attendee yet
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventDetailDashboard;
