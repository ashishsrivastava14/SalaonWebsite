"use client";

import { useSalonStore } from "@/store/use-salon-store";

export function RoleSwitcher() {
  const role = useSalonStore((state) => state.role);
  const setRole = useSalonStore((state) => state.setRole);

  return (
    <label className="inline-flex items-center gap-2 rounded-full border border-[#dac8b7] bg-white px-3 py-2 text-xs font-semibold text-[#6d4f3c]">
      Role
      <select
        value={role}
        onChange={(event) => setRole(event.target.value as "customer" | "owner" | "admin")}
        className="rounded-md border border-[#d7c3b1] bg-[#faf6f1] px-2 py-1 text-xs font-semibold outline-none"
      >
        <option value="customer">Customer</option>
        <option value="owner">Salon Owner</option>
        <option value="admin">Admin</option>
      </select>
    </label>
  );
}
