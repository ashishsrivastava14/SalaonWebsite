import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/cn";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-xl border border-[var(--border)] bg-white px-4 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-light)] outline-none shadow-[var(--shadow-sm)] transition-all duration-200 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)] focus:shadow-[0_0_0_3px_rgba(184,139,103,0.12)] hover:border-[var(--accent-muted)]",
        className
      )}
      {...props}
    />
  )
);

Input.displayName = "Input";
