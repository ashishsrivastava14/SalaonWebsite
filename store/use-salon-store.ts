"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { bookingsSeed, salonsSeed, servicesSeed, slotsSeed, staffSeed, usersSeed } from "@/mock-data/data";
import { Booking, BookingDraft, BookingStatus, FilterState, Salon, Service, StaffMember, TimeSlot, User, UserRole } from "@/utils/types";

type PaymentResult = "success" | "failure";

interface AppState {
  role: UserRole;
  currentUserId: string;
  users: User[];
  salons: Salon[];
  services: Service[];
  staff: StaffMember[];
  slots: TimeSlot[];
  bookings: Booking[];
  cart: BookingDraft | null;
  filters: FilterState;
  paymentResult: PaymentResult | null;
  setRole: (role: UserRole) => void;
  setCurrentUserId: (userId: string) => void;
  updateFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  selectDraft: (draft: BookingDraft | null) => void;
  applyCoupon: (couponCode: string) => { discountPercent: number; isValid: boolean };
  finalizePayment: (shouldSucceed: boolean) => PaymentResult;
  createBookingFromDraft: () => Booking | null;
  markBookingStatus: (bookingId: string, status: BookingStatus) => void;
  rescheduleBooking: (bookingId: string, slotId: string) => void;
  addService: (service: Omit<Service, "id">) => void;
  updateService: (serviceId: string, updates: Partial<Service>) => void;
  deleteService: (serviceId: string) => void;
  addStaff: (staff: Omit<StaffMember, "id">) => void;
  updateStaff: (staffId: string, updates: Partial<StaffMember>) => void;
  deleteStaff: (staffId: string) => void;
  toggleSlotAvailability: (slotId: string) => void;
  toggleUserStatus: (userId: string) => void;
  toggleSalonStatus: (salonId: string) => void;
  approveSalon: (salonId: string, approved: boolean) => void;
  setCommission: (salonId: string, rate: number) => void;
}

const defaultFilters: FilterState = {
  category: "all",
  minPrice: 0,
  minRating: 0,
};

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

const coupons: Record<string, number> = {
  GLOW10: 10,
  FIRST20: 20,
  SPA15: 15,
};

