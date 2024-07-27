import Link from "next/link";
import React, { FC } from "react";

type ButtonProps = {
  link?: string;
  text: string;
  icon?: JSX.Element;
  primary?: boolean;
  secondary?: boolean;
  outline?: boolean;
};

const Button: FC<ButtonProps> = ({ link, text, icon, primary, secondary, outline }) => {

  const primaryStyle = 'bg-[#D9302A] shadow-custom rounded-lg hover:bg-[#b23632] text-white py-2.5 px-4 transition delay-75 ease-in-out focus:bg-[#D9302A] text-center'

  const secondaryStyle = 'text-[#CB1A14] bg-transparent border border-[#D9302A] rounded-lg py-2.5 px-4 text-center font-medium'

  const outlineStyle = 'border-2 border-gray-900 text-black py-2.5 px-4 bg-transparent font-medium rounded-lg'

  return (
    <button className={`${primary ? primaryStyle : secondary ? secondaryStyle : outline && outlineStyle} `}>
      {link ? (
        <Link href={link}>{text}</Link>
      ) : icon ? (
        <div className="flex justify-center items-center gap-4">
          {icon} <p>{text}</p>
        </div>
      ) : (
        <p>{text}</p>
      )}
    </button>
  );
};

export default Button;
