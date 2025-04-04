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
  HiOutlineViewGrid,
  HiOutlineDotsVertical,
  HiOutlineUserGroup,
} from "react-icons/hi";
import {
  MdOutlineRemoveRedEye,
  MdLink,
  MdOutlineHeadsetMic,
} from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi";
import { LuTicket } from "react-icons/lu";
import Image from "next/image";
import { TabProgress } from "../../home/TabProgress";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { setCookie } from "@/lib/cookies";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";
import Link from "next/link";
import { WEB_URL } from "@/lib/constants";
import { BsQuestionCircle } from "react-icons/bs";

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
  {
    title: "Check Agents",
    key: "ticket_agent",
    icon: MdOutlineHeadsetMic,
  },
  {
    title: "Support Center",
    key: "resolve_issues",
    icon: BsQuestionCircle,
  },
];

const EventDetailSidebar: FC<{ event: any }> = ({ event }) => {
  const { handleShowDeleteEvent, setActiveEvent, setEventId, activeEvent } =
    useOrganiserDashContext();

  const [stall, setStall] = useState<boolean>(false);

  const router = useRouter();

  const client = useQueryClient();

  const startDate: Date = event?.startDate;

  const startTime: string = event?.startTime;

  const endDate: Date = new Date(event?.endDate);

  const now = new Date();

  const isPastEvent = endDate < now;

  const date = new Date(startDate);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "long",
    day: "numeric",
    timeZone: "Africa/Lagos",
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
    timeZone: "Africa/Lagos",
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

  return (
    <div className="shadow-md border rounded-xl">
      {stall && <SpinnerOverlay />}
      <div className="flex justify-between items-center w-full p-4">
        <p className="bg-[#2F80ED] text-white text-xs font-pally-regular px-2 py-1 rounded-3xl">
          {event?.isPublished ? " Published" : "Pending"}
        </p>
        <Popover>
          <PopoverTrigger>
            <div className="bg-white p-2 rounded-full border">
              <HiOutlineDotsVertical />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-48 bg-white rounded-xl p-3">
            {!isPastEvent && (
              <div
                onClick={handleEditEvent}
                className="flex items-center gap-2 p-1.5 hover:bg-gray-100 cursor-pointer rounded font-pally-regular text-sm"
              >
                <FiEdit2 size={18} color="#667185" />
                Edit
              </div>
            )}
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
                handleCopyLink(`${WEB_URL}/organiser/events/${event?._id}`)
              }
              className="flex items-center gap-2 p-1.5 hover:bg-gray-100 cursor-pointer rounded font-pally-regular text-sm"
            >
              <MdLink size={18} color="#667185" />
              Copy link
            </div>
            {event?.isPublished ?? <div
              onClick={() => {
                handleShowDeleteEvent();
                setEventId(event?._id);
              }}
              className="flex items-center gap-2 p-1.5 hover:bg-gray-100 cursor-pointer rounded font-pally-regular text-sm"
            >
              <HiOutlineTrash size={18} color="#667185" />
              Delete
            </div>}
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
          Sale progress (%)
        </p>
        <div className="flex items-center gap-6">
          <div className="w-full">
            <TabProgress value={event?.salesPercentage} max={100} />
          </div>
          <p className="text-[#667185] whitespace-nowrap font-pally-regular">
            {event?.salesPercentage}/{100}
          </p>
        </div>
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
