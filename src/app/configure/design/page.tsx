"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Rnd } from "react-rnd";

const resizeHandleStyle = "rounded-full bg-foreground";

export default function Page() {
  return (
    <div className="my-6 grid w-full grid-cols-3 gap-2">
      <div className="relative col-span-2 flex items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-zinc-300 bg-background">
        <div className="pointer-events-none relative w-48 select-none">
          <AspectRatio ratio={896 / 1831} className="z-50">
            <Image src="/phone-template.png" fill alt="phone template" />
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
            x: 0,
            y: 0,
            width: 1080 / 6,
            height: 1920 / 6,
          }}
        >
          <Image
            alt="img"
            className="pointer-events-none select-none"
            src="/testimonials/4.png"
            fill
          />
        </Rnd>
      </div>
      <div className="bg-blue-500">options</div>
    </div>
  );
}
