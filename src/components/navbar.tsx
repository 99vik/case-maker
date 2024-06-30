import Link from "next/link";
import FullWidthWrapper from "./FullWidthWrapper";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <FullWidthWrapper className="py-4 sm:px-4 md:px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            Case<span className="text-primary">Maker</span>
          </Link>
          <div className="flex items-center space-x-5">
            <Button variant="ghost" className="text-md text-zinc-700">
              Sign up
            </Button>
            <Button variant="ghost" className="text-md text-zinc-700">
              Login
            </Button>
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
