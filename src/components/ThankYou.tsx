"use client";

import { Loader, LoaderCircle } from "lucide-react";
import FullWidthWrapper from "./FullWidthWrapper";
import { useQuery } from "@tanstack/react-query";
import { getOrderStatus } from "@/actions";

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

  if (!orderData || orderData.status === "pending") {
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
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold">Thank you for your purchase!</h1>
    </div>
  );
}
