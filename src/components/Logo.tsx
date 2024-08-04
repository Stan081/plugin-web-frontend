import Image from "next/image";
import classNames from "classnames";
import { ComponentPropsWithRef, FC } from "react";
import Link from "next/link";

interface LogoProps extends ComponentPropsWithRef<"div"> {}

const Logo: FC<LogoProps> = ({ className }) => {
  const baseClass = "flex h-16 shrink-0 items-center";
  return (
    <>
      <Link
        href={"/"}
        className={classNames(
          baseClass,
          className ? className : "cursor-pointer"
        )}
      >
        <span className="sr-only">Plugin</span>
        <Image
          src="/images/plugin-logo.svg"
          alt="NoImpunity Logo"
          width={128}
          height={32}
        />
      </Link>
    </>
  );
};

export default Logo;
