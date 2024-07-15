import { db } from ".";
import { configurations } from "./schema";

export async function createConfiguration({
  url,
  email,
  aspectRatio,
}: {
  url: string;
  email: string;
  aspectRatio: number;
}) {
  const configId = await db
    .insert(configurations)
    .values({
      imgUrl: url,
      userEmail: email,
      aspectRatio: aspectRatio,
    })
    .returning({ id: configurations.id });

  return configId;
}