import { cn } from "@/lib/utils";
import { ReactNode, forwardRef, ForwardedRef } from "react";

interface FullWidthWrapperProps {
  className?: string;
  children: ReactNode;
}

const FullWidthWrapper = forwardRef(
  (
    { className, children }: FullWidthWrapperProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full max-w-screen-xl px-4 sm:px-14 md:px-28",
          className,
        )}
      >
        {children}
      </div>
    );
  },
);

FullWidthWrapper.displayName = "FullWidthWrapper";

export default FullWidthWrapper;
