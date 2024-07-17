import { and, eq, sql } from "drizzle-orm";
import { db } from ".";
import { configurations } from "./schema";
import { SaveConfigType } from "@/lib/types";

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

export async function getConfiguration({
  configId,
  userEmail,
}: {
  configId: string;
  userEmail: string;
}) {
  return await db.query.configurations.findFirst({
    where: (configuration, { eq }) =>
      and(
        eq(configuration.id, configId),
        eq(configuration.userEmail, userEmail!),
      ),
  });
}

export async function updateCaseConfiguration({
  configId,
  color,
  model,
  caseType,
  finish,
}: SaveConfigType) {
  await db
    .update(configurations)
    .set({
      caseColor: color,
      caseModel: model,
      caseType: caseType,
      caseFinish: finish,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(configurations.id, configId));
}
