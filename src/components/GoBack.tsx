"use client";

import { useRouter } from "next/router";
import React from "react";
import { RiArrowLeftSLine } from "react-icons/ri";

const GoBack = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      className="rounded-full w-8 h-8 mb-3 flex justify-center items-center border md:hidden"
    >
      <RiArrowLeftSLine size={26} />
    </div>
  );
};

export default GoBack;
