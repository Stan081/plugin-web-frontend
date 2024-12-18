"use client";
import Image from "next/image";
import classNames from "classnames";
import { ComponentPropsWithRef, FC } from "react";
import Link from "next/link";

interface LogoProps extends ComponentPropsWithRef<"div"> {
  white?: boolean;
}

const Logo: FC<LogoProps> = ({ className, white }) => {
  const baseClass = "flex h-16 shrink-0 items-center";
  return (
    <div className="w-[120px]">
      <Link
        href={"/"}
        className={classNames(
          baseClass,
          className ? className : "cursor-pointer "
        )}
      >
        <span className="sr-only">Plugin</span>
        {white ? (
          <Image
            src="/images/logo_white.png"
            alt="Plugin Logo"
            width={128}
            height={32}
            className="w-[110px] h-10 lg:h-11 pointer-events-none"
          />
        ) : (
          <Image
            src="/images/plugin-logo.png"
            alt="Plugin Logo"
            width={128}
            height={32}
            className="w-[110px] h-10 lg:h-11 pointer-events-auto"
          />
        )}
      </Link>
    </div>
  );
};

export default Logo;
