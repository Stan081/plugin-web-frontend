import Container from "@/tw-components/container";
import Logo from "./Logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import ListAdd from "./icons/list-add";
import Grid2 from "./icons/grid-2";
import Money2 from "./icons/money-2";
import HeaderSearch from "./page-components/homepage/headerSearch";

const eventlists = [
  {
    name: "Create events",
    description: "List your event",
    icon: <ListAdd />,
    bgColor: "bg-[#FBDFD2]",
    link: "/#",
  },
  {
    name: "Features",
    description: "Discover the benefits of Plugin",
    icon: <Grid2 />,
    bgColor: "bg-[#E4C9FF]",
    link: "/#",
  },
  {
    name: "Pricing",
    description: "Explore the planning price",
    icon: <Money2 />,
    bgColor: "bg-[#C9F8FF]",
    link: "/#",
  },
];

const Header = () => {
  const ListEvent = () => {
    return (
      <Popover>
        <PopoverTrigger>
          <p className="text-[#586170] font-pally-regular text-base md:text-lg flex items-center hover:underline">
            List an Event <ChevronDownIcon className="ml-2" />
          </p>
        </PopoverTrigger>
        <PopoverContent className="w-96 bg-white rounded-xl p-3">
          <ul className="space-y-5">
            {eventlists.map((list, index) => (
              <li
                key={index}
                className="hover:bg-gray-100 py-2.5 px-4 rounded-lg transition delay-75 ease-in-out"
              >
                <Link href={list.link} className="flex items-center gap-4">
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
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <header className="bg-pitchNoise bg-100 bg-repeat bg-cover backdrop-blur-md">
      <Container className="container px-4 md:px-0 py-2">
        <div className="flex justify-between items-center">
          <div className="space-x-6 flex items-center">
            <Logo />
            <div className="hidden md:block w-[250px]">
              <HeaderSearch />
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href={"/#"}
              className="text-[#586170] font-pally-regular text-base md:text-lg hover:underline"
            >
              Explore Events
            </Link>

            <ListEvent />

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
          <HeaderSearch />
        </div>
      </Container>
    </header>
  );
};

export default Header;
