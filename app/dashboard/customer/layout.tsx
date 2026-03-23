import { RoleGate } from "@/components/layout/role-gate";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return <RoleGate allow="customer">{children}</RoleGate>;
}
