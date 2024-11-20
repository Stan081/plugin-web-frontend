"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { RiUserAddLine } from "react-icons/ri";

const MeetYourOganiser = () => {
  const router = useRouter() 
  return (
    <div className="mt-6 bg-[#FCE0DC]/40 rounded-xl p-4">
      <h6 className="text-base md:text-lg font-pally-medium text-[#2C2B2E]">
        Meet your Organizer
      </h6>

      <div className="mt-4 flex justify-between items-center md:items-start gap-3">
        <div className="flex items-start gap-3">
          <Image
            src={`/images/seagreen-bg.png`}
            width={456}
            height={280}
            alt={`ticket name`}
            className="pointer-events-none w-full max-w-16 h-16 object-cover rounded-full"
          />
          <div className="space-y-1">
            <p onClick={() => router.push('/organiser/1')} className="text-sm md:text-base font-pally-medium cursor-pointer hover:underline">
              Hosted by Alpha Planners
            </p>
            <ul className="flex text-sm md:text-base text-[#667185] gap-4  font-pally-regular">
              <li className="underline">Twitter</li>
              <li className="underline">LinkedIn</li>
            </ul>
            <p className="font-pally-regular text-sm md:text-base text-[#0F973D]">
              369 people are following this host
            </p>
          </div>
        </div>
       
         
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5"
          >
            <RiUserAddLine size={18} />
            follow
          </Button>
        
      </div>
    </div>
  );
};

export default MeetYourOganiser;
