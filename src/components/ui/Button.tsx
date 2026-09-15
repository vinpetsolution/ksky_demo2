"use client";

import { type ButtonHTMLAttributes, type Ref } from "react";
import { cn } from "@/utils/classNames";

const buttonVariants = {
  variant: {
    primary:
      "bg-linear-to-b from-[#ffd67f] to-[#ffb238] border border-[#ffb84d2e] shadow-[0px_6px_18px_#ffb23859,inset_0_1px_#ffffff73] text-[#221507] hover:brightness-90",
    secondary: "bg-[#ffffff0a] text-[#f3d498] border border-[#ffb84d2e] hover:bg-[#ffb84d1f] hover:text-[#fff2cc]",
    third: "bg-linear-to-b from-[#ffd700] to-[#b8860b] text-black",
    transparent: "bg-transparent text-gray hover:text-black disabled:text-gray"
  },
  size: {
    sm: "h-8 px-3 text-sm rounded-md gap-1.5",
    md: "h-10 px-4 text-sm rounded-lg gap-2",
    lg: "h-12 px-6 text-base rounded-lg gap-2.5",
  },
} as const;

export type ButtonVariant = keyof typeof buttonVariants.variant;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: keyof typeof buttonVariants.size;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

const Button = ({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth,
  disabled,
  children,
  type = "button",
  ref,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={cn(
        "inline-flex font-medium items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none",
        "cursor-pointer",
        (isDisabled || loading) && "cursor-not-allowed",
        buttonVariants.variant[variant],
        buttonVariants.size[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {loading ? (
        <span
          className="size-5 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden
        />
      ) : (
        leftIcon
      )}
      {children ? <span>{children}</span> : null}
      {!loading ? rightIcon : null}
    </button>
  );
};

Button.displayName = "Button";

export { Button };
