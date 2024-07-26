import {
  createShippingAddress,
  fullfillOrder,
  getConfiguration,
} from "@/db/queries";
import OrderPaid from "@/emails/OrderPaid";
import { CASE_TYPE, FINISH, MODELS } from "@/lib/configuration-options";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import Stripe from "stripe";

const resend = new Resend(process.env.RESEND_SECRET);

export async function POST(request: Request) {
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

    const { orderId, configId } = session.metadata as {
      orderId: string;
      configId: string;
    };

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

    const configuration = await getConfiguration({
      configId: configId,
    });

    resend.emails.send({
      from: "CaseMaker <onboarding@resend.dev>",
      to: [configuration!.userEmail!],
      subject: "Order paid",
      react: OrderPaid({
        OrderNumber: orderId,
        OrderDate: new Date().toLocaleDateString(),
        OrderStatus: "Processing",
        Name: shippingDetails.name!,
        Address: shippingDetails.address!.line1!,
        City: shippingDetails.address!.city!,
        ZipCode: shippingDetails.address!.postal_code!,
        PhoneModel: MODELS.find(
          (model) => configuration!.caseModel === model.value,
        )!.label,
        CaseType: CASE_TYPE.find(
          (type) => configuration!.caseType === type.value,
        )!.label,
        Finish: FINISH.find(
          (finish) => configuration!.caseFinish === finish.value,
        )!.label,
      }),
    });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
