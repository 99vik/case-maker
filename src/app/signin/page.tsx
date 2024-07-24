"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [callbackUrl, setCallbackUrl] = useState("/");

  useEffect(() => {
    const callbackUrl = localStorage.getItem("callbackUrl");
    if (callbackUrl) setCallbackUrl(callbackUrl);
    localStorage.removeItem("callbackUrl");
  }, []);

  return (
    <div className="absolute top-0 flex h-screen w-screen items-center justify-center bg-secondary">
      <div className="flex flex-col gap-1 rounded-xl bg-background p-12">
        <p className="text-2xl font-bold">
          Case<span className="text-primary">Maker</span>
        </p>
        <p className="text-muted-foreground">Please sign in to continue.</p>
        <div className="mb-4 h-px w-full bg-zinc-300 dark:bg-zinc-700" />
        <div className="flex flex-col gap-4">
          <Button
            size="lg"
            className="gap-3 border border-foreground py-6 text-lg"
            variant="ghost"
            onClick={() => {
              setLoading(true);
              signIn("github", { callbackUrl: callbackUrl });
            }}
          >
            <FaGithub className="size-8" />
            Sign In with Github
          </Button>
          <Button
            size="lg"
            className="gap-3 border border-foreground py-6 text-lg"
            variant="ghost"
            onClick={() => {
              setLoading(true);
              signIn("google", { callbackUrl: callbackUrl });
            }}
          >
            <FaGoogle className="size-8" />
            Sign In with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
