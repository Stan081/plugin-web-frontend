"use client";

import { Button } from "@/components/ui/button";
import { useOrganiser } from "@/hooks/organiser/useOrganiser";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { RiUserAddLine } from "react-icons/ri";

const MeetYourOganiser: FC<{ organiserId: string }> = ({ organiserId }) => {
  const { data: organiser } = useOrganiser(organiserId);
  return (
    <div className="mt-6 bg-[#FCE0DC]/40 rounded-xl p-4">
      <h6 className="text-base md:text-lg font-pally-medium text-[#2C2B2E]">
        Meet your Organizer
      </h6>

      <div className="mt-4 flex justify-between items-start md:items-start gap-3">
        <div className="flex items-start gap-3">
          <Image
            src={organiser?.data?.thumbnail ?? `/images/seagreen-bg.png`}
            width={456}
            height={280}
            alt={organiser?.name}
            className="pointer-events-none w-full max-w-16 h-16 object-cover rounded-full"
          />
          <div className="space-y-1">
            <Link
              href={`/organiser/${organiserId}`}
              className="text-sm md:text-base font-pally-medium cursor-pointer hover:underline"
            >
              Hosted by{" "}
              {organiser?.data?.name
                ? organiser?.data?.name?.slice(0, 1).toLocaleUpperCase() +
                  organiser?.data?.name.slice(1)
                : organiser?.data?.name}
            </Link>
            <div className="flex gap-4">
              <Link
                href={`${organiser?.data?.socials?.facebook}`}
                target="_blank"
                className="text-sm md:text-base text-[#667185] gap-4  font-pally-regular hover:underline"
              >
                Facebook
              </Link>
              <Link
                href={`${organiser?.data?.socials?.instagram}`}
                target="_blank"
                className="text-sm md:text-base text-[#667185] gap-4  font-pally-regular hover:underline"
              >
                Instagram
              </Link>
            </div>
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
          <span className="hidden md:flex">follow</span>
        </Button>
      </div>
    </div>
  );
};

export default MeetYourOganiser;
