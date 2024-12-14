"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import React, { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
  currPosition: number[];
  formTitle: string;
}
const FormContainer: React.FC<Props> = ({
  children,
  currPosition,
  formTitle,
}) => {
  const [currValue] = useState<number[]>(currPosition);

  return (
    <div className="bg-[#281E17] relative rounded-xl h-full text-white">
      <div className="p-6">
        <h2 className="text-lg md:text-xl font-pally-regular">{formTitle}</h2>
      </div>

      <div className="flex gap-4">
        {currValue.map((curr, index) => (
          <Progress key={index} value={curr} />
        ))}
      </div>
      <>{children}</>
    </div>
  );
};

export default FormContainer;
