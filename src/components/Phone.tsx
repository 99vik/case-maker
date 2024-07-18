import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Phone({
  className,
  dark = false,
  imgSrc,
  backgroundColor,
}: {
  className?: string;
  dark?: boolean;
  imgSrc: string;
  backgroundColor?: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none relative select-none overflow-hidden rounded-[34px]",
        className,
      )}
    >
      <img
        src={"/phone-template.png"}
        className="pointer-events-none z-50 select-none"
        alt="phone image"
      />
      {backgroundColor && (
        <div
          className={cn(
            "absolute inset-[2px] -z-20 rounded-[24px]",
            backgroundColor,
          )}
        ></div>
      )}

      <div className="absolute inset-x-[4px] inset-y-[2px] -z-10 overflow-hidden rounded-[32px]">
        <Image src={imgSrc} fill sizes="33vw" alt="custom phone image" />
      </div>
    </div>
  );
}
