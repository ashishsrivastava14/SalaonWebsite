"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { CalendarDays, Clock3, Star, Check, MapPin, ArrowRight, MessageSquare } from "lucide-react";
import { useSalonStore } from "@/store/use-salon-store";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMockLoading } from "@/hooks/use-mock-loading";
import { Skeleton } from "@/components/ui/skeleton";

interface SalonDetailsModuleProps {
  salonId: string;
}

export function SalonDetailsModule({ salonId }: SalonDetailsModuleProps) {
  const loading = useMockLoading(700);
  const salons = useSalonStore((state) => state.salons);
  const allServices = useSalonStore((state) => state.services);
  const allSlots = useSalonStore((state) => state.slots);
  const selectDraft = useSalonStore((state) => state.selectDraft);

  const salon = useMemo(() => salons.find((item) => item.id === salonId), [salonId, salons]);
  const services = useMemo(
    () => allServices.filter((service) => service.salonId === salonId),
    [allServices, salonId]
  );
  const slots = useMemo(
    () => allSlots.filter((slot) => slot.salonId === salonId && slot.isAvailable),
    [allSlots, salonId]
  );

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState<string>("");

  const groupedSlots = useMemo(() => {
    return slots.reduce<Record<string, typeof slots>>((acc, slot) => {
      if (!acc[slot.date]) {
        acc[slot.date] = [];
      }
      acc[slot.date].push(slot);
      return acc;
    }, {});
  }, [slots]);

  if (!salon) {
    return (
      <section className="mx-auto flex min-h-[50vh] max-w-md items-center justify-center px-4 py-10">
        <Card className="text-center">
          <h2 className="font-serif text-2xl text-[var(--foreground)]">Salon not found</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">The salon you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/salons" className="mt-4 inline-block"><Button variant="secondary">Browse Salons</Button></Link>
        </Card>
      </section>
    );
  }

  const selectedSlot = slots.find((slot) => slot.id === selectedSlotId);
  const subtotal = services.filter((s) => selectedServices.includes(s.id)).reduce((sum, s) => sum + s.price, 0);
  const isReady = selectedServices.length > 0 && selectedSlot;

  return (
    <section className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero cover */}
      {loading ? (
        <Card className="overflow-hidden p-0">
          <Skeleton className="h-72 w-full rounded-none" />
          <div className="space-y-3 p-6">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </Card>
      ) : (
        <Card className="overflow-hidden p-0">
          <div className="relative">
            <Image
              src={salon.coverImage}
              alt={salon.name}
              width={1200}
              height={500}
              className="h-64 w-full object-cover sm:h-72"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="font-serif text-3xl sm:text-4xl">{salon.name}</h1>
                <Badge variant="accent">{salon.category}</Badge>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-white/85">
                <span className="inline-flex items-center gap-1">
                  <Star size={14} className="fill-white" /> {salon.rating} ({salon.reviewCount} reviews)
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin size={14} /> {salon.location}
                </span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <p className="text-sm leading-relaxed text-[var(--muted)]">{salon.description}</p>
          </div>
        </Card>
      )}

      {/* Booking flow - Step indicators */}
      <div className="flex items-center gap-3 text-sm font-medium">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors ${selectedServices.length > 0 ? "bg-emerald-50 text-emerald-700" : "bg-[var(--accent-light)] text-[var(--accent)]"}`}>
          {selectedServices.length > 0 ? <Check size={14} /> : "1"} Select Services
        </span>
        <div className="h-px w-6 bg-[var(--border)]" />
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors ${selectedSlot ? "bg-emerald-50 text-emerald-700" : selectedServices.length > 0 ? "bg-[var(--accent-light)] text-[var(--accent)]" : "bg-gray-100 text-gray-400"}`}>
          {selectedSlot ? <Check size={14} /> : "2"} Pick Slot
        </span>
        <div className="h-px w-6 bg-[var(--border)]" />
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors ${isReady ? "bg-[var(--accent-light)] text-[var(--accent)]" : "bg-gray-100 text-gray-400"}`}>
          3 Confirm
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        {/* Services */}
        <Card>
          <h2 className="mb-1 font-serif text-2xl text-[var(--foreground)]">Select Services</h2>
          <p className="mb-4 text-sm text-[var(--muted)]">Choose one or more services</p>
          <div className="space-y-2.5">
            {services.map((service) => {
              const isSelected = selectedServices.includes(service.id);
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() =>
                    setSelectedServices((prev) =>
                      prev.includes(service.id)
                        ? prev.filter((id) => id !== service.id)
                        : [...prev, service.id]
                    )
                  }
                  className={`w-full rounded-xl border p-4 text-left transition-all duration-200 ${
                    isSelected
                      ? "border-[var(--accent)] bg-[var(--accent-light)] shadow-[0_0_0_1px_var(--accent)]"
                      : "border-[var(--border-light)] bg-white hover:border-[var(--accent-muted)] hover:bg-[var(--accent-light)]/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${isSelected ? "border-[var(--accent)] bg-[var(--accent)]" : "border-[var(--border)]"}`}>
                        {isSelected && <Check size={12} className="text-white" />}
                      </div>
                      <div>
                        <p className="font-semibold text-[var(--foreground)]">{service.name}</p>
                        <p className="text-xs text-[var(--muted)]">{service.durationMins} mins &middot; {service.category}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-[var(--foreground)]">Rs. {service.price}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Slot + Summary */}
        <div className="space-y-6">
          <Card>
            <h2 className="mb-1 font-serif text-2xl text-[var(--foreground)]">Pick Time Slot</h2>
            <p className="mb-4 text-sm text-[var(--muted)]">Choose your preferred date and time</p>
            <div className="space-y-5">
              {Object.entries(groupedSlots).slice(0, 3).map(([date, dateSlots]) => (
                <div key={date}>
                  <p className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
                    <CalendarDays size={14} className="text-[var(--accent)]" /> {date}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {dateSlots.map((slot) => (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setSelectedSlotId(slot.id)}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                          selectedSlotId === slot.id
                            ? "border-[var(--accent)] bg-[var(--accent-light)] text-[var(--foreground)] shadow-[0_0_0_1px_var(--accent)]"
                            : "border-[var(--border-light)] text-[var(--muted)] hover:border-[var(--accent-muted)] hover:bg-[var(--accent-light)]/30"
                        }`}
                      >
                        <Clock3 size={12} /> {slot.startTime}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Booking summary */}
          <Card className={`transition-all duration-300 ${isReady ? "border-[var(--accent)] shadow-[0_0_0_1px_var(--accent)]" : ""}`}>
            <h3 className="mb-3 font-semibold text-[var(--foreground)]">Booking Summary</h3>
            {isReady ? (
              <div className="space-y-3">
                <div className="text-sm text-[var(--muted)]">
                  <p><span className="font-medium text-[var(--foreground)]">{selectedServices.length}</span> service{selectedServices.length > 1 && "s"} selected</p>
                  <p>Slot: <span className="font-medium text-[var(--foreground)]">{selectedSlot.date}</span> at <span className="font-medium text-[var(--foreground)]">{selectedSlot.startTime}</span></p>
                </div>
                <div className="flex items-center justify-between border-t border-[var(--border-light)] pt-3">
                  <span className="text-sm text-[var(--muted)]">Estimated total</span>
                  <span className="text-lg font-bold text-[var(--foreground)]">Rs. {subtotal}</span>
                </div>
                <div className="flex gap-3 pt-1">
                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={() =>
                      selectDraft({ salonId, serviceIds: selectedServices, slotId: selectedSlotId })
                    }
                  >
                    Add to Cart
                  </Button>
                  <Link href="/booking/confirm" className="flex-1">
                    <Button
                      className="w-full"
                      onClick={() =>
                        selectDraft({ salonId, serviceIds: selectedServices, slotId: selectedSlotId })
                      }
                    >
                      Continue <ArrowRight size={15} className="ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-sm text-[var(--muted)]">Select at least one service and a time slot to proceed.</p>
            )}
          </Card>
        </div>
      </div>

      {/* Reviews */}
      <Card>
        <div className="mb-4 flex items-center gap-2">
          <MessageSquare size={18} className="text-[var(--accent)]" />
          <h2 className="font-serif text-2xl text-[var(--foreground)]">Reviews</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {["Excellent consultation and detailing.", "Loved the ambience and smooth service.", "Stylists are very patient and skilled.", "Booking flow was incredibly easy."].map((review, idx) => (
            <div key={idx} className="rounded-xl border border-[var(--border-light)] bg-[var(--background)] p-4 transition-colors hover:border-[var(--accent-muted)]">
              <div className="mb-2 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} className={i < 4 + (idx % 2) ? "fill-[var(--accent)] text-[var(--accent)]" : "text-[var(--border)]"} />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-[var(--muted)]">{review}</p>
              <p className="mt-2 text-xs font-semibold text-[var(--foreground)]">Customer {idx + 1}</p>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
