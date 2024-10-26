"use client"
import React from "react";
import HintCard from "./HintCard";
import Logo from "@/components/Logo";
import { TiLightbulb } from "react-icons/ti";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Intro: React.FC<{ contents: string[]; title: string }> = ({
  contents,
  title,
}) => {
  return (
    <>
      <Logo />
      <div className="flex flex-row lg:flex-col justify-between items-center md:space-y-12 lg:mt-28">
        <h1 className="text-[#020912] font-pally-regular text-lg lg:text-4xl w-full md:max-w-xl md:leading-tight">
          {title}
        </h1>
        <HintCard contents={contents} />

        <div className="block lg:hidden h-full">
          <Popover>
            <PopoverTrigger>
              <div className="p-2 rounded-full border border-[#FA8334]">
                <TiLightbulb size={20} color="#FA8334" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="bg-white mx-2">
              <div>
                <h3 className="font-pally-medium text-base md:text-lg">
                  Tips to consider
                </h3>
                <ul className="my-2 mx-4 space-y-2.5">
                  {contents.map((content, index) => (
                    <li
                      key={index}
                      className="list-disc font-pally-regular text-sm md:text-base text-[#586170]"
                    >
                      {content}
                    </li>
                  ))}
                </ul>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );
};

export default Intro;
