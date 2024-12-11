"use client";

import { Fragment, useCallback, useMemo } from "react";
import { RiCloseLine, RiMenu4Fill } from "react-icons/ri";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import Logo from "@/components/Logo";
import classNames from "classnames";
import { useRouter } from "next/router";

export const OrganiserDialog = () => {
  const router = useRouter();

  const getHeaderLinkState = useCallback(
    (path: string) =>
      [
        classNames(
          "font-medium  px-2 md:px-4 py-1.5 cursor-pointer ",
          router.asPath === path
            ? "text-[#D9302A] border-b border-[#D9302A]"
            : "text-[#707070]"
        ),
      ].join(" "),
    [router]
  );

  const headerLinks = useMemo(
    () => [
      {
        path: "/organiser",
        title: "Home",
        className: getHeaderLinkState("/organiser"),
      },
      {
        path: "/organiser/events",
        title: "Event",
        className: getHeaderLinkState("/organiser/events"),
      },
      {
        path: "/organiser/earnings",
        title: "Earnings",
        className: getHeaderLinkState("/organiser/earnings"),
      },
      {
        path: "/organiser/ad-campaigns",
        title: "Ad Campaigns",
        className: getHeaderLinkState("/organiser/ad-campaigns"),
      },
    ],
    []
  );

  return (
    <Fragment>
      <Dialog>
        <DialogTrigger asChild>
          <div className="block lg:hidden rounded-md border-2 border-black p-1 cursor-pointer">
            <RiMenu4Fill size={18} color="#000" />
          </div>
        </DialogTrigger>
        <DialogContent className="p-4 flex-none h-full bg-white">
          <div className="">
            <div className="flex justify-between items-center">
              <Logo />
              <DialogClose
                asChild
                className="p-1 bg-gray-300 rounded-full text-gray-500 hover:text-gray-700 "
              >
                <RiCloseLine size={30} />
              </DialogClose>
            </div>
            <div className="flex flex-col gap-5">
              {headerLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={link.className}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};
