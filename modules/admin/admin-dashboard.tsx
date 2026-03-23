"use client";

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

export function AdminDashboardModule() {
  const salons = useSalonStore((state) => state.salons);
  const users = useSalonStore((state) => state.users);
  const bookings = useSalonStore((state) => state.bookings);

  const pieData = [
    { name: "Approved", value: salons.filter((salon) => salon.approved).length, color: "#b88b67" },
    { name: "Pending", value: salons.filter((salon) => !salon.approved).length, color: "#e5d5c7" },
  ];

  return (
    <DashboardShell title="Admin Panel" links={links}>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card><p className="text-sm text-[#735645]">Total Salons</p><p className="mt-1 font-serif text-4xl text-[#4f3526]">{salons.length}</p></Card>
        <Card><p className="text-sm text-[#735645]">Platform Users</p><p className="mt-1 font-serif text-4xl text-[#4f3526]">{users.length}</p></Card>
        <Card><p className="text-sm text-[#735645]">Bookings</p><p className="mt-1 font-serif text-4xl text-[#4f3526]">{bookings.length}</p></Card>
      </div>

      <Card>
        <h2 className="mb-4 font-serif text-2xl text-[#513626]">Salon Approval Status</h2>
        <div className="h-72 w-full">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100}>
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </DashboardShell>
  );
}
