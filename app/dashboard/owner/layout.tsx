import { RoleGate } from "@/components/layout/role-gate";

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  return <RoleGate allow="owner">{children}</RoleGate>;
}
