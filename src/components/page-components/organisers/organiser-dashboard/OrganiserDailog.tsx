"use client";

import { Fragment, useState } from "react";
import { RiCloseLine, RiMenu4Fill } from "react-icons/ri";
import Link from "next/link";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useMe } from "@/pages/api/query/me";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import Logo from "@/components/Logo";

export const OrganiserDialog = () => {
  const [toggleList, setToggleList] = useState<boolean>(false);
  const eventlists = [
    {
      name: "Home",
      link: "/organiser",
    },
    {
      name: "Event",
      link: "/organiser/events",
    },
    {
      name: "Earnings",
      link: "/organiser/earnings",
    },
    {
      name: "Ad Campaigns",
      link: "/organiser/ad-campaigns",
    },
  ];
  return (
    <Fragment>
      <Dialog>
        <DialogTrigger asChild>
          <div className="block md:hidden rounded-md border-2 border-black p-1 cursor-pointer">
            <RiMenu4Fill size={18} color="#000" />
          </div>
        </DialogTrigger>
        <DialogContent className="p-4 flex-none h-screen bg-white">
          <div className="space-y-8 mt-8">
            <div className="flex justify-between items-center">
              <Logo />
              <DialogClose
                asChild
                className="p-1 bg-gray-300 rounded-full text-gray-500 hover:text-gray-700 "
              >
                <RiCloseLine size={30} />
              </DialogClose>
            </div>
            <div className="space-y-4">
              <Link href={"/events"}>
                <p className="text-lg text-[#2C2B2E] font-pally-regular">
                  Explore Events
                </p>
              </Link>

              <p
                onClick={() => setToggleList(!toggleList)}
                className="text-[#2C2B2E] font-pally-regular text-lg flex items-center hover:underline whitespace-nowrap"
              >
                List an Event <ChevronDownIcon className="ml-2" />
              </p>

              {toggleList && (
                <ul className="space-y-5">
                  {eventlists.map((list, index) => (
                    <li
                      key={index}
                      className="hover:bg-gray-100 py-2.5 px-4 rounded-lg transition delay-75 ease-in-out"
                    >
                      <Link
                        href={list.link}
                        className="flex items-center gap-4"
                      >
                        <div>
                          <p className="text-[#001633] font-pally-medium text-base md:text-lg">
                            {list.name}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};
