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

export function BookingManagerModule() {
  const currentUserId = useSalonStore((state) => state.currentUserId);
  const allSalons = useSalonStore((state) => state.salons);
  const bookings = useSalonStore((state) => state.bookings);
  const slots = useSalonStore((state) => state.slots);
  const markBookingStatus = useSalonStore((state) => state.markBookingStatus);
  const rescheduleBooking = useSalonStore((state) => state.rescheduleBooking);

  const salons = useMemo(
    () => allSalons.filter((salon) => salon.ownerId === currentUserId),
    [allSalons, currentUserId]
  );

  const ownedSalonIds = salons.map((salon) => salon.id);
  const ownerBookings = useMemo(() => bookings.filter((booking) => ownedSalonIds.includes(booking.salonId)), [bookings, ownedSalonIds]);

  return (
    <DashboardShell title="Owner Panel" links={links}>
      <Card>
        <h1 className="font-serif text-2xl tracking-tight text-[var(--foreground)]">Booking Management</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">Accept, reject, or reschedule appointments.</p>
      </Card>

      <DataTable
        headers={["Date", "Total", "Status", "Actions"]}
        rows={ownerBookings.map((booking) => {
          const alternativeSlot = slots.find(
            (slot) => slot.salonId === booking.salonId && slot.isAvailable && slot.date >= booking.date
          );
          return [
            booking.date,
            `Rs. ${booking.total}`,
            booking.status,
            <div key={booking.id} className="flex gap-2">
              <Button size="sm" onClick={() => markBookingStatus(booking.id, "confirmed")}>Accept</Button>
              <Button variant="danger" size="sm" onClick={() => markBookingStatus(booking.id, "rejected")}>Reject</Button>
              <Button
                variant="secondary"
                size="sm"
                disabled={!alternativeSlot}
                onClick={() => alternativeSlot && rescheduleBooking(booking.id, alternativeSlot.id)}
              >
                Reschedule
              </Button>
            </div>,
          ];
        })}
      />
    </DashboardShell>
  );
}
