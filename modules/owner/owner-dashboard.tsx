"use client";

import { useMemo } from "react";
import { DollarSign, Users, CalendarCheck, Store } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
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

const kpiConfig = [
  { key: "bookings", label: "Total Bookings", icon: CalendarCheck, color: "bg-sky-50 text-sky-600" },
  { key: "revenue", label: "Revenue", icon: DollarSign, color: "bg-emerald-50 text-emerald-600", prefix: "Rs. " },
  { key: "customers", label: "Customers", icon: Users, color: "bg-purple-50 text-purple-600" },
  { key: "salons", label: "Managed Salons", icon: Store, color: "bg-amber-50 text-amber-600" },
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

  const kpiValues: Record<string, number> = {
    bookings: ownerBookings.length,
    revenue,
    customers: new Set(ownerBookings.map((b) => b.customerId)).size,
    salons: salons.length,
  };

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
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 stagger-children">
        {kpiConfig.map((kpi) => (
          <Card key={kpi.key} className="flex items-center gap-4">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${kpi.color}`}>
              <kpi.icon size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">{kpi.label}</p>
              <p className="font-serif text-2xl text-[var(--foreground)]">{kpi.prefix ?? ""}{kpiValues[kpi.key]}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <h2 className="mb-1 font-serif text-xl text-[var(--foreground)]">Weekly Booking Trend</h2>
        <p className="mb-4 text-sm text-[var(--muted)]">Bookings per day this week</p>
        <div className="h-72 w-full">
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-md)" }}
              />
              <Bar dataKey="bookings" fill="var(--accent)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </DashboardShell>
  );
}
