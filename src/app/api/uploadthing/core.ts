import { auth } from "@/auth";
import { createConfiguration } from "@/db/queries";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import z from "zod";
import probe from "probe-image-size";
import { db } from "@/db";
import { configurations } from "@/db/schema";
import { eq } from "drizzle-orm";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      const session = await auth();
      const user = session?.user;
      return { userEmail: user?.email, configId: input.configId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      if (!metadata.configId) {
        const { width, height } = await probe(file.url);
        const [configId] = await createConfiguration({
          url: file.url,
          email: metadata.userEmail,
          aspectRatio: width / height,
        });
        return configId;
      } else {
        await db
          .update(configurations)
          .set({
            croppedImgUrl: file.url,
          })
          .where(eq(configurations.id, metadata.configId));
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
