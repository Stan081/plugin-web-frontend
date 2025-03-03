"use client";

import React from "react";
import Container from "@/tw-components/container";
import Logo from "./Logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeaderSearchBar from "./page-components/homepage/headerSearch";
import ListEventCard from "./ListEventLinks";
import { NavigationDialog } from "./NavigationDialog";
import MenuLinks from "./Menu";
import { getToken } from "@/lib/token";

const Header = () => {
  const token = getToken();
  return (
    <header className="bg-pitchNoise bg-100 bg-repeat bg-cover backdrop-blur-md shadow-md">
      <nav>
        <Container className="flex justify-between items-center gap-5">
          <div className="md:space-x-0 flex gap-4 md:gap-6 items-center">
            <NavigationDialog />
            <Logo />
            <div className="hidden lg:block w-60">
              <HeaderSearchBar />
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href={"/explore-events"}
              className="text-[#586170] font-pally-regular text-base md:text-lg hover:underline whitespace-nowrap cursor-pointer"
            >
              Explore Events
            </Link>

            <ListEventCard />

            <Link
              href={"/faq"}
              className="text-[#586170] font-pally-regular text-base md:text-lg hover:underline cursor-pointer"
            >
              Help
            </Link>

            {!token ? (
              <Link href={"/signup"}>
                <Button variant="outline" className=" border-black">
                  Get Started
                </Button>
              </Link>
            ) : (
              <>
                <MenuLinks />
              </>
            )}
          </div>
          <div className="lg:hidden block">
            {!token ? (
              <Link href={"/signup"}>
                <Button variant="outline" className=" border-black">
                  Get Started
                </Button>
              </Link>
            ) : (
              <>
                <MenuLinks />
              </>
            )}
          </div>
        </Container>
        <div className="lg:hidden block w-full pb-2 md:pb-0 px-4">
          <HeaderSearchBar />
        </div>
      </nav>
    </header>
  );
};

export default Header;
