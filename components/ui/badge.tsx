import { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[#ddccbd] bg-[#f9f4ef] px-3 py-1 text-xs font-semibold text-[#72523d]",
        className
      )}
      {...props}
    />
  );
}
