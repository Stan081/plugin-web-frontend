"use cleint";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface Props {
  text: string;
  isShow?: boolean;
}

const CardEmptyState: FC<Props> = ({ text, isShow }) => {
  return (
    <div className="bg-gray-100 rounded-lg py-5 md:py-9 w-full flex flex-col items-center justify-center gap-5">
      <Image
        src={"/images/calendar.svg"}
        width={200}
        height={200}
        alt="calemder"
        className="w-24 h-24 object-cover pointer-events-none"
      />

      <p className="font-pally-regular text-sm md:text-lg text-[#828994]">
        {text}
      </p>

      {isShow && (
        <Link href={'/create-event'}>
          <Button variant="destructive">Create event</Button>
        </Link>
      )}
    </div>
  );
};

export default CardEmptyState;
