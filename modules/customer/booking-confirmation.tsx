"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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
      <section className="mx-auto max-w-3xl px-4 py-10">
        <Card>
          <h1 className="font-serif text-3xl text-[#513625]">No booking draft found</h1>
          <p className="mt-2 text-[#6d4f3e]">Please select salon, services, and a slot first.</p>
          <Link href="/salons" className="mt-4 inline-block">
            <Button>Go to salons</Button>
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
    <section className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-8 lg:grid-cols-[1.2fr_1fr]">
      <Card>
        <h1 className="font-serif text-3xl text-[#523626]">Booking Confirmation</h1>
        <p className="mb-5 mt-1 text-sm text-[#725341]">Fill in details to continue to payment simulation.</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#7b5b46]">Full Name</label>
            <Input {...form.register("fullName")} />
            {form.formState.errors.fullName && <p className="mt-1 text-xs text-red-500">{form.formState.errors.fullName.message}</p>}
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#7b5b46]">Phone</label>
            <Input {...form.register("phone")} />
            {form.formState.errors.phone && <p className="mt-1 text-xs text-red-500">{form.formState.errors.phone.message}</p>}
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#7b5b46]">Special Note</label>
            <textarea
              {...form.register("note")}
              className="min-h-24 w-full rounded-xl border border-[#d9cabd] px-3 py-2 text-sm outline-none focus:border-[#b88b67]"
              placeholder="Any preference for stylist or service?"
            />
          </div>
          <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
            <Input {...form.register("couponCode")} placeholder="Coupon e.g. GLOW10" />
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
              Apply
            </Button>
          </div>

          <Button className="w-full" size="lg" type="submit">
            Proceed to Payment
          </Button>
        </form>
      </Card>

      <Card>
        <h2 className="font-serif text-2xl text-[#563a2b]">Booking Summary</h2>
        <div className="mt-4 space-y-2 text-sm text-[#6f503f]">
          <p className="font-semibold text-[#563a2b]">{selectedSalon.name}</p>
          <p>{selectedSalon.location}</p>
          <p>Slot: {selectedSlot.date} at {selectedSlot.startTime}</p>
        </div>
        <div className="mt-4 space-y-2 text-sm">
          {selectedServices.map((service) => (
            <div key={service.id} className="flex justify-between text-[#6f503f]">
              <span>{service.name}</span>
              <span>Rs. {service.price}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-1 border-t border-[#ecdfd4] pt-3 text-sm">
          <div className="flex justify-between text-[#6f503f]"><span>Subtotal</span><span>Rs. {subtotal}</span></div>
          <div className="flex justify-between text-[#6f503f]"><span>Discount</span><span>- Rs. {discountAmount}</span></div>
          <div className="flex justify-between font-semibold text-[#513625]"><span>Total</span><span>Rs. {total}</span></div>
        </div>
      </Card>
    </section>
  );
}
