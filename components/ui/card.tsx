import { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--border-light)] bg-[var(--surface-raised)] p-6 shadow-[var(--shadow-md)] transition-shadow duration-300 hover:shadow-[var(--shadow-lg)]",
        className
      )}
      {...props}
    />
  );
}
