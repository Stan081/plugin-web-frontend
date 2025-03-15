"use client";

import { Fragment, useState } from "react";
import { RiCloseLine, RiMenu4Fill } from "react-icons/ri";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import Link from "next/link";
import Logo from "./Logo";
import { Button } from "./ui/button";
import ListAdd from "./icons/list-add";
import Grid2 from "./icons/grid-2";
import Money2 from "./icons/money-2";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useMe } from "@/pages/api/query/me";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useRouter } from "next/navigation";

export const NavigationDialog = () => {
  const [toggleList, setToggleList] = useState<boolean>(false);
  const { handleProtectedNavigation } = useAuthRedirect();
  const { data: userDate } = useMe();
  const router = useRouter();

  const eventlists = [
    ...(userDate?.data?.role === "organizer" && userDate?.data?.isOrganizer
      ? []
      : [
          {
            slug: "create_events",
            name: "Create events",
            description: "List your event",
            icon: <ListAdd />,
            bgColor: "bg-[#FBDFD2]",
            link: "/create-event",
          },
        ]),
    {
      slug: "features",
      name: "Features",
      description: "Discover the benefits of Plugin",
      icon: <Grid2 />,
      bgColor: "bg-[#E4C9FF]",
      link: "/features",
    },
    {
      slug: "pricing",
      name: "Pricing",
      description: "Explore the planning price",
      icon: <Money2 />,
      bgColor: "bg-[#C9F8FF]",
      link: "/pricing",
    },
  ];

  const handleRedirect = (slug: string, link: string) => {
    if (slug === "create_events") {
      handleProtectedNavigation(link);
    } else {
      router.push(link);
    }
  };

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
              <Link href={"/explore-events"}>
                <p className="text-lg text-[#2C2B2E] font-pally-regular mb-4">
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
                      onClick={() => handleRedirect(list?.slug, list.link)}
                      className="hover:bg-gray-100 py-2.5 px-4 rounded-lg transition delay-75 ease-in-out"
                    >
                      <Link
                        href={list.link}
                        className="flex items-center gap-4"
                      >
                        <div
                          className={`w-7 h-7 rounded-full p-6 ${list.bgColor} flex justify-center items-center`}
                        >
                          {list.icon}
                        </div>
                        <div>
                          <p className="text-[#001633] font-pally-medium text-base md:text-lg">
                            {list.name}
                          </p>
                          <p className="text-[#586170] font-pally-regular text-base md:text-lg">
                            {list.description}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Link href={'mailto:support@pluginent.com'}>
              <Button variant="outline" className="w-full">
                Get help
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};
