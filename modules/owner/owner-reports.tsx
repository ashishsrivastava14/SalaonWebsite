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
        <h1 className="font-serif text-3xl text-[#4f3526]">Earnings & Reports</h1>
        <p className="mt-1 text-sm text-[#745746]">Monthly trend view powered by mock data.</p>
      </Card>
      <Card>
        <div className="h-80 w-full">
          <ResponsiveContainer>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e6d8ca" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#b88b67" fill="#e9d8c6" />
              <Area type="monotone" dataKey="bookings" stroke="#91674c" fill="#f2e7dc" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </DashboardShell>
  );
}
