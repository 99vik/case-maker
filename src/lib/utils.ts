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

export function isValidUUID(uuid: string) {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}
