"use client";

import { Image as ImageIcon } from "lucide-react";
import Dropzone from "react-dropzone";

export default function Page() {
  return (
    <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
      {({ getRootProps, getInputProps }) => (
        <div
          className="my-8 flex flex-1 items-center justify-center rounded-3xl border-2 border-dashed border-zinc-300 bg-background"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-1 text-foreground/70">
            <ImageIcon size={24} />
            <p>
              <span className="font-semibold">Click or drag</span> to upload
              image
            </p>
            <p className="text-xs text-muted-foreground">JPG, JPEG or PNG</p>
          </div>
        </div>
      )}
    </Dropzone>
  );
}
