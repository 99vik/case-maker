"use server";

import { caseColorEnum } from "@/db/schema";
import { SaveConfigType } from "./lib/types";

export async function saveCaseConfiguration({
  color,
  model,
  caseType,
  finish,
}: SaveConfigType) {
  console.log(color, model);
  return 123;
}
