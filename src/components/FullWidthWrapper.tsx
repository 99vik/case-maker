import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function FullWidthWrapper({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-screen-xl sm:px-14 md:px-28",
        className,
      )}
    >
      {children}
    </div>
  );
}
