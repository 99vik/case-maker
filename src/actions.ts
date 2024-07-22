"use server";

import { auth } from "./auth";
import {
  createOrder,
  getConfiguration,
  updateCaseConfiguration,
  updateOrder,
} from "./db/queries";
import { MODELS } from "./lib/configuration-options";
import { stripe } from "./lib/stripe";
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

  const configuration = await getConfiguration({
    configId: configId,
    userEmail: user.email!,
  });
  if (!configuration) throw new Error("Invalid configuration.");

  let price = 1199;
  if (configuration.caseType === "protective") price += 800;
  if (configuration.caseFinish === "matte") price += 400;

  let orderId: string;
  if (!configuration.order) {
    const result = await createOrder({
      configId: configId,
      price: price / 100,
    });
    orderId = result[0].id;
  } else {
    await updateOrder({
      orderId: configuration.order.id,
      price: price / 100,
    });
    orderId = configuration.order.id;
  }

  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "paypal"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: "Custom Phone Case",
            description: `Custom Phone Case for ${MODELS.find((model) => configuration.caseModel === model.value)!.label}, with ${configuration.caseType} case type and ${configuration.caseFinish} finish.`,
            images: [configuration.imgUrl],
          },
          unit_amount: price,
        },
        quantity: 1,
      },
    ],
    metadata: { orderId: orderId },
    shipping_address_collection: { allowed_countries: ["HR", "DE"] },
    customer_email: user.email!,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you&orderId=${configuration.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/review?id=${configuration.id}`,
  });

  return { url: stripeSession.url };
}
