'use client'; 

import Container from "@/tw-components/container";
import Logo from "./Logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeaderSearchBar from "./page-components/homepage/headerSearch";
import ListEventCard from "./ListEventLinks";


const Header = () => {

  return (
    <header className="bg-pitchNoise bg-100 bg-repeat bg-cover backdrop-blur-md">
      <Container className="container px-4 md:px-0 py-2">
        <div className="flex justify-between items-center">
          <div className="space-x-6 flex items-center">
            <Logo />
            <div className="hidden md:block w-[250px]">
              <HeaderSearchBar />
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href={"/#"}
              className="text-[#586170] font-pally-regular text-base md:text-lg hover:underline"
            >
              Explore Events
            </Link>

            <ListEventCard />

            <Link
              href={"/#"}
              className="text-[#586170] font-pally-regular text-base md:text-lg hover:underline"
            >
              Help
            </Link>

            <Button variant="outline" className=" border-black">
              Get Started
            </Button>
          </div>
          <div className="lg:hidden block">
            <Button variant="outline" className=" border-black">
              Get Started
            </Button>
          </div>
        </div>
        <div className="md:hidden block w-full">
          <HeaderSearchBar />
        </div>
      </Container>
    </header>
  );
};

export default Header;
