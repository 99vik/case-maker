import { cn } from "@/lib/utils";

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
      <div className="absolute inset-0 -z-10">
        <img src={imgSrc} alt="overlaying phone image" />
      </div>
    </div>
  );
}
