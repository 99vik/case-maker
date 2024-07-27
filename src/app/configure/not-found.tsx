import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FrownIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3">
      <FrownIcon size={40} className="text-primary" />
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Oops, page not found!
      </h1>
      <p className="text-muted-foreground">
        The configuration you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/configure/upload" className={cn(buttonVariants())}>
        Return
      </Link>
    </div>
  );
}
