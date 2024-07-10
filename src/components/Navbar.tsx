import Link from "next/link";
import FullWidthWrapper from "./FullWidthWrapper";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { auth, signOut } from "@/auth";
import MobileNav from "./MobileNav";
import NavUserButton from "./NavUserButton";
import { db } from "@/db";

export default async function Navbar() {
  const session = await auth();
  const user = session?.user;

  // const a = await db.query.order.findMany();
  // console.log(a);

  return (
    <nav className="border-b bg-background">
      <FullWidthWrapper className="py-4 sm:px-4 md:px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            Case<span className="text-primary">Maker</span>
          </Link>
          <MobileNav user={user} />
          <div className="hidden items-center space-x-5 md:flex">
            {user ? (
              <NavUserButton user={user} />
            ) : (
              <Link href="/signin">
                <Button variant="ghost" className="text-md text-zinc-700">
                  Sign In
                </Button>
              </Link>
            )}
            <div className="h-10 w-px bg-zinc-200" />
            <Button className="text-md flex gap-2">
              Create case
              <ArrowRight strokeWidth={2} size={20} />
            </Button>
          </div>
        </div>
      </FullWidthWrapper>
    </nav>
  );
}