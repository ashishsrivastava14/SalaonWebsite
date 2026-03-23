"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CalendarHeart, Menu, X } from "lucide-react";
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
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 glass border-b border-[var(--border-light)]">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group inline-flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#c49872] to-[#a8754f] text-white shadow-[0_2px_8px_rgba(184,139,103,0.3)] transition-transform duration-300 group-hover:scale-105">
            <CalendarHeart size={17} />
          </span>
          <span className="font-serif text-xl font-semibold tracking-tight text-[var(--foreground)]">
            SalonCraft
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                pathname === item.href
                  ? "bg-[var(--accent-light)] text-[var(--foreground)] shadow-[var(--shadow-sm)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--accent-light)]/60"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <RoleSwitcher />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-[var(--muted)] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--foreground)] md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[var(--border-light)] bg-white/95 px-4 pb-4 pt-2 md:hidden animate-slide-down">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                  pathname === item.href
                    ? "bg-[var(--accent-light)] text-[var(--foreground)]"
                    : "text-[var(--muted)] hover:bg-[var(--accent-light)]/60 hover:text-[var(--foreground)]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
