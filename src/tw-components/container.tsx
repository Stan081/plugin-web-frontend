import React from "react"
import classNames from "classnames";
import { ComponentPropsWithRef, FC } from "react";

export interface ContainerProps extends ComponentPropsWithRef<"div"> {}

const Container: FC<ContainerProps> = ({ children, className, ...rest }) => {
    const baseClassName = " container w-full max-w-7xl mx-auto px-4 md:px-16";
    return (
        <div className={classNames(baseClassName, className)} {...rest}>
            {children}
        </div>
    );
};

export default Container;
