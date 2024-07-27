import Container from "@/tw-components/container";
import Link from "next/link";
import React from "react";
import Logo from "./Logo";

const Footer = () => {
  const f2 = [
    {
      text: "Privacy Policy",
      href: "/privacy",
    },
    {
      text: "Terms of use",
      href: "/#",
    },
    {
      text: "FAQ",
      href: "/#",
    },
  ];
  return (
    <footer>
      <div className="bg-lightgray bg-pitchNoise bg-100 bg-repeat bg-cover backdrop-blur-md">
        <Container className="py-8 lg:py-14">
            <div className="flex">
                <div>
                    <Logo/>
                    <ul className="text-[#687384] font-regular">
                        <li>Maitama, 900271, Abuja - Nigeria</li>
                        <li>+234 (0)809 666 4872</li>
                        <li>hello@eventdey.com</li>
                    </ul>
                </div>
                <div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </Container>
      </div>
      <div className="bg-[#221A14] py-8 md:py-10">
        <Container className="md:flex justify-between space-y-4 px-4 md:px-0">
          <ul className="flex items-center gap-6">
            {f2.map((list, index) => (
              <li key={index} className="flex items-center">
                <Link
                  href={`${list.href}`}
                  className="text-[#98A2B3] font-medium mr-5"
                >
                  {list.text}
                </Link>
                {index == 2 ? (
                  ""
                ) : (
                  <div className="bg-white rounded-full w-2 h-2" />
                )}
              </li>
            ))}
          </ul>
          <p className="font-medium text-white">© 2021 Plugin Entertainment. All Rights Reserved.</p>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