export const useSalonStore = create<AppState>()(
  persist(
    (set, get) => ({
      role: "customer",
      currentUserId: "u-c1",
      users: usersSeed,
      salons: salonsSeed,
      services: servicesSeed,
      staff: staffSeed,
      slots: slotsSeed,
      bookings: bookingsSeed,
      cart: null,
      filters: defaultFilters,
      paymentResult: null,
      setRole: (role) => {
        const mappedUser = get().users.find((u) => u.role === role);
        set({ role, currentUserId: mappedUser?.id ?? get().currentUserId });
      },
      setCurrentUserId: (currentUserId) => set({ currentUserId }),
      updateFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
      resetFilters: () => set({ filters: defaultFilters }),
      selectDraft: (cart) => set({ cart }),
      applyCoupon: (couponCode) => {
        const normalized = couponCode.trim().toUpperCase();
        const discountPercent = coupons[normalized] ?? 0;
        return { discountPercent, isValid: discountPercent > 0 };
      },
      finalizePayment: (shouldSucceed) => {
        const paymentResult: PaymentResult = shouldSucceed ? "success" : "failure";
        set({ paymentResult });
        return paymentResult;
      },
      createBookingFromDraft: () => {
        const state = get();
        if (!state.cart) {
          return null;
        }

        const selectedServices = state.services.filter((service) => state.cart?.serviceIds.includes(service.id));
        const subtotal = selectedServices.reduce((sum, service) => sum + service.price, 0);
        const couponResult = state.cart.couponCode ? state.applyCoupon(state.cart.couponCode) : { discountPercent: 0, isValid: false };
        const discount = Math.round(subtotal * (couponResult.discountPercent / 100));
        const total = subtotal - discount;

        const booking: Booking = {
          id: generateId("bk"),
          customerId: state.currentUserId,
          salonId: state.cart.salonId,
          serviceIds: state.cart.serviceIds,
          slotId: state.cart.slotId,
          date: state.slots.find((slot) => slot.id === state.cart?.slotId)?.date ?? new Date().toISOString().slice(0, 10),
          subtotal,
          discount,
          total,
          couponCode: state.cart.couponCode,
          paymentStatus: "pending",
          status: "pending",
          createdAt: new Date().toISOString(),
        };

        set((prev) => ({
          bookings: [booking, ...prev.bookings],
          slots: prev.slots.map((slot) =>
            slot.id === prev.cart?.slotId ? { ...slot, isAvailable: false } : slot
          ),
        }));

        return booking;
      },
      markBookingStatus: (bookingId, status) =>
        set((state) => ({
          bookings: state.bookings.map((booking) =>
            booking.id === bookingId ? { ...booking, status } : booking
          ),
        })),
      rescheduleBooking: (bookingId, slotId) =>
        set((state) => {
          const currentBooking = state.bookings.find((booking) => booking.id === bookingId);
          if (!currentBooking) {
            return state;
          }

          return {
            bookings: state.bookings.map((booking) =>
              booking.id === bookingId
                ? {
                    ...booking,
                    slotId,
                    date: state.slots.find((slot) => slot.id === slotId)?.date ?? booking.date,
                    status: "confirmed",
                  }
                : booking
            ),
            slots: state.slots.map((slot) => {
              if (slot.id === currentBooking.slotId) {
                return { ...slot, isAvailable: true };
              }
              if (slot.id === slotId) {
                return { ...slot, isAvailable: false };
              }
              return slot;
            }),
          };
        }),
      addService: (service) =>
        set((state) => ({ services: [{ ...service, id: generateId("sv") }, ...state.services] })),
      updateService: (serviceId, updates) =>
        set((state) => ({
          services: state.services.map((service) =>
            service.id === serviceId ? { ...service, ...updates } : service
          ),
        })),
      deleteService: (serviceId) =>
        set((state) => ({ services: state.services.filter((service) => service.id !== serviceId) })),
      addStaff: (staff) =>
        set((state) => ({ staff: [{ ...staff, id: generateId("st") }, ...state.staff] })),
      updateStaff: (staffId, updates) =>
        set((state) => ({
          staff: state.staff.map((member) =>
            member.id === staffId ? { ...member, ...updates } : member
          ),
        })),
      deleteStaff: (staffId) =>
        set((state) => ({ staff: state.staff.filter((member) => member.id !== staffId) })),
      toggleSlotAvailability: (slotId) =>
        set((state) => ({
          slots: state.slots.map((slot) =>
            slot.id === slotId ? { ...slot, isAvailable: !slot.isAvailable } : slot
          ),
        })),
      toggleUserStatus: (userId) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === userId ? { ...user, isActive: !user.isActive } : user
          ),
        })),
      toggleSalonStatus: (salonId) =>
        set((state) => ({
          salons: state.salons.map((salon) =>
            salon.id === salonId ? { ...salon, isActive: !salon.isActive } : salon
          ),
        })),
      approveSalon: (salonId, approved) =>
        set((state) => ({
          salons: state.salons.map((salon) =>
            salon.id === salonId ? { ...salon, approved } : salon
          ),
        })),
      setCommission: (salonId, rate) =>
        set((state) => ({
          salons: state.salons.map((salon) =>
            salon.id === salonId ? { ...salon, commissionRate: rate } : salon
          ),
        })),
    }),
    {
      name: "salon-booking-storage",
      version: 3,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        role: state.role,
        currentUserId: state.currentUserId,
        users: state.users,
        salons: state.salons,
        services: state.services,
        staff: state.staff,
        slots: state.slots,
        bookings: state.bookings,
        cart: state.cart,
        filters: state.filters,
        paymentResult: state.paymentResult,
      }),
      migrate: () => ({
        users: usersSeed,
        salons: salonsSeed,
        services: servicesSeed,
        staff: staffSeed,
        slots: slotsSeed,
        bookings: bookingsSeed,
        role: "customer" as UserRole,
        currentUserId: "u-c1",
        cart: null,
        filters: defaultFilters,
        paymentResult: null,
      }),
    }
  )
);
