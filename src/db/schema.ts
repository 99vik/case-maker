import {
  uuid,
  timestamp,
  real,
  pgTableCreator,
  varchar,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const caseColorEnum = pgEnum("caseColor", [
  "black",
  "red",
  "blue",
  "green",
]);
export const caseModelEnum = pgEnum("caseModel", [
  "iphone15pro",
  "iphone15",
  "iphone14pro",
  "iphone14",
  "iphone13pro",
  "iphone13",
]);
export const caseTypeEnum = pgEnum("caseType", ["basic", "protective"]);
export const caseFinishEnum = pgEnum("caseFinish", ["glossy", "matte"]);

export const createTable = pgTableCreator((name) => `casemaker_${name}`);

export const configurations = createTable("configurations", {
  id: uuid("uuid")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  userEmail: varchar("user_email", { length: 256 }).notNull(),
  imgUrl: varchar("image_url").notNull(),
  aspectRatio: real("aspect_ratio").notNull(),
  croppedImgUrl: varchar("cropped_image_url"),
  caseColor: caseColorEnum("caseColor"),
  caseModel: caseModelEnum("caseModel"),
  caseType: caseTypeEnum("caseType"),
  caseFinish: caseFinishEnum("caseFinish"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
