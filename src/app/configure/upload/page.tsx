"use client";

import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useUploadThing } from "@/utils/uploadthing";
import { Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import Dropzone, { FileRejection } from "react-dropzone";

export default function Page() {
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      console.log(data);
    },
    onUploadError: () => {
      toast({
        title: "Error has occurred while uploading.",
        variant: "destructive",
      });
    },
  });

  function onDropAccepted(files: File[]) {
    startUpload(files, { configurationId: undefined });
  }

  function onDropRejected(files: FileRejection[]) {
    setIsDragOver(false);
    toast({
      title: "Error has occurred.",
      description: files[0].errors[0].message,
      variant: "destructive",
    });
  }

  return (
    <Dropzone
      onDragEnter={() => setIsDragOver(true)}
      onDragLeave={() => setIsDragOver(false)}
      onDropAccepted={onDropAccepted}
      onDropRejected={onDropRejected}
      maxFiles={1}
      accept={{
        "image/png": [".png"],
        "image/jpeg": [".jpeg"],
        "image/jpg": [".jpg"],
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          className={cn(
            "my-6 flex flex-1 items-center justify-center rounded-3xl border-2 border-dashed border-zinc-300 bg-background transition",
            isDragOver && "border-primary",
          )}
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
