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
                "https://ik.imagekit.io/shiga/plugin/party-fans-raised-their-hands.jpg?updatedAt=1733669989397"
              }
              alt="Auth"
              width={270}
              height={275}
              className="pointer-events-none w-full object-cover rounded-lg"
            />
          </div>
          <li className="w-72 h-72 absolute top-10 right-0 rounded-lg">
            <Image
              src={
                "https://ik.imagekit.io/shiga/plugin/laughing-people-in-party.jpg?updatedAt=1733669960536"
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
