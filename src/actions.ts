"use server";

import { auth } from "./auth";
import { getConfiguration, updateCaseConfiguration } from "./db/queries";
import { SaveConfigType } from "./lib/types";

export async function saveCaseConfiguration({
  configId,
  color,
  model,
  caseType,
  finish,
}: SaveConfigType) {
  const session = await auth();
  const user = session?.user;

  if (!user) throw new Error("Unauthorized");

  const configuration = await getConfiguration({
    configId: configId,
    userEmail: user.email!,
  });
  if (!configuration) throw new Error("Invalid configuration.");

  await updateCaseConfiguration({ configId, color, model, caseType, finish });
}

export async function createCheckoutSession({
  configId,
}: {
  configId: string;
}) {
  const session = await auth();
  const user = session?.user;

  if (!user) throw new Error("Unauthorized");

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const configuration = await getConfiguration({
    configId: configId,
    userEmail: user.email!,
  });
  if (!configuration) throw new Error("Invalid configuration.");

  console.log(configuration);
}
