import { createShippingAddress, fullfillOrder } from "@/db/queries";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 8000));
  const body = await request.text();
  const signature = headers().get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const { orderId } = session.metadata as { orderId: string };

    const shippingDetails = session.shipping_details!;

    const [{ id: shippingAddressId }] = await createShippingAddress({
      name: shippingDetails.name!,
      city: shippingDetails.address!.city!,
      country: shippingDetails.address!.country!,
      line1: shippingDetails.address!.line1!,
      postalCode: shippingDetails.address!.postal_code!,
    });

    await fullfillOrder({
      orderId,
      shippingAddressId,
    });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
