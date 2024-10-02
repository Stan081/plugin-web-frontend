"use client";

import React from "react";
import Container from "@/tw-components/container";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationDialog } from "./NavigationDialog";
import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";
import MenuLinks from "./Menu";
import NotificationButton from "@/components/ui/notification-button";
import SwitchIcon from "../../public/images/icons/switch-icon.svg";
import Image from "next/image";

const OrganiserHeader = () => {
  const { organiser } = useOrganiserDashContext();
  const pathname = usePathname();

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = pathname === href;
    return (
      <Link 
        href={href}
        className={`px-4 py-2 rounded-[200px] font-pally-medium transition-all duration-200 ease-in-out hover:border hover:border-solid hover:border-[#D9302A] hover:scale-[1.04] ${
          isActive 
            ? "text-[#D9302A] border border-solid border-[#D9302A]" 
            : "text-gray-600 hover:text-[#D9302A]"
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <header className="bg-white bg-100 bg-repeat bg-cover backdrop-blur-md border border-[#00000012]">
      <Container className="container py-2">
        <nav className="flex justify-between items-center gap-5">
          <div className="space-x-6 md:space-x-0 flex md:gap-6 items-center">
            <NavigationDialog />
            <Logo />
          </div>
          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/event">Event</NavLink>
            <NavLink href="/earnings">Earnings</NavLink>
            <NavLink href="/ad-campaigns">Ad Campaigns</NavLink>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex gap-2 items-center cursor-pointer">
              <Image
                src={SwitchIcon}
                alt="Switch Icon"
                width={20}
                height={20}
              />
              <p className="font-pally-medium text-gray-600">Switch to attendee</p>
            </div>
            <NotificationButton />
            <MenuLinks />
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default OrganiserHeader;
