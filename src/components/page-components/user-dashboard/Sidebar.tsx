"use client"
import { FC, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { useRouter } from "next/router";
import Link from "next/link";
import MobileSidebar from "./MobileSidebar";
import { RiHeart3Line, RiLogoutBoxRLine } from "react-icons/ri";
import { LuUserPlus2 } from "react-icons/lu";
import { RiAccountCircleLine } from "react-icons/ri";
import { BsTicketPerforated } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { useUserDashContext } from "@/providers/user_dashboard.provider";
import { useMe } from "@/pages/api/query/me";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  open: boolean;
  toggle: () => void;
};

const menuLinks = [
  {
    label: "Tickets",
    icon: BsTicketPerforated,
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
];

const Sidebar: FC<Props> = ({ open, toggle }) => {
  const { logout } = useUserDashContext();
  const { data: user, isLoading } = useMe();
  const router = useRouter();

  const renderSidebar = (hidden: boolean) => {
    return (
      <div
        className={clsx(
          " lg:flex w-full h-full md:h-[80vh] md:w-96 lg:w-64 lg:flex-col border-r bg-white",

          {
            hidden: hidden,
          }
        )}
      >
        <div className="hidden md:flex grow my-9 flex-col gap-y-5 overflow-y-auto h-full">
          <nav className="flex shrink-0 h-full flex-1 flex-col gap-4 md:gap-8 pb-5">
            {isLoading ? (
              <div className="flex gap-5">
                <Skeleton className="rounded-full w-10 h-10" />
                <div className="space-y-3">
                  <Skeleton className="h-5 w-[120px]" />
                  <Skeleton className="h-5 w-[120px]" />
                </div>
              </div>
            ) : (
              <div className="flex justify-start items-center gap-4">
                <p className="rounded-full w-10 h-10 p-2 border border-[#E6B1B0] bg-[#211913] text-white font-pally-regular flex justify-center items-center">
                  {`${user?.data?.name?.firstname.slice(0, 1)}` +
                    `${user?.data?.name?.lastname.slice(0, 1)}`}
                </p>
                <div>
                  <p className="font-pally-medium text-lg ">
                    {user?.data?.name?.firstname} {user?.data?.name?.lastname}
                  </p>
                  <p className="text-[#586170] font-pally-regular">
                    {user?.data?.email}
                  </p>
                </div>
              </div>
            )}
            <ul role="list" className="flex flex-col gap-2 flex-1 h-full">
              {menuLinks.map(({ href, label, icon }, index) => {
                const Icon = icon;
                return (
                  <li
                    key={index}
                    className={`ease-in transition font-pally-regular mx-2 ${
                      router.pathname === href
                        ? ` bg-[#FCE0DC] delay-75 rounded-md ease-in`
                        : `text-gray-600`
                    }`}
                  >
                    <Link
                      href={href}
                      className={`group flex items-center gap-3 p-3 text-md font-medium leading-6 hover:text-black ${
                        router.pathname === href && `font-pally-medium`
                      }`}
                    >
                      <Icon
                        size={22}
                        className={router.pathname === href && `destructive`}
                      />
                      {label}
                    </Link>
                  </li>
                );
              })}
              <li
                onClick={logout}
                className="cursor-pointer mx-2 flex items-center gap-3 font-pally-regular text-base text-gray-600 hover:text-black p-3 rounded-md"
              >
                <RiLogoutBoxRLine size={22} />
                Logout
              </li>
            </ul>
          </nav>
          <div className="rounded-2xl">
            <div className="bg-bgListEvent bg-contain bg-no-repeat rounded-2xl">
              <div className="px-5 pb-5 pt-20 space-y-3">
                <p className="font-pally-medium text-xl pb-2">
                  List an event in 160 seconds
                </p>
                <Link href={"/create-event"}>
                  <Button
                    variant="destructive"
                    className="w-full max-w-44 mx-auto"
                  >
                    List event
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* <MobileSidebar /> */}
      </div>
    );
  };

  return (
    <>
      <Transition show={open} as={Fragment}>
        <div
          className={clsx([
            "absolute w-48 border transition ease-in-out",
            "data-[closed]:opacity-0",
            "data-[enter]:duration-100 data-[enter]:data-[closed]:-translate-x-full",
            "data-[leave]:duration-300 data-[leave]:data-[closed]:translate-x-full",
          ])}
        >
          <Dialog as="div" className="lg:hidden" onClose={toggle}>
            <div className="fixed inset-0 flex">
              <button onClick={toggle}>Toggle</button>
            </div>
          </Dialog>
        </div>
      </Transition>
      {renderSidebar(true)}
    </>
  );
};

export default Sidebar;
