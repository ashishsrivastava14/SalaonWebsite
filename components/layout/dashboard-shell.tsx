"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface DashboardShellProps {
  title: string;
  links: Array<{ href: string; label: string }>;
  children: ReactNode;
}

export function DashboardShell({ title, links, children }: DashboardShellProps) {
  const pathname = usePathname();

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
      <aside className="rounded-3xl border border-[#e6d7ca] bg-white/90 p-4 shadow-sm">
        <h2 className="mb-4 px-2 font-serif text-2xl text-[#4f3526]">{title}</h2>
        <nav className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block rounded-xl px-3 py-2 text-sm font-semibold transition",
                pathname === link.href
                  ? "bg-[#ead9c9] text-[#523626]"
                  : "text-[#735645] hover:bg-[#f4ece4]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="space-y-5">{children}</main>
    </div>
  );
}
