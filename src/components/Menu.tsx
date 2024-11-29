"use client";
import React, { Fragment } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { RiArrowDownSLine } from "react-icons/ri";
import TicketIcon from "./icons/ticket";
import { RiHeart3Line } from "react-icons/ri";
import { LuUserPlus2 } from "react-icons/lu";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdHelpOutline } from "react-icons/md";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { LuLayoutGrid } from "react-icons/lu";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useUserDashContext } from "@/providers/user_dashboard.provider";
import { useMe } from "@/pages/api/query/me";
import { Skeleton } from "./ui/skeleton";

const items = [
  {
    label: "Tickets",
    icon: TicketIcon,
    href: "/tickets",
  },
  {
    label: "Saved events",
    icon: RiHeart3Line,
    href: "/saved-events",
  },
  {
    label: "Following",
    icon: LuUserPlus2,
    href: "/following",
  },
  {
    label: "Account",
    icon: RiAccountCircleLine,
    href: "/accounts",
  },
  {
    label: "Get help",
    icon: MdHelpOutline,
    href: "/#",
  },
];

const MenuLinks = () => {
  const { logout } = useUserDashContext();
  const { data: userDate, isLoading } = useMe();
  return (
    <Fragment>
      <Popover>
        <PopoverTrigger>
          {!isLoading ? (
            <div className="flex justify-start items-center">
              <p className="rounded-full w-10 h-10 p-2 border border-[#E6B1B0] bg-[#211913] text-white font-pally-regular">
                {`${userDate?.data?.name?.firstname.slice(0, 1)}` +
                  `${userDate?.data?.name?.lastname.slice(0, 1)}`}
              </p>
              <RiArrowDownSLine className="ml-2" />
            </div>
          ) : (
            <Skeleton className="w-12 h-12 rounded-full" />
          )}
        </PopoverTrigger>
        <PopoverContent className="bg-white flex flex-col gap-2">
          <div className="my-2 space-y-1">
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  href={`${item.href}`}
                  key={index}
                  className="flex items-center gap-2 text-[#2C2B2E] font-pally-regular text-base hover:bg-gray-200 p-1.5 rounded-md"
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </div>
          <Separator />
          <div className="my-2 space-y-1">
            {userDate?.data?.role === "organizer" &&
              userDate?.data?.isOrganizer && (
                <Link
                  href={`/organiser/events`}
                  className="flex items-center gap-2 text-[#2C2B2E] font-pally-regular text-base hover:bg-gray-200 p-1.5 rounded-md"
                >
                  <LuLayoutGrid size={18} />
                  Manage events
                </Link>
              )}
            <div
              onClick={logout}
              className="flex items-center gap-2 text-[#2C2B2E] font-pally-regular text-base cursor-pointer hover:bg-gray-200 p-1.5 rounded-md"
            >
              <RiLogoutBoxRLine size={18} />
              Logout
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </Fragment>
  );
};

export default MenuLinks;
