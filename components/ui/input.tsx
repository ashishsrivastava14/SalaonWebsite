import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/cn";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-xl border border-[#d9cabd] bg-white px-4 text-sm text-[#4b3326] placeholder:text-[#9f8a7a] outline-none transition focus:border-[#b88b67] focus:ring-2 focus:ring-[#ecd8c9]",
        className
      )}
      {...props}
    />
  )
);

Input.displayName = "Input";
