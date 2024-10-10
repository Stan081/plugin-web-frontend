import React from "react";
import Marquee from "./Marquee";

const VerificationVisual = () => {
  return (
    <div className="bg-pitchNoise overflow-hidden w-1/2 hidden lg:flex flex-col justify-between ">
        <div className="px-16 max-w-2xl pt-20">
          <div className="space-y-5">
            <h1 className="font-pally-medium text-5xl w-full max-w-xl">
              How to get your verification code
            </h1>
            <p>Follow the steps below to get your verification code.</p>
          </div>
          <div className="mt-16">
            <p className="inline-block font-pally-regular text-[#333333] text-lg">
              <span>💡</span> Visit your email used in registering on Plugin
            </p>
            <div className="mt-4">
              <div className="border rounded-lg px-4 py-3 bg-[#F0F5F6] border-[#281E17]">
                <p className="font-pally-regular">
                  example : youraddress@plugin.com
                </p>
              </div>
              <p className="font-pally-medium destructive text-lg">
                Registered email address
              </p>
            </div>
          </div>
          <div className="mt-16">
            <p className="inline-block font-pally-regular text-[#333333] text-lg">
              <span>💡</span> Copy the code that was sent to your email
            </p>
            <div className="mt-4">
              <div className="border rounded-lg px-4 py-3 bg-[#F0F5F6] border-[#281E17] flex flex-col justify-between gap-5">
                <p className="font-pally-regular">
                  To verify your email address, please use the following One
                  Time Password:
                </p>
                <p className="font-pally-medium">355694</p>
                <p className="font-pally-regular">
                  Do not share this OTP with anyone.
                </p>
              </div>
              <p className="font-pally-medium destructive text-lg">
                Email sample
              </p>
            </div>
          </div>
        </div>
        <Marquee />
    </div>
  );
};

export default VerificationVisual;
