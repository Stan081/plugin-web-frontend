import Image from "next/image";
import classNames from "classnames";
import { ComponentPropsWithRef, FC } from "react";

interface LogoProps extends ComponentPropsWithRef<"div"> {}

const Logo: FC<LogoProps> = ({ className, ...rest }) => {
    const baseClass = "flex h-16 shrink-0 items-center";
    return (
        <div
            {...rest}
            className={classNames(baseClass, className ? className : "")}
        >
            <Image
                src="/images/plugin-logo.svg"
                alt="NoImpunity Logo"
                width={128}
                height={32}
            />
        </div>
    );
};

export default Logo;