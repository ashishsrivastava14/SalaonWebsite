"use client";

import { useMemo } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useSalonStore } from "@/store/use-salon-store";

const links = [
  { href: "/dashboard/owner", label: "Overview" },
  { href: "/dashboard/owner/services", label: "Services" },
  { href: "/dashboard/owner/staff", label: "Staff" },
  { href: "/dashboard/owner/slots", label: "Time Slots" },
  { href: "/dashboard/owner/bookings", label: "Bookings" },
  { href: "/dashboard/owner/reports", label: "Reports" },
];

export function SlotManagerModule() {
  const currentUserId = useSalonStore((state) => state.currentUserId);
  const allSalons = useSalonStore((state) => state.salons);
  const slots = useSalonStore((state) => state.slots);
  const toggleSlotAvailability = useSalonStore((state) => state.toggleSlotAvailability);

  const salons = useMemo(
    () => allSalons.filter((salon) => salon.ownerId === currentUserId),
    [allSalons, currentUserId]
  );

  const ownedSalonIds = salons.map((salon) => salon.id);
  const ownedSlots = useMemo(() => slots.filter((slot) => ownedSalonIds.includes(slot.salonId)), [ownedSalonIds, slots]);

  return (
    <DashboardShell title="Owner Panel" links={links}>
      <Card>
        <h1 className="font-serif text-2xl tracking-tight text-[var(--foreground)]">Manage Time Slots</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">Toggle slot availability in real-time mock mode.</p>
      </Card>

      <DataTable
        headers={["Date", "Time", "Availability", "Action"]}
        rows={ownedSlots.slice(0, 30).map((slot) => [
          slot.date,
          `${slot.startTime} - ${slot.endTime}`,
          slot.isAvailable ? "Available" : "Blocked",
          <Button key={slot.id} variant={slot.isAvailable ? "danger" : "secondary"} size="sm" onClick={() => toggleSlotAvailability(slot.id)}>
            {slot.isAvailable ? "Block" : "Unblock"}
          </Button>,
        ])}
      />
    </DashboardShell>
  );
}
