import Logo from "@/components/Logo";
import Image from "next/image";
import React, { useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { HiOutlineClock } from "react-icons/hi2";
import { SlLocationPin } from "react-icons/sl";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

const Side1 = () => {
  const [showMore, setShowMore] = useState<boolean>(false);
  return (
    <div className="w-full lg:w-1/2 px-4 lg:px-0">
      <Logo />
      <div className="flex flex-col justify-between md:space-y-5 mt-6 ">
        <h1 className="text-[#020912] font-pally-regular text-xl md:text-3xl w-full md:max-w-xl md:leading-tight">
          Almost there, you're ready to publish your first event
        </h1>
        <div className="mt-5 lg:mt-0 flex flex-row lg:flex-col items-start gap-5">
          <div className="md:border-4 lg:mt-4 border-[#FBD4D1] rounded-md w-24 h-24 lg:w-3/5 lg:h-56">
            <Image
              src={"/images/blue-bg.png"}
              width={487}
              height={270}
              alt="koo"
              className="w-full h-full object-cover pointer-events-none rounded-md"
            />
          </div>

          <div className="w-full max-w-xl">
            <p className="font-pally-medium text-lg lg:text-xl text-[#2F231B] mb-1">
              Sip ‘n’ Paint with WakkyTails
            </p>
            <p className="font-pally-regular text-sm lg:text-lg text-[#2F231B]">
              Join us for Sip 'n' Paint with Wakkytails at Uyai at Dusk! Enjoy a
              creative evening of painting and sipping exquisite cocktails.
              Perfect for all skill levels, come relax and unleash your inner
              artist!
            </p>
          </div>
        </div>

        <ul className="space-y-2 hidden lg:block">
          <li className="flex gap-3 items-center">
            <IoCalendarOutline color="#D9302A" size={20} />
            <p className="font-pally-regular text-[#344054]">Sat, Sept 17</p>
          </li>
          <li className="flex gap-3 items-center">
            <HiOutlineClock color="#D9302A" size={20} />
            <p className="font-pally-regular text-[#344054]">17, 10:00AM</p>
          </li>
          <li className="flex gap-3 items-center">
            <SlLocationPin color="#D9302A" size={20} />
            <p className="font-pally-regular text-[#344054]">
              Silverbird cinemas gallery, Udoudoma Avenue, U Akwa Ibom
            </p>
          </li>
        </ul>

        <p
          onClick={() => setShowMore(!showMore)}
          className="text-sm font-pally-medium text-[#475367] flex items-center gap-2"
        >
          {showMore ? "Show less" : "Show more"}{" "}
          <span>{showMore ? <RiArrowUpSLine size={17} /> : <RiArrowDownSLine  size={17}/>}</span>
        </p>

        {showMore && (
          <ul className="space-y-2">
            <li className="flex gap-3 items-center">
              <IoCalendarOutline color="#D9302A" size={20} />
              <p className="font-pally-regular text-[#344054]">Sat, Sept 17</p>
            </li>
            <li className="flex gap-3 items-center">
              <HiOutlineClock color="#D9302A" size={20} />
              <p className="font-pally-regular text-[#344054]">17, 10:00AM</p>
            </li>
            <li className="flex gap-3 items-center">
              <SlLocationPin color="#D9302A" size={20} />
              <p className="font-pally-regular text-[#344054]">
                Silverbird cinemas gallery, Udoudoma Avenue, U Akwa Ibom
              </p>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Side1;
