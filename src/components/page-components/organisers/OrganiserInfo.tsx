import { ShowLess, ShowMore } from "@/components/ShowContentComponent";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React, { useState } from "react";
import { RiUserAddLine } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BsCopy } from "react-icons/bs";
import { PiFlagPennantFill } from "react-icons/pi";

const OrganiserInfo: React.FC<{
  organiserName: string;
  aboutOrganiser: string;
}> = ({ organiserName, aboutOrganiser }) => {
  const [isShown, setIsShown] = useState<boolean>(false);
  return (
    <div className="absolute top-52 md:top-56 left-0 md:left-24 z-20 float-right">
      <div className="w-full md:max-w-sm border bg-white rounded-xl shadow-md shadow-[#8F706E26]/15 p-4">
        <div className="h-36 w-36 mx-auto">
          <Image
            src={
              "https://ik.imagekit.io/pluginImage/Plugin-images/hero-image1.png?updatedAt=1722389173816"
            }
            alt="About-us"
            width={1226}
            height={609}
            className=" pointer-events-none w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="my-4">
          <h3 className="font-pally-medium text-2xl text-center">
            {organiserName}
          </h3>

          <div className="flex items-center justify-center mt-2 gap-4">
            <p className="font-pally-regular text-sm text-[#667185]">
              36 Followers
            </p>
            <div className="border border-[#77171624]/30 h-3" />
            <p className="flex items-center gap-1.5 font-pally-medium text-sm destructive cursor-pointer">
              <RiUserAddLine size={18} />
              <span>follow</span>
            </p>
          </div>
        </div>

        <Separator />

        <div className="space-y-2 my-4">
          <h4 className="font-pally-medium">About us</h4>
          <p className="font-pally-regular text-[#667185] md:text-base">
            {isShown && aboutOrganiser.length > 150
              ? aboutOrganiser.slice(0, 150).concat("..")
              : aboutOrganiser}
          </p>
          <p
            onClick={() => setIsShown(!isShown)}
            className="font-pally-medium cursor-pointer"
          >
            {!isShown ? <ShowLess /> : <ShowMore />}
          </p>
        </div>

        <Separator />

        <div className="my-4">
          <h4 className="font-pally-medium">Connect with us on</h4>

          <ul className="mt-3 flex items-center gap-5">
            <li>
              <FaFacebook size={26} />
            </li>
            <li>
              <FaInstagram size={26} />
            </li>
            <li>
              <FaXTwitter size={26} />
            </li>
          </ul>
        </div>

        <div
          className="mt-6 cursor-pointer px-2 py-1 rounded-lg border flex items-center gap-2 w-32
      "
        >
          <p className="text-[#667185] font-pally-medium whitespace-nowrap text-sm">
            Copy page Link
          </p>
          <BsCopy size={18} color="#667185" />
        </div>
      </div>
      <p className="mt-7 font-pally-regular flex items-center gap-2 underline cursor-pointer px-4 text-gray-500">
        {" "}
        <span className="inline-block">
          <PiFlagPennantFill className="text-gray-500"/>
        </span>{" "}
        Report Organizer{" "}
      </p>
    </div>
  );
};

export default OrganiserInfo;
