"use client";
import React, { Fragment } from "react";
import HintCard from "./HintCard";
import Logo from "@/components/Logo";
import { TiLightbulb } from "react-icons/ti";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMe } from "@/pages/api/query/me";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";

const Intro: React.FC<{ contents: string[]; title: string }> = ({
  contents,
  title,
}) => {
  const { data: userData, isLoading } = useMe();
  return (
    <Fragment>
      {isLoading ? (
        <SpinnerOverlay />
      ) : (
        <Fragment>
          {userData?.data?.role === "organizer" &&
          userData?.data?.isOrganizer ? (
            <p>here</p>
          ) : (
            <Fragment>
              <Logo />
              <div className="flex flex-row lg:flex-col justify-between items-center md:space-y-12 lg:mt-28">
                <h2 className="text-[#020912] font-pally-regular text-lg lg:text-4xl w-full md:max-w-xl md:leading-tight">
                  {title}
                </h2>
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
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Intro;
