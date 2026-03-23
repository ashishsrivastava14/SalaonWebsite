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

interface ServiceForm {
  name: string;
  category: "Hair" | "Spa" | "Makeup" | "Nails";
  durationMins: number;
  price: number;
}

export function ServiceManagerModule() {
  const [open, setOpen] = useState(false);
  const currentUserId = useSalonStore((state) => state.currentUserId);
  const allSalons = useSalonStore((state) => state.salons);
  const services = useSalonStore((state) => state.services);
  const addService = useSalonStore((state) => state.addService);
  const deleteService = useSalonStore((state) => state.deleteService);

  const salons = useMemo(
    () => allSalons.filter((salon) => salon.ownerId === currentUserId),
    [allSalons, currentUserId]
  );

  const ownedSalonIds = salons.map((salon) => salon.id);
  const ownedServices = useMemo(
    () => services.filter((service) => ownedSalonIds.includes(service.salonId)),
    [ownedSalonIds, services]
  );

  const form = useForm<ServiceForm>({
    defaultValues: {
      name: "",
      category: "Hair",
      durationMins: 60,
      price: 1200,
    },
  });

  return (
    <DashboardShell title="Owner Panel" links={links}>
      <Card className="flex items-center justify-between">
        <h1 className="font-serif text-3xl text-[#4f3526]">Manage Services</h1>
        <Button onClick={() => setOpen(true)}>Add Service</Button>
      </Card>

      <DataTable
        headers={["Service", "Category", "Duration", "Price", "Action"]}
        rows={ownedServices.map((service) => [
          service.name,
          service.category,
          `${service.durationMins} mins`,
          `Rs. ${service.price}`,
          <Button key={service.id} variant="danger" size="sm" onClick={() => deleteService(service.id)}>
            Delete
          </Button>,
        ])}
      />

      <Modal title="Add Service" open={open} onClose={() => setOpen(false)}>
        <form
          className="space-y-3"
          onSubmit={form.handleSubmit((values) => {
            if (!ownedSalonIds[0]) {
              toast.error("No owner salon found.");
              return;
            }
            addService({
              salonId: ownedSalonIds[0],
              isActive: true,
              ...values,
            });
            toast.success("Service added.");
            setOpen(false);
            form.reset();
          })}
        >
          <Input placeholder="Service name" {...form.register("name")} />
          <select className="h-11 w-full rounded-xl border border-[#d9cabd] px-3" {...form.register("category")}>
            <option value="Hair">Hair</option>
            <option value="Spa">Spa</option>
            <option value="Makeup">Makeup</option>
            <option value="Nails">Nails</option>
          </select>
          <Input type="number" placeholder="Duration" {...form.register("durationMins", { valueAsNumber: true })} />
          <Input type="number" placeholder="Price" {...form.register("price", { valueAsNumber: true })} />
          <Button className="w-full" type="submit">Save Service</Button>
        </form>
      </Modal>
    </DashboardShell>
  );
}
