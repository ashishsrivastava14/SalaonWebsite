"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { useSalonStore } from "@/store/use-salon-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function LandingModule() {
  const salons = useSalonStore((state) => state.salons);
  const visibleSalons = useMemo(
    () => salons.filter((salon) => salon.approved && salon.isActive),
    [salons]
  );

  return (
    <div className="relative overflow-hidden">
      <section className="relative isolate min-h-[75vh] overflow-hidden rounded-b-[4rem] bg-[linear-gradient(110deg,#b8aea2_0%,#d7cdbf_45%,#efe5db_100%)] px-6 py-16 sm:px-10 lg:px-16">
        <div className="absolute -left-24 -top-16 h-80 w-80 rounded-full bg-[#ffffff36] blur-3xl" />
        <div className="absolute -bottom-20 right-4 h-96 w-96 rounded-full bg-[#9d6e4930] blur-3xl" />
        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="font-script text-3xl text-white/95">unique sense of style</p>
            <h1 className="max-w-xl font-serif text-5xl leading-tight text-white sm:text-6xl">
              Modern Hair Treatments, Beauty Rituals, and Seamless Booking
            </h1>
            <p className="max-w-lg text-base text-white/90 sm:text-lg">
              Discover premium salons, choose your stylist, and book your ideal time slot in seconds. Built to feel like a real product with end-to-end booking simulation.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/salons">
                <Button size="lg">Discover Salons</Button>
              </Link>
              <Link href="/dashboard/customer">
                <Button variant="secondary" size="lg">
                  Dashboard <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl rounded-[2.5rem] border border-white/30 bg-[#f6eee6]/30 p-4 backdrop-blur">
            <Image
              src={visibleSalons[0]?.coverImage ?? "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=80"}
              alt="Salon hero"
              width={960}
              height={720}
              className="h-[420px] w-full rounded-[2rem] object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-12 grid w-full max-w-6xl gap-4 px-6 pb-8 sm:grid-cols-3">
        {["Curated Salons", "Instant Booking", "Role Dashboards"].map((item) => (
          <Card key={item} className="flex items-center gap-3">
            <Sparkles className="text-[#b88b67]" size={18} />
            <p className="font-medium text-[#644633]">{item}</p>
          </Card>
        ))}
      </section>

      <section className="mx-auto w-full max-w-6xl space-y-5 px-6 py-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-3xl text-[#533726]">Trending Salons</h2>
          <Link href="/salons" className="text-sm font-semibold text-[#805a42] hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {visibleSalons.slice(0, 3).map((salon) => (
            <Card key={salon.id}>
              <Image
                src={salon.coverImage}
                alt={salon.name}
                width={640}
                height={360}
                className="mb-4 h-44 w-full rounded-2xl object-cover"
              />
              <h3 className="font-serif text-2xl text-[#513626]">{salon.name}</h3>
              <p className="text-sm text-[#735444]">{salon.location}</p>
              <p className="mt-3 text-sm text-[#6d4f3e]">{salon.shortDescription}</p>
              <div className="mt-4 flex items-center justify-between text-sm font-semibold text-[#6f4f3e]">
                <span className="inline-flex items-center gap-1">
                  <Star size={15} className="fill-[#b88b67] text-[#b88b67]" /> {salon.rating}
                </span>
                <span>From Rs. {salon.avgPrice}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
