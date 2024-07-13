import { db } from ".";
import { configuration } from "./schema";

export async function createConfiguration(url: string, email: string) {
  await db.insert(configuration).values({
    imgUrl: url,
    userEmail: email,
  });
}
