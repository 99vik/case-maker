import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Phone({
  className,
  imgSrc,
  backgroundColor,
  smallerRadius = false,
}: {
  className?: string;
  imgSrc: string;
  backgroundColor?: string;
  smallerRadius?: boolean;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none relative select-none overflow-hidden rounded-[34px]",
        className,
        smallerRadius && "rounded-[10px] md:rounded-[24px] lg:rounded-[30px]",
      )}
    >
      <img
        src={"/phone-template.png"}
        className="pointer-events-none z-50 select-none"
        alt="phone image"
      />
      {backgroundColor && (
        <div
          className={cn("absolute inset-[2px] -z-20", backgroundColor)}
        ></div>
      )}

      <div
        className={cn(
          "absolute inset-x-[1.5%] inset-y-[0.4%] -z-10 aspect-[890/1860] overflow-hidden rounded-[30px]",
          smallerRadius &&
            "rounded-[12px] sm:rounded-[20px] md:rounded-[24px] lg:rounded-[30px]",
        )}
      >
        <Image src={imgSrc} fill sizes="33vw" alt="custom phone image" />
      </div>
    </div>
  );
}
