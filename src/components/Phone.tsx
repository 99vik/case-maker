import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Phone({
  className,
  dark = false,
  imgSrc,
}: {
  className?: string;
  dark?: boolean;
  imgSrc: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none relative select-none overflow-hidden",
        className,
      )}
    >
      <img
        src={
          dark
            ? "/phone-template-dark-edges.png"
            : "/phone-template-white-edges.png"
        }
        className="pointer-events-none z-50 select-none"
        alt="phone image"
      />
      <div className="absolute inset-[1px] -z-10">
        <Image src={imgSrc} fill sizes="33vw" alt="custom phone image" />
      </div>
    </div>
  );
}
