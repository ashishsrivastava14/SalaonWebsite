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
  { id: "u-o3", name: "Priya Sharma", email: "owner@glamhaven.com", role: "owner", isActive: true },
  { id: "u-o4", name: "Arjun Reddy", email: "owner@crowncuts.com", role: "owner", isActive: true },
  { id: "u-o5", name: "Meera Joshi", email: "owner@velvettouch.com", role: "owner", isActive: true },
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
      "/images/salons/salon-1.jpg",
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
      "/images/salons/salon-2.jpg",
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
      "/images/salons/salon-3.jpg",
    shortDescription: "Affordable style upgrades with reliable service quality.",
    description:
      "Urban Glow focuses on quick yet quality grooming and beauty services tailored to professionals with packed schedules.",
    approved: false,
    isActive: true,
    commissionRate: 10,
  },
  {
    id: "s-4",
    name: "Glamour Haven",
    ownerId: "u-o3",
    category: "Luxury",
    location: "Jubilee Hills, Hyderabad",
    rating: 4.9,
    reviewCount: 320,
    avgPrice: 3800,
    coverImage:
      "/images/salons/salon-4.jpg",
    shortDescription: "Exclusive makeovers, bridal packages, and red-carpet styling.",
    description:
      "Glamour Haven is the ultimate destination for high-end beauty transformations. From celebrity-inspired makeovers to bespoke bridal packages, every visit is a VIP experience.",
    approved: true,
    isActive: true,
    commissionRate: 14,
  },
  {
    id: "s-5",
    name: "Crown & Cuts",
    ownerId: "u-o4",
    category: "Premium",
    location: "Koregaon Park, Pune",
    rating: 4.5,
    reviewCount: 175,
    avgPrice: 2000,
    coverImage:
      "/images/salons/salon-5.jpg",
    shortDescription: "Precision haircuts, beard grooming, and men's styling hub.",
    description:
      "Crown & Cuts delivers sharp, contemporary cuts tailored for the modern gentleman. Expert barbers combine traditional skill with trending styles.",
    approved: true,
    isActive: true,
    commissionRate: 11,
  },
  {
    id: "s-6",
    name: "Velvet Touch Spa & Salon",
    ownerId: "u-o5",
    category: "Luxury",
    location: "Park Street, Kolkata",
    rating: 4.7,
    reviewCount: 245,
    avgPrice: 3500,
    coverImage:
      "/images/salons/salon-6.jpg",
    shortDescription: "Holistic spa therapies blended with premium beauty services.",
    description:
      "Velvet Touch combines ancient Ayurvedic wellness with modern beauty science. Indulge in aromatherapy facials, deep-tissue massages, and organic hair treatments.",
    approved: true,
    isActive: true,
    commissionRate: 13,
  },
  {
    id: "s-7",
    name: "Bliss & Bloom Studio",
    ownerId: "u-o3",
    category: "Premium",
    location: "MG Road, Bengaluru",
    rating: 4.4,
    reviewCount: 132,
    avgPrice: 2200,
    coverImage:
      "/images/salons/salon-7.jpg",
    shortDescription: "Vibrant nail art, lash extensions, and beauty essentials.",
    description:
      "Bliss & Bloom is a trendy beauty studio specializing in intricate nail designs, lash extensions, brow sculpting, and express beauty services for the style-savvy.",
    approved: true,
    isActive: true,
    commissionRate: 12,
  },
  {
    id: "s-8",
    name: "The Style Bar",
    ownerId: "u-o4",
    category: "Budget",
    location: "Anna Nagar, Chennai",
    rating: 4.1,
    reviewCount: 88,
    avgPrice: 900,
    coverImage:
      "/images/salons/salon-8.jpg",
    shortDescription: "Quick, affordable grooming for everyday confidence.",
    description:
      "The Style Bar offers budget-friendly haircuts, facials, and grooming services without compromising on quality. Walk in, walk out looking your best.",
    approved: true,
    isActive: true,
    commissionRate: 9,
  },
  {
    id: "s-9",
    name: "Aura Hair Lounge",
    ownerId: "u-o5",
    category: "Premium",
    location: "Sector 17, Chandigarh",
    rating: 4.6,
    reviewCount: 198,
    avgPrice: 2600,
    coverImage:
      "/images/salons/salon-9.jpg",
    shortDescription: "Expert coloring, smoothening, and creative hair design.",
    description:
      "Aura Hair Lounge is led by award-winning colorists who specialize in dimensional color, smoothening treatments, and editorial-worthy hair transformations.",
    approved: true,
    isActive: true,
    commissionRate: 12,
  },
  {
    id: "s-10",
    name: "Radiance Beauty Bar",
    ownerId: "u-o3",
    category: "Luxury",
    location: "Vastrapur, Ahmedabad",
    rating: 4.8,
    reviewCount: 275,
    avgPrice: 3600,
    coverImage:
      "/images/salons/salon-10.jpg",
    shortDescription: "Signature facials, luxury mani-pedis, and skin rejuvenation.",
    description:
      "Radiance Beauty Bar delivers a pampering experience with premium skincare rituals, luxury nail services, and advanced anti-aging treatments curated by dermatologists.",
    approved: true,
    isActive: true,
    commissionRate: 15,
  },
  {
    id: "s-11",
    name: "Snip & Style Express",
    ownerId: "u-o4",
    category: "Budget",
    location: "Laxmi Nagar, Delhi",
    rating: 4.0,
    reviewCount: 65,
    avgPrice: 700,
    coverImage:
      "/images/salons/salon-11.jpg",
    shortDescription: "No-frills, fast haircuts and basic grooming at pocket-friendly prices.",
    description:
      "Snip & Style Express is the go-to for students and professionals who want a clean, sharp look without spending big. Quick turnaround, solid results.",
    approved: true,
    isActive: true,
    commissionRate: 8,
  },
  {
    id: "s-12",
    name: "Enchanted Tresses",
    ownerId: "u-o5",
    category: "Premium",
    location: "Viman Nagar, Pune",
    rating: 4.5,
    reviewCount: 142,
    avgPrice: 2800,
    coverImage:
      "/images/salons/salon-12.jpg",
    shortDescription: "Hair extensions, volumizing treatments, and textured styling.",
    description:
      "Enchanted Tresses specializes in luxury hair extensions, tape-ins, and volumizing services. Whether you want length, volume, or a total transformation, this is your studio.",
    approved: true,
    isActive: true,
    commissionRate: 13,
  },
  {
    id: "s-13",
    name: "Ivory & Rose Salon",
    ownerId: "u-o3",
    category: "Luxury",
    location: "Civil Lines, Jaipur",
    rating: 4.7,
    reviewCount: 230,
    avgPrice: 3400,
    coverImage:
      "/images/salons/salon-13.jpg",
    shortDescription: "Bridal couture styling, henna artistry, and traditional beauty.",
    description:
      "Ivory & Rose blends Rajasthani heritage beauty traditions with contemporary glam. Renowned for bridal styling, intricate henna designs, and ethnic makeup artistry.",
    approved: true,
    isActive: true,
    commissionRate: 14,
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
  // Glamour Haven (s-4)
  { id: "sv-9", salonId: "s-4", name: "Red Carpet Blowout", category: "Hair", durationMins: 90, price: 3500, isActive: true },
  { id: "sv-10", salonId: "s-4", name: "Bridal Makeup Package", category: "Makeup", durationMins: 180, price: 8500, isActive: true },
  { id: "sv-11", salonId: "s-4", name: "Luxury Facial Ritual", category: "Spa", durationMins: 75, price: 3200, isActive: true },
  // Crown & Cuts (s-5)
  { id: "sv-12", salonId: "s-5", name: "Gentleman's Cut", category: "Hair", durationMins: 45, price: 1500, isActive: true },
  { id: "sv-13", salonId: "s-5", name: "Beard Sculpting", category: "Hair", durationMins: 30, price: 800, isActive: true },
  { id: "sv-14", salonId: "s-5", name: "Hot Towel Shave", category: "Spa", durationMins: 40, price: 1200, isActive: true },
  // Velvet Touch Spa & Salon (s-6)
  { id: "sv-15", salonId: "s-6", name: "Aromatherapy Facial", category: "Spa", durationMins: 90, price: 3800, isActive: true },
  { id: "sv-16", salonId: "s-6", name: "Deep Tissue Massage", category: "Spa", durationMins: 120, price: 4500, isActive: true },
  { id: "sv-17", salonId: "s-6", name: "Organic Hair Treatment", category: "Hair", durationMins: 100, price: 3000, isActive: true },
  // Bliss & Bloom Studio (s-7)
  { id: "sv-18", salonId: "s-7", name: "Gel Nail Art", category: "Nails", durationMins: 60, price: 1800, isActive: true },
  { id: "sv-19", salonId: "s-7", name: "Lash Extensions", category: "Makeup", durationMins: 90, price: 2500, isActive: true },
  { id: "sv-20", salonId: "s-7", name: "Brow Sculpting", category: "Makeup", durationMins: 30, price: 1200, isActive: true },
  // The Style Bar (s-8)
  { id: "sv-21", salonId: "s-8", name: "Express Haircut", category: "Hair", durationMins: 30, price: 500, isActive: true },
  { id: "sv-22", salonId: "s-8", name: "Basic Facial", category: "Spa", durationMins: 40, price: 700, isActive: true },
  { id: "sv-23", salonId: "s-8", name: "Hair Wash & Style", category: "Hair", durationMins: 25, price: 400, isActive: true },
  // Aura Hair Lounge (s-9)
  { id: "sv-24", salonId: "s-9", name: "Dimensional Color", category: "Hair", durationMins: 150, price: 5000, isActive: true },
  { id: "sv-25", salonId: "s-9", name: "Smoothening Treatment", category: "Hair", durationMins: 180, price: 5500, isActive: true },
  { id: "sv-26", salonId: "s-9", name: "Creative Cut & Style", category: "Hair", durationMins: 60, price: 2000, isActive: true },
  // Radiance Beauty Bar (s-10)
  { id: "sv-27", salonId: "s-10", name: "Signature Facial", category: "Spa", durationMins: 90, price: 4000, isActive: true },
  { id: "sv-28", salonId: "s-10", name: "Luxury Mani-Pedi", category: "Nails", durationMins: 80, price: 2800, isActive: true },
  { id: "sv-29", salonId: "s-10", name: "Anti-Aging Skin Therapy", category: "Spa", durationMins: 120, price: 5500, isActive: true },
  // Snip & Style Express (s-11)
  { id: "sv-30", salonId: "s-11", name: "Quick Trim", category: "Hair", durationMins: 20, price: 350, isActive: true },
  { id: "sv-31", salonId: "s-11", name: "Student Haircut", category: "Hair", durationMins: 25, price: 250, isActive: true },
  { id: "sv-32", salonId: "s-11", name: "Basic Shave", category: "Hair", durationMins: 15, price: 150, isActive: true },
  // Enchanted Tresses (s-12)
  { id: "sv-33", salonId: "s-12", name: "Tape-In Extensions", category: "Hair", durationMins: 120, price: 6000, isActive: true },
  { id: "sv-34", salonId: "s-12", name: "Volumizing Blowout", category: "Hair", durationMins: 60, price: 2200, isActive: true },
  { id: "sv-35", salonId: "s-12", name: "Textured Waves Style", category: "Hair", durationMins: 50, price: 1800, isActive: true },
  // Ivory & Rose Salon (s-13)
  { id: "sv-36", salonId: "s-13", name: "Bridal Couture Styling", category: "Hair", durationMins: 180, price: 7500, isActive: true },
  { id: "sv-37", salonId: "s-13", name: "Henna Art Session", category: "Makeup", durationMins: 120, price: 3500, isActive: true },
  { id: "sv-38", salonId: "s-13", name: "Ethnic Makeup Look", category: "Makeup", durationMins: 90, price: 4000, isActive: true },
];

