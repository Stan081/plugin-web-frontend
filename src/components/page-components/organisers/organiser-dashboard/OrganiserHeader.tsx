"use client";

import React, { useCallback, useMemo } from "react";
import Container from "@/tw-components/container";
import Logo from "../../../Logo";
import Link from "next/link";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import classNames from "classnames";
import { useRouter } from "next/router";
import OrganiserMenu from "./OrganiserMenu";
import { OrganiserDialog } from "./OrganiserDailog";

const OrganiserHeader = () => {
  const router = useRouter();

  const getHeaderLinkState = useCallback(
    (path: string) =>
      [
        classNames(
          "font-medium  px-2 md:px-4 py-1.5 cursor-pointer ",
          router.asPath === path
            ? "text-[#D9302A] rounded-full border border-[#D9302A]"
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
    <header className="border-b w-full bg-white">
      <Container className="container px-4 md:px-0">
        <nav className="flex justify-between items-center gap-5">
          <div className="space-x-6 md:space-x-0 flex md:gap-6 items-center">
            <OrganiserDialog />
            <Logo />
          </div>
          <div className="hidden lg:flex items-center gap-6">
            {headerLinks.map((link) => (
              <Link key={link.path} href={link.path} className={link.className}>
                {link.title}
              </Link>
            ))}
          </div>

          <div className="flex gap-4 items-center">
            <Link
              href={`/`}
              className="hidden lg:flex gap-2 items-center cursor-pointer hover:underline"
            >
              <HiOutlineSwitchHorizontal size={18} className="text-gray-600" />
              <p className="font-pally-medium text-gray-600">
                Switch to attendee
              </p>
            </Link>
            <OrganiserMenu />
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default OrganiserHeader;
