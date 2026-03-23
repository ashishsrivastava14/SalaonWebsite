import { SalonDetailsModule } from "@/modules/customer/salon-details";

interface SalonDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function SalonDetailsPage({ params }: SalonDetailsPageProps) {
  const { id } = await params;
  return <SalonDetailsModule salonId={id} />;
}
