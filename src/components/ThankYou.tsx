"use client";

import { Loader, LoaderCircle } from "lucide-react";
import FullWidthWrapper from "./FullWidthWrapper";
import { useQuery } from "@tanstack/react-query";
import { getOrderStatus } from "@/actions";
import ConfettiComponent from "./Confetti";
import { CASE_TYPE, COLORS, FINISH, MODELS } from "@/lib/configuration-options";

export default function ThankYou({ orderId }: { orderId: string }) {
  const { data: orderData } = useQuery({
    queryKey: ["order"],
    queryFn: async () =>
      await getOrderStatus({
        orderId: orderId,
      }),
    refetchInterval: (data) => {
      return data.state.data?.status === "pending" ? 1500 : false;
    },
  });

  console.log(orderData);

  if (!orderData) {
    return (
      <FullWidthWrapper className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-2">
          <LoaderCircle size={40} className="animate-spin text-primary" />
          <h1 className="text-3xl font-semibold">Loading order...</h1>
        </div>
      </FullWidthWrapper>
    );
  }
  if (orderData.status === "pending") {
    return (
      <FullWidthWrapper className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-2">
          <LoaderCircle size={40} className="animate-spin text-primary" />
          <h1 className="text-3xl font-semibold">
            Your order is being processed...
          </h1>
          <p className="text-muted-foreground">
            This won&apos;t take long, please wait.
          </p>
        </div>
      </FullWidthWrapper>
    );
  }
  return (
    <FullWidthWrapper className="space-y-6 px-4 py-6 sm:px-32 md:px-48 lg:py-12">
      <div>
        <p className="text-sm font-semibold text-primary">
          Thank you for your purchase!
        </p>
        <h1 className="my-1 text-4xl font-bold">Your case is on its way!</h1>
        <p className="text-sm text-muted-foreground">
          Your order has been paid and is being processed.
        </p>
      </div>
      <div className="text-sm text-muted-foreground">
        <p>Order ID: {orderData.id}</p>
      </div>
      <div className="h-px w-full bg-zinc-300 dark:bg-zinc-700" />
      <p className="text-sm text-muted-foreground">
        Shipping notifications will be sent to:{" "}
        <span className="font-semibold">
          {orderData.configuration!.userEmail}
        </span>
      </p>
      <div className="flex justify-between">
        <div className="space-y-1">
          <p className="font-semibold">Configuration details</p>
          <ul className="list-inside list-disc space-y-1 text-foreground/80">
            <li>
              Color:{" "}
              {
                COLORS.find(
                  (color) => color.value === orderData.configuration!.caseColor,
                )!.label
              }
            </li>
            <li>
              Phone model:{" "}
              {
                MODELS.find(
                  (model) => model.value === orderData.configuration!.caseModel,
                )!.label
              }
            </li>
            <li>
              Case type:{" "}
              {
                CASE_TYPE.find(
                  (type) => type.value === orderData.configuration!.caseType,
                )!.label
              }
            </li>
            <li>
              Finish:{" "}
              {
                FINISH.find(
                  (finish) =>
                    finish.value === orderData.configuration!.caseFinish,
                )!.label
              }
            </li>
          </ul>
        </div>
        <div className="space-y-1">
          <p className="font-semibold">Shipping details</p>
          <ul className="list-inside list-disc space-y-1 text-foreground/80">
            <li>Name: {orderData.shippingAddress!.name}</li>
            <li>
              City: {orderData.shippingAddress!.city},{" "}
              {orderData.shippingAddress!.postalCode}
            </li>
            <li>Address: {orderData.shippingAddress!.line1}</li>
          </ul>
        </div>
      </div>
      <ConfettiComponent />
    </FullWidthWrapper>
  );
}
