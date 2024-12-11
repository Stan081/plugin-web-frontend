"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import React, { FC, useState } from "react";
import { SlLocationPin } from "react-icons/sl";
import { TfiWorld } from "react-icons/tfi";
import { TabProgress } from "../home/TabProgress";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiEdit2 } from "react-icons/fi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { MdOutlineRemoveRedEye, MdLink } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi";
import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { setCookie } from "@/lib/cookies";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";
import { useQueryClient } from "@tanstack/react-query";

const OrganiserEventCard: FC<{ event: any }> = ({ event }) => {
  const { handlePreviewEvent, handleShowDeleteEvent } =
    useOrganiserDashContext();
  const { toast } = useToast();
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
    <div className="w-full max-w-md shrink-0 rounded-xl overflow-hidden bg-white border border-gray-200 p-4  hover:bg-gray-100 transition delay-75 ease-in-out">
      {stall && <SpinnerOverlay />}
      <div className="relative">
        <Image
          className="w-full h-48 md:h-72 object-cover rounded-lg"
          src={event?.thumbnail ?? "/images/blue-bg.png"}
          alt={event?.eventName || "event"}
          width={300}
          height={200}
        />

        <div className="absolute top-2 left-2 flex justify-between items-center w-full">
          <p className="bg-[#2F80ED] text-white text-xs font-pally-regular px-2 py-1 rounded-3xl">
            {event?.isPublished ? "Published" : "Draft"}
          </p>
          <Popover>
            <PopoverTrigger>
              <div className="bg-white p-2 border rounded-full mr-6">
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
              {event?.isPublished && (
                <div className="flex items-center gap-2 p-1.5 hover:bg-gray-100 cursor-pointer rounded font-pally-regular text-sm">
                  <HiOutlineSpeakerphone size={18} color="#667185" />
                  Promote event
                </div>
              )}
              {event?.isPublished && (
                <div
                  onClick={handlePreviewEvent}
                  className="flex items-center gap-2 p-1.5 hover:bg-gray-100 cursor-pointer rounded font-pally-regular text-sm"
                >
                  <MdOutlineRemoveRedEye size={18} color="#667185" />
                  Preview
                </div>
              )}
              {event?.isPublished && (
                <div
                  onClick={() =>
                    handleCopyLink(
                      `http://localhost:3000/organiser/events/${event?._id}`
                    )
                  }
                  className="flex items-center gap-2 p-1.5 hover:bg-gray-100 cursor-pointer rounded font-pally-regular text-sm"
                >
                  <MdLink size={18} color="#667185" />
                  Copy link
                </div>
              )}
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
      </div>
      <div
        onClick={() =>
          event?.isPublished && router.push(`/organiser/events/${event?._id}`)
        }
        className="py-4 cursor-pointer space-y-3"
      >
        <h2 className="text-lg md:text-xl font-pally-medium">
          {event?.eventName
            ? event?.eventName.slice(0, 1).toLocaleUpperCase() +
              event?.eventName.slice(1)
            : event?.eventName}
        </h2>
        <p className="text-sm md:text-base text-[#667185]">
          {formattedDate ? formattedDate : "No set date"} @{" "}
          {formattedTime ?? "No set time"}
        </p>

        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <p className="text-sm md:text-base text-[#667185] flex items-center gap-2">
            <SlLocationPin />
            {event?.locationType === "physical"
              ? event?.physicalLocation?.address
                ? event?.physicalLocation?.address?.slice(0, 26).concat("...")
                : event?.physicalLocation?.address
              : "Online"}
          </p>
          <div className="w-3 rotate-90 hidden lg:block border-b-2 border-[#667185]" />
          <p className="text-sm md:text-base text-[#667185] flex items-center gap-2">
            <TfiWorld />{" "}
            {event?.isPublished && event?.publishStatus === "public"
              ? "Public view"
              : event?.publishStatus === "private"
              ? "Private view"
              : "Draft mode"}{" "}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-[#667185] whitespace-nowrap font-pally-regular text-base">
            Total sold
          </p>
          <div className=" w-52">
            <TabProgress value={10} max={100} />
          </div>
          <p className="text-[#667185] whitespace-nowrap font-pally-regular">
            {10}/{100}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrganiserEventCard;
