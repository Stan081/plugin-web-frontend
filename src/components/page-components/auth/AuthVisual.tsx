"use client";
import Image from "next/image";
import React from "react";
import Marquee from "./Marquee";

const AuthVisual = () => {
  return (
    <div className="bg-pitchNoise overflow-hidden hidden lg:flex flex-col justify-between w-7/12">
      <div className="px-16 max-w-3xl pt-20">
        <h1 className="font-pally-medium text-5xl w-full max-w-xl">
          The event management platform that does it all, for every host.
        </h1>
        <div className="relative w-full mt-12">
          <div className="w-72 h-72 absolute top-0 rounded-lg">
            <Image
              src={
                "https://images.unsplash.com/photo-1664076710651-1c971052f929?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D"
              }
              alt="Auth"
              width={270}
              height={275}
              className="pointer-events-none w-full h-full object-cover rounded-lg"
            />
          </div>
          <li className="w-72 h-72 absolute top-10 right-0 rounded-lg">
            <Image
              src={
                "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRlY2glMjBmZXN0aXZhbHxlbnwwfHwwfHx8MA%3D%3D"
              }
              alt="Auth"
              width={270}
              height={275}
              className="pointer-events-none w-full h-full object-cover rounded-lg"
            />
          </li>
          <li className="w-72 h-72 absolute top-40 z-10 right-1/3 rounded-lg">
            <Image
              src={
                "https://images.unsplash.com/photo-1511916417-9779dc923704?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGNvbmNlcnR8ZW58MHx8MHx8fDA%3D"
              }
              alt="Auth"
              width={270}
              height={275}
              className="pointer-events-none w-full h-full object-cover rounded-lg"
            />
          </li>
        </div>
      </div>
      <Marquee />
    </div>
  );
};

export default AuthVisual;
