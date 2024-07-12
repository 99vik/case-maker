"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";

const resizeHandleStyle = "rounded-full bg-foreground";
const mockImg = {
  width: 1080,
  height: 1920,
  src: "/testimonials/4.png",
};

const aspect = 1080 / 1920;

export default function Page() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [sectionWidth, setSectionWidth] = useState<number | null>(null);

  useEffect(() => {
    setSectionWidth(ref.current!.offsetWidth);
    // console.log(ref.current!.offsetWidth);
  }, []);

  return (
    <div className="my-6 grid w-full grid-cols-3 gap-2">
      <div
        ref={ref}
        className="relative col-span-2 flex items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-zinc-300 bg-background"
      >
        <div className="pointer-events-none relative w-48 select-none">
          <AspectRatio ratio={896 / 1831} className="z-50">
            <Image
              src="/phone-template.png"
              sizes="33vw"
              fill
              alt="phone template"
            />
          </AspectRatio>
          <div className="absolute inset-[2px] z-0 rounded-[24px] bg-zinc-900"></div>
          <div className="absolute inset-[2px] z-10 rounded-[24px] shadow-[0_0_0_9999px_rgba(255,255,255,0.6)]"></div>
        </div>
        <Rnd
          lockAspectRatio
          resizeHandleClasses={{
            bottomLeft: resizeHandleStyle,
            bottomRight: resizeHandleStyle,
            topLeft: resizeHandleStyle,
            topRight: resizeHandleStyle,
          }}
          className="border-2 border-dashed border-primary"
          default={{
            x: 235,
            y: (445 - 230 / aspect) / 2,
            width: 230,
            height: 230 / aspect,
          }}
        >
          <Image
            priority
            alt="img"
            className="pointer-events-none select-none"
            src={mockImg.src}
            sizes="50vw"
            fill
          />
        </Rnd>
      </div>
      <div className="bg-blue-500">options</div>
    </div>
  );
}
