import { db } from ".";
import { configurations } from "./schema";

export async function createConfiguration(url: string, email: string) {
  const configId = await db
    .insert(configurations)
    .values({
      imgUrl: url,
      userEmail: email,
    })
    .returning({ id: configurations.id });

  return configId;
}
