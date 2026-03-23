"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
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

export function CommissionSettingsModule() {
  const salons = useSalonStore((state) => state.salons);
  const setCommission = useSalonStore((state) => state.setCommission);
  const [draftRates, setDraftRates] = useState<Record<string, number>>({});

  return (
    <DashboardShell title="Admin Panel" links={links}>
      <Card>
        <h1 className="font-serif text-3xl text-[#4f3526]">Commission Settings</h1>
        <p className="mt-1 text-sm text-[#735645]">Set platform commission per salon.</p>
      </Card>
      <DataTable
        headers={["Salon", "Current Rate", "New Rate", "Action"]}
        rows={salons.map((salon) => [
          salon.name,
          `${salon.commissionRate}%`,
          <Input
            key={`${salon.id}-input`}
            type="number"
            min={0}
            max={40}
            value={draftRates[salon.id] ?? salon.commissionRate}
            onChange={(event) =>
              setDraftRates((prev) => ({
                ...prev,
                [salon.id]: Number(event.target.value) || 0,
              }))
            }
          />,
          <Button
            key={`${salon.id}-btn`}
            size="sm"
            onClick={() => setCommission(salon.id, draftRates[salon.id] ?? salon.commissionRate)}
          >
            Save
          </Button>,
        ])}
      />
    </DashboardShell>
  );
}
