"use client";

import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card } from "@/components/ui/card";
import { useSalonStore } from "@/store/use-salon-store";

const links = [
  { href: "/dashboard/owner", label: "Overview" },
  { href: "/dashboard/owner/services", label: "Services" },
  { href: "/dashboard/owner/staff", label: "Staff" },
  { href: "/dashboard/owner/slots", label: "Time Slots" },
  { href: "/dashboard/owner/bookings", label: "Bookings" },
  { href: "/dashboard/owner/reports", label: "Reports" },
];

export function OwnerDashboardModule() {
  const currentUserId = useSalonStore((state) => state.currentUserId);
  const allSalons = useSalonStore((state) => state.salons);
  const bookings = useSalonStore((state) => state.bookings);

  const salons = useMemo(
    () => allSalons.filter((salon) => salon.ownerId === currentUserId),
    [allSalons, currentUserId]
  );

  const ownerSalonIds = useMemo(() => salons.map((salon) => salon.id), [salons]);
  const ownerBookings = useMemo(
    () => bookings.filter((booking) => ownerSalonIds.includes(booking.salonId)),
    [bookings, ownerSalonIds]
  );
  const revenue = useMemo(
    () => ownerBookings.reduce((sum, booking) => sum + booking.total, 0),
    [ownerBookings]
  );

  const chartData = [
    { day: "Mon", bookings: 6 },
    { day: "Tue", bookings: 8 },
    { day: "Wed", bookings: 5 },
    { day: "Thu", bookings: 9 },
    { day: "Fri", bookings: 11 },
    { day: "Sat", bookings: 13 },
  ];

  return (
    <DashboardShell title="Owner Panel" links={links}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card><p className="text-sm text-[#745847]">Total Bookings</p><p className="mt-1 font-serif text-4xl text-[#4d3325]">{ownerBookings.length}</p></Card>
        <Card><p className="text-sm text-[#745847]">Revenue</p><p className="mt-1 font-serif text-4xl text-[#4d3325]">Rs. {revenue}</p></Card>
        <Card><p className="text-sm text-[#745847]">Customers</p><p className="mt-1 font-serif text-4xl text-[#4d3325]">{new Set(ownerBookings.map((b) => b.customerId)).size}</p></Card>
        <Card><p className="text-sm text-[#745847]">Managed Salons</p><p className="mt-1 font-serif text-4xl text-[#4d3325]">{salons.length}</p></Card>
      </div>

      <Card>
        <h2 className="mb-4 font-serif text-2xl text-[#513626]">Weekly Booking Trend</h2>
        <div className="h-72 w-full">
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5d7cb" />
              <XAxis dataKey="day" />
              <Tooltip />
              <Bar dataKey="bookings" fill="#b88b67" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </DashboardShell>
  );
}
