"use client"
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
        <ul className="relative w-full mt-12">
          <li className="w-72 h-72 absolute top-0 rounded-lg">
            <Image
              src={
                "/images/people-watching-in-the-stage.jpg"
              }
              alt="Auth"
              width={270}
              height={275}
              className="pointer-events-none w-full h-full object-cover rounded-lg"
            />
          </li>
          <li className="w-72 h-72 absolute top-10 right-0 rounded-lg">
            <Image
              src={
                "/images/party-fans-raised-their-hands.jpg"
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
                "/images/laughing-people-in-party.jpg"
              }
              alt="Auth"
              width={270}
              height={275}
              className="pointer-events-none w-full h-full object-cover rounded-lg"
            />
          </li>
        </ul>
      </div>
      <Marquee />
    </div>
  );
};

export default AuthVisual;
