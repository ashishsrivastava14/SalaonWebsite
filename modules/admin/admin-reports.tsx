"use client";

import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card } from "@/components/ui/card";

const links = [
  { href: "/dashboard/admin", label: "Overview" },
  { href: "/dashboard/admin/salons", label: "Manage Salons" },
  { href: "/dashboard/admin/users", label: "Manage Users" },
  { href: "/dashboard/admin/commission", label: "Commission" },
  { href: "/dashboard/admin/bookings", label: "Bookings" },
  { href: "/dashboard/admin/reports", label: "Reports" },
];

const reportData = [
  { month: "Jan", gross: 120000, commission: 14400 },
  { month: "Feb", gross: 136000, commission: 16400 },
  { month: "Mar", gross: 152000, commission: 18800 },
  { month: "Apr", gross: 146000, commission: 17400 },
  { month: "May", gross: 168000, commission: 21500 },
  { month: "Jun", gross: 182000, commission: 23500 },
];

export function AdminReportsModule() {
  return (
    <DashboardShell title="Admin Panel" links={links}>
      <Card>
        <h1 className="font-serif text-2xl tracking-tight text-[var(--foreground)]">Reports & Analytics</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">Mock trends for gross booking value and commission revenue.</p>
      </Card>
      <Card>
        <div className="h-80 w-full">
          <ResponsiveContainer>
            <LineChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-md)" }} />
              <Line type="monotone" dataKey="gross" stroke="var(--accent)" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="commission" stroke="#6d4a35" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </DashboardShell>
  );
}
