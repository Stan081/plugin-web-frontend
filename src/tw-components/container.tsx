import React from "react"
import classNames from "classnames";
import { ComponentPropsWithRef, FC } from "react";

export interface ContainerProps extends ComponentPropsWithRef<"div"> {}

const Container: FC<ContainerProps> = ({ children, className, ...rest }) => {
    const baseClassName = "mx-auto container px-4 md:px-0";
    return (
        <div className={classNames(baseClassName, className)} {...rest}>
            {children}
        </div>
    );
};

export default Container;
