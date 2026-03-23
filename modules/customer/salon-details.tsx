"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { CalendarDays, Clock3, Star } from "lucide-react";
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
    return <section className="mx-auto max-w-3xl px-4 py-10 text-[#5a3d2c]">Salon not found.</section>;
  }

  const selectedSlot = slots.find((slot) => slot.id === selectedSlotId);

  return (
    <section className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      {loading ? (
        <Card>
          <Skeleton className="h-72 w-full" />
        </Card>
      ) : (
        <Card className="overflow-hidden p-0">
          <Image
            src={salon.coverImage}
            alt={salon.name}
            width={1200}
            height={500}
            className="h-72 w-full object-cover"
          />
          <div className="space-y-4 p-6">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-serif text-4xl text-[#4e3223]">{salon.name}</h1>
              <Badge>{salon.category}</Badge>
            </div>
            <p className="text-[#6f503f]">{salon.description}</p>
            <div className="flex flex-wrap items-center gap-5 text-sm font-semibold text-[#6c4b39]">
              <span className="inline-flex items-center gap-1">
                <Star size={14} className="fill-[#b88b67] text-[#b88b67]" /> {salon.rating} ({salon.reviewCount} reviews)
              </span>
              <span>Location: {salon.location}</span>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card>
          <h2 className="mb-4 font-serif text-2xl text-[#553a2b]">Select Services</h2>
          <div className="space-y-3">
            {services.map((service) => (
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
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  selectedServices.includes(service.id)
                    ? "border-[#b88b67] bg-[#f5ece4]"
                    : "border-[#ebdfd4] bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#5b3f2f]">{service.name}</p>
                    <p className="text-sm text-[#7c5e4b]">{service.durationMins} mins</p>
                  </div>
                  <p className="font-semibold text-[#6c4c39]">Rs. {service.price}</p>
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 font-serif text-2xl text-[#553a2b]">Pick Slot</h2>
          <div className="space-y-4">
            {Object.entries(groupedSlots).slice(0, 3).map(([date, dateSlots]) => (
              <div key={date}>
                <p className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-[#6d4f3c]">
                  <CalendarDays size={14} /> {date}
                </p>
                <div className="flex flex-wrap gap-2">
                  {dateSlots.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setSelectedSlotId(slot.id)}
                      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                        selectedSlotId === slot.id
                          ? "border-[#b88b67] bg-[#f3e7dc] text-[#5b3d2c]"
                          : "border-[#e6d8cb] text-[#7a5c48]"
                      }`}
                    >
                      <Clock3 size={12} /> {slot.startTime}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-[#ebdfd4] bg-[#faf5ef] p-4 text-sm text-[#6f503f]">
            {selectedServices.length > 0 && selectedSlot ? (
              <>
                <p className="font-semibold text-[#563a2b]">Ready to continue</p>
                <p className="mt-1">{selectedServices.length} service(s), slot {selectedSlot.startTime}</p>
              </>
            ) : (
              <p>Select at least one service and one slot.</p>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              variant="secondary"
              disabled={!selectedServices.length || !selectedSlotId}
              onClick={() =>
                selectDraft({
                  salonId,
                  serviceIds: selectedServices,
                  slotId: selectedSlotId,
                })
              }
            >
              Add to Cart
            </Button>
            <Link href="/booking/confirm">
              <Button
                disabled={!selectedServices.length || !selectedSlotId}
                onClick={() =>
                  selectDraft({
                    salonId,
                    serviceIds: selectedServices,
                    slotId: selectedSlotId,
                  })
                }
              >
                Continue Booking
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="mb-4 font-serif text-2xl text-[#553a2b]">Ratings & Reviews</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {["Excellent consultation and detailing.", "Loved the ambience and smooth service.", "Stylists are very patient and skilled.", "Booking flow was incredibly easy."].map((review, idx) => (
            <div key={idx} className="rounded-2xl border border-[#ebdfd4] bg-[#fffdfb] p-4">
              <p className="text-sm text-[#705240]">{review}</p>
              <p className="mt-2 text-xs font-semibold text-[#8e6a54]">Customer {idx + 1}</p>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
