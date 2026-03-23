"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ShoppingBag, Tag, CreditCard } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSalonStore } from "@/store/use-salon-store";

const bookingSchema = z.object({
  fullName: z.string().min(3, "Please enter your full name"),
  phone: z.string().min(10, "Enter a valid phone number"),
  note: z.string().optional(),
  couponCode: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export function BookingConfirmationModule() {
  const router = useRouter();
  const cart = useSalonStore((state) => state.cart);
  const salons = useSalonStore((state) => state.salons);
  const services = useSalonStore((state) => state.services);
  const slots = useSalonStore((state) => state.slots);
  const selectDraft = useSalonStore((state) => state.selectDraft);
  const applyCoupon = useSalonStore((state) => state.applyCoupon);

  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const selectedSalon = salons.find((salon) => salon.id === cart?.salonId);
  const selectedServices = services.filter((service) => cart?.serviceIds.includes(service.id));
  const selectedSlot = slots.find((slot) => slot.id === cart?.slotId);

  const subtotal = useMemo(
    () => selectedServices.reduce((sum, service) => sum + service.price, 0),
    [selectedServices]
  );
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const total = subtotal - discountAmount;

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      note: "",
      couponCode: "",
    },
  });

  if (!cart || !selectedSalon || !selectedSlot || selectedServices.length === 0) {
    return (
      <section className="mx-auto flex min-h-[50vh] max-w-md items-center justify-center px-4 py-10">
        <Card className="w-full text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-light)]">
            <ShoppingBag size={24} className="text-[var(--accent)]" />
          </div>
          <h1 className="font-serif text-2xl text-[var(--foreground)]">No booking draft found</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">Please select salon, services, and a slot first.</p>
          <Link href="/salons" className="mt-5 inline-block">
            <Button>Browse Salons</Button>
          </Link>
        </Card>
      </section>
    );
  }

  const onSubmit = (values: BookingFormValues) => {
    selectDraft({
      ...cart,
      couponCode: values.couponCode?.trim().toUpperCase(),
    });
    toast.success("Booking draft saved. Proceeding to payment.");
    router.push("/payment");
  };

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
      <Card>
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-light)]">
            <CreditCard size={18} className="text-[var(--accent)]" />
          </div>
          <div>
            <h1 className="font-serif text-2xl tracking-tight text-[var(--foreground)]">Confirm Booking</h1>
            <p className="text-sm text-[var(--muted)]">Fill in details to continue to payment</p>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Full Name</label>
            <Input {...form.register("fullName")} />
            {form.formState.errors.fullName && <p className="mt-1 text-xs text-red-500">{form.formState.errors.fullName.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Phone</label>
            <Input {...form.register("phone")} />
            {form.formState.errors.phone && <p className="mt-1 text-xs text-red-500">{form.formState.errors.phone.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Special Note</label>
            <textarea
              {...form.register("note")}
              className="min-h-24 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] shadow-[var(--shadow-sm)] outline-none transition-all placeholder:text-[var(--muted-light)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)]"
              placeholder="Any preference for stylist or service?"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Coupon Code</label>
            <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
              <Input {...form.register("couponCode")} placeholder="e.g. GLOW10" />
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  const code = form.getValues("couponCode");
                  if (!code) {
                    toast.error("Enter coupon code first.");
                    return;
                  }
                  const couponResult = applyCoupon(code);
                  if (couponResult.isValid) {
                    setAppliedDiscount(couponResult.discountPercent);
                    toast.success(`Coupon applied: ${couponResult.discountPercent}% off`);
                  } else {
                    setAppliedDiscount(0);
                    toast.error("Invalid coupon code");
                  }
                }}
              >
                <Tag size={14} /> Apply
              </Button>
            </div>
          </div>

          <Button className="w-full" size="lg" type="submit">
            Proceed to Payment
          </Button>
        </form>
      </Card>

      <Card className="h-fit lg:sticky lg:top-24">
        <h2 className="font-serif text-xl text-[var(--foreground)]">Booking Summary</h2>
        <div className="mt-4 space-y-2 text-sm text-[var(--muted)]">
          <p className="font-semibold text-[var(--foreground)]">{selectedSalon.name}</p>
          <p>{selectedSalon.location}</p>
          <p className="rounded-lg bg-[var(--accent-light)] px-3 py-2 text-[var(--foreground)]">
            {selectedSlot.date} at {selectedSlot.startTime}
          </p>
        </div>
        <div className="mt-4 space-y-2 text-sm">
          {selectedServices.map((service) => (
            <div key={service.id} className="flex justify-between text-[var(--muted)]">
              <span>{service.name}</span>
              <span className="font-medium text-[var(--foreground)]">Rs. {service.price}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-2 border-t border-[var(--border-light)] pt-4 text-sm">
          <div className="flex justify-between text-[var(--muted)]"><span>Subtotal</span><span>Rs. {subtotal}</span></div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-emerald-600"><span>Discount</span><span>- Rs. {discountAmount}</span></div>
          )}
          <div className="flex justify-between text-base font-bold text-[var(--foreground)]"><span>Total</span><span>Rs. {total}</span></div>
        </div>
      </Card>
    </section>
  );
}
