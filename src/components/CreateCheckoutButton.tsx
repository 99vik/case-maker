"use client";

import { createCheckoutSession } from "@/actions";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle, MoveRight } from "lucide-react";
import { User } from "next-auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

export default function CreateCheckoutButton({
  configId,
  user,
}: {
  configId: string;
  user: User | undefined;
}) {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  if (user)
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

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" className="w-40 gap-2">
          Check out
          <MoveRight size={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign in required</AlertDialogTitle>
          <AlertDialogDescription>
            You need to sign in to continue with checkout.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              localStorage.setItem(
                "callbackUrl",
                pathname + "?" + searchParams.toString(),
              );
              router.push("/signin");
            }}
          >
            Sign in
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
