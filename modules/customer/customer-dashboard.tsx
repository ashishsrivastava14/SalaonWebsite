"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CalendarCheck, Clock, User } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSalonStore } from "@/store/use-salon-store";

const links = [{ href: "/dashboard/customer", label: "Overview" }];

interface ProfileForm {
  name: string;
  email: string;
}

const statusVariant = (status: string) => {
  switch (status) {
    case "confirmed": return "success" as const;
    case "pending": return "warning" as const;
    case "rejected": return "danger" as const;
    case "completed": return "info" as const;
    default: return "default" as const;
  }
};

export function CustomerDashboardModule() {
  const currentUserId = useSalonStore((state) => state.currentUserId);
  const users = useSalonStore((state) => state.users);
  const salons = useSalonStore((state) => state.salons);
  const services = useSalonStore((state) => state.services);
  const bookings = useSalonStore((state) => state.bookings);

  const user = users.find((item) => item.id === currentUserId);

  const userBookings = useMemo(
    () => bookings.filter((booking) => booking.customerId === currentUserId),
    [bookings, currentUserId]
  );

  const now = new Date().toISOString().slice(0, 10);
  const upcoming = userBookings.filter((booking) => booking.date >= now);
  const history = userBookings.filter((booking) => booking.date < now || booking.status === "completed");

  const form = useForm<ProfileForm>({
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
    },
  });

  return (
    <DashboardShell title="Customer" links={links}>
      {/* Welcome card */}
      <Card className="bg-gradient-to-r from-[var(--accent-light)] to-white border-0">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[#a07050] text-white shadow-sm">
            <User size={20} />
          </div>
          <div>
            <h1 className="font-serif text-2xl tracking-tight text-[var(--foreground)] sm:text-3xl">Welcome back, {user?.name}</h1>
            <p className="text-sm text-[var(--muted)]">Track bookings, review history, and update profile settings.</p>
          </div>
        </div>
      </Card>

      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600"><CalendarCheck size={18} /></div>
          <div><p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Total</p><p className="font-serif text-2xl text-[var(--foreground)]">{userBookings.length}</p></div>
        </Card>
        <Card className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><Clock size={18} /></div>
          <div><p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Upcoming</p><p className="font-serif text-2xl text-[var(--foreground)]">{upcoming.length}</p></div>
        </Card>
        <Card className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><CalendarCheck size={18} /></div>
          <div><p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Completed</p><p className="font-serif text-2xl text-[var(--foreground)]">{history.length}</p></div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 font-serif text-xl text-[var(--foreground)]">Upcoming Bookings</h2>
          <div className="space-y-3">
            {upcoming.length === 0 ? <p className="text-sm text-[var(--muted)]">No upcoming bookings.</p> : null}
            {upcoming.map((booking) => {
              const salon = salons.find((item) => item.id === booking.salonId);
              const names = services
                .filter((service) => booking.serviceIds.includes(service.id))
                .map((service) => service.name)
                .join(", ");
              return (
                <div key={booking.id} className="rounded-xl border border-[var(--border-light)] bg-[var(--background)] p-4 transition-colors hover:border-[var(--accent-muted)]">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-[var(--foreground)]">{salon?.name}</p>
                      <p className="mt-0.5 text-sm text-[var(--muted)]">{booking.date} &middot; {names}</p>
                    </div>
                    <Badge variant={statusVariant(booking.status)}>{booking.status}</Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 font-serif text-xl text-[var(--foreground)]">Booking History</h2>
          <div className="space-y-3">
            {history.length === 0 ? <p className="text-sm text-[var(--muted)]">No completed history yet.</p> : null}
            {history.map((booking) => {
              const salon = salons.find((item) => item.id === booking.salonId);
              return (
                <div key={booking.id} className="flex items-center justify-between rounded-xl border border-[var(--border-light)] bg-white p-4 transition-colors hover:border-[var(--accent-muted)]">
                  <div>
                    <p className="font-semibold text-[var(--foreground)]">{salon?.name}</p>
                    <p className="text-sm text-[var(--muted)]">{booking.date}</p>
                  </div>
                  <p className="font-semibold text-[var(--foreground)]">Rs. {booking.total}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="mb-4 font-serif text-xl text-[var(--foreground)]">Profile Settings</h2>
        <form
          className="grid items-end gap-3 sm:grid-cols-3"
          onSubmit={form.handleSubmit(() => toast.success("Profile updated locally."))}
        >
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Name</label>
            <Input {...form.register("name")} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Email</label>
            <Input {...form.register("email")} />
          </div>
          <Button type="submit">Save Profile</Button>
        </form>
      </Card>
    </DashboardShell>
  );
}
