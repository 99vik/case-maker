import { uuid, timestamp, pgTableCreator, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const createTable = pgTableCreator((name) => `casemaker_${name}`);

export const configuration = createTable("configuration", {
  id: uuid("uuid")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  userEmail: varchar("user_email", { length: 256 }).notNull(),
  imgUrl: varchar("image_url").notNull(),
  croppedImgUrl: varchar("cropped_image_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
