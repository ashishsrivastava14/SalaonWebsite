"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CreditCard, CheckCircle2, XCircle, Loader2 } from "lucide-react";
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
      <section className="mx-auto flex min-h-[50vh] max-w-md items-center justify-center px-4 py-12">
        <Card className="w-full text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-light)]">
            <CreditCard size={24} className="text-[var(--accent)]" />
          </div>
          <h1 className="font-serif text-2xl text-[var(--foreground)]">Payment Session Expired</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">Your booking draft is empty.</p>
          <Link href="/salons" className="mt-5 inline-block">
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
    <section className="mx-auto flex min-h-[60vh] max-w-lg items-center px-4 py-10">
      <Card className="w-full space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[#a07050] text-white shadow-sm">
            <CreditCard size={20} />
          </div>
          <div>
            <h1 className="font-serif text-2xl tracking-tight text-[var(--foreground)]">Payment Simulation</h1>
            <p className="text-sm text-[var(--muted)]">Test success or failure UX</p>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--border-light)] bg-[var(--background)] p-4 text-sm text-[var(--muted)]">
          Existing bookings in store: <span className="font-semibold text-[var(--foreground)]">{bookings.length}</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            size="lg"
            className="w-full"
            onClick={() => processPayment(true)}
            disabled={loadingType !== null}
          >
            {loadingType === "success" ? (
              <><Loader2 size={16} className="animate-spin" /> Processing...</>
            ) : (
              <><CheckCircle2 size={16} /> Pay & Succeed</>
            )}
          </Button>
          <Button
            variant="danger"
            size="lg"
            className="w-full"
            onClick={() => processPayment(false)}
            disabled={loadingType !== null}
          >
            {loadingType === "failure" ? (
              <><Loader2 size={16} className="animate-spin" /> Processing...</>
            ) : (
              <><XCircle size={16} /> Pay & Fail</>
            )}
          </Button>
        </div>
      </Card>
    </section>
  );
}
