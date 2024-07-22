import { and, eq, sql } from "drizzle-orm";
import { db } from ".";
import { configurations, orders, shippingAddress } from "./schema";
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
    with: {
      order: true,
    },
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

export async function createOrder({
  configId,
  price,
}: {
  configId: string;
  price: number;
}) {
  return await db
    .insert(orders)
    .values({
      configurationId: configId,
      price: sql`${price}::numeric`,
    })
    .returning({ id: orders.id });
}

export async function updateOrder({
  orderId,
  price,
}: {
  orderId: string;
  price: number;
}) {
  await db
    .update(orders)
    .set({
      price: sql`${price}::numeric`,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(orders.id, orderId));
}

export async function createShippingAddress({
  name,
  city,
  country,
  line1,
  postalCode,
}: {
  name: string;
  city: string;
  country: string;
  line1: string;
  postalCode: string;
}) {
  const shippingAddressId = await db
    .insert(shippingAddress)
    .values({
      name,
      city,
      country,
      line1,
      postalCode,
    })
    .returning({ id: shippingAddress.id });

  return shippingAddressId;
}

export async function fullfillOrder({
  orderId,
  shippingAddressId,
}: {
  orderId: string;
  shippingAddressId: string;
}) {
  await db
    .update(orders)
    .set({
      shippingAddressId: shippingAddressId,
      isPaid: true,
      status: "processing",
    })
    .where(eq(orders.id, orderId));
}
