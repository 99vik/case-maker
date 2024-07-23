import {
  caseColorEnum,
  caseModelEnum,
  caseTypeEnum,
  caseFinishEnum,
} from "@/db/schema";

export interface SaveConfigType {
  configId: string;
  color: (typeof caseColorEnum.enumValues)[number];
  model: (typeof caseModelEnum.enumValues)[number];
  caseType: (typeof caseTypeEnum.enumValues)[number];
  finish: (typeof caseFinishEnum.enumValues)[number];
  userEmail?: string | null | undefined;
}
