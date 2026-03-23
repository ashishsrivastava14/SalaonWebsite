"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarHeart } from "lucide-react";
import { RoleSwitcher } from "@/components/layout/role-switcher";
import { cn } from "@/utils/cn";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/salons", label: "Salons" },
  { href: "/dashboard/customer", label: "Customer" },
  { href: "/dashboard/owner", label: "Owner" },
  { href: "/dashboard/admin", label: "Admin" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[#e7d9cc] bg-[#f8f4ee]/90 backdrop-blur-lg">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="rounded-xl bg-[#b88b67] p-2 text-white">
            <CalendarHeart size={18} />
          </span>
          <span className="font-serif text-xl font-semibold text-[#4f3526]">SalonCraft</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition",
                pathname === item.href
                  ? "bg-[#eadccf] text-[#5e4030]"
                  : "text-[#715342] hover:bg-[#f0e7de]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <RoleSwitcher />
      </div>
    </header>
  );
}
