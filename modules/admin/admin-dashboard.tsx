"use client";

import { Store, Users, CalendarCheck } from "lucide-react";
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { DashboardShell } from "@/components/layout/dashboard-shell";
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

const kpiConfig = [
  { key: "salons", label: "Total Salons", icon: Store, color: "bg-amber-50 text-amber-600" },
  { key: "users", label: "Platform Users", icon: Users, color: "bg-purple-50 text-purple-600" },
  { key: "bookings", label: "Bookings", icon: CalendarCheck, color: "bg-sky-50 text-sky-600" },
];

export function AdminDashboardModule() {
  const salons = useSalonStore((state) => state.salons);
  const users = useSalonStore((state) => state.users);
  const bookings = useSalonStore((state) => state.bookings);

  const kpiValues: Record<string, number> = {
    salons: salons.length,
    users: users.length,
    bookings: bookings.length,
  };

  const pieData = [
    { name: "Approved", value: salons.filter((salon) => salon.approved).length, color: "var(--accent)" },
    { name: "Pending", value: salons.filter((salon) => !salon.approved).length, color: "var(--accent-muted)" },
  ];

  return (
    <DashboardShell title="Admin Panel" links={links}>
      <div className="grid gap-4 sm:grid-cols-3 stagger-children">
        {kpiConfig.map((kpi) => (
          <Card key={kpi.key} className="flex items-center gap-4">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${kpi.color}`}>
              <kpi.icon size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">{kpi.label}</p>
              <p className="font-serif text-2xl text-[var(--foreground)]">{kpiValues[kpi.key]}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <h2 className="mb-1 font-serif text-xl text-[var(--foreground)]">Salon Approval Status</h2>
        <p className="mb-4 text-sm text-[var(--muted)]">Approved vs pending salons</p>
        <div className="h-72 w-full">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} innerRadius={60} strokeWidth={0}>
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-md)" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex justify-center gap-6">
          {pieData.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2 text-sm">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-[var(--muted)]">{entry.name}: <span className="font-semibold text-[var(--foreground)]">{entry.value}</span></span>
            </div>
          ))}
        </div>
      </Card>
    </DashboardShell>
  );
}
