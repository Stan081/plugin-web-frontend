import React from "react";
import HintCard from "./HintCard";
import Logo from "@/components/Logo";

const Intro: React.FC<{ contents: string[]; title: string }> = ({
  contents,
  title,
}) => {
  return (
    <>
      <Logo />
      <div className="flex flex-row md:flex-col justify-between md:space-y-12 mt-6 md:mt-28">
        <h1 className="text-[#020912] font-pally-regular text-4xl w-full md:max-w-xl md:leading-tight">
          {title}
        </h1>
        <HintCard contents={contents} />
      </div>
    </>
  );
};

export default Intro;
