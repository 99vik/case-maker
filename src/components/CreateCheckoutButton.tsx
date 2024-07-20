"use client";

import { LoaderCircle, MoveRight } from "lucide-react";
import { Button } from "./ui/button";
import { createCheckoutSession } from "@/actions";
import { useMutation } from "@tanstack/react-query";

export default function CreateCheckoutButton({
  configId,
}: {
  configId: string;
}) {
  const { mutate, isPending } = useMutation({
    mutationKey: ["checkout"],
    mutationFn: async () => {
      await createCheckoutSession({
        configId: configId,
      });
    },
  });

  return (
    <Button
      disabled={isPending}
      onClick={() => mutate()}
      size="sm"
      className="w-40 gap-2"
    >
      {isPending ? (
        <>
          Checking out..
          <LoaderCircle className="animate-spin" size={16} />
        </>
      ) : (
        <>
          Check out
          <MoveRight size={16} />
        </>
      )}
    </Button>
  );
}
