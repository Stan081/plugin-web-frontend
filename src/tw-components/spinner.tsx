import Image from "next/image";
import React from "react";

interface SpinnerAlternativeProps {
  size?: "sm" | "md" | "lg" | "full";
  color?: string;
}

const SpinnerAlternative: React.FC<SpinnerAlternativeProps> = ({
  size,
  color,
}) => {
  const spinnerSize =
    size === "sm"
      ? "w-5 h-5"
      : size === "md"
      ? "w-6 h-6"
      : size === "lg"
      ? "w-8 h-8"
      : "w-10 h-10";
  const spinnerColor = color ? color : "border-gray-500";

  return (
    <div>
      <Image
        src={"/gif/spinner.gif"}
        alt="spinner"
        width={50}
        height={25}
      />
    </div>
  );
};

export default SpinnerAlternative;
