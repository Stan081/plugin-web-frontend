import { ComponentPropsWithRef, forwardRef } from "react";
import Link from "next/link";
import clsx from "clsx";

export interface ButtonProps extends ComponentPropsWithRef<"button"> {
  variant: "primary" | "secondary" | "outlined" | "text";
  icon?: JSX.Element;
  href?: string;
  external?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant, className, children, disabled, icon, href, external, ...rest },
    ref
  ) => {
    const classes = clsx(
      {
        "opacity-50 cursor-not-allowed bg-gray-200 text-slate-600": disabled,
        "bg-[#D9302A] shadow-custom rounded-lg hover:bg-[#b23632] text-white py-2.5 px-4 transition delay-75 ease-in-out focus:bg-[#D9302A] text-center focus:outline-none":
          variant === "primary" && !disabled,
        "border-2 border-[#101928] text-black py-2.5 px-4 bg-transparent font-medium rounded-lg":
          variant === "outlined" && !disabled,
        "text-[#CB1A14] bg-transparent border border-[#D9302A] rounded-lg py-2.5 px-4 text-center font-medium":
          variant === "secondary" && !disabled,
        "bg-transparent outlined-none ": variant === "text" && !disabled,
      },
      className
    );

    if (href) {
      return (
        <Link
          href={href}
          className={clsx(
            classes,
            "inline-flex justify-center items-center gap-2 rounded-[100px] font-medium font-sans"
          )}
        >
          <p className="text-sm">{children}</p>
          {icon && icon}
        </Link>
      );
    }

    if (icon) {
      return (
        <button
          {...rest}
          className={clsx("flex items-center space-x-2 rounded-lg", classes)}
        >
          {icon}
          <p className="text-sm">{children}</p>
        </button>
      );
    }

    return (
      <button
        ref={ref}
        className={clsx(
          "inline-flex justify-center items-center gap-2 rounded-lg font-pally-medium",
          classes
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
