"use client";

import { useTheme } from "next-themes";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Switch } from "./ui/switch";
import { Moon, Sun } from "lucide-react";

export default function DarkModeSwitch() {
  const { setTheme, theme } = useTheme();
  function switchTheme() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }
  return (
    <DropdownMenuItem
      className="justify-center gap-3"
      onSelect={(e) => e.preventDefault()}
      asChild
    >
      <div>
        <Sun size={16} />
        <Switch checked={theme === "dark"} onCheckedChange={switchTheme} />
        <Moon size={16} />
      </div>
    </DropdownMenuItem>
  );
}
