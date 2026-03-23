"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSalonStore } from "@/store/use-salon-store";

const links = [
  { href: "/dashboard/admin", label: "Overview" },
  { href: "/dashboard/admin/salons", label: "Manage Salons" },
  { href: "/dashboard/admin/users", label: "Manage Users" },
  { href: "/dashboard/admin/commission", label: "Commission" },
  { href: "/dashboard/admin/bookings", label: "Bookings" },
  { href: "/dashboard/admin/reports", label: "Reports" },
];

export function UserManagementModule() {
  const users = useSalonStore((state) => state.users);
  const toggleUserStatus = useSalonStore((state) => state.toggleUserStatus);

  return (
    <DashboardShell title="Admin Panel" links={links}>
      <Card>
        <h1 className="font-serif text-3xl text-[#4f3526]">Manage Users</h1>
        <p className="mt-1 text-sm text-[#735645]">Enable or disable customer, owner, and admin accounts.</p>
      </Card>
      <DataTable
        headers={["Name", "Email", "Role", "Status", "Action"]}
        rows={users.map((user) => [
          user.name,
          user.email,
          user.role,
          user.isActive ? "Active" : "Inactive",
          <Button key={user.id} size="sm" variant="secondary" onClick={() => toggleUserStatus(user.id)}>
            Toggle
          </Button>,
        ])}
      />
    </DashboardShell>
  );
}
