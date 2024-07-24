"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname, useSearchParams } from "next/navigation";

export default function SigninButton() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function saveCallBackUrl() {
    localStorage.setItem(
      "callbackUrl",
      pathname + "?" + searchParams.toString(),
    );
  }
  return (
    <Link href="/signin">
      <Button
        onClick={saveCallBackUrl}
        size="sm"
        variant="ghost"
        className="text-md text-zinc-700 dark:text-zinc-300"
      >
        Sign In
      </Button>
    </Link>
  );
}
