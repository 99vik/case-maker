"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

function dataUrlToFile(dataUrl: string) {
  const blobData = atob(dataUrl.split(",")[1]);
  const arrayBuffer = new ArrayBuffer(blobData.length);
  const uintArray = new Uint8Array(arrayBuffer);
  for (let i = 0; i < blobData.length; i++) {
    uintArray[i] = blobData.charCodeAt(i);
  }

  const blob = new Blob([arrayBuffer], { type: "image/png" });

  const file = new File([blob], "cropped_image.png", { type: blob.type });
  return file;
}

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

      const dataUrl = canvas.toDataURL("image/png");
      console.log(dataUrl);
      const file = dataUrlToFile(dataUrl);
      console.log(file);
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
      <div className="space-y-3 rounded-xl border bg-background p-4">
        <h2 className="text-2xl font-semibold leading-tight">
          Customize your case
        </h2>
        <div className="h-[1px] w-full bg-muted-foreground/20" />
        <div className="space-y-2">
          <p className="text-sm font-semibold">Color: </p>
          <RadioGroup defaultValue="comfortable">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="black" id="r1" className="bg-zinc-800" />
              <RadioGroupItem value="red" id="r2" className="bg-red-800" />
              <RadioGroupItem value="blue" id="r3" className="bg-blue-900" />
              <RadioGroupItem value="green" id="r3" className="bg-green-800" />
            </div>
          </RadioGroup>
        </div>
        <Button onClick={() => saveConfiguration()}>Continue</Button>
      </div>
    </div>
  );
}
