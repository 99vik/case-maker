"use client";

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

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
      <div className="rounded-xl bg-background p-8">
        <button
          onClick={() => {
            setLoading(true);
            signIn("github", { callbackUrl: callbackUrl });
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
