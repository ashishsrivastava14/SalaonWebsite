"use client";

import Link from "next/link";
import { ReactNode } from "react";
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
      <section className="mx-auto max-w-3xl px-4 py-12">
        <Card>
          <h1 className="font-serif text-3xl text-[#4f3526]">Access restricted</h1>
          <p className="mt-2 text-[#715241]">
            This dashboard is for {allow} role. Switch role in the top-right selector to continue.
          </p>
          <Link href="/" className="mt-4 inline-block">
            <Button variant="secondary">Back to Home</Button>
          </Link>
        </Card>
      </section>
    );
  }

  return <>{children}</>;
}
