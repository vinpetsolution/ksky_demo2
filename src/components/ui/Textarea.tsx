"use client";

import { type TextareaHTMLAttributes, type Ref, ReactNode, useId } from "react";
import { cn } from "@/utils/classNames";

const textareaBaseClass =
  "w-full rounded-lg border border-[#333] bg-[#1b1b1b] px-4 py-2 text-sm text-white transition-all scrollbar " +
  "focus:outline-none focus:ring-2 focus:ring-[#c9a227]/40 focus:border-[#c9a227] disabled:cursor-not-allowed disabled:opacity-50 " +
  "placeholder:text-gray-500 placeholder:font-normal ";

const resizeClassNames = {
  none: "resize-none",
  vertical: "resize-y",
  horizontal: "resize-x",
  both: "resize",
} as const;

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "children"> {
  label?: ReactNode;
  labelClassName?: string;
  error?: string;
  fullWidth?: boolean;
  containerClassName?: string;
  /** Default `none`. Use `vertical` to allow height resize via drag handle. */
  resize?: keyof typeof resizeClassNames;
  ref?: Ref<HTMLTextAreaElement>;
}

const Textarea = ({
  className,
  label,
  labelClassName,
  error,
  fullWidth,
  containerClassName,
  resize = "none",
  id,
  rows = 4,
  ref,
  ...props
}: TextareaProps) => {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5",
        fullWidth && "w-full",
        containerClassName
      )}
    >
      {label ? (
        <label
          htmlFor={textareaId}
          className={cn("text-[#c9a227] font-semibold text-xs", labelClassName)}
        >
          {label}
        </label>
      ) : null}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        className={cn(
          textareaBaseClass,
          resizeClassNames[resize],
          error
            ? "border-red-400/80 focus:border-red-400 focus:ring-red-400/40"
            : undefined,
          className
        )}
        {...props}
      />
      {error ? <p className="text-xs font-semibold text-red-400">{error}</p> : null}
    </div>
  );
};

Textarea.displayName = "Textarea";

export { Textarea };
