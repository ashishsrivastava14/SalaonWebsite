"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSalonStore } from "@/store/use-salon-store";
import { delay } from "@/utils/mock-api";

export function PaymentSimulationModule() {
  const router = useRouter();
  const cart = useSalonStore((state) => state.cart);
  const finalizePayment = useSalonStore((state) => state.finalizePayment);
  const createBookingFromDraft = useSalonStore((state) => state.createBookingFromDraft);
  const selectDraft = useSalonStore((state) => state.selectDraft);
  const bookings = useSalonStore((state) => state.bookings);

  const [loadingType, setLoadingType] = useState<"success" | "failure" | null>(null);

  if (!cart) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-12">
        <Card>
          <h1 className="font-serif text-3xl text-[#4f3526]">Payment Session Expired</h1>
          <p className="mt-2 text-[#6f503f]">Your booking draft is empty.</p>
          <Link href="/salons" className="mt-4 inline-block">
            <Button>Choose Salon</Button>
          </Link>
        </Card>
      </section>
    );
  }

  const processPayment = async (shouldSucceed: boolean) => {
    setLoadingType(shouldSucceed ? "success" : "failure");
    await delay(1100);

    const result = finalizePayment(shouldSucceed);
    if (result === "success") {
      createBookingFromDraft();
      selectDraft(null);
      toast.success("Payment successful. Booking confirmed.");
      router.push("/dashboard/customer");
    } else {
      toast.error("Payment failed. You can retry.");
    }

    setLoadingType(null);
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <Card className="space-y-5">
        <h1 className="font-serif text-4xl text-[#4f3526]">Payment Simulation</h1>
        <p className="text-sm text-[#6f503f]">
          This frontend-only flow simulates a payment gateway callback. Choose an outcome to test success/failure UX.
        </p>

        <div className="rounded-2xl border border-[#eaded3] bg-[#faf4ed] p-4 text-sm text-[#6c4d3b]">
          Existing bookings in local store: <span className="font-semibold">{bookings.length}</span>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={() => processPayment(true)} disabled={loadingType !== null}>
            {loadingType === "success" ? "Processing..." : "Pay & Succeed"}
          </Button>
          <Button variant="danger" onClick={() => processPayment(false)} disabled={loadingType !== null}>
            {loadingType === "failure" ? "Processing..." : "Pay & Fail"}
          </Button>
        </div>
      </Card>
    </section>
  );
}
