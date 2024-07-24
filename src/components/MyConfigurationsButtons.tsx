"use client";

import { Pencil, ShoppingCart } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { getUserConfigurations } from "@/db/queries";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function MyConfigurationsButtons({
  configuration,
}: {
  configuration: Awaited<ReturnType<typeof getUserConfigurations>>[0];
}) {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();
  return (
    <div className="grid gap-2 md:grid-cols-2 md:gap-4 lg:gap-8">
      <Link
        className={cn(
          buttonVariants({ variant: "outline", className: "gap-1 md:gap-2" }),
        )}
        href={`/configure/design?id=${configuration.id}`}
      >
        <Pencil size={18} />
        Modify design
      </Link>

      <Link
        className={cn(buttonVariants({ className: "gap-1 md:gap-2" }))}
        href={`/configure/review?id=${configuration.id}`}
      >
        <ShoppingCart size={18} />
        Review and order
      </Link>
    </div>
  );
}
