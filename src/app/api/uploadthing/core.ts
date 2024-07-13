import { auth } from "@/auth";
import { createConfiguration } from "@/db/queries";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import z from "zod";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .input(z.object({ configurationId: z.string().optional() }))
    .middleware(async () => {
      const session = await auth();
      const user = session?.user;
      if (!user) throw new UploadThingError("Unauthorized");
      return { userEmail: user.email };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userEmail:", metadata.userEmail);

      console.log("file url", file.url);
      await createConfiguration(file.url, metadata.userEmail!);
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
