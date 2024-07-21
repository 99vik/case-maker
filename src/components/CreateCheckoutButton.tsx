"use client";

import { LoaderCircle, MoveRight } from "lucide-react";
import { Button } from "./ui/button";
import { createCheckoutSession } from "@/actions";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateCheckoutButton({
  configId,
}: {
  configId: string;
}) {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationKey: ["checkout"],
    mutationFn: createCheckoutSession,
    onError: (error) => {
      toast({
        title: "Error has occurred while creating checkout session.",
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: ({ url }) => {
      setIsRedirecting(true);
      router.push(url!);
    },
  });

  return (
    <Button
      disabled={isPending || isRedirecting}
      onClick={() => mutate({ configId })}
      size="sm"
      className="w-40 gap-2"
    >
      {isPending || isRedirecting ? (
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
