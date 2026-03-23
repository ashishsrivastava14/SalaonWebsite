"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { Search, SlidersHorizontal, Star } from "lucide-react";
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
    <section className="mx-auto w-full max-w-7xl space-y-5 px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-[#e7d8cb] bg-white/95 p-5">
        <div className="mb-4 flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-[#8b654d]" />
          <h1 className="font-serif text-3xl text-[#523626]">Find Your Perfect Salon</h1>
        </div>
        <div className="grid gap-3 md:grid-cols-5">
          <div className="md:col-span-2">
            <label className="mb-1 block text-xs font-semibold text-[#7b5a45]">Search Category</label>
            <div className="relative">
              <Search className="absolute left-3 top-3.5 text-[#a08877]" size={16} />
              <Input
                className="pl-9"
                placeholder="Hair, Spa, Makeup"
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
            <label className="mb-1 block text-xs font-semibold text-[#7b5a45]">Min Price</label>
            <Input
              type="number"
              value={filters.minPrice}
              onChange={(event) => updateFilters({ minPrice: Number(event.target.value) || 0 })}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#7b5a45]">Min Rating</label>
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
              Reset
            </Button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index}>
              <Skeleton className="h-44 w-full" />
              <Skeleton className="mt-4 h-7 w-2/3" />
              <Skeleton className="mt-2 h-4 w-1/2" />
              <Skeleton className="mt-3 h-4 w-full" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredSalons.map((salon) => (
            <Card key={salon.id} className="group">
              <Image
                src={salon.coverImage}
                alt={salon.name}
                width={640}
                height={360}
                className="h-44 w-full rounded-2xl object-cover"
              />
              <div className="mt-4 flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-serif text-2xl text-[#533726]">{salon.name}</h3>
                  <p className="text-sm text-[#755645]">{salon.location}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#5a3d2c]">
                  <Star size={14} className="fill-[#b88b67] text-[#b88b67]" /> {salon.rating}
                </span>
              </div>
              <p className="mt-3 text-sm text-[#6e4e3d]">{salon.shortDescription}</p>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-[#6a4a38]">Starts at Rs. {salon.avgPrice}</p>
                <Link href={`/salons/${salon.id}`}>
                  <Button size="sm">Book now</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
