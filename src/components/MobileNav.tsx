"use client";

import { ArrowRight, Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { User } from "next-auth";
import Link from "next/link";

export default function MobileNav({ user }: { user: User | undefined }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center justify-center md:hidden"
        >
          <Menu size={36} className="text-primary" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-center">
            Case<span className="text-primary">Maker</span>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-10 flex flex-col space-y-4">
          {user ? (
            <Button
              variant="ghost"
              className="text-md text-zinc-700"
              type="submit"
            >
              Sign Out
            </Button>
          ) : (
            <Link href="/signin">
              <Button variant="ghost" className="text-md text-zinc-700">
                Sign In
              </Button>
            </Link>
          )}
          <Button className="text-md flex gap-2">
            Create case
            <ArrowRight strokeWidth={2} size={20} />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
