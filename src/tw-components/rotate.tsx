import Image from "next/image";
import React from "react";


const RotateLoader: React.FC = ({}) => {
  return (
    <div>
      <Image src={"/gif/Animation.gif"} alt="spinner" width={50} height={25} className="w-8 h-8" unoptimized />
    </div>
  );
};

export default RotateLoader;
