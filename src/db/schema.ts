import {
  uuid,
  timestamp,
  real,
  pgTableCreator,
  varchar,
  pgEnum,
  boolean,
  numeric,
  line,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

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
export const orderStatusEnum = pgEnum("orderStatus", [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "canceled",
]);

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

export const shippingAddress = createTable("shipping_address", {
  id: uuid("uuid")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  name: varchar("name").notNull(),
  city: varchar("city").notNull(),
  country: varchar("country").notNull(),
  line1: varchar("line1").notNull(),
  postalCode: varchar("postal_code").notNull(),
});

export const orders = createTable("orders", {
  id: uuid("uuid")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  configurationId: uuid("configuration_id").references(() => configurations.id),
  price: numeric("price").notNull(),
  isPaid: boolean("is_paid").notNull().default(false),
  status: orderStatusEnum("order_status").notNull().default("pending"),
  shippingAddressId: uuid("shipping_address_id").references(
    () => shippingAddress.id,
  ),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const ordersRelations = relations(orders, ({ one }) => ({
  configuration: one(configurations, {
    fields: [orders.configurationId],
    references: [configurations.id],
  }),
  shippingAddress: one(shippingAddress, {
    fields: [orders.shippingAddressId],
    references: [shippingAddress.id],
  }),
}));

export const configurationsRelations = relations(configurations, ({ one }) => ({
  order: one(orders),
}));

export const shippingAdressRelation = relations(shippingAddress, ({ one }) => ({
  order: one(orders),
}));
