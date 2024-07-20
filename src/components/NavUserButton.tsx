import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { User } from "next-auth";
import { signOut } from "@/auth";
import { LogOut, Smartphone } from "lucide-react";
import DarkModeSwitch from "./DarkModeSwitch";

export default function NavUserButton({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar imageUrl={user.image} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          {user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="gap-2">
          <Smartphone size={16} strokeWidth={1.5} />
          My configurations
        </DropdownMenuItem>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <DropdownMenuItem asChild>
            <button
              className="flex h-full w-full items-center gap-2"
              type="submit"
            >
              <LogOut size={16} strokeWidth={1.5} /> Sign out
            </button>
          </DropdownMenuItem>
        </form>
        <DropdownMenuSeparator />
        <DarkModeSwitch />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
