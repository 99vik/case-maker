import {
  serial,
  timestamp,
  pgTableCreator,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `casemaker_${name}`);

export const configuration = createTable("configuration", {
  id: serial("id").primaryKey(),
  userEmail: varchar("user_email", { length: 256 }).notNull(),
  imgUrl: varchar("image_url").notNull(),
  croppedImgUrl: varchar("cropped_image_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
