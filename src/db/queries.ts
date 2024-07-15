import { db } from ".";
import { configuration } from "./schema";

type configuration = typeof configuration.$inferInsert;

export async function createConfiguration(url: string, email: string) {
  const configId = await db
    .insert(configuration)
    .values({
      imgUrl: url,
      userEmail: email,
    })
    .returning({ id: configuration.id });

  return configId;
}
