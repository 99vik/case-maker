"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowRight, LogOut, Menu, Smartphone } from "lucide-react";
import { User } from "next-auth";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import DarkModeSwitch from "./DarkModeSwitch";

export default function MobileNav({ user }: { user: User | undefined }) {
  return (
    <Sheet aria-describedby="mobile menu">
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center justify-center md:hidden"
        >
          <Menu size={36} className="text-primary" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <DialogDescription className="hidden">
          Small screen menu
        </DialogDescription>
        <SheetHeader>
          <SheetTitle className="text-center text-2xl">
            Case<span className="text-primary">Maker</span>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-2 h-px w-full bg-zinc-300 dark:bg-zinc-700"></div>
        <div className="mt-6 flex flex-col space-y-6">
          <SheetClose asChild>
            <Link
              href="/configure/upload"
              className={cn(
                buttonVariants({
                  className: "text-md gap-2",
                }),
              )}
            >
              Create case
              <ArrowRight strokeWidth={2} size={20} />
            </Link>
          </SheetClose>
          {user ? (
            <>
              <SheetClose asChild>
                <Link
                  href="/my-configurations"
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      className: "text-md gap-2",
                    }),
                  )}
                >
                  <Smartphone size={16} strokeWidth={1.5} />
                  My configurations
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  variant="outline"
                  className="text-md gap-2"
                  type="submit"
                >
                  <LogOut size={16} strokeWidth={1.5} />
                  Sign Out
                </Button>
              </SheetClose>
            </>
          ) : (
            <SheetClose asChild>
              <Link
                href="/signin"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    className: "text-md",
                  }),
                )}
              >
                Sign In
              </Link>
            </SheetClose>
          )}
          <DarkModeSwitch isMobileNav={true} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
