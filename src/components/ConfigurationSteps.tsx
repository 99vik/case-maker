"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const STEPS = [
  {
    title: "Step 1: Upload image",
    description: "Choose and upload your image.",
    url: "/upload",
  },
  {
    title: "Step 2: Design case",
    description: "Design and customize your case.",
    url: "/design",
  },
  {
    title: "Step 3: Summary",
    description: "Review your case.",
    url: "/review",
  },
];

export default function ConfigurationSteps() {
  const pathname = usePathname();
  const currentIndex = STEPS.findIndex((step) => pathname.includes(step.url));

  return (
    <div className="grid border-l border-r bg-background md:grid-cols-3">
      {STEPS.map((step, index) => (
        <div key={step.title} className="relative">
          <div className="border-b px-8 py-4 text-sm md:border-b-0">
            <p
              className={cn(
                currentIndex == index && "text-primary",
                currentIndex > index && "text-green-600",
              )}
            >
              {step.title}
            </p>
            <p className="text-xs text-muted-foreground">{step.description}</p>
          </div>
          {index != 2 && (
            <svg
              className="absolute right-0 top-0 hidden h-full translate-x-[100%] text-muted-foreground/40 md:block"
              viewBox="0 0 12 82"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0.5 0V31L10.5 41L0.5 51V82"
                stroke="currentcolor"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          )}
          <div
            className={cn(
              "absolute bottom-0 h-full w-1 bg-muted-foreground/40 md:h-1 md:w-full",
              currentIndex == index && "bg-primary",
              currentIndex > index && "bg-green-600",
            )}
          />
        </div>
      ))}
    </div>
  );
}
