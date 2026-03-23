import { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "border border-[var(--border)] bg-[var(--accent-light)] text-[var(--foreground)]",
        success: "border border-emerald-200 bg-emerald-50 text-emerald-700",
        warning: "border border-amber-200 bg-amber-50 text-amber-700",
        danger: "border border-red-200 bg-red-50 text-red-700",
        info: "border border-sky-200 bg-sky-50 text-sky-700",
        accent: "border-0 bg-gradient-to-r from-[#c49872] to-[#a8754f] text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type BadgeProps = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  );
}
