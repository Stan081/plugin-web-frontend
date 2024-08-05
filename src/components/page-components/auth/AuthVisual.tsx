import Image from "next/image";
import React from "react";
import Marquee from "./Marquee";


const AuthVisual = () => {
  return (
    <div className="bg-pitchNoise overflow-hidden hidden lg:flex flex-col justify-between w-7/12">
      <div className="pr-40 pl-16 pt-20">
        <h1 className="font-pally-medium text-5xl w-full max-w-xl">
          The event management platform that does it all, for every host.
        </h1>
        <ul className="relative w-full mt-12">
          <li className="w-72 h-72 absolute top-0 rounded-lg">
            <Image
              src={
                "https://ik.imagekit.io/pluginImage/Plugin-images/laughing%20people%20in%20party.jpg?updatedAt=1722860712860"
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
                "https://ik.imagekit.io/pluginImage/Plugin-images/party%20fans%20raised%20their%20hands.jpg?updatedAt=1722863689736"
              }
              alt="Auth"
              width={270}
              height={275}
              className="pointer-events-none w-full h-full object-cover rounded-lg"
            />
          </li>
          <li className="w-72 h-72 absolute top-32 z-10 right-1/3 rounded-lg">
            <Image
              src={
                "https://ik.imagekit.io/pluginImage/Plugin-images/people%20watching%20in%20the%20stage.jpg?updatedAt=1722863806981"
              }
              alt="Auth"
              width={270}
              height={275}
              className="pointer-events-none w-full h-full object-cover rounded-lg"
            />
          </li>
        </ul>
      </div>
      <Marquee/>
    </div>
  );
};

export default AuthVisual;
