"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { Search, SlidersHorizontal, Star, MapPin } from "lucide-react";
import { useSalonStore } from "@/store/use-salon-store";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMockLoading } from "@/hooks/use-mock-loading";
import { Skeleton } from "@/components/ui/skeleton";

export function SalonListingModule() {
  const loading = useMockLoading(850);
  const salons = useSalonStore((state) => state.salons);
  const filters = useSalonStore((state) => state.filters);
  const updateFilters = useSalonStore((state) => state.updateFilters);
  const resetFilters = useSalonStore((state) => state.resetFilters);

  const filteredSalons = useMemo(() => {
    return salons.filter((salon) => {
      if (!salon.approved || !salon.isActive) {
        return false;
      }
      if (filters.category !== "all" && salon.category !== filters.category) {
        return false;
      }
      if (salon.avgPrice < filters.minPrice) {
        return false;
      }
      if (salon.rating < filters.minRating) {
        return false;
      }
      return true;
    });
  }, [filters, salons]);

  return (
    <section className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      {/* Filter bar */}
      <Card className="border-0 shadow-[var(--shadow-lg)]">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-light)]">
            <SlidersHorizontal size={16} className="text-[var(--accent)]" />
          </div>
          <div>
            <h1 className="font-serif text-2xl tracking-tight text-[var(--foreground)] sm:text-3xl">Find Your Perfect Salon</h1>
            <p className="text-xs text-[var(--muted)]">Filter by category, price, and rating</p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Category</label>
            <div className="relative">
              <Search className="absolute left-3 top-3.5 text-[var(--muted-light)]" size={16} />
              <Input
                className="pl-9"
                placeholder="Hair, Spa, Makeup..."
                onChange={(event) =>
                  updateFilters({
                    category:
                      event.target.value.toLowerCase().includes("lux")
                        ? "Luxury"
                        : event.target.value.toLowerCase().includes("bud")
                        ? "Budget"
                        : event.target.value.toLowerCase().includes("pre")
                        ? "Premium"
                        : "all",
                  })
                }
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Min Price</label>
            <Input
              type="number"
              value={filters.minPrice}
              onChange={(event) => updateFilters({ minPrice: Number(event.target.value) || 0 })}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Min Rating</label>
            <Input
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={filters.minRating}
              onChange={(event) => updateFilters({ minRating: Number(event.target.value) || 0 })}
            />
          </div>
          <div className="flex items-end">
            <Button variant="secondary" className="w-full" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Results count */}
      {!loading && (
        <p className="text-sm text-[var(--muted)]">
          Showing <span className="font-semibold text-[var(--foreground)]">{filteredSalons.length}</span> salon{filteredSalons.length !== 1 && "s"}
        </p>
      )}

      {/* Salon grid */}
      {loading ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="overflow-hidden p-0">
              <Skeleton className="h-48 w-full rounded-none" />
              <div className="p-5 space-y-3">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 stagger-children">
          {filteredSalons.map((salon) => (
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
                  <div className="absolute left-3 top-3">
                    <span className="inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-[var(--foreground)] shadow-sm backdrop-blur-sm">
                      {salon.category}
                    </span>
                  </div>
                  <div className="absolute right-3 top-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      <Star size={12} className="fill-white" /> {salon.rating}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl text-[var(--foreground)]">{salon.name}</h3>
                  <p className="mt-0.5 inline-flex items-center gap-1 text-sm text-[var(--muted)]">
                    <MapPin size={13} /> {salon.location}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{salon.shortDescription}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-[var(--border-light)] pt-3">
                    <p className="text-sm font-semibold text-[var(--foreground)]">From Rs. {salon.avgPrice}</p>
                    <span className="text-sm font-medium text-[var(--accent)] transition-colors group-hover:text-[var(--accent-hover)]">
                      Book now &rarr;
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
