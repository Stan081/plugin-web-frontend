import React from "react";
import { TiLightbulb } from "react-icons/ti";

const HintCard: React.FC<{ contents: string[] }> = ({ contents }) => {
  return (
    <div>
      <h3 className="text-base underline text-[#586170] font-pally-regular">Here are some hints</h3>
      <div className="mt-5 p-4 md:p-6 rounded-xl bg-white flex items-start gap-6 w-full max-w-md">
        <div className="p-2 rounded-full border border-[#FA8334] md:block hidden">
          <TiLightbulb size={20} color="#FA8334" />
        </div>

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
      </div>
    </div>
  );
};

export default HintCard;
