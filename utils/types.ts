export type UserRole = "customer" | "owner" | "admin";

export type BookingStatus = "pending" | "confirmed" | "rejected" | "completed";

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Service {
  id: string;
  salonId: string;
  name: string;
  category: "Hair" | "Spa" | "Makeup" | "Nails";
  durationMins: number;
  price: number;
  isActive: boolean;
}

export interface StaffMember {
  id: string;
  salonId: string;
  name: string;
  specialty: string;
  isActive: boolean;
}

export interface TimeSlot {
  id: string;
  salonId: string;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Salon {
  id: string;
  name: string;
  ownerId: string;
  category: "Premium" | "Budget" | "Luxury";
  location: string;
  rating: number;
  reviewCount: number;
  avgPrice: number;
  coverImage: string;
  shortDescription: string;
  description: string;
  approved: boolean;
  isActive: boolean;
  commissionRate: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}

export interface Booking {
  id: string;
  customerId: string;
  salonId: string;
  serviceIds: string[];
  slotId: string;
  date: string;
  subtotal: number;
  discount: number;
  total: number;
  couponCode?: string;
  paymentStatus: "pending" | "paid" | "failed";
  status: BookingStatus;
  createdAt: string;
}

export interface FilterState {
  category: "all" | Salon["category"];
  minPrice: number;
  minRating: number;
}

export interface BookingDraft {
  salonId: string;
  serviceIds: string[];
  slotId: string;
  couponCode?: string;
}
