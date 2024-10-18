"use client";

import React, { useCallback, useMemo } from "react";
import Container from "@/tw-components/container";
import Logo from "../../../Logo";
import Link from "next/link";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { NavigationDialog } from "../../../NavigationDialog";
import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";
import MenuLinks from "../../../Menu";
import classNames from "classnames";
import { useRouter } from "next/router";

const OrganiserHeader = () => {
  // const { organiser } = useOrganiserDashContext();

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
        path: "/organiser/event",
        title: "Event",
        className: getHeaderLinkState("/organiser/event"),
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
    <header className="border-b w-full">
      <Container className="container px-4 md:px-0 py-2">
        <nav className="flex justify-between items-center gap-5">
          <div className="space-x-6 md:space-x-0 flex md:gap-6 items-center">
            <NavigationDialog />
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
            <div className="flex gap-2 items-center cursor-pointer hover:underline">
              <HiOutlineSwitchHorizontal size={18} className="text-gray-600" />
              <p className="font-pally-medium text-gray-600">
                Switch to attendee
              </p>
            </div>
            <MenuLinks />
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default OrganiserHeader;
