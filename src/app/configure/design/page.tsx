"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import ImageComponent from "next/image";
import { useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";

const resizeHandleStyle = "rounded-full bg-foreground";
const mockImg = {
  width: 1080,
  height: 1920,
  src: "/testimonials/4.png",
};

const aspect = mockImg.width / mockImg.height;

export default function Page() {
  const designContainer = useRef<HTMLDivElement | null>(null);
  const phoneContainer = useRef<HTMLDivElement | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 230,
    height: 230 / aspect,
  });
  const [imagePosition, setImagePosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 235,
    y: (445 - 230 / aspect) / 2,
  });

  useEffect(() => {
    // console.log(designContainer.current!.getBoundingClientRect().left);
    // console.log(phoneContainer.current!.getBoundingClientRect().left);
  }, []);

  async function saveConfiguration() {
    const canvas = document.createElement("canvas");
    canvas.height = phoneContainer.current!.clientHeight;
    canvas.width = phoneContainer.current!.clientWidth;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = mockImg.src;

    const sourceX =
      imagePosition.x -
      (phoneContainer.current!.getBoundingClientRect().left -
        designContainer.current!.getBoundingClientRect().left);
    const sourceY =
      imagePosition.y -
      (phoneContainer.current!.getBoundingClientRect().top -
        designContainer.current!.getBoundingClientRect().top);

    // console.log(imageDimensions);
    image.onload = () => {
      ctx!.drawImage(
        image,
        sourceX,
        sourceY,
        imageDimensions.width,
        imageDimensions.height,
      );
      console.log(canvas.toDataURL());
    };
  }

  return (
    <div className="my-6 grid w-full grid-cols-3 gap-2">
      <div
        ref={designContainer}
        className="relative col-span-2 flex items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-zinc-300 bg-background"
      >
        <div
          ref={phoneContainer}
          className="pointer-events-none relative w-48 select-none"
        >
          <AspectRatio ratio={896 / 1831} className="z-50">
            <ImageComponent
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
          onResizeStop={(_, __, ref, ___, position) => {
            setImageDimensions({
              width: ref.clientWidth,
              height: ref.clientHeight,
            });
            setImagePosition({
              x: position.x,
              y: position.y,
            });
            // console.log(position);
          }}
          onDragStop={(_, data) =>
            setImagePosition({
              x: data.x,
              y: data.y,
            })
          }
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
          <ImageComponent
            priority
            alt="img"
            className="pointer-events-none select-none"
            src={mockImg.src}
            sizes="50vw"
            fill
          />
        </Rnd>
      </div>
      <div className="rounded-xl border bg-background">
        <Button onClick={() => saveConfiguration()}>Continue</Button>
      </div>
    </div>
  );
}
