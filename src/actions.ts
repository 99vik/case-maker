"use server";

import { auth } from "./auth";
import { getConfiguration, updateCaseConfiguration } from "./db/queries";
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

  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "paypal"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: "Custom Phone Case",
            images: [configuration.imgUrl],
          },
          unit_amount: price,
        },
        quantity: 1,
      },
    ],
    customer_email: user.email!,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you&orderId=${configuration.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/review?id=${configuration.id}`,
  });

  return { url: stripeSession.url };
}
