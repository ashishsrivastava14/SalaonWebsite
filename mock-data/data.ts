import { Booking, Salon, Service, StaffMember, TimeSlot, User } from "@/utils/types";

const today = new Date();
const formatDate = (offset: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
};

export const usersSeed: User[] = [
  { id: "u-c1", name: "Ananya Rao", email: "ananya@email.com", role: "customer", isActive: true },
  { id: "u-c2", name: "Nikhil Mehta", email: "nikhil@email.com", role: "customer", isActive: true },
  { id: "u-o1", name: "Rhea Kapoor", email: "owner@mirrors.com", role: "owner", isActive: true },
  { id: "u-o2", name: "Ishaan Patel", email: "owner@zenstrands.com", role: "owner", isActive: true },
  { id: "u-a1", name: "System Admin", email: "admin@salonbook.io", role: "admin", isActive: true },
];

export const salonsSeed: Salon[] = [
  {
    id: "s-1",
    name: "Mirror Muse Studio",
    ownerId: "u-o1",
    category: "Premium",
    location: "Bandra West, Mumbai",
    rating: 4.8,
    reviewCount: 210,
    avgPrice: 2400,
    coverImage:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=80",
    shortDescription: "Trend-forward cuts, color artistry, and polished styling.",
    description:
      "Mirror Muse blends fashion-forward design with classic salon excellence. From personalized hair consultations to high-performance treatments, every appointment is curated for your lifestyle.",
    approved: true,
    isActive: true,
    commissionRate: 12,
  },
  {
    id: "s-2",
    name: "Zen Strands Lounge",
    ownerId: "u-o2",
    category: "Luxury",
    location: "Indiranagar, Bengaluru",
    rating: 4.6,
    reviewCount: 156,
    avgPrice: 3200,
    coverImage:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=80",
    shortDescription: "Luxury rituals for hair, skin, and restorative spa sessions.",
    description:
      "Zen Strands is designed as a calm beauty sanctuary offering luxury hair transformations, premium facials, and precision grooming by specialist artists.",
    approved: true,
    isActive: true,
    commissionRate: 15,
  },
  {
    id: "s-3",
    name: "Urban Glow Salon",
    ownerId: "u-o1",
    category: "Budget",
    location: "Connaught Place, Delhi",
    rating: 4.2,
    reviewCount: 98,
    avgPrice: 1200,
    coverImage:
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1400&q=80",
    shortDescription: "Affordable style upgrades with reliable service quality.",
    description:
      "Urban Glow focuses on quick yet quality grooming and beauty services tailored to professionals with packed schedules.",
    approved: false,
    isActive: true,
    commissionRate: 10,
  },
];

export const servicesSeed: Service[] = [
  { id: "sv-1", salonId: "s-1", name: "Signature Haircut", category: "Hair", durationMins: 60, price: 1800, isActive: true },
  { id: "sv-2", salonId: "s-1", name: "Balayage Color", category: "Hair", durationMins: 150, price: 4500, isActive: true },
  { id: "sv-3", salonId: "s-1", name: "Keratin Smooth Therapy", category: "Hair", durationMins: 180, price: 6200, isActive: true },
  { id: "sv-4", salonId: "s-2", name: "Luxury Hair Spa", category: "Spa", durationMins: 90, price: 3200, isActive: true },
  { id: "sv-5", salonId: "s-2", name: "Bridal Makeup Trial", category: "Makeup", durationMins: 120, price: 5200, isActive: true },
  { id: "sv-6", salonId: "s-2", name: "Premium Gel Nails", category: "Nails", durationMins: 70, price: 2200, isActive: true },
  { id: "sv-7", salonId: "s-3", name: "Classic Haircut", category: "Hair", durationMins: 45, price: 800, isActive: true },
  { id: "sv-8", salonId: "s-3", name: "Quick Cleanup", category: "Spa", durationMins: 30, price: 500, isActive: true },
];

export const staffSeed: StaffMember[] = [
  { id: "st-1", salonId: "s-1", name: "Maya Fernandes", specialty: "Color Specialist", isActive: true },
  { id: "st-2", salonId: "s-1", name: "Aarav Shah", specialty: "Creative Haircuts", isActive: true },
  { id: "st-3", salonId: "s-2", name: "Kiara Nair", specialty: "Skin Rituals", isActive: true },
  { id: "st-4", salonId: "s-2", name: "Vihaan Sethi", specialty: "Bridal Makeup", isActive: true },
];

const defaultTimes = ["10:00", "11:30", "13:00", "15:00", "17:30", "19:00"];

export const slotsSeed: TimeSlot[] = ["s-1", "s-2", "s-3"].flatMap((salonId) =>
  [0, 1, 2, 3, 4].flatMap((offset) =>
    defaultTimes.map((startTime, idx) => ({
      id: `${salonId}-slot-${offset}-${idx}`,
      salonId,
      date: formatDate(offset),
      startTime,
      endTime: `${String(Number(startTime.split(":")[0]) + 1).padStart(2, "0")}:${startTime.split(":")[1]}`,
      isAvailable: Math.random() > 0.25,
    }))
  )
);

export const bookingsSeed: Booking[] = [
  {
    id: "bk-1",
    customerId: "u-c1",
    salonId: "s-1",
    serviceIds: ["sv-1"],
    slotId: "s-1-slot-1-2",
    date: formatDate(1),
    subtotal: 1800,
    discount: 180,
    total: 1620,
    couponCode: "GLOW10",
    paymentStatus: "paid",
    status: "confirmed",
    createdAt: new Date().toISOString(),
  },
  {
    id: "bk-2",
    customerId: "u-c1",
    salonId: "s-2",
    serviceIds: ["sv-4"],
    slotId: "s-2-slot-2-3",
    date: formatDate(-10),
    subtotal: 3200,
    discount: 0,
    total: 3200,
    paymentStatus: "paid",
    status: "completed",
    createdAt: new Date(Date.now() - 864000000).toISOString(),
  },
];
