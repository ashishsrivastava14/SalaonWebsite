"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { ArrowRight, Sparkles, Star, CalendarCheck, LayoutDashboard } from "lucide-react";
import { useSalonStore } from "@/store/use-salon-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Sparkles, title: "Curated Salons", desc: "Handpicked premium experiences" },
  { icon: CalendarCheck, title: "Instant Booking", desc: "Book in under 30 seconds" },
  { icon: LayoutDashboard, title: "Role Dashboards", desc: "Customer, owner & admin views" },
];

export function LandingModule() {
  const salons = useSalonStore((state) => state.salons);
  const visibleSalons = useMemo(
    () => salons.filter((salon) => salon.approved && salon.isActive),
    [salons]
  );

  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative isolate min-h-[80vh] overflow-hidden bg-gradient-to-br from-[#a89080] via-[#c9b9a8] to-[#e8ddd0] px-6 py-20 sm:px-10 lg:px-16">
        <div className="absolute -left-32 -top-24 h-[500px] w-[500px] rounded-full bg-white/15 blur-[100px]" />
        <div className="absolute -bottom-24 right-0 h-[400px] w-[400px] rounded-full bg-[#9d6e49]/15 blur-[100px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8 animate-fade-up">
            <p className="font-script text-3xl text-white/90">unique sense of style</p>
            <h1 className="max-w-xl font-serif text-5xl leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Modern Hair&nbsp;Treatments, Beauty&nbsp;Rituals
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
              Discover premium salons, choose your stylist, and book your ideal time slot in seconds. A seamless end-to-end booking experience.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/salons">
                <Button size="lg" className="text-base">Discover Salons</Button>
              </Link>
              <Link href="/dashboard/customer">
                <Button variant="secondary" size="lg" className="text-base border-white/30 bg-white/15 text-white backdrop-blur hover:bg-white/25 hover:text-white hover:border-white/40">
                  Dashboard <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl animate-fade-up" style={{ animationDelay: "200ms" }}>
            <div className="absolute -inset-4 rounded-[2.5rem] bg-white/10 blur-2xl" />
            <div className="relative rounded-[2rem] border border-white/20 bg-white/10 p-3 backdrop-blur-sm shadow-[var(--shadow-xl)]">
              <Image
                src={visibleSalons[0]?.coverImage ?? "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=80"}
                alt="Salon hero"
                width={960}
                height={720}
                className="h-[400px] w-full rounded-[1.5rem] object-cover lg:h-[460px]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="mx-auto -mt-10 grid w-full max-w-5xl gap-4 px-6 pb-6 sm:grid-cols-3 stagger-children">
        {features.map((item) => (
          <Card key={item.title} className="flex items-center gap-4 border-0 shadow-[var(--shadow-lg)]">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[#a07050] text-white shadow-sm">
              <item.icon size={18} />
            </div>
            <div>
              <p className="font-semibold text-[var(--foreground)]">{item.title}</p>
              <p className="text-xs text-[var(--muted)]">{item.desc}</p>
            </div>
          </Card>
        ))}
      </section>

      {/* Trending salons */}
      <section className="mx-auto w-full max-w-6xl space-y-6 px-6 py-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">Popular Now</p>
            <h2 className="font-serif text-3xl tracking-tight text-[var(--foreground)] sm:text-4xl">Trending Salons</h2>
          </div>
          <Link href="/salons" className="text-sm font-semibold text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]">
            View all &rarr;
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
          {visibleSalons.slice(0, 6).map((salon) => (
            <Link key={salon.id} href={`/salons/${salon.id}`} className="group">
              <Card className="overflow-hidden p-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-xl)]">
                <div className="relative overflow-hidden">
                  <Image
                    src={salon.coverImage}
                    alt={salon.name}
                    width={640}
                    height={360}
                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute right-3 top-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      <Star size={12} className="fill-white" /> {salon.rating}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl text-[var(--foreground)]">{salon.name}</h3>
                  <p className="mt-0.5 text-sm text-[var(--muted)]">{salon.location}</p>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--muted)]">{salon.shortDescription}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-[var(--border-light)] pt-3 text-sm">
                    <span className="font-semibold text-[var(--foreground)]">From Rs. {salon.avgPrice}</span>
                    <span className="font-medium text-[var(--accent)] transition-colors group-hover:text-[var(--accent-hover)]">
                      Book now &rarr;
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
