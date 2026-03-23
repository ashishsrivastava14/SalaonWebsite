"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { DataTable } from "@/components/ui/data-table";
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

export function BookingOverviewModule() {
  const bookings = useSalonStore((state) => state.bookings);
  const salons = useSalonStore((state) => state.salons);

  return (
    <DashboardShell title="Admin Panel" links={links}>
      <Card>
        <h1 className="font-serif text-3xl text-[#4f3526]">Booking Overview</h1>
        <p className="mt-1 text-sm text-[#735645]">Monitor platform-wide bookings, payments, and status.</p>
      </Card>
      <DataTable
        headers={["Booking ID", "Salon", "Date", "Amount", "Payment", "Status"]}
        rows={bookings.map((booking) => [
          booking.id,
          salons.find((salon) => salon.id === booking.salonId)?.name ?? "Unknown",
          booking.date,
          `Rs. ${booking.total}`,
          booking.paymentStatus,
          booking.status,
        ])}
      />
    </DashboardShell>
  );
}
