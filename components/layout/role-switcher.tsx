"use client";

import { useSalonStore } from "@/store/use-salon-store";

export function RoleSwitcher() {
  const role = useSalonStore((state) => state.role);
  const setRole = useSalonStore((state) => state.setRole);

  return (
    <label className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--muted)] shadow-[var(--shadow-sm)] transition-all duration-200 hover:shadow-[var(--shadow-md)] hover:border-[var(--accent-muted)] cursor-pointer">
      <span className="hidden sm:inline">Role</span>
      <select
        value={role}
        onChange={(event) => setRole(event.target.value as "customer" | "owner" | "admin")}
        className="cursor-pointer rounded-lg border-0 bg-[var(--accent-light)] px-2 py-1 text-xs font-semibold text-[var(--foreground)] outline-none"
      >
        <option value="customer">Customer</option>
        <option value="owner">Salon Owner</option>
        <option value="admin">Admin</option>
      </select>
    </label>
  );
}
