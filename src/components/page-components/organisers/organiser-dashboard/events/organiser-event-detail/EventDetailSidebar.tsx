"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";
import React, { FC, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import {
  HiOutlineSpeakerphone,
  HiOutlineViewGrid,
  HiOutlineDotsVertical,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { MdOutlineRemoveRedEye, MdLink } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi";
import { LuTicket } from "react-icons/lu";
import { RiDiscountPercentLine } from "react-icons/ri";
import { MdOutlineHeadsetMic } from "react-icons/md";
import { BsQuestionCircle } from "react-icons/bs";
import Image from "next/image";
import { TabProgress } from "../../home/TabProgress";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { setCookie } from "@/lib/cookies";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";
import Link from "next/link";
import { BASE_URL } from "@/lib/constants";
import { useGetSalesRecord } from "@/hooks/organiser/useGetSalesRecord";
import { Skeleton } from "@/components/ui/skeleton";

export const eventDetailTabLink = [
  {
    title: "Dashboard",
    key: "dashboard",
    icon: HiOutlineViewGrid,
  },
  {
    title: "Manage tickets",
    key: "attendees",
    icon: HiOutlineUserGroup,
  },
  {
    title: "Booking history",
    key: "tickets",
    icon: LuTicket,
  },
  // {
  //   title: "Discount Codes",
  //   key: "discount",
  //   icon: RiDiscountPercentLine,
  // },
  // {
  //   title: "Promotions",
  //   key: "promotions",
  //   icon: HiOutlineSpeakerphone,
  // },
  // {
  //   title: "Ticket Agents",
  //   key: "ticket_agent",
  //   icon: MdOutlineHeadsetMic,
  // },
  // {
  //   title: "Resolve Issues",
  //   key: "resolve_issues",
  //   icon: BsQuestionCircle,
  // },
];

const EventDetailSidebar: FC<{ event: any }> = ({ event }) => {
  const {
    handleShowDeleteEvent,
    setActiveEvent,
    setEventId,
    activeEvent,
    eventId,
  } = useOrganiserDashContext();

  const { data: sales, isLoading } = useGetSalesRecord(event?._id);

  const [stall, setStall] = useState<boolean>(false);

  const router = useRouter();

  const client = useQueryClient();

  const startDate: string =
    event?.oneTimeEvent?.startDate || event?.recurringEvent?.startDate;

  const startTime: string =
    event?.oneTimeEvent?.startTime || event?.recurringEvent?.startTime;

  const date = new Date(startDate);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric", // Add year to the options
  };

  const formattedDate = date.toLocaleDateString("en-GB", options);

  const [hour, minute] = startTime ? startTime.split(":") : ["00", "00"];
  const formattedTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    Number(hour),
    Number(minute)
  ).toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "UTC",
  });

  const { toast } = useToast();

  const handleCopyLink = async (saveLink: string) => {
    try {
      // Copy the link to the clipboard
      await navigator.clipboard.writeText(saveLink);

      toast({
        variant: "success",
        title: "Link copied to clipboard!",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to copy link.",
      });
    }
  };

  const handleEditEvent = () => {
    setCookie("event_id", event?._id);
    client.invalidateQueries({ queryKey: ["eventById"] });
    setStall(true);
    setTimeout(() => {
      setStall(false);
      router.push("/create-event");
    }, 3000);
  };

  const totalSold = sales?.data?.reduce((acc, item) => acc + item?.sold, 0);
  const totalAvailable = sales?.data?.reduce(
    (acc, item) => acc + item?.total,
    0
  );

  // Calculate percentage
  const soldPercentage = (totalSold / totalAvailable) * 100;

  return (
    <div className="shadow-md border rounded-xl">
      {stall && <SpinnerOverlay />}
      <div className="flex justify-between items-center w-full p-4">
        <p className="bg-[#2F80ED] text-white text-xs font-pally-regular px-2 py-1 rounded-3xl">
          {event?.isPublished ? " Published" : "pending"}
        </p>
        <Popover>
          <PopoverTrigger>
            <div className="bg-white p-2 rounded-full border">
              <HiOutlineDotsVertical />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-48 bg-white rounded-xl p-3">
            <div
              onClick={handleEditEvent}
              className="flex items-center gap-2 p-1.5 hover:bg-gray-100 cursor-pointer rounded font-pally-regular text-sm"
            >
              <FiEdit2 size={18} color="#667185" />
              Edit
            </div>
            {/* <div className="flex items-center gap-2 p-1.5 hover:bg-gray-100 cursor-pointer rounded font-pally-regular text-sm">
              <HiOutlineSpeakerphone size={18} color="#667185" />
              Promote event
            </div> */}
            <Link
              href={`/explore-events/${event?._id}`}
              className="flex items-center gap-2 p-1.5 hover:bg-gray-100 cursor-pointer rounded font-pally-regular text-sm"
            >
              <MdOutlineRemoveRedEye size={18} color="#667185" />
              Preview
            </Link>
            <div
              onClick={() =>
                handleCopyLink(`${BASE_URL}/organiser/events/${event?._id}`)
              }
              className="flex items-center gap-2 p-1.5 hover:bg-gray-100 cursor-pointer rounded font-pally-regular text-sm"
            >
              <MdLink size={18} color="#667185" />
              Copy link
            </div>
            <div
              onClick={() => {
                handleShowDeleteEvent();
                setEventId(event?._id);
              }}
              className="flex items-center gap-2 p-1.5 hover:bg-gray-100 cursor-pointer rounded font-pally-regular text-sm"
            >
              <HiOutlineTrash size={18} color="#667185" />
              Delete
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {event?.thumbnail && (
        <Image
          className="w-full h-48 md:h-56 object-cover border-t-2 border-[#EFEDED] border-b-2"
          src={event?.thumbnail}
          alt={event?.eventName}
          width={300}
          height={200}
        />
      )}

      <div className="mt-4 block space-y-1 px-4">
        <h2 className="text-lg md:text-2xl font-pally-medium">
          {event?.eventName?.length > 30
            ? event?.eventName.slice(0, 30).concat("...")
            : event?.eventName}
        </h2>
        <p className="text-sm md:text-base text-[#667185]">
          {formattedDate} @ {formattedTime}
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-1 border mx-4 rounded-md p-3">
        <p className="text-[#667185] whitespace-nowrap font-pally-regular text-base">
          Sale progress
        </p>
        {isLoading ? (
          <Skeleton className="h-4 w-full"/>
        ) : (
          <div className="flex items-center gap-6">
            <div className="w-full">
              <TabProgress value={soldPercentage} max={100} />
            </div>
            <p className="text-[#667185] whitespace-nowrap font-pally-regular">
              {soldPercentage}/{100}
            </p>
          </div>
        )}
      </div>

      <ul className="mt-4 block space-y-1.5 m-3">
        {eventDetailTabLink.map((item) => {
          const Icon = item.icon;
          return (
            <li
              key={item.key}
              onClick={() => setActiveEvent(item.key)}
              className={`flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer rounded font-pally-regular text-sm ${
                activeEvent === item.key && `bg-[#FFF1F0] text-[#D9302A]`
              }`}
            >
              <Icon size={18} />
              {item.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EventDetailSidebar;
