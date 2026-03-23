"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { ShieldAlert } from "lucide-react";
import { useSalonStore } from "@/store/use-salon-store";
import { UserRole } from "@/utils/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RoleGateProps {
  allow: UserRole;
  children: ReactNode;
}

export function RoleGate({ allow, children }: RoleGateProps) {
  const role = useSalonStore((state) => state.role);

  if (role !== allow) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-md items-center px-4 py-12">
        <Card className="w-full text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-light)]">
            <ShieldAlert size={24} className="text-[var(--accent)]" />
          </div>
          <h1 className="font-serif text-2xl text-[var(--foreground)]">Access Restricted</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            This dashboard requires the <span className="font-semibold capitalize text-[var(--foreground)]">{allow}</span> role. Switch your role using the selector in the header.
          </p>
          <Link href="/" className="mt-6 inline-block">
            <Button variant="secondary">Back to Home</Button>
          </Link>
        </Card>
      </section>
    );
  }

  return <>{children}</>;
}
