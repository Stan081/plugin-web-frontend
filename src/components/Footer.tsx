import Container from "@/tw-components/container";
import Link from "next/link";
import React from "react";
import Logo from "./Logo";
import Image from "next/image";
import { footerData } from "@/static-datas/footer-data";

const Footer = () => {
  return (
    <footer>
      <div className="bg-pitchNoise bg-100 backdrop-blur-md ">
        <Container className="py-8 lg:py-14">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full md:2/5">
              <div className="mb-4 w-28 h-10 lg:h-11">
                <Logo />
              </div>
              <ul className="text-[#687384] font-pally-regular text-base md:text-lg">
                <li>contact@pluginent.com</li>
              </ul>
            </div>
            <div className=" w-full md:w-3/5 flex flex-col lg:flex-row gap-8">
              <div className="flex gap-10 lg:gap-20 w-full">
                <div className="space-y-4">
                  <h4 className="text-black font-pally-medium text-base md:text-lg">
                    {Object.keys(footerData.f2)[0]}
                  </h4>
                  <ul className=" font-pally-regular text-[#667185] space-y-4">
                    {footerData.f2.links.map((list, index) => (
                      <li
                        key={index}
                        className="text-base md:text-lg active:underline hover:underline"
                      >
                        <Link href={`${list.href}`}>{list.text}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* <div className="space-y-4">
                  <h4 className="text-black font-pally-medium text-base md:text-lg">
                    {Object.keys(footerData.f2)[1]}
                  </h4>
                  <ul className=" font-pally-regular text-[#667185] space-y-4 ">
                    {footerData.f2.Company.map((list, index) => (
                      <li
                        key={index}
                        className="text-base md:text-lg active:underline hover:underline"
                      >
                        <Link href={`${list.href}`}>{list.text}</Link>
                      </li>
                    ))}
                  </ul>
                </div> */}
                <div className="space-y-4">
                  <h4 className="text-black font-pally-medium text-base md:text-lg">
                    {Object.keys(footerData.f2)[1]}
                  </h4>
                  <ul className=" font-pally-regular text-[#667185] space-y-4">
                    {footerData.f2.Social.map((list, index) => (
                      <li
                        key={index}
                        className="text-base md:text-lg active:underline hover:underline"
                      >
                        <Link href={`${list.href}`}>{list.text}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="w-full md:w-72 space-y-4">
                <h4 className=" font-pally-medium tex-black text-base md:text-lg">
                  Coming soon on
                </h4>
                <ul className="flex flex-row md:flex-col items-center gap-5">
                  {footerData.f3.map((list, index) => (
                    <li
                      key={index}
                      className="bg-black w-full p-2 rounded-lg flex items-center justify-center gap-4"
                    >
                      <div>
                        <Image
                          src={list.image}
                          width={29}
                          height={29}
                          alt={list.title}
                          className="w-auto h-auto"
                        />
                      </div>
                      <div className="">
                        <p className=" font-pally-regular text-[#D0D5DD] text-xs">
                          {list.shortText}
                        </p>
                        <p className=" font-pally-bold text-white">
                          {list.title}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className="bg-[#221A14] py-8 md:py-10">
        <Container className="md:flex justify-between space-y-4 px-4 md:px-0">
          <ul className="flex items-center gap-6">
            {footerData.f1.map((list, index) => (
              <li
                key={index}
                className="flex items-center text-base md:text-lg "
              >
                <Link
                  href={`${list.href}`}
                  className="text-[#98A2B3] font-pally-medium mr-5"
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
          <p className="font-pally-medium text-white text-base md:text-lg">
            © 2021 Plugin Entertainment. All Rights Reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
