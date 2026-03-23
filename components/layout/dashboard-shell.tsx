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
    <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
      <aside className="rounded-2xl border border-[var(--border-light)] bg-[var(--surface-raised)] p-5 shadow-[var(--shadow-sm)] lg:sticky lg:top-24 lg:h-fit">
        <h2 className="mb-5 px-2 font-serif text-xl font-semibold text-[var(--foreground)]">{title}</h2>
        <nav className="space-y-0.5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                pathname === link.href
                  ? "bg-[var(--accent-light)] text-[var(--foreground)] shadow-[var(--shadow-sm)] font-semibold"
                  : "text-[var(--muted)] hover:bg-[var(--accent-light)]/60 hover:text-[var(--foreground)]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="space-y-6 stagger-children">{children}</main>
    </div>
  );
}
