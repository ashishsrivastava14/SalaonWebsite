"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
      <Card>
        <h1 className="font-serif text-3xl text-[#4f3526]">Welcome back, {user?.name}</h1>
        <p className="mt-1 text-sm text-[#6d4f3e]">Track bookings, review history, and update profile settings.</p>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 font-serif text-2xl text-[#533726]">Upcoming Bookings</h2>
          <div className="space-y-3">
            {upcoming.length === 0 ? <p className="text-sm text-[#7a5b47]">No upcoming bookings.</p> : null}
            {upcoming.map((booking) => {
              const salon = salons.find((item) => item.id === booking.salonId);
              const names = services
                .filter((service) => booking.serviceIds.includes(service.id))
                .map((service) => service.name)
                .join(", ");
              return (
                <div key={booking.id} className="rounded-2xl border border-[#ebdfd5] bg-[#fdf9f5] p-3">
                  <p className="font-semibold text-[#5a3d2d]">{salon?.name}</p>
                  <p className="text-sm text-[#725341]">{booking.date} | {names}</p>
                  <div className="mt-2">
                    <Badge>{booking.status}</Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 font-serif text-2xl text-[#533726]">Booking History</h2>
          <div className="space-y-3">
            {history.length === 0 ? <p className="text-sm text-[#7a5b47]">No completed history yet.</p> : null}
            {history.map((booking) => {
              const salon = salons.find((item) => item.id === booking.salonId);
              return (
                <div key={booking.id} className="flex items-center justify-between rounded-2xl border border-[#ebdfd5] bg-white p-3">
                  <div>
                    <p className="font-semibold text-[#5a3d2d]">{salon?.name}</p>
                    <p className="text-sm text-[#725341]">{booking.date}</p>
                  </div>
                  <p className="text-sm font-semibold text-[#654636]">Rs. {booking.total}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="mb-4 font-serif text-2xl text-[#533726]">Profile Settings</h2>
        <form
          className="grid gap-3 md:grid-cols-3"
          onSubmit={form.handleSubmit(() => toast.success("Profile updated locally."))}
        >
          <Input {...form.register("name")} />
          <Input {...form.register("email")} />
          <Button type="submit">Save Profile</Button>
        </form>
      </Card>
    </DashboardShell>
  );
}
