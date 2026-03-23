import { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-3xl border border-[#eadfd5] bg-white/95 p-5 shadow-[0_10px_30px_rgba(92,64,45,0.08)]", className)} {...props} />;
}
