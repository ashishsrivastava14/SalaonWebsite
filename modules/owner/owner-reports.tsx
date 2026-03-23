"use client";

import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card } from "@/components/ui/card";

const links = [
  { href: "/dashboard/owner", label: "Overview" },
  { href: "/dashboard/owner/services", label: "Services" },
  { href: "/dashboard/owner/staff", label: "Staff" },
  { href: "/dashboard/owner/slots", label: "Time Slots" },
  { href: "/dashboard/owner/bookings", label: "Bookings" },
  { href: "/dashboard/owner/reports", label: "Reports" },
];

const data = [
  { month: "Jan", revenue: 42000, bookings: 58 },
  { month: "Feb", revenue: 49000, bookings: 65 },
  { month: "Mar", revenue: 57000, bookings: 72 },
  { month: "Apr", revenue: 53000, bookings: 69 },
  { month: "May", revenue: 64000, bookings: 81 },
  { month: "Jun", revenue: 72000, bookings: 92 },
];

export function OwnerReportsModule() {
  return (
    <DashboardShell title="Owner Panel" links={links}>
      <Card>
        <h1 className="font-serif text-2xl tracking-tight text-[var(--foreground)]">Earnings & Reports</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">Monthly trend view powered by mock data.</p>
      </Card>
      <Card>
        <div className="h-80 w-full">
          <ResponsiveContainer>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-md)" }} />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="var(--accent)" fill="var(--accent-light)" strokeWidth={2} />
              <Area type="monotone" dataKey="bookings" stroke="#91674c" fill="var(--accent-muted)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </DashboardShell>
  );
}
