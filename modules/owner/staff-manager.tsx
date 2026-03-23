"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Modal } from "@/components/ui/modal";
import { useSalonStore } from "@/store/use-salon-store";

const links = [
  { href: "/dashboard/owner", label: "Overview" },
  { href: "/dashboard/owner/services", label: "Services" },
  { href: "/dashboard/owner/staff", label: "Staff" },
  { href: "/dashboard/owner/slots", label: "Time Slots" },
  { href: "/dashboard/owner/bookings", label: "Bookings" },
  { href: "/dashboard/owner/reports", label: "Reports" },
];

interface StaffForm {
  name: string;
  specialty: string;
}

export function StaffManagerModule() {
  const [open, setOpen] = useState(false);
  const currentUserId = useSalonStore((state) => state.currentUserId);
  const allSalons = useSalonStore((state) => state.salons);
  const staff = useSalonStore((state) => state.staff);
  const addStaff = useSalonStore((state) => state.addStaff);
  const deleteStaff = useSalonStore((state) => state.deleteStaff);

  const salons = useMemo(
    () => allSalons.filter((salon) => salon.ownerId === currentUserId),
    [allSalons, currentUserId]
  );

  const ownedSalonIds = salons.map((salon) => salon.id);
  const ownedStaff = useMemo(() => staff.filter((member) => ownedSalonIds.includes(member.salonId)), [ownedSalonIds, staff]);

  const form = useForm<StaffForm>({ defaultValues: { name: "", specialty: "" } });

  return (
    <DashboardShell title="Owner Panel" links={links}>
      <Card className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl tracking-tight text-[var(--foreground)]">Manage Staff</h1>
          <p className="text-sm text-[var(--muted)]">Add or remove team members</p>
        </div>
        <Button onClick={() => setOpen(true)}>Add Staff</Button>
      </Card>

      <DataTable
        headers={["Name", "Specialty", "Action"]}
        rows={ownedStaff.map((member) => [
          member.name,
          member.specialty,
          <Button key={member.id} variant="danger" size="sm" onClick={() => deleteStaff(member.id)}>
            Delete
          </Button>,
        ])}
      />

      <Modal title="Add Staff" open={open} onClose={() => setOpen(false)}>
        <form
          className="space-y-3"
          onSubmit={form.handleSubmit((values) => {
            if (!ownedSalonIds[0]) {
              toast.error("No owner salon found.");
              return;
            }
            addStaff({ ...values, salonId: ownedSalonIds[0], isActive: true });
            toast.success("Staff member added.");
            setOpen(false);
            form.reset();
          })}
        >
          <Input placeholder="Name" {...form.register("name")} />
          <Input placeholder="Specialty" {...form.register("specialty")} />
          <Button className="w-full" type="submit">Save Staff</Button>
        </form>
      </Modal>
    </DashboardShell>
  );
}
