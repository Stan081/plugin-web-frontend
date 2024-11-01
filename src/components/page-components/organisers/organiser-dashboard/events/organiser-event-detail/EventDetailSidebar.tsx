"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";
import { OrganiserEventCardProps } from "@/static-datas/organiser-date";
import { useRouter } from "next/router";
import React, { FC } from "react";
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

const eventDetailTabLink = [
  {
    title: "Dashboard",
    key: "dashboard",
    icon: HiOutlineViewGrid,
  },
  {
    title: "Manage attendees",
    key: "attendees",
    icon: HiOutlineUserGroup,
  },
  {
    title: "Ticket History",
    key: "tickets",
    icon: LuTicket,
  },
  {
    title: "Discount Codes",
    key: "discount",
    icon: RiDiscountPercentLine,
  },
  {
    title: "Promotions",
    key: "promotions",
    icon: HiOutlineSpeakerphone,
  },
  {
    title: "Check-in Agent",
    key: "check_agent",
    icon: MdOutlineHeadsetMic,
  },
  {
    title: "Support Center",
    key: "support",
    icon: BsQuestionCircle,
  },
];

const EventDetailSidebar: FC<OrganiserEventCardProps> = ({
  id,
  eventImage,
  eventName,
  ticketSale,
  totalTicket,
}) => {
  const {
    handlePreviewEvent,
    handleShowDeleteEvent,
    setActiveEvent,
    activeEvent,
  } = useOrganiserDashContext();

  const router = useRouter();

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
  return (
    <div className="w-full md:max-w-md shadow-md border rounded-xl">
      <div className="flex justify-between items-center w-full p-4">
        <p className="bg-[#2F80ED] text-white text-xs font-pally-regular px-2 py-1 rounded-3xl">
          Published
        </p>
        <Popover>
          <PopoverTrigger>
            <div className="bg-white p-2 rounded-full border">
              <HiOutlineDotsVertical />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-48 bg-white rounded-xl p-3">
            <div className="flex items-center gap-2 p-1.5 hover:bg-gray-100 cursor-pointer rounded font-pally-regular text-sm">
              <FiEdit2 size={18} color="#667185" />
              Edit
            </div>
            <div className="flex items-center gap-2 p-1.5 hover:bg-gray-100 cursor-pointer rounded font-pally-regular text-sm">
              <HiOutlineSpeakerphone size={18} color="#667185" />
              Promote event
            </div>
            <div
              onClick={handlePreviewEvent}
              className="flex items-center gap-2 p-1.5 hover:bg-gray-100 cursor-pointer rounded font-pally-regular text-sm"
            >
              <MdOutlineRemoveRedEye size={18} color="#667185" />
              Preview
            </div>
            <div
              onClick={() =>
                handleCopyLink(`http://localhost:3000/organiser/events/${id}`)
              }
              className="flex items-center gap-2 p-1.5 hover:bg-gray-100 cursor-pointer rounded font-pally-regular text-sm"
            >
              <MdLink size={18} color="#667185" />
              Copy link
            </div>
            <div
              onClick={handleShowDeleteEvent}
              className="flex items-center gap-2 p-1.5 hover:bg-gray-100 cursor-pointer rounded font-pally-regular text-sm"
            >
              <HiOutlineTrash size={18} color="#667185" />
              Delete
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {eventImage && (
        <Image
          className="w-full h-48 md:h-56 object-cover border-t-2 border-[#EFEDED] border-b-2"
          src={eventImage}
          alt={eventName}
          width={300}
          height={200}
        />
      )}

      <div className="mt-4 block space-y-1 px-4">
        <h2 className="text-lg md:text-2xl font-pally-medium">
          {eventName?.length > 30
            ? eventName.slice(0, 30).concat("...")
            : eventName}
        </h2>
        <p className="text-sm md:text-base text-[#667185]">
          Saturday , September 7th, 2023 @ 7:30pm GMT
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-1 border mx-4 rounded-md p-3">
        <p className="text-[#667185] whitespace-nowrap font-pally-regular text-base">
          Sale progress
        </p>
        <div className="flex items-center gap-6">
          <div className="w-full">
            <TabProgress value={ticketSale} max={totalTicket} />
          </div>
          <p className="text-[#667185] whitespace-nowrap font-pally-regular">
            {ticketSale}/{totalTicket}
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
              <Icon size={18}/>
              {item.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EventDetailSidebar;
