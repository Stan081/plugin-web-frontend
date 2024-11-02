"use client";

import Container from "@/tw-components/container";
import Logo from "./Logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeaderSearchBar from "./page-components/homepage/headerSearch";
import ListEventCard from "./ListEventLinks";
import { NavigationDialog } from "./NavigationDialog";
import { useUserDashContext } from "@/providers/user_dashboard.provider";
import MenuLinks from "./Menu";
import { useMe } from "@/pages/api/query/me";

const Header = () => {
  const { user } = useUserDashContext();
  return (
    <header className="bg-pitchNoise bg-100 bg-repeat bg-cover backdrop-blur-md">
      <Container className="container px-4 md:px-0">
        <nav className="flex justify-between items-center gap-5">
          <div className="space-x-6 md:space-x-0 flex md:gap-6 items-center">
            <NavigationDialog />
            <Logo />
            <div className="hidden md:block w-full">
              <HeaderSearchBar />
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href={"/explore-events"}
              className="text-[#586170] font-pally-regular text-base md:text-lg hover:underline whitespace-nowrap"
            >
              Explore Events
            </Link>

            <ListEventCard />

            <Link
              href={"/faq"}
              className="text-[#586170] font-pally-regular text-base md:text-lg hover:underline"
            >
              Help
            </Link>

            {!user? (
              <Link href={"/signup"}>
                <Button variant="outline" className=" border-black">
                  Get Started
                </Button>
              </Link>
            ) : (
              <MenuLinks />
            )}
          </div>
          <div className="md:hidden block">
            {!user? (
              <Link href={"/signup"}>
                <Button variant="outline" className=" border-black">
                  Get Started
                </Button>
              </Link>
            ) : (
              <MenuLinks />
            )}
          </div>
        </nav>
        <div className="md:hidden block w-full pb-2 md:pb-0">
          <HeaderSearchBar />
        </div>
      </Container>
    </header>
  );
};

export default Header;
