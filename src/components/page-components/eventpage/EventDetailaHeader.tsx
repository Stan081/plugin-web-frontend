import Image from "next/image";
import React from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { RiHeart3Line } from "react-icons/ri";

interface Props {
  title: string;
  image: string;
}

const EventDetailaHeader: React.FC<Props> = ({ title, image }) => {
  return (
    <div className="mt-5 md:mt-8">
      <div className="flex justify-between">
        <h1 className="hidden md:flex text-2xl md:text-4xl font-pally-medium">
          {title}
        </h1>
        <h1 className="md:hidden flex text-2xl md:text-4xl font-pally-medium">
          {title}
        </h1>
        <ul className="flex gap-4 md:gap-8">
          <li className="flex items-center gap-1.5 cursor-pointer">
            <MdOutlineFileUpload size={20} />
            <p className="hidden md:flex">Share</p>
          </li>
          <li className="flex items-center gap-1.5 cursor-pointer">
            <RiHeart3Line size={20} />
            <p className="hidden md:flex">Save</p>
          </li>
        </ul>
      </div>
      <div className="h-[200px] md:h-[500px] mt-6 md:mt-10 ">
        {image && (
          <img
            src={image}
            alt={title}
            width={1226}
            height={609}
            className=" pointer-events-none w-full h-full rounded-xl object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default EventDetailaHeader;
