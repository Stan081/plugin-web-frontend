import Image from "next/image";
import React from "react";

interface SpinnerAlternativeProps {
  size?: "sm" | "md" | "lg" | "full";
  color?: string;
}

const Spinner: React.FC<SpinnerAlternativeProps> = ({}) => {
  return (
    <div>
      <Image src={"/gif/spinner.gif"} alt="spinner" width={50} height={25} className="w-20 h-20" unoptimized />
    </div>
  );
};

export default Spinner;
