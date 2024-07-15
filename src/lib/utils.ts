import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dataUrlToFile(dataUrl: string) {
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
