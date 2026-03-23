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

export function SalonManagementModule() {
  const salons = useSalonStore((state) => state.salons);
  const toggleSalonStatus = useSalonStore((state) => state.toggleSalonStatus);
  const approveSalon = useSalonStore((state) => state.approveSalon);

  return (
    <DashboardShell title="Admin Panel" links={links}>
      <Card>
        <h1 className="font-serif text-3xl text-[#4f3526]">Manage Salons</h1>
        <p className="mt-1 text-sm text-[#735645]">Control active status and approval workflows.</p>
      </Card>
      <DataTable
        headers={["Salon", "Category", "Approved", "Status", "Actions"]}
        rows={salons.map((salon) => [
          salon.name,
          salon.category,
          salon.approved ? "Yes" : "No",
          salon.isActive ? "Active" : "Inactive",
          <div key={salon.id} className="flex gap-2">
            <Button size="sm" variant="secondary" onClick={() => toggleSalonStatus(salon.id)}>
              Toggle Status
            </Button>
            <Button
              size="sm"
              onClick={() => approveSalon(salon.id, !salon.approved)}
              variant={salon.approved ? "danger" : "primary"}
            >
              {salon.approved ? "Unapprove" : "Approve"}
            </Button>
          </div>,
        ])}
      />
    </DashboardShell>
  );
}
