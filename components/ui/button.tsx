import { ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-40 active:scale-[0.97] cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-b from-[#c49872] to-[#a8754f] text-white shadow-[0_2px_8px_rgba(184,139,103,0.35)] hover:shadow-[0_4px_16px_rgba(184,139,103,0.45)] hover:brightness-110",
        secondary:
          "bg-white text-[var(--foreground)] border border-[var(--border)] shadow-[var(--shadow-sm)] hover:bg-[var(--accent-light)] hover:border-[var(--accent-muted)] hover:shadow-[var(--shadow-md)]",
        ghost:
          "bg-transparent text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--accent-light)]",
        danger:
          "bg-gradient-to-b from-[#e05555] to-[#c94444] text-white shadow-[0_2px_8px_rgba(220,74,74,0.3)] hover:shadow-[0_4px_16px_rgba(220,74,74,0.4)] hover:brightness-110",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6",
        lg: "h-12 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />;
  }
);

Button.displayName = "Button";
