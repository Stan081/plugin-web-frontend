import { FC, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";
import Link from "next/link";
import MobileSidebar from "./MobileSidebar";
import { RiHeart3Line, RiLogoutBoxRLine } from "react-icons/ri";
import { LuUserPlus2 } from "react-icons/lu";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdHelpOutline } from "react-icons/md";
import { BsTicketPerforated } from "react-icons/bs";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  toggle: () => void;
};

const menuLinks = [
  {
    label: "Tickets",
    icon: BsTicketPerforated,
    href: "/#",
  },
  {
    label: "Saved events",
    icon: RiHeart3Line,
    href: "/#",
  },
  {
    label: "Following",
    icon: LuUserPlus2,
    href: "/#",
  },
  {
    label: "Account",
    icon: RiAccountCircleLine,
    href: "/accounts",
  },
];

const Sidebar: FC<Props> = ({ open, toggle }) => {
  const router = useRouter();

  const renderSidebar = (hidden: boolean) => {
    return (
      <div
        className={clsx(
          " lg:flex w-full h-full md:w-96 lg:w-64 lg:flex-col border-r bg-white",

          {
            hidden: hidden,
          }
        )}
      >
        <div className="hidden md:flex grow my-9 flex-col gap-y-5 overflow-y-auto h-full">
          <nav className="flex shrink-0 h-full flex-1 flex-col gap-4 pb-5">
            <div className="flex justify-start items-center gap-4">
              <p className="rounded-full w-10 h-10 p-2 border border-[#E6B1B0] bg-[#211913] text-white font-pally-regular flex justify-center items-center">
                OM
              </p>
              <div>
                <p className="font-pally-medium text-lg ">Oluchi Miracle</p>
                <p className="text-[#586170] font-pally-regular">
                  oluchiMiracle@gmail.com
                </p>
              </div>
            </div>
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
              <li className="cursor-pointer mx-2 flex items-center gap-3 font-pally-regular text-base text-gray-600 hover:text-black p-3 rounded-md">
                <RiLogoutBoxRLine size={22} />
                Logout
              </li>
            </ul>
          </nav>
          <div className="rounded-2xl">
            <div className="bg-bgListEvent bg-contain bg-no-repeat rounded-2xl">
              <div className="px-5 pb-5 pt-20 space-y-3">
                <p className="font-pally-medium text-xl">
                  List an event in 160 seconds
                </p>
                <Button variant="destructive" className="w-full max-w-44 mx-auto">List event</Button>
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
