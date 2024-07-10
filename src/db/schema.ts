import {
  serial,
  timestamp,
  pgTableCreator,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `casemaker_${name}`);

export const order = createTable("order", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
