"use client";
import React, { Fragment } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { RiSettings4Line } from "react-icons/ri";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdHelpOutline } from "react-icons/md";
import Link from "next/link";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useUserDashContext } from "@/providers/user_dashboard.provider";
import { useMe } from "@/pages/api/query/me";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { Skeleton } from "@/components/ui/skeleton";

const items = [
  {
    label: "Organizer Settings",
    icon: RiSettings4Line,
    href: "/organiser/organiser-settings",
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

const OrganiserMenu = () => {
  const { logout } = useUserDashContext();
  const { data: userData, isLoading } = useMe();

  console.log('useData:', userData)
  return (
    <Fragment>
      {!isLoading ? (
        <Popover>
          <PopoverTrigger>
            <div className="flex justify-start items-center">
              <p className="rounded-full w-10 h-10 p-2 border border-[#E6B1B0] bg-[#211913] text-white font-pally-regular">
                {`${userData?.data?.name?.firstname.slice(0, 1)}` +
                  `${userData?.data?.name?.lastname.slice(0, 1)}`}
              </p>
              <RiArrowDownSLine className="ml-2" />
            </div>
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
              <Link
                href={`/`}
                className="flex items-center gap-2 text-[#2C2B2E] font-pally-regular text-base hover:bg-gray-200 p-1.5 rounded-md"
              >
                <HiOutlineSwitchHorizontal
                  size={18}
                  className="text-gray-600"
                />
                <p className="font-pally-regular text-gray-600">
                  Switch to attendee
                </p>
              </Link>

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
      ) : (
        <Skeleton className="w-12 h-12 rounded-full" />
      )}
    </Fragment>
  );
};

export default OrganiserMenu;
