"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import ImageComponent from "next/image";
import { useRef, useState } from "react";
import { Rnd } from "react-rnd";

import { cn, dataUrlToFile } from "@/lib/utils";
import { CASE_TYPE, COLORS, FINISH, MODELS } from "@/lib/configuration-options";
import { Check, ChevronDown } from "lucide-react";

const resizeHandleStyle = "rounded-full bg-foreground";

export default function DesignConfigurator({
  img,
}: {
  img: {
    aspect: number;
    src: string;
  };
}) {
  const designContainer = useRef<HTMLDivElement | null>(null);
  const phoneContainer = useRef<HTMLDivElement | null>(null);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [selectedCaseType, setSelectedCaseType] = useState(CASE_TYPE[0]);
  const [selectedFinish, setSelectedFinish] = useState(FINISH[0]);

  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 230,
    height: 230 / img.aspect,
  });
  const [imagePosition, setImagePosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 235,
    y: (445 - 230 / img.aspect) / 2,
  });

  async function saveConfiguration() {
    const canvas = document.createElement("canvas");
    canvas.height = phoneContainer.current!.clientHeight;
    canvas.width = phoneContainer.current!.clientWidth;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = img.src;

    const sourceX =
      imagePosition.x -
      (phoneContainer.current!.getBoundingClientRect().left -
        designContainer.current!.getBoundingClientRect().left);
    const sourceY =
      imagePosition.y -
      (phoneContainer.current!.getBoundingClientRect().top -
        designContainer.current!.getBoundingClientRect().top);

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
          <div
            className={cn(
              "absolute inset-[2px] z-0 rounded-[24px]",
              selectedColor.twClass,
            )}
          ></div>
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
            y: (445 - 230 / img.aspect) / 2,
            width: 230,
            height: 230 / img.aspect,
          }}
        >
          <ImageComponent
            priority
            alt="img"
            className="pointer-events-none select-none"
            src={img.src}
            sizes="50vw"
            fill
          />
        </Rnd>
      </div>
      <ScrollArea className="h-[calc(100vh-56.8px-80px-68px-48px)] rounded-xl border bg-background py-2">
        <div className="space-y-4 px-4">
          <h2 className="border-b py-2 text-2xl font-semibold leading-tight">
            Customize your case
          </h2>

          <div className="space-y-2">
            <p className="text-sm font-semibold">
              Color: {selectedColor.label}
            </p>
            <RadioGroup
              onValueChange={(value) => {
                const color = COLORS.find((color) => color.value === value);
                setSelectedColor(color!);
              }}
              defaultValue={selectedColor.value}
            >
              <div className="flex items-center space-x-3">
                {COLORS.map((color) => (
                  <RadioGroupItem
                    key={color.value}
                    value={color.value}
                    className={color.twClass}
                  />
                ))}
              </div>
            </RadioGroup>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex w-full items-center justify-between rounded-lg border px-6 py-2 text-sm">
                {selectedModel.label}
                <ChevronDown className="text-muted-foreground" size={18} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-full">
                {MODELS.map((model) => {
                  return (
                    <DropdownMenuItem
                      className="flex items-center gap-2"
                      onSelect={() => setSelectedModel(model)}
                      key={model.value}
                    >
                      <Check
                        size={16}
                        className={selectedModel === model ? "" : "opacity-0"}
                      />
                      {model.label}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-semibold">Case type: </p>
            {CASE_TYPE.map((type) => {
              return (
                <button
                  onClick={() => setSelectedCaseType(type)}
                  key={type.value}
                  className={cn(
                    "flex w-full items-start justify-between rounded-lg border bg-secondary px-8 py-2 text-left tracking-wide transition",
                    selectedCaseType === type && "border-primary",
                  )}
                >
                  <div>
                    <p className="text-base">{type.label}</p>
                    <p className="opacity-70">{type.description}</p>
                  </div>
                  <p className="mt-px">${type.price.toFixed(2)}</p>
                </button>
              );
            })}
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-sm font-semibold">Finish: </p>
            {FINISH.map((finish) => {
              return (
                <button
                  onClick={() => setSelectedFinish(finish)}
                  key={finish.value}
                  className={cn(
                    "flex w-full items-start justify-between rounded-lg border bg-secondary px-8 py-2 text-left tracking-wide transition",
                    selectedFinish === finish && "border-primary",
                  )}
                >
                  <div>
                    <p className="text-base">{finish.label}</p>
                  </div>
                  <p className="mt-px">${finish.price.toFixed(2)}</p>
                </button>
              );
            })}
          </div>
          <Button className="w-full" onClick={() => saveConfiguration()}>
            Continue
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
}
