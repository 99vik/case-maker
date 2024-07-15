import { auth } from "@/auth";
import { createConfiguration } from "@/db/queries";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import z from "zod";
import probe from "probe-image-size";

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
      const { width, height } = await probe(file.url);

      const [configId] = await createConfiguration({
        url: file.url,
        email: metadata.userEmail!,
        aspectRatio: width / height,
      });
      return configId;
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