export const staffSeed: StaffMember[] = [
  { id: "st-1", salonId: "s-1", name: "Maya Fernandes", specialty: "Color Specialist", isActive: true },
  { id: "st-2", salonId: "s-1", name: "Aarav Shah", specialty: "Creative Haircuts", isActive: true },
  { id: "st-3", salonId: "s-2", name: "Kiara Nair", specialty: "Skin Rituals", isActive: true },
  { id: "st-4", salonId: "s-2", name: "Vihaan Sethi", specialty: "Bridal Makeup", isActive: true },
  { id: "st-5", salonId: "s-4", name: "Divya Menon", specialty: "Bridal Specialist", isActive: true },
  { id: "st-6", salonId: "s-4", name: "Rohit Saxena", specialty: "Celebrity Stylist", isActive: true },
  { id: "st-7", salonId: "s-5", name: "Sameer Khan", specialty: "Men's Grooming", isActive: true },
  { id: "st-8", salonId: "s-6", name: "Lakshmi Iyer", specialty: "Ayurvedic Therapist", isActive: true },
  { id: "st-9", salonId: "s-7", name: "Sneha Kulkarni", specialty: "Nail Artist", isActive: true },
  { id: "st-10", salonId: "s-8", name: "Deepak Verma", specialty: "Quick Styling", isActive: true },
  { id: "st-11", salonId: "s-9", name: "Tanvi Bhatia", specialty: "Color Expert", isActive: true },
  { id: "st-12", salonId: "s-10", name: "Neha Gupta", specialty: "Skincare Specialist", isActive: true },
  { id: "st-13", salonId: "s-11", name: "Ravi Tiwari", specialty: "Express Cuts", isActive: true },
  { id: "st-14", salonId: "s-12", name: "Pooja Deshmukh", specialty: "Extensions Expert", isActive: true },
  { id: "st-15", salonId: "s-13", name: "Ankita Rathore", specialty: "Henna & Bridal Art", isActive: true },
];

const defaultTimes = ["10:00", "11:30", "13:00", "15:00", "17:30", "19:00"];

export const slotsSeed: TimeSlot[] = ["s-1", "s-2", "s-3", "s-4", "s-5", "s-6", "s-7", "s-8", "s-9", "s-10", "s-11", "s-12", "s-13"].flatMap((salonId) =>
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
